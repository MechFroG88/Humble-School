<template>
  <div id="_model" class="model-container">
    <div id="log" class="log"></div>
    <div class="message-container" v-if="isOrbit">
      This is a message.
    </div>
  </div>
</template>

<script>
import '../vendor/three.js';
import '../vendor/three.min.js';
import '../vendor/BokehShader.js';
import '../vendor/CinematicCamera.js';
import '../vendor/OrbitControls.js';
import '../vendor/TrackballControls.js';
import '../vendor/OBJLoader.js';

import Stats from '../vendor/stats.js';

import sceneObj from '../static/model/scene_again.json';

export default {
  mounted() {
    this.init();
    this.animate();
  },
  data: () => ({
    isOrbit: false,
    high: false,
    far: false,
    inside: false,
    radius: 350,
    rotateSpeed: 0.25,
    cinematicHeight: 500,
    XOffset: -1800,
    ZOffset: 150,
    depressionHeight: 180,
    theta: 0,
  }),
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xeeeeee);

      this.addCamera();

      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this.renderer.domElement );

      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.addEventListener( 'change', this.render );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 1.55;
      this.controls.screenSpacePanning = false;
      this.controls.maxPolarAngle = 6 * Math.PI / 13;

      this.mouse = new THREE.Vector2(), this.INTERSECTED;
      this.raycaster = new THREE.Raycaster();

      this.stats = new Stats();
      document.body.appendChild( this.stats.dom );

      this.addLight();

      this.loadModel();
      this.render();

      window.addEventListener( 'resize', this.onWindowResize, false );
      window.addEventListener( 'mousemove', this.onMouseMove, false );
      window.addEventListener( 'mousedown', this.onMouseClick, false );
      window.addEventListener( 'keydown', this.keyIsPressed, false );
      
      // mobile events
      window.addEventListener("touchstart", this.touchStart, false);
      window.addEventListener("touchend", this.touchEnd, false);
      window.addEventListener("touchcancel", this.touchCancel, false);
      window.addEventListener("touchmove", this.touchMove, false);
    },
    onMouseMove(event) {
      event.preventDefault();
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    },
    onMouseClick(event) {
      event.preventDefault();
      if (!this.isOrbit) {
        console.log(this.intersects[0].object);
        if (this.intersects[0].object.name.includes('Location')) { this.clicked = this.intersects[0]; }
        else if (this.intersects[1].object.name.includes('Location')) { this.clicked = this.intersects[1]; }
        if (this.clicked && (this.intersects[0].object.name.includes('Location') || this.intersects[1].object.name.includes('Location'))) {
          this.isOrbit = true; this.theta = 100 * Math.random();
          this.XOffset = this.clicked.point.x; this.ZOffset = this.clicked.point.z;
          this.cinematic.position.set( 0, this.clicked.point.y + this.depressionHeight, 0 )
          this.clicked.object.material.emissive = new THREE.Color( 0xff0000 );
          this.clicked.object.material.opacity = .75;
          this.clicked.object.material.color.setHex( 0xff0000 );
          if (this.clicked.object.name == 'Location_67') { this.high = true; this.cinematic.position.set( 0, this.cinematicHeight + 800, 0 ); }
          else if (this.clicked.object.name == 'Location_165') { this.far = true; this.cinematic.position.set( 0, this.cinematicHeight + 1000, 0 ); }
          else { this.high = false; this.far = false; }

          // set other locations to transparent
          this.scene.children[6].children[0].children.forEach((el) => {
            if (el.name.includes('Location') && el.name != this.clicked.object.name) { el.material.opacity = 0; }
          })
        }
      }
    },
    log(msg) {
      var p = document.getElementById('log');
      p.innerHTML = msg + "\n" + p.innerHTML;
    },
    touchStart(event) {
      event.preventDefault();
      console.log(event);
      this.log(event);
    },
    keyIsPressed(event) {
      if (event.keyCode == 27) {
        this.isOrbit = false;
        this.clicked.object.material.color.setHex( 0xDBDBDB );
        this.scene.children[6].children[0].children.forEach((el) => {
          if (el.name.includes('Location')) { el.material.opacity = .3; }
        })
      }
      if (event.keyCode == 32) {
        this.camera.position.set(-1700, 1400, 1400);
        this.camera.lookAt( this.scene.position );
      }
    },
    render() {
      this.camera.updateMatrixWorld();
      this.raycaster.setFromCamera( this.mouse, this.camera );
      this.intersects = this.raycaster.intersectObjects( this.scene.children[6].children[0].children );
      if ( this.intersects.length > 0 && !this.isOrbit) {
        if ( this.INTERSECTED != this.intersects[0].object && this.intersects[0].object.name != 'Land' ) {
          if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
          if (this.intersects[0].object.name.includes('Location')) {
            this.inside = false;
            this.INTERSECTED = this.intersects[0].object;
            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            this.INTERSECTED.material.emissive.setHex( 0xff0000 );
          }
          else if (this.intersects[1].object.name.includes('Location')) {
            this.inside = true;
            this.INTERSECTED = this.intersects[1].object;
            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            this.INTERSECTED.material.emissive.setHex( 0xff0000 );
          }
        }
      } else {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = null;
      }
        
      if (this.isOrbit) {
        this.theta += this.rotateSpeed;
        let direction = this.cinematic.getWorldDirection(); 

        if (this.high) {
          this.cinematic.position.x = this.XOffset + ((this.radius + 50) * Math.cos( this.theta * Math.PI / 180 ));
          this.cinematic.position.z = this.ZOffset + ((this.radius + 50) * Math.sin( this.theta * Math.PI / 180 ));
          direction.x = this.XOffset; direction.y = this.cinematic.position.y - this.depressionHeight - 800; direction.z = this.ZOffset;
        }
        else if (this.far) {
          this.cinematic.position.x = this.XOffset + ((this.radius + 350) * Math.cos( this.theta * Math.PI / 180 ));
          this.cinematic.position.z = this.ZOffset + ((this.radius + 350) * Math.sin( this.theta * Math.PI / 180 ));
          direction.x = this.XOffset; direction.y = this.cinematic.position.y - this.depressionHeight - 1000; direction.z = this.ZOffset;
        }
        else {
          this.cinematic.position.x = this.XOffset + (this.radius * Math.cos( this.theta * Math.PI / 180 ));
          this.cinematic.position.z = this.ZOffset + (this.radius * Math.sin( this.theta * Math.PI / 180 ));
          direction.x = this.XOffset; direction.y = this.cinematic.position.y - this.depressionHeight; direction.z = this.ZOffset;
        }

        this.cinematic.lookAt( direction );
        this.cinematic.updateMatrixWorld();
        this.renderer.render( this.scene, this.cinematic );
      }
      if (!this.isOrbit) this.renderer.render( this.scene, this.camera );
    },
    addCamera() {
      /// normal camera ///
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
      this.camera.position.set(-1400, 1500, 1800);
      this.camera.lookAt( this.scene.position );
      this.scene.add( this.camera );
      /// normal camera ///

      /// cinematic camera ///
      this.cinematic = new THREE.CinematicCamera( 80, window.innerWidth / window.innerHeight, 0.1, 5000 );
      this.cinematic.position.set( 0, this.cinematicHeight, 0 );

      this.effectController = {
        focalLength: 15,
        fstop: 2.8,
        showFocus: false,
        focalDepth: 2
      };

      for ( var e in this.effectController ) {
        if ( e in this.cinematic.postprocessing.bokeh_uniforms ) {
          this.cinematic.postprocessing.bokeh_uniforms[ e ].value = this.effectController[ e ];
        }
      }
      this.cinematic.postprocessing.bokeh_uniforms[ 'znear' ].value = this.cinematic.near;
      this.cinematic.postprocessing.bokeh_uniforms[ 'zfar' ].value = this.cinematic.far;
      this.cinematic.setLens( this.effectController.focalLength, this.cinematic.frameHeight, this.effectController.fstop, this.cinematic.coc );
      this.effectController[ 'focalDepth' ] = this.cinematic.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;
      /// cinematic camera ///
    },
    addLight() {
      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
      this.scene.add( this.ambientLight );

      this.pointLight1 = new THREE.PointLight( 0xFFFFFF, .2 );
      this.pointLight1.position.set(3000, 5000, 3000);
      this.scene.add( this.pointLight1 );

      this.pointLight2 = new THREE.PointLight( 0xFFFFFF, .2 );
      this.pointLight2.position.set(-3000, 5000, 3000);
      this.scene.add( this.pointLight2 );

      this.pointLight3 = new THREE.PointLight( 0xFFFFFF, .2 );
      this.pointLight3.position.set(3000, 5000, -3000);
      this.scene.add( this.pointLight3 );

      this.pointLight4 = new THREE.PointLight( 0xFFFFFF, .2 );
      this.pointLight4.position.set(-3000, 5000, -3000);
      this.scene.add( this.pointLight4 );
    },
    animate() {
      requestAnimationFrame( this.animate );
      this.controls.update();
      this.render();
      this.stats.update();
    },
    loadModel() {
      this.loader = new THREE.ObjectLoader();
      this.object = this.loader.parse( sceneObj );
      this.object.children[0].children.forEach(child => {
        if (child.material) {
          if (toString(child.material.transparent)) child.material.transparent = true;
          child.material.opacity = .5;
          child.material.color.r = 1.2; child.material.color.g = 1.2; child.material.color.b = 1.2;
        }
        if (child.name.includes('Location')) {
          // if (toString(child.material.transparent)) child.material.transparent = false;
          child.material.opacity = .3;
          child.material.color.r = .8; child.material.color.g = .8; child.material.color.b = .8;
          // render all faces in transparent container objects
          child.material.depthTest = false;
          child.renderOrder = 100;
        }
      })
      this.scene.add( this.object );
    },
    onWindowResize() {
      if (this.isOrbit) {
        this.cinematic.aspect = window.innerWidth / window.innerHeight;
				this.cinematic.updateProjectionMatrix();
      } else {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
  }
}
</script>

<style>
.log {
  position: absolute;
  top: .35rem;
  left: 4.5rem;
}
.message-container {
  position: absolute;
  top: 20%;
  left: 50%;
  min-width: 25%;
  min-height: 20%;
  opacity: .8;
  transform: translate(-50%, -50%);
  background-color: #424242;
  color: #898989;
  font-size: 1rem;
  border-color: #ddd;
  border-radius: .1rem;
  box-shadow: 0 0 1.2rem rgba(71, 71, 71, 0.3);

  /* css animation */
  -webkit-transform: translateY(-50px);
  -webkit-animation: slideDown 300ms 1 ease;
  -moz-transform:    translateY(-50px);
  -moz-animation:    slideDown 300ms 1 ease;

}
@-webkit-keyframes slideDown {
  0%, 100% { top: -50%; }
  10%, 90% { top: 20%; }
}
@-moz-keyframes slideDown {
    0%, 100% { top: -50%; }
    10%, 90% { top: 20%; }
}
</style>
