<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import '../vendor/OBJLoader'

export default {
  name: 'home',
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

    this.loader = new THREE.ObjectLoader( manager );
    this.loader.load( '../model/chkl_23.obj', function ( object ) {
      this.object.rotation.z = Math.PI;
      this.scene.add( this.object );
    } );

    this.animate();
  },
  methods: {
    loadModel() {
      this.object.traverse( function ( child ) {
        if ( child.isMesh ) child.material.map = texture;
      } );
      this.object.position.y = - 95;
      this.scene.add( this.object );
    },
    animate() {
      
    }
  }
};
</script>
