<template>
  <div class="tile-attr-warp">
    <!--  画布尺寸-->
    <div class="tile-attr-item tile-attr-item--size">
      <div class="tile-attr-item__hd">
        <label class="title__label">画布尺寸</label>
      </div>
      <div class="tile-attr-item__bd">
        <div class="attr-width">
          <span class="desc">宽</span>
          <span class="val">{{nature.originWidth}}px</span>
        </div>
        <div style="width: 10px;"></div>
        <div class="attr-height">
          <span class="desc">宽</span>
          <span class="val">{{nature.originHeight}}px</span>
        </div>
      </div>
    </div>

    <!--  背景颜色-->
    <div class="tile-attr-item tile-attr-item--bgcolor ">
      <div class="tile-attr-item__hd">
        <label class="title__label">背景颜色</label>
      </div>
      <div class="tile-attr-item__bd">
        <div class="bgcolor">
          <el-color-picker v-model="nature.bgColor" show-alpha></el-color-picker>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    nature: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tile-attr-warp {
  .tile-attr-item__hd {
    font-size: 16px;
  }

  .tile-attr-item--size .tile-attr-item__bd {
    display: flex;
    flex-direction: row;

    .attr-width, .attr-height {
      display: flex;
      flex: 1;
      border: 1px solid #dcdfe6;
      height: 30px;
      align-items: center;

      .desc {
        font-size: 13px;
        color: #777;
        margin-left: 10px;
      }

      .val {
        width: 100%;
        text-align: center;
      }
    }
  }

  .tile-attr-item--bgcolor {
    /deep/ .el-color-picker {
      width: 100% !important;

      .el-color-picker__trigger {
        width: 100% !important;

        .el-color-picker__icon {
          left: 90% !important;
        }
      }
    }
  }
}
</style>
