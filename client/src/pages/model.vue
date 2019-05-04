<template>
  <div class="controls">
    <div class="control-panel">
      <div class="btn btn-primary"><i class="icon-chevron-right"></i></div>
    </div>
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
    object: null
  }),
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xe5e5e5);
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this.renderer.domElement );

      var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
      this.scene.add( ambientLight );

      this.loadModel();

      this.renderer.render( this.scene, this.camera );
    },
    animate: function() {
      
    },
    loadModel() {
      this.loader = new THREE.ObjectLoader();
      this.object = this.loader.parse( scene );
      this.scene.add( this.object );
    },
  }
}
</script>

<style>

</style>
