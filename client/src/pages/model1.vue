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
    <card ref="popUp" class="animated bounceInUp card"  :classId="`${ group.class_id }`" >
      <div slot="image">
        <!-- 国字楼 //-->
        <img src="../static/guozilou.jpeg" class="img-responsive" v-if="group.class_id <= 67">
        <!-- 学生楼 //-->
        <img src="../static/xueshenglou.jpeg" class="img-responsive" v-else-if="group.class_id <= 93">
        <!-- 食堂大楼，商科大楼 -->
        <img src="../static/shitangdalou.jpeg" class="img-responsive" v-else-if="group.class_id <= 126">
        <!-- 新楼 -->
        <img src="../static/xinlou1.jpeg" class="img-responsive" v-else-if="group.class_id <= 147">
        <!-- 工艺喽 -->
        <img src="../static/gongyilou.jpeg" class="img-responsive" v-else-if="group.class_id <= 157">
        <!-- 新场 //-->
        <img src="../static/xinchang.jpeg" class="img-responsive" v-else-if="group.class_id <= 164">
        <!-- 中华广场 -->
        <img src="../static/guangchang.jpeg" class="img-responsive" v-else-if="group.class_id == 165"> 
      </div>
      <div slot="header">
        <div class="title">
          <div class="modal-title">{{ group.theme }}</div>
          <div class="chip">{{ group.society }}</div>
        </div>
      </div>
      <div slot="body">
        <div class="place">{{ group.cn_class }}</div>
        <div class="place">{{ group.en_class }}</div>
      </div>
      <div slot="footer">
      </div>
    </card>
    <button class="levelDownBtn" @click="levelDown">leveldown</button>
    <button @click="cancelView">Cancel View</button>
  </div>
</template>

<script>
import tag from '@/components/Tag.vue'
import card from '@/components/popup.vue'
import modelData from '@/model/model.js'

import model from '@/static/model/scene_again.json'
import { getClass } from '@/api/class';

