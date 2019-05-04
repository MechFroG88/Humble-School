<template>
  <div class="controls">
    <!-- <div class="control-panel">
      <div class="row-1">
        <div class="btn btn-lg btn-primary" @click="moveUp"><i class="icon-chevron-up"></i></div>
      </div>
      <div class="row-2 btn-group">
        <div class="btn btn-lg btn-primary" @click="moveLeft"><i class="icon-chevron-left"></i></div>
        <div class="btn btn-lg btn-primary" @click="moveDown"><i class="icon-chevron-down"></i></div>
        <div class="btn btn-lg btn-primary" @click="moveRight"><i class="icon-chevron-right"></i></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import '../vendor/three.js';
import '../vendor/three.min.js';
import '../vendor/OrbitControls.js';
import '../vendor/OBJLoader.js';

import scene from '../static/model/scene.json';

export default {
  data: () => ({
    scene: null,
    camera: null,
    renderer: null,
    geometry: null,
    material: null,
    cube: null,
    loader: null,
    object: null,
    controls: null
  }),
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
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
      this.controls.update();

      var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.15 );
      this.scene.add( ambientLight );

      // var directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.15 );
      // directionalLight.castShadow = true;
      // directionalLight.position.set(0, 4000, 0);
      // this.scene.add( directionalLight );

      this.loadModel();
      this.render();

      window.addEventListener( 'resize', this.onWindowResize, false );
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    render() {
      this.renderer.render( this.scene, this.camera );
    },
    loadModel() {
      this.loader = new THREE.ObjectLoader();
      this.object = this.loader.parse( scene );
      this.scene.add( this.object );
    },
    moveUp() {
      this.camera.position.set(this.camera.position.x, this.camera.position.y + 10, this.camera.position.z);
      this.controls.update();
    },
    moveLeft() {  },
    moveDown() {  },
    moveRight() {  }
  }
}
</script>

<style>

</style>
