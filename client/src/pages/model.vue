<template>

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

import sceneObj from '../static/model/scene.json';

export default {
  mounted() {
    this.init();
    this.animate();
  },
  data: () => ({
    isOrbit: false,
    selected: false,
    radius: 350,
    cinematicHeight: 270,
    XOffset: -1800,
    ZOffset: 150,
    depressionHeight: 180,
    theta: 0,
  }),
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xeeeeee);

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

      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this.renderer.domElement );

      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.addEventListener( 'change', this.render );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 1.55;
      this.controls.screenSpacePanning = false;
      this.controls.maxPolarAngle = 5 * Math.PI / 11;

      this.mouse = new THREE.Vector2(), this.INTERSECTED;
      this.raycaster = new THREE.Raycaster();

      this.stats = new Stats();
      document.body.appendChild( this.stats.dom );

      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.6 );
      this.scene.add( this.ambientLight );

      this.loadModel();
      this.render();

      window.addEventListener( 'resize', this.onWindowResize, false );
      window.addEventListener( 'mousemove', this.onMouseMove, false );
      window.addEventListener( 'click', this.onMouseClick, false );
      window.addEventListener( 'keydown', this.keyIsPressed, false );
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
    onMouseMove(event) {
      event.preventDefault();
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    },
    onMouseClick(event) {
      event.preventDefault();
      console.log(this.intersects[0]);
      if (this.intersects.length > 0) {
        while (this.intersects[0].object.name.includes('Outside')
        || (!this.intersects[0].object.name.includes('A_')
        && !this.intersects[0].object.name.includes('B_')
        && !this.intersects[0].object.name.includes('C_')
        && !this.intersects[0].object.name.includes('D_')
        && !this.intersects[0].object.name.includes('E_')
        && !this.intersects[0].object.name.includes('F_'))) {
          this.intersects.shift();
          if (this.intersects.length == 0) break;
        }
      }
      if (!this.isOrbit) {
        this.clicked = this.intersects[0];
        if (this.clicked
        && !this.clicked.object.name.includes('Outside')
        && (this.clicked.object.name.includes('A_')
        || this.clicked.object.name.includes('B_')
        || this.clicked.object.name.includes('C_')
        || this.clicked.object.name.includes('D_')
        || this.clicked.object.name.includes('E_')
        || this.clicked.object.name.includes('F_'))) {
          this.isOrbit = true; this.theta = 0;
          this.XOffset = this.clicked.point.x; this.ZOffset = this.clicked.point.z;
          this.cinematic.position.set( 0, this.clicked.point.y + this.depressionHeight, 0 )
          this.clicked.object.material.emissive = new THREE.Color( 0xff0000 );
          this.clicked.object.material.color.setHex( 0xff0000 );
        }
      }
    },
    keyIsPressed(event) {
      if (event.keyCode == 27) {
        this.isOrbit = false;
        this.clicked.object.material.color.setHex( 0xB3B3B3 );
      }
      if (event.keyCode == 32) {
        this.camera.position.set(-1700, 1400, 1400);
      }
    },
    render() {
      this.camera.updateMatrixWorld();
      this.raycaster.setFromCamera( this.mouse, this.camera );
      this.intersects = this.raycaster.intersectObjects( this.scene.children[2].children[0].children );
      if ( this.intersects.length > 0 && !this.isOrbit) {
        if ( this.INTERSECTED != this.intersects[0].object ) {
          if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
          if (!this.intersects[0].object.name.includes('Outside')
          && (this.intersects[0].object.name.includes('A_')
          || this.intersects[0].object.name.includes('B_')
          || this.intersects[0].object.name.includes('C_')
          || this.intersects[0].object.name.includes('D_')
          || this.intersects[0].object.name.includes('E_')
          || this.intersects[0].object.name.includes('F_'))) {
            this.selected = true;
            this.INTERSECTED = this.intersects[0].object;
            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            this.INTERSECTED.material.emissive.setHex( 0xff0000 );
          }
          if (!this.selected) {
            while ((this.intersects[0].object.name.includes('Outside')
            || (!this.intersects[0].object.name.includes('A_')
            && !this.intersects[0].object.name.includes('B_')
            && !this.intersects[0].object.name.includes('C_')
            && !this.intersects[0].object.name.includes('D_')
            && !this.intersects[0].object.name.includes('E_')
            && !this.intersects[0].object.name.includes('F_')))) {
              this.intersects.shift();
              if (this.intersects.length == 0) break;
            }
            if (this.intersects.length > 0) {
              this.INTERSECTED = this.intersects[0].object;
              this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
              this.INTERSECTED.material.emissive.setHex( 0xff0000 );
            }
          }
        }
      } else {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = null;
      }
        
      if (this.isOrbit) {
        this.theta += 0.3;
				this.cinematic.position.x = this.XOffset + (this.radius * Math.cos( this.theta * Math.PI / 180 ));
				this.cinematic.position.z = this.ZOffset + (this.radius * Math.sin( this.theta * Math.PI / 180 ));
        let direction = this.cinematic.getWorldDirection(); 
        direction.x = this.XOffset; direction.y = this.cinematic.position.y - this.depressionHeight; direction.z = this.ZOffset;
        this.cinematic.lookAt( direction );
        this.cinematic.updateMatrixWorld();
        this.renderer.render( this.scene, this.cinematic );
      }
      if (!this.isOrbit) this.renderer.render( this.scene, this.camera );
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
          child.material.opacity = 0.3;
        }
        if ((child.name.includes('A_')
        || child.name.includes('B_') 
        || child.name.includes('C_')
        || child.name.includes('D_')
        || child.name.includes('E_')
        || child.name.includes('F_')) && !child.name.includes('Outside')) {
          child.material.opacity = 0.5;
          child.material.color.r = .7; child.material.color.g = .7; child.material.color.b = .7;
        }
      })
      this.scene.add( this.object );
    },
  }
}
</script>

<style>
.btn {
  position: absolute;
  top: .35rem;
  left: 4.5rem;
}
</style>