export default {
  components: {
    tag,
    card
  },
  data: () => ({
    group: {
      cn_class: '',
      en_class: '',
      theme: '',
      society: '',
      detail: ''
    },
    width:window.innerWidth,
    height: window.innerHeight, 
    scene: null,
    renderer: null,
    camera: null,
    controls: null,
    chosen: null,
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
    pop(id) {
      getClass(id).then(({ data }) => {
        this.$refs.popUp.active = true;
        this.group = data.data[0];
        console.log(this.group);
      }).catch((err) => {
        this.notification('数据读取失败！请重试！', 'error');
        if (err.response.status === 401) {
          this.$router.push('/userManual');
        }
        console.log(err);
      });
    },
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
      this.zoomObj.camera.position.set(-1200, 1300, -2500);
      this.zoomObj.camera.lookAt( pos );
      this.scene.add( this.zoomObj.camera );
      this.zoomObj.index = this.tags[index].ind
      this.zoomObj.level = this.modelData[this.tags[index].ind].location.length - 1;
      if (this.modelData[this.zoomObj.index].location.length > 0) {
        this.parent.forEach((c) => {
          c.visible = false
        })
        this.modelData[this.tags[index].ind].location[this.zoomObj.level].forEach((c) => {
          this.parent[this.nameToObj[c]].visible = true
        })
      }
      this.renderer.render( this.scene, this.zoomObj.camera );
    },
    levelDown (){
      this.zoomObj.pos.y -= 100
      this.renderer.render( this.scene, this.zoomObj.camera );
      this.zoomObj.level--;
      this.parent.forEach((c) => {
        c.visible = false
      })
      this.modelData[this.zoomObj.index].location[this.zoomObj.level].forEach((c) => {
        this.parent[this.nameToObj[c]].visible = true
      })
      this.uncolor(this.zoomObj.index);
    },
    cancelView() {
      this.isOrbit = true;
      this.showTag = true;
      this.parent.forEach((c) => c.visible = true)
      this.renderer.render( this.scene, this.camera );
      this.controls.update();
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
      this.renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: true } );
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

      // Cinematic camera
      this.cinematic = new THREE.CinematicCamera( 80, window.innerWidth / window.innerHeight, 0.1, 5000 );
      this.cinematic.position.set( 0, this.cinematicHeight, 0 );
      this.effectController = {
        focalLength: 18,
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
      
      // Orbit Control
      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 3.5;
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
          parent.forEach((ch, i) => { this.nameToObj[ch.name] = i });
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

      this.mouse = new THREE.Vector2(), this.INTERSECTED;
      this.raycaster = new THREE.Raycaster();

      window.addEventListener( 'resize', this.onWindowResize, false );
      window.addEventListener( 'mousemove', this.onMouseMove, false );
      window.addEventListener( 'mouseclick', this.onMouseClick, false );
      window.addEventListener( 'mousedown', this.onMouseDown, false );
      window.addEventListener( 'mouseup', this.onMouseUp, false );

      window.addEventListener( 'touchstart', this.onUserTap, false);
      window.addEventListener( 'touchend', this.onUserTap, false);
      window.addEventListener( 'touchmove', this.onUserTap, false);
      window.addEventListener( 'touchcancel', this.onUserTap, false);
    },
    onMouseMove(event) {
      event.preventDefault();
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    },
    onMouseDown(event) {
      event.preventDefault();
      this.chosen = this.INTERSECTED.name.slice(9);
    },
    onMouseUp(event) {
      event.preventDefault();
      if (this.chosen == this.INTERSECTED.name.slice(9))
        this.pop(this.chosen);
    },
    onUserTap(event) {
      // event.preventDefault();
      var touches = event.changedTouches,
      first = touches[0],
      type = "";

      switch(event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup";   break;
        default:           return;
      }

      var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                    first.screenX, first.screenY, 
                                    first.clientX, first.clientY, false, 
                                    false, false, false, 0, null);
      console.log(simulatedEvent);
      first.target.dispatchEvent(simulatedEvent);
    },
    onWindowResize() {
      if (this.isOrbit) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      } else {
        this.zoomObj.camera.aspect = window.innerWidth / window.innerHeight;
				this.zoomObj.camera.updateProjectionMatrix();
      }
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    animate (time) {
      requestAnimationFrame( this.animate );
      if(this.zoomObj.camera){
          this.zoomObj.camera.position.x += (this.zoomObj.pos.x - this.zoomObj.camera.position.x) / 10;
          this.zoomObj.camera.position.y += ((900 + this.zoomObj.pos.y) - this.zoomObj.camera.position.y) / 10;
          this.zoomObj.camera.position.z += (this.zoomObj.pos.z - this.zoomObj.camera.position.z) / 10;
          this.zoomObj.camera.lookAt( this.zoomObj.pos );
          this.renderer.render( this.scene, this.zoomObj.camera );
      }
      if(this.isOrbit){
        this.controls.update();
        this.tags.forEach((c) => {
          let pos = this.toScreenXY(c.obj)
          c.top = pos.y
          c.left = pos.x
        })
        this.scene.updateMatrixWorld();
        this.renderer.render( this.scene, this.camera );
      }
      else {
        this.raycaster.setFromCamera( this.mouse, this.zoomObj.camera );
        this.intersects = this.raycaster.intersectObjects( this.parent );
        if ( this.intersects.length > 0 ) {
          if ( this.INTERSECTED != this.intersects[0].object && this.intersects[0].object.name != 'Land' ) {
            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
            if (this.intersects[0].object && this.intersects[0].object.name != 'Land') {
              if (this.modelData[this.zoomObj.index].location[this.zoomObj.level].indexOf(this.intersects[0].object.name) != -1) {
                this.INTERSECTED = this.intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex(0xff0000);
              }
            }
          }
        } else {
          if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
          this.INTERSECTED = null;
        }
        this.renderer.render( this.scene, this.zoomObj.camera );
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

<style lang="scss"> 
.levelDownBtn {
  position: absolute;
  display: flex !important;
  margin-left: 17% !important;
  align-items: center;
  
  border-radius: .2rem !important;
  
  margin-top: 2rem;
  opacity: .8;
  box-shadow: 0 .2rem 1rem rgba($color: #ff4e6a, $alpha: 0.6);
  @media screen and (max-width: 500px){
    width: 5rem;
    height: 2rem !important;
    margin-left: 17% !important;
  }
  @media screen and (min-width: 900px){
    margin-left: 17% !important;
  }
  @media screen and (orientation:landscape) {
    width: 5rem;
    margin-left: 7%;
    height: 2rem !important;
  }
  .icon {
    font-size: 1rem;
    margin-right: .5rem;
    margin-left: .3rem;
    @media screen and (min-width: 500px) {
      margin-left: 1rem;
    }
    @media screen and (orientation:landscape) {
      margin-left: .3rem;
  }
  }
}
</style>
