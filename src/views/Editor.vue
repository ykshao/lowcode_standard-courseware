<template>
  <div class="root-layout">
    <el-container class="root-container">
      <!--      <div-->
      <!--        style="z-index: 9999;position: absolute;bottom: 0;left:0;text-align: left;background: #000;padding-left:5px;font-size:13px;color: #fff; width: 700px;">-->
      <!--        <div>curtain:( top={{ curtain.top}}，left={{curtain.left}} )</div>-->
      <!--        <div>tilePropsObj: top={{tilePropsObj.top}}，left={{tilePropsObj.left}}，-->
      <!--          width={{tilePropsObj.width}}，height={{tilePropsObj.height}}， realWidth={{tilePropsObj.realWidth}}，realHeight={{tilePropsObj.realHeight}} ， deg={{tilePropsObj.deg}}-->
      <!--        </div>-->
      <!--      </div>-->

      <!-- 顶部栏-->
      <el-header class="main-header">
        <div class="header-bar">
          <div class="logo"><span></span></div>

          <div class="other">
            <el-button type="info" size="mini">保存</el-button>
            <el-button type="primary" size="mini" @click="handleCreatePicture">生成图片</el-button>
          </div>
        </div>
      </el-header>

      <!--中间区域-->
      <el-container class="main-container">

        <!-- 左侧栏 start -->
        <el-aside class="aside-left" width="360px" :class="show?'high-z':'low-z'">
          <!-- 导航菜单-->
          <div class="aside-nav">
            <div class="aside-nav-item" :class="{'active':currentNav==='TEXT'}" @click="handleExpend('TEXT')">
              <div class="aside-nav-item__bd">
                <i class="iconfont icontext"></i>
                <span>文字</span>
              </div>
            </div>
            <div class="aside-nav-item" :class="{'active':currentNav==='IMAGE'}" @click="handleExpend('IMAGE')">
              <div class="aside-nav-item__bd">
                <i class="iconfont iconpicture-blue"></i>
                <span>图片</span>
              </div>
            </div>
          </div>

          <!-- 二级菜单-->
          <transition name="slide-fadein">
            <div class="aside-menu" v-show="show">
              <component :is="currentMenuComponent" @addElement="customAddElement"></component>
            </div>
          </transition>
        </el-aside>
        <!-- 左侧栏 end -->

        <!-- 中间区域-->
        <el-main class="main-middle">

          <!--  中间主工作区 -->
          <div ref="tileWrapper" name="tileWrapper" @click.stop="handleTileWrapperClick"
               v-mousewheel="handleTileWrapperMousewhell"
               style="position: absolute;top:0;left:0;width:100%;height:100%;min-height: 400px;min-width: 860px;overflow: hidden;">

            <!-- 课件区域 start-->
            <div ref="tileBoard" name="tileBoard"
                 class="tile-board"
                 :class="{'is-tile-move':bodyDrag}"
                 @click="handleTileBoardClick"
                 style="position: absolute;box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 15px;"
                 :style="`left:${curtain.left}px;top:${curtain.top}px;width:${curtain.width}px;height:${curtain.height}px`">

              <!-- 画布inner区域,背景色在此设置-->
              <div style="width: 100%; height: 100%; overflow: hidden; position: absolute; top: 0; left: 0;"
                   :style="`backgroundColor:${curtain.bgColor}`">
                <!--  组件区域 -->
                <template v-for="tile in tileList">
                  <component :is="tile.component"
                             ref="vdr"
                             :id="tile.id"
                             :key="tile.id"
                             :activeId.sync="activeId"
                             :url="tile.url"
                             :scale="scale"
                             :nature.sync="tile"
                             @bodyDown="bodyDown"></component>
                </template>
              </div>
            </div>
            <!-- 课件区域 end-->

            <!-- 编辑框-->
            <div class="tile-edit-box"
                 :class="{'is-tile-move':bodyDrag}"
                 :style="styleTileEditBox">
              <div v-if="activeId" class="tile-edit-stick" style="width: 0; height: 0;">
                <!-- 8个点，从左上开始，顺时针数-->
                <div class="tile-stick tile-stick-tl" style="top: -5px; left: -6px; display: inline-block;"
                     @mousedown.stop.prevent="stickDown($event, 'tl')"></div>
                <div class="tile-stick tile-stick-tm"
                     :style="`cursor: n-resize; top: 0; left:${tilePropsObj.width/2+1}px; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'tm')">
                </div>
                <div class="tile-stick tile-stick-tr"
                     :style="`top: -5px; left:${tilePropsObj.width}px; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'tr')"></div>
                <div class="tile-stick tile-stick-mr"
                     :style="`cursor: e-resize; top:${((tilePropsObj.height+1)/2.0)}px; left:${tilePropsObj.width}px; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'mr')"></div>
                <div class="tile-stick tile-stick-br"
                     :style="`top: ${(tilePropsObj.height+2)}px; left: ${tilePropsObj.width}px; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'br')"></div>
                <div class="tile-stick tile-stick-bm"
                     :style="`cursor: s-resize; top:${tilePropsObj.height+1}px; left:${tilePropsObj.width/2+1}px; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'bm')"></div>
                <div class="tile-stick tile-stick-bl"
                     :style="`top:${(tilePropsObj.height+2)}px; left: -6px; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'bl')"></div>
                <div class="tile-stick tile-stick-ml"
                     :style="`cursor: w-resize; top:${(tilePropsObj.height+1)/2}px; left: 0; display: inline-block;`"
                     @mousedown.stop.prevent="stickDown($event, 'ml')"></div>

                <div class="tile-stick-line left-line"
                     :style="`display: inline-block; width: 0; height: ${tilePropsObj.height}px; top: 2px;`">
                  <div class="leftLineContent"></div>
                </div>
                <div class="tile-stick-line top-line"
                     :style="`display: inline-block; width: ${tilePropsObj.width}px; height: 0; left: 1px;`">
                  <div class="topLineContent"></div>
                </div>
                <div class="tile-stick-line right-line"
                     :style="`display: inline-block; width: 0; height:${(tilePropsObj.height+1)}px; left: ${tilePropsObj.width}px;`">
                  <div class="rightLineContent"></div>
                </div>
                <div class="tile-stick-line bottom-line"
                     :style="`display: inline-block; width: ${tilePropsObj.width}px; height: 0; top: ${tilePropsObj.height+1}px; left: 2px;`">
                  <div class="bottomLineContent"></div>
                </div>

                <div class="tile-stick tile-rotate"
                     :style="`display: inline-block; left: ${tilePropsObj.width/2.0+5}px; top: ${tilePropsObj.height+22}px;`"
                     @mousedown.stop.prevent="rotateDown($event)"></div>
              </div>
            </div>

            <!-- 底部工具栏 start-->
            <div class="tool-bar">
              <div class="tool-item" style="padding-left: 15px;">
                <i class="iconfont icon-minus" @click="handleChangeTileBoardSize('-')"></i>
                <span class="text-scale">{{scale}}%</span>
                <i class="iconfont iconadd" @click="handleChangeTileBoardSize('+')"></i>
                <div class="tool-divider"></div>
                <div class="tool-item" style="display: inline-block;">
                  <i class="iconfont iconone_to_one" @click="handleChangeTileBoardSize('1:1')"></i>
                </div>
                <div class="tool-divider"></div>
                <div class="tool-item" style="padding-right:15px;">
                  <i class="iconfont iconshiying" @click="handleChangeTileBoardSize('fit')"></i>
                </div>
              </div>
            </div>
            <!-- 底部工具栏 end-->

          </div>
        </el-main>

        <!-- 右侧栏-->
        <el-aside class="aside-right" width="260px" style="overflow: hidden;">
          <template v-if="tilePropsObj">
            <component :is="currentAttrComponent" :nature.sync="tilePropsObj"></component>
          </template>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Mousewheel from 'element-ui/src/directives/mousewheel'
