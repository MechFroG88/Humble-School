<template>
  
  <div id="_3d">
    <button class="btn btn-primary" @click="pop">Pop Card</button>

    <modal ref="popUp" class="animated bounceInUp" closable>
      <div slot="body">
        <div class="title">
          <div class="modal-title h4">VR game</div>
          <span class="chip">电脑学会</span>
        </div>
      
        <div class="place">中华楼停车场</div>
        <div class="time">3pm-5pm</div>
      </div>
      <div slot="footer">
        <div class="like">
          <heart-icon class="custom-class"></heart-icon>
          <div class="number">234</div>
          <div class="recommend"> recommended this</div>
        </div>
        
      </div>
    </modal>
  </div>
  
</template>

<script>
import '../vendor/three.js';
import '../vendor/three.min.js';
import '../vendor/OrbitControls.js';
import '../vendor/OBJLoader'

import modal from '@/components/modal';
import { HeartIcon } from 'vue-feather-icons'

export default {
  name: 'home',
  components: {
    modal,
    HeartIcon
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
