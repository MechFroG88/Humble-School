<template>
  <div>
    <div class="btn btn-lg btn-primary" @click="orbit">Try me out!</div>
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

// import * as dat from '../vendor/dat.gui.min.js';
import Stats from '../vendor/stats.js';

import sceneObj from '../static/model/scene.json';

export default {
  mounted() {
    this.init();
    this.animate();
  },
  data: () => ({
    isOrbit: false,
    radius: 5000,
    theta: 0,
  }),
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xdddddd);

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
      this.camera.position.set(-1800, 1500, -1200);
      this.camera.lookAt( this.scene.position );
      this.scene.add( this.camera );

      this.renderer = new THREE.WebGLRenderer();
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

      this.ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.15 );
      this.scene.add( this.ambientLight );

      this.loadModel();
      this.render();

      window.addEventListener( 'resize', this.onWindowResize, false );
      window.addEventListener( 'mousemove', this.onMouseMove, false );
      window.addEventListener( 'click', this.onMouseClick, false);
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
      this.raycaster.setFromCamera( this.mouse, this.camera );
      this.intersects = this.raycaster.intersectObjects( this.scene.children[2].children[0].children );
      console.log(this.intersects);
    },
    render() {
      if (!this.isOrbit) this.camera.updateMatrixWorld();
      this.raycaster.setFromCamera( this.mouse, this.camera );
      this.intersects = this.raycaster.intersectObjects( this.scene.children[2].children[0].children );
      if ( this.intersects.length > 0 ) {
        if (this.isOrbit) {
          var targetDistance = this.intersects[0].distance;
					this.cinematic.focusAt( targetDistance );
        }
        if ( this.INTERSECTED != this.intersects[0].object ) {
          if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
          this.INTERSECTED = this.intersects[0].object;
          this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
          this.INTERSECTED.material.emissive.setHex( 0xff0000 );
        }
      } else {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = null;
      }
        
      if (this.isOrbit) {
        this.theta += 0.1;
				this.cinematic.position.x = this.radius * Math.sin( this.theta * Math.PI / 180 );
				this.cinematic.position.y = this.radius * Math.sin( this.theta * Math.PI / 180 );
				this.cinematic.position.z = this.radius * Math.cos( this.theta * Math.PI / 180 );
        this.cinematic.lookAt( this.scene.position );
        console.log(this.cinematic.position);
        this.cinematic.updateMatrixWorld();
        if ( this.cinematic.postprocessing.enabled ) {
          this.cinematic.renderCinematic( this.scene, this.renderer, this.cinematic );
				} else {
					this.scene.overrideMaterial = null;
					this.renderer.clear();
					this.renderer.render( this.scene, this.cinematic );
				}
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
      this.scene.add( this.object );
    },
    orbit() {
      if (!this.isOrbit) {
        this.isOrbit = true;
        this.selected = this.scene.getObjectByName("E_2_4", true);
        this.cinematic = new THREE.CinematicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        this.cinematic.setLens( 2 );
        this.cinematic.position.set( 0, 0, 0 );

        this.effectController = {
					focalLength: 15,
					fstop: 2.8,
					showFocus: false,
					focalDepth: 3
        };

        var matChanger = () => {
          for ( var e in this.effectController ) {
            if ( e in this.cinematic.postprocessing.bokeh_uniforms ) {
              this.cinematic.postprocessing.bokeh_uniforms[ e ].value = this.effectController[ e ];
            }
          }
          this.cinematic.postprocessing.bokeh_uniforms[ 'znear' ].value = this.cinematic.near;
          this.cinematic.postprocessing.bokeh_uniforms[ 'zfar' ].value = this.cinematic.far;
          this.cinematic.setLens( this.effectController.focalLength, this.cinematic.frameHeight, this.effectController.fstop, this.cinematic.coc );
          this.effectController[ 'focalDepth' ] = this.cinematic.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;
        };

        // var gui = new dat.GUI();
				// gui.add( effectController, 'focalLength', 1, 135, 0.01 ).onChange( matChanger );
				// gui.add( effectController, 'fstop', 1.8, 22, 0.01 ).onChange( matChanger );
				// gui.add( effectController, 'focalDepth', 0.1, 100, 0.001 ).onChange( matChanger );
        // gui.add( effectController, 'showFocus', true ).onChange( matChanger );
        
				matChanger();
      } else {
        location.reload();
      }
      console.log(this.selected);
    },
  }
}
</script>

<style>
.btn {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