import CanvasAttr from '../components/CanvasAttr'
import ImageMenu from '../components/ImageMenu'
import TextMenu from '../components/TextMenu'
import ImageTile from '../components/ImageTile'
import ImageTileAttr from '../components/ImageTileAttr'

// 旋转坐标点缓存
let pointA = {}
let pointB = {}
let pointC = {}

export default {
  name: 'Home',
  components: {
    CanvasAttr,
    ImageMenu,
    TextMenu,
    ImageTile,
    ImageTileAttr
  },
  directives: {
    Mousewheel
  },
  data() {
    return {
      show: false,
      currentNav: 'TEXT',
      mouseupEnd: false,
      bodyDrag: false,
      stickDrag: false,
      rotateDrag: false,

      activeId: '', // 当前选中的组件
      activeIndex: 0,
      tilePropsObj: {},

      // 中间可操作区域
      clientWidth: 800, // 最小宽度800
      clientHeight: 600, // 最小高度600
      // 画布属性
      curtain: {
        attrComponent: 'canvas-attr',
        originWidth: 1920, // 原始宽度(fix)
        originHeight: 1080, // 原始高度scale
        bgColor: 'rgb(140, 146, 210)', // 画布背景色
        left: -530,
        top: -185,
        width: 1920, // 当前宽度 = originWidth*scale*0.01
        height: 1080 // 当前高度 = originHeight*scale*0.01
      },
      scale: 100, // 缩放比例(单位%)
      // 组件集合
      tileList: [
          {
          'id': 'tileImage1',
          'component': 'image-tile',
          'attrComponent': 'image-tile-attr',
          'url': 'https://icprs.koolearn.com/files/image/E139DF0E4E9C5DB656D860C3CBEA0E2B.jpg',
          'width': 1931.2857142857144,
          'height': 1085.8571428571431,
          'left': -8.571428571428552,
          'top': -7.142857142857143,
          'realWidth': 1931.2857142857142,
          'realHeight': 1085.8571428571431,
          'opacity': 100,
          'deg': 0,
          'flipX': 1,
          'flipY': 1,
          'zIndex': 11
        },
        {
          id: 'tileImage2',
          component: 'image-tile',
          attrComponent: 'image-tile-attr',
          url: 'http://icprs-dev.koolearn.com/basic/3761949F905E0534/forg.png',
          width: 130.00000000000003,
          height: 151.99999999999997,
          left: 112.85714285714286,
          top: 590,
          realWidth: 130.00000000000003,
          realHeight: 151.99999999999997,
          opacity: 100,
          deg: 0,
          flipX: 1,
          flipY: 1,
          zIndex: 12
        }, {
          id: 'tileImage3',
          component: 'image-tile',
          attrComponent: 'image-tile-attr',
          url: 'https://icprs-dev.koolearn.com/basic/3761949F905E0534/logo.png',
          width: 357.14285714285717,
          height: 82.14285714285714,
          left: 68.57142857142857,
          top: 940,
          realWidth: 357.14285714285717,
          realHeight: 82.14285714285714,
          opacity: 100,
          deg: 0,
          flipX: 1,
          flipY: 1,
          zIndex: 12
        }]
    }
  },
  computed: {
    styleTileEditBox() {
      if (this.tilePropsObj && this.tilePropsObj.id) {
        return {
          display: 'inline-block',
          transformOrigin: `${(this.tilePropsObj.width + 10) / 2}px ${(this.tilePropsObj.height + 10) / 2}px`,
          position: 'absolute',
          top: `${this.curtain.top + this.tilePropsObj.top - 5}px`,
          left: `${this.curtain.left + this.tilePropsObj.left - 5}px`,
          transform: `rotate(${this.tilePropsObj.deg}deg)`,
          zIndex: 999999
        }
      }
      return {
        display: 'none'
      }
    },
    currentMenuComponent() {
      return `${this.currentNav.toLowerCase()}-menu`
    },
    currentAttrComponent() {
      return (this.tilePropsObj && this.tilePropsObj.attrComponent) || 'canvas-attr'
    }
  },
  methods: {
    // 改变课件区大小事件
    handleChangeTileBoardSize: function(mark) {
      let scale = null
      switch (mark) {
        case '-':
          if (this.scale === 10) return
          if (this.scale - 5 < 10) {
            scale = 10
          } else {
            const mod = this.scale % 5
            scale = mod === 0 ? (this.scale - 5) : (this.scale - mod)
          }
          break
        case '+':
          if (this.scale === 200) return
          if (this.scale + 5 > 200) {
            scale = 200
          } else {
            const mod = this.scale % 5
            scale = mod === 0 ? (this.scale + 5) : (this.scale + 5 - mod)
          }
          break
        case '1:1':
          if (this.scale === 100) return
          scale = 100
          break
        case 'fit':
          var wScale = Math.floor(this.clientWidth * 80 / this.curtain.originWidth)
          var hScale = Math.floor(this.clientHeight * 80 / this.curtain.originHeight)
          // console.log('scale:', wScale, ',', hScale)
          var radio = Math.max(10, Math.min(wScale, hScale, 200))
          this.zoomSuitSize(radio)
          break
        default:
          scale = null
      }
      if (!scale) return
      this.zoomSuitSize(scale)
    },

    zoomSuitSize: function(scale) {
      // console.log('----zoomSuitSize-,scale:', scale)
      this.curtain.width = this.curtain.originWidth * scale * 0.01
      this.curtain.height = this.curtain.originHeight * scale * 0.01
      this.curtain.left = (this.clientWidth - this.curtain.width) / 2
      this.curtain.top = (this.clientHeight - this.curtain.height) / 2
      if (this.scale !== scale) {
        this.tileList.forEach(item => {
          const r = scale / this.scale
          item.left = item.left * r
          item.top = item.top * r
          item.width = item.width * r
          item.height = item.height * r
        })
      }
      this.scale = scale
    },

    // 窗体缩放时计算主工作区大小
    calcTileWrapperSize: function() {
      if (this.$refs.tileWrapper) {
        const { clientWidth, clientHeight } = this.$refs.tileWrapper
        this.clientWidth = clientWidth
        this.clientHeight = clientHeight

        this.handleChangeTileBoardSize('fit')
      }
    },

    // 主工作区鼠标滚轮事件
    handleTileWrapperMousewhell: function(e) {
      if (e.target.attributes.name && e.target.attributes.name.value === 'tileWrapper') {
        // 画布区域上移、下移
        // 规则：上移时元素下边、下移时元素上边，偏离中心线都不超过60px
        const half = this.clientHeight / 2
        let top = this.curtain.top + e.wheelDeltaY * 0.2 // 乘以0.2减少滑动速度
        if (this.curtain.height + top < half - 60) {
          top = half - 60 - this.curtain.height
        } else if (top > half + 60) {
          top = half + 60
        }
        this.curtain.top = top
      } else {
        // 画布区域放大缩小
        if (e.deltaY === 0) {
          return
        }
        let scale = e.deltaY < 0 ? this.scale - 1 : this.scale + 1
        if (scale < 10) {
          scale = 10
        } else if (scale > 200) scale = 200
        this.zoomSuitSize(scale)
      }
    },

    // 主工作区点击事件
    handleTileWrapperClick: function(e) {
      console.log('-----handlePostionBoxClick-')
      if (this.show) {
        this.show = false
      }
      if (this.mouseupEnd) {
        this.mouseupEnd = false
        console.log('-----mouseupEnd-')
        return
      }
      if (e.target.attributes.name && e.target.attributes.name.value === 'tileWrapper') {
        this.activeId = ''
      }
    },

    // 课件区点击事件
    handleTileBoardClick: function(e) {
      this.activeId = ''
      if (this.show) {
        this.show = false
      }
    },

    // 旋转控件的mousedown事件回调函数
    rotateDown(ev) {
      console.log('---rotateDown-----')
      if (this.show) {
        this.show = false
      }
      this.rotateable = true
      if (this.activeId) {
        // 获取当前元素位置大小信息，用于计算旋转元素的中心点
        const vdr = document.getElementById(this.activeId)
        const rect = vdr.getBoundingClientRect()
        const { left, top, width, height } = rect
        this.rotateDrag = true
        this.currentStick = 'angle'

        // 开始点
        pointB = {
          X: ev.clientX,
          Y: ev.clientY
        }
        // 中点
        pointA = {
          X: left + width / 2,
          Y: top + height / 2
        }
        // 触发事件
        // this.$emit('rotateStart', this.posData)
      }
    },

    // 旋转控件的mousemove事件回调函数
    rotateMove(ev) {
      // 记录结束点
      pointC = {
        X: ev.clientX,
        Y: ev.clientY
      }
      // AB、AC向量
      const AB = {
        X: pointB.X - pointA.X,
        Y: pointB.Y - pointA.Y
      }
      const AC = {
        X: pointC.X - pointA.X,
        Y: pointC.Y - pointA.Y
      }

      // AB与AC叉乘，根据右手定则：direct小于零逆时针旋转，大于零顺时针旋转
      const direct = AB.X * AC.Y - AB.Y * AC.X

      // AB、AC向量的模
      const ABdx = pointA.X - pointB.X
      const ACdx = pointA.X - pointC.X
      const ABdy = pointA.Y - pointB.Y
      const ACdy = pointA.Y - pointC.Y
      const lengthAB = Math.sqrt(ABdx * ABdx + ABdy * ABdy)
      const lengthAC = Math.sqrt(ACdx * ACdx + ACdy * ACdy)

      // 向量点乘，公式： A*B = x1*x2 + y1*y2
      const product = AB.X * AC.X + AB.Y * AC.Y

      // 两个向量之间的夹角的计算公式 ：a * b = |a| * |b| * cosθ
      // 公式转换 θ = Math.acos(a * b /( |a| * |b| )); （θ为弧度）
      // Math.acos的参数范围[-1, 1] ,返回值[-PI, PI],其余值返回 NAN
      const rad = Math.acos(product / (lengthAB * lengthAC))
      const angle = (rad / Math.PI) * 180 || 0

      // 根据旋转方向加减角度
      const deg = direct < 0 ? this.tilePropsObj.deg - angle : this.tilePropsObj.deg + angle
      // 转换成360以内
      this.tilePropsObj.deg = deg < 0 ? (360 + deg % 360) : deg % 360

      // 触发事件
      // this.$emit('rotating', this.posData)

      // 更新起点
      pointB = {
        X: ev.clientX,
        Y: ev.clientY
      }
    },
    // 拉伸缩放操作
    stickDown(ev, stick) {
      if (this.show) {
        this.show = false
      }
      // console.log('---stickDown-----')
      this.resizeable = true
      if (this.activeId) {
        this.stickDrag = true
        // 记录当前拖拽的stick
        this.currentStick = stick

        // 记录开始时鼠标位置
        this.bodyStartPos.mx = ev.clientX
        this.bodyStartPos.my = ev.clientY

        // 计算开始时元素right、bottom位置信息
        // this.right = this.parentWidth - this.width - this.left
        // this.bottom = this.parentHeight - this.height - this.top

        // 记录开始时元素位置
        this.bodyStartPos.left = this.tilePropsObj.left
        this.bodyStartPos.top = this.tilePropsObj.top
        this.bodyStartPos.width = this.tilePropsObj.width
        this.bodyStartPos.height = this.tilePropsObj.height
        // this.bodyStartPos.bottom = this.bottom
        // this.bodyStartPos.right = this.tilePropsObj.top
      }
    },
    // 缩放控件的mousemove事件回调函数
    stickMove(ev) {
      // 当前空间类型
      const currentStick = this.currentStick
      // 起始位置信息
      const { mx, my, top, left, width, height } = this.bodyStartPos
      //
      // 位移向量
      const vector = {
        x: ev.clientX - mx,
        y: ev.clientY - my
      }
      // // 如果比例锁定，将非m控件替代为m控件计算
      // if (this.lock && !currentStick.match('m')) {
      //   currentStick = `${currentStick[0]}m`
      // }
      if (currentStick === 'tm') {
        // 根据当前控件类型更新位置信息
        if (height - vector.y > 10) {
          this.tilePropsObj.top = top + vector.y
          this.tilePropsObj.height = height - vector.y
        }
      } else if (currentStick === 'bm') {
        this.tilePropsObj.height = height + vector.y
      } else if (currentStick === 'ml') {
        this.tilePropsObj.left = left + vector.x
        this.tilePropsObj.width = width - vector.x
      } else if (currentStick === 'mr') {
        this.tilePropsObj.width = width + vector.x
      } else if (currentStick === 'tl') {
        this.tilePropsObj.top = top + vector.y
        this.tilePropsObj.left = left + vector.x
        this.tilePropsObj.height = height - vector.y
        this.tilePropsObj.width = width - vector.x
      } else if (currentStick === 'tr') {
        this.tilePropsObj.top = top + vector.y
        // this.tilePropsObj.left = left + vector.x
        this.tilePropsObj.height = height - vector.y
        this.tilePropsObj.width = width + vector.x
      } else if (currentStick === 'bl') {
        // this.tilePropsObj.top = top + vector.y
        this.tilePropsObj.left = left + vector.x
        this.tilePropsObj.height = height + vector.y
        this.tilePropsObj.width = width - vector.x
      } else if (currentStick === 'br') {
        // this.tilePropsObj.top = top + vector.y
        // this.tilePropsObj.left = left + vector.x
        this.tilePropsObj.width = width + vector.x
        this.tilePropsObj.height = height + vector.y
      }
      this.tilePropsObj.realWidth = this.tilePropsObj.width * 100 / this.scale
      this.tilePropsObj.realHeight = this.tilePropsObj.height * 100 / this.scale
      // // 触发缩放事件
      // this.$emit('resizing', this.posData)
    },
    // 元素本身的mousedown事件回调函数
    bodyDown(ev, id) {
      if (this.show) {
        this.show = false
      }
      console.log('---bodyDown--')
      this.draggable = true
      // if (!this.activeable) return
      this.activeId = id || ''
      if (this.activeId) {
        this.bodyDrag = true
        if (!this.tilePropsObj || this.activeId !== this.tilePropsObj.id) {
          this.tilePropsObj = this.tileList.find(item => {
            return this.activeId === item.id
          })
        }
        // 记录开始鼠标位置
        this.bodyStartPos.mx = ev.clientX
        this.bodyStartPos.my = ev.clientY

        // 记录开始元素位置
        this.bodyStartPos.left = this.tilePropsObj.left
        this.bodyStartPos.top = this.tilePropsObj.top
      }
      // 触发事件
      // if (this.activeable) {
      //   this.$emit("activated", this.posData);
      //   this.$emit("dragStart", this.posData);
      // }
    },
    // 元素本身的mousemove事件回调函数
    bodyMove(ev) {
      // 起始位置信息
      const { mx, my, left, top } = this.bodyStartPos
      // 位移向量
      const vector = {
        x: ev.clientX - mx,
        y: ev.clientY - my
      }
      // 更新位置信息
      this.tilePropsObj.top = top + vector.y
      this.tilePropsObj.left = left + vector.x
      // 触发拖拽事件
      // this.$emit("dragging", this.posData);
    },
    // 鼠标左键按下事件回调
    cbmousemove(ev) {
      // console.log('----move----')
      if (this.draggable && this.bodyDrag) {
        this.bodyMove(ev)
      }
      if (this.resizeable && this.stickDrag) {
        this.stickMove(ev)
      }
      if (this.rotateable && this.rotateDrag) {
        // console.log('----rotateDrag----')
        this.rotateMove(ev)
      }
    },
    // 鼠标左键抬起事件回调
    cbmouseup(ev) {
      // 拖拽停止
      if (this.draggable && this.bodyDrag) {
        this.bodyDrag = false
        // this.$emit("dragStop", this.posData);
      }

      // 缩放停止
      if (this.resizeable && this.stickDrag) {
        this.stickDrag = false
        // this.$emit("resizeStop", this.posData);
      }
      // 旋转停止
      if (this.rotateable && this.rotateDrag) {
        this.rotateDrag = false
        this.mouseupEnd = true
        // this.$emit('rotateStop', this.posData)
      }
    },
    // 键盘按下事件回调
    cbkeydown: function(ev) {
      const key = ev.keyCode || ev.which || ev.charCode
      if (key === 8 && this.activeId) {
        const idx = this.tileList.findIndex(item => {
          return item.id === this.activeId
        })
        if (idx > -1) {
          this.tileList.splice(idx, 1)
          this.activeId = ''
        }
      }
    },
    // 窗体大小变化事件回调
    cbresize: function(ev) {
      this.calcTileWrapperSize()
    },
    handleExpend(kind) {
      this.currentNav = kind
      if (!this.show) {
        this.show = true
      }
    },
    customAddElement(item) {
      const arr = this.tileList.map(o => {
        return parseInt(o.id.replace('tileImage', ''))
      })
      const arrZIndex = this.tileList.map(o => {
        return parseInt(o.zIndex)
      })
      const zIndex = Math.max(...arrZIndex, 10) + 1
      const idSuffix = Math.max(...arr, 0) + 1
      const id = `tileImage${idSuffix}`
      let h = 0
      let w = 0
      // console.log(this.curtain)
      if (this.curtain.width > this.curtain.height) {
        //  画布是横版
        h = this.curtain.height - 80
        w = item.width * h / item.height
      } else {
        //  画布是竖版
        w = this.curtain.width - 80
        h = item.height * w / item.width
      }
      if (w > item.width && h > item.height) {
        w = item.width
        h = item.height
      }
      const o = {
        id: id,
        component: 'image-tile',
        attrComponent: 'image-tile-attr',
        url: item.url,
        width: w,
        height: h,
        left: (this.curtain.width - w) / 2,
        top: (this.curtain.height - h) / 2,
        realWidth: w * 100 / this.scale,
        realHeight: h * 100 / this.scale,
        opacity: 100, // 透明度(%)
        deg: 0, // 旋转度数
        flipX: 1,
        flipY: 1,
        zIndex: zIndex
      }
      this.tileList.push(o)
      this.activeId = id
    },

    handleCreatePicture() {
      // console.log(JSON.stringify(this.$data))
    },

    init: function() {

    }
  },
  watch: {
    activeId(newActiveId, oldActiveId) {
      // console.log('activeId changed:', newActiveId, '---', oldActiveId)
      if (newActiveId) {
        // 有选中组件
        this.tilePropsObj = this.tileList.find(item => {
          return newActiveId === item.id
        })
      } else {
        // 没有选中组件
        this.tilePropsObj = this.curtain
        console.log(this.tilePropsObj)
      }
    }
  },
  mounted() {
    // 初始化加载数据
    this.init()
    // 设置数据
    this.tilePropsObj = this.curtain
    this.bodyStartPos = {
      mx: 0,
      my: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
    this.calcTileWrapperSize()

    // 初始化事件
    window.onresize = this.cbresize
    document.documentElement.addEventListener('mousemove', this.cbmousemove)
    document.documentElement.addEventListener('mouseup', this.cbmouseup)
    document.addEventListener('keydown', this.cbkeydown)
  },
  destroyed() {
    // 销毁前移除事件
    window.onresize = null
    document.documentElement.removeEventListener('mousemove', this.move)
    document.documentElement.removeEventListener('mouseup', this.up)
    document.removeEventListener('keydown', this.onkeydown)
  }
}
</script>
