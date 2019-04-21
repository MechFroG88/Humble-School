<template>
  <div id="3d">
    <button class="btn btn-primary" @click="pop">Pop Card</button>

    <modal ref="popUp" title="VR game" closable>
      <div slot="body">
        
      </div>
    </modal>
  </div>
  
</template>

<script>
import modal from '@/components/modal';
import '../vendor/OBJLoader'

export default {
  name: 'home',
  components: {
    modal,
  },
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
    // var manager = new THREE.LoadingManager( this.loadModel );
    // manager.onProgress = function ( item, loaded, total ) {
    //   console.log( item, loaded, total );
    // };

    // this.loader = new THREE.ObjectLoader( manager );
    // this.loader.load( '../model/chkl_23.obj', function ( object ) {
    //   this.object.rotation.z = Math.PI;
    //   this.scene.add( this.object );
    // } );
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

      this.renderer.render( this.scene, this.camera );
    },
    animate: function() {
      
    },
    // loadModel() {
    //   this.object.traverse( function ( child ) {
    //     if ( child.isMesh ) child.material.map = texture;
    //   } );
    //   this.object.position.y = - 95;
    //   this.scene.add( this.object );
    // },
    pop() {
      this.$refs.popUp.active = true;
    }
  }
};
</script>

<style>

</style>
