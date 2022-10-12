<template>
  <div class="tile-attr-warp">

    <div class="tile-attr-item tile-attr-item--flip">
      <div class="tile-attr-item__hd">
        <label class="title__label">翻转</label>
      </div>
      <div class="tile-attr-item__bd">
        <button class="csw-button" :class="{'flip': this.nature.flipX===-1}" @click="handleFlipX">水平翻转</button>
        <div style="width: 10px;"></div>
        <button class="csw-button" :class="{'flip': this.nature.flipY===-1}" @click="handleFlipY">垂直翻转</button>
      </div>
    </div>

    <div class="tile-attr-item inline tile-attr-item--opacity">
      <div class="tile-attr-item__hd">
        <label class="title__label">不透明</label>
      </div>
      <div class="tile-attr-item__bd">
        <el-slider v-model="nature.opacity" :format-tooltip="formatTooltip"></el-slider>
        <span style="font-size: 14px;">{{nature.opacity}}%</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageTileAttr',
  data () {
    return {}
  },
  props: {
    nature: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    formatTooltip (val) {
      return `${val}%`
    },
    handleFlipX () {
      this.nature.flipX = this.nature.flipX === 1 ? -1 : 1
      console.log(this.nature.flipX)
    },
    handleFlipY () {
      this.nature.flipY = this.nature.flipY === 1 ? -1 : 1
    }
  }
}
</script>
<style lang="less" scoped>
.tile-attr-item--flip .tile-attr-item__bd {
  display: flex;
  flex-direction: row;

  .csw-button {
    flex: 1
  }

  .flip {
    border-color: #c6e2ff;
    background-color: #ecf5ff
  }
}

.tile-attr-item--opacity .tile-attr-item__bd {
  /*background: green;*/
  flex: 1;
  display: flex;
  justify-items: center;
  align-items: center;
  /*margin: 0 20px;*/

  .el-slider {
    flex: 1;
    margin: 0 20px;
  }
}
</style>
