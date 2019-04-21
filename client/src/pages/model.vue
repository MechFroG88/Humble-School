<template>
  
</template>

<script>
import '../vendor/three.js';
import '../vendor/three.min.js';
import '../vendor/OrbitControls.js';
import '../vendor/OBJLoader';

// import model from '../model/chkl.obj';

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

      var manager = new THREE.LoadingManager( this.loadModel );
      manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
      };

      console.log(model);

      this.loader = new THREE.OBJLoader( manager );
      // this.loader.load( model, function ( object ) {
      //   this.object.rotation.z = Math.PI;
      //   this.scene.add( this.object );
      // } );

      this.renderer.render( this.scene, this.camera );
    },
    animate: function() {
      
    },
    loadModel() {
      // this.object.traverse( function ( child ) {
      //   if ( child.isMesh ) child.material.map = texture;
      // } );
      // this.object.position.y = - 95;
      this.scene.add( this.object );
    },
  }
}
</script>

<style>

</style>
