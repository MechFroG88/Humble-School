<template>
  <div class="model" ref="model">
    <template v-if="tags.length > 0 && showTag">
    <tag v-for="(tag, ind) in tags"
      @color="color"
      @uncolor="uncolor"
      @zoom="zoom"
      :key="ind"
      :index="ind"
      :top="tag.top"
      :left="tag.left"
      :text="tag.text"/>
    </template>
    <button @click="levelDown">leveldown</button>
  </div>
</template>

<script>
import tag from '../components/Tag.vue'
import modelData from '../model/model.js'

export default {
  components: {
    tag
  },
  data: () => ({
    width:window.innerWidth,
    height: window.innerHeight, 
    scene: null,
    renderer: null,
    camera: null,
    controls: null,
    modelData,
    tags: [],
    nameToObj: {},
    parent: null,
    isOrbit: true,
    showTag: true,
    zoomObj: {
      index: 0,
      obj: null,
      camera: null,
      pos: null,
      level: 0,
    }
  }),
  mounted () {
    this.init()
    
  },
  methods: {
    zoom (index) {
      this.isOrbit = false
      this.showTag = false
      this.scene.updateMatrixWorld();
      let obj = this.tags[index].obj
      var vector = new THREE.Vector3();
      obj.localToWorld(vector);
      obj.geometry.computeBoundingBox();
      let center = new THREE.Vector3();
      center.addVectors(
        obj.geometry.boundingBox.min,
        obj.geometry.boundingBox.max
      );
      center.divideScalar( 2 );
      let pos = center;
      this.zoomObj.pos = center;
      this.zoomObj.obj = obj;
      this.zoomObj.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 5000 );
      this.zoomObj.camera.position.set(pos.x, pos.y + 900, pos.z);
      this.zoomObj.camera.lookAt( pos );
      this.scene.add( this.zoomObj.camera );
      this.zoomObj.index = this.tags[index].ind
      this.zoomObj.level = this.modelData[this.tags[index].ind].location.length - 1;
      this.parent.forEach((c) => {
        c.visible = false
      })
      this.modelData[this.tags[index].ind].location[this.zoomObj.level].forEach((c) => {
        this.parent[this.nameToObj[c]].visible = true
      })
      this.renderer.render( this.scene, this.zoomObj.camera );
    },
    levelDown (){
      this.zoomObj.camera.position.set(this.zoomObj.camera.position.x, this.zoomObj.camera.position.y - 100, this.zoomObj.camera.position.z);
      this.zoomObj.level--;
      this.parent.forEach((c) => {
        c.visible = false
      })
      this.modelData[this.zoomObj.index].location[this.zoomObj.level].forEach((c) => {
        this.parent[this.nameToObj[c]].visible = true
      })
    },
    color (index) {
      this.modelData[index].outside.forEach((name) => {
        this.parent[this.nameToObj[name]].material.emissive = new THREE.Color(0xdb2d43)
      })
    },
    uncolor(index) {
      this.modelData[index].outside.forEach((name) => {
        this.parent[this.nameToObj[name]].material.emissive = new THREE.Color(0x000000)
      })
    },
    init () {
      // Scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xc5c5c5)

      // Renderer
      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( this.width, this.height );
      this.$refs.model.appendChild( this.renderer.domElement );

      // Add light
      let ambientLight = new THREE.AmbientLight( 0x9e9e9e, 0.5 );
      this.scene.add( ambientLight );

      // Camera
      this.camera = new THREE.PerspectiveCamera( 75, this.width / window.innerHeight, 0.1, 5000 );
      this.camera.position.set(-1200, 1300, -2500);
      this.camera.lookAt( this.scene.position );
      this.scene.add( this.camera );
      
      // Orbit Control
      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.autoRotate = true
      this.controls.autoRotateSpeed = 3.5
      //this.controls.enableZoom = false

      // Loader
      let loader = new THREE.ObjectLoader();
      loader.load( 'scene.json', (obj) => {
        // Build nameToObj array
        let parent = obj.children[0].children
        console.log(parent)
        parent.forEach((ch, i) => { this.nameToObj[ch.name] = i });

        // Remove used elements
        let objToRemove = ["Land", "Gate"]
        objToRemove.forEach((c) => {
          parent.splice(this.nameToObj[c], 1)
          parent.forEach((ch, i) => { this.nameToObj[ch.name] =   i });
        })
        
        // Make all things invisible except of outside
        parent.forEach((ch) => { ch.visible = false })
        this.modelData.forEach((c,ind) => {
          c.outside.forEach((name) => {
            parent[this.nameToObj[name]].visible = true;
          })
          let pos = this.toScreenXY(parent[this.nameToObj[c.outside[0]]])

          // add tag
          this.tags.push({
            obj: parent[this.nameToObj[c.outside[0]]],
            ind,
            top: pos.y,
            left: pos.x,
            text: c.name
          })
        })

        this.parent = parent
        this.scene.add(obj)
        this.renderer.render( this.scene, this.camera );
        this.animate()
      })
    },
    animate (time) {
      if(this.isOrbit){
        requestAnimationFrame( this.animate );
        this.controls.update();
        this.tags.forEach((c) => {
          let pos = this.toScreenXY(c.obj)
          c.top = pos.y
          c.left = pos.x
        })
         this.scene.updateMatrixWorld();
        this.renderer.render( this.scene, this.camera );
      }
      TWEEN.update(time);
    },
    toScreenXY: function ( obj ) {
      this.scene.updateMatrixWorld();
      var vector = new THREE.Vector3();
      obj.localToWorld(vector);
      obj.geometry.computeBoundingBox();
      let center = new THREE.Vector3();
        center.addVectors(
            obj.geometry.boundingBox.min,
            obj.geometry.boundingBox.max
        );
        center.divideScalar( 2 );
      let pos = center.clone().project( this.camera )
      return {
        x: ( pos.x + 1 ) * this.width / 2, 
		    y: ( - pos.y + 1 ) * this.height / 2,
        z: pos.z
      }

    }
  }
}
</script>
