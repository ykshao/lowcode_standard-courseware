<template>
  <div class="image-menu">
    <div class="image-menu__hd">
      <el-input
        size="small"
        placeholder="风景"
        suffix-icon="el-icon-search"
        v-model="key">
      </el-input>
    </div>
    <div class="image-menu__bd">
      <el-image v-for="item in imageList" class="common-img" fit="contain" @click="handleClick(item)"
                :key="item.id" :src="item.url"></el-image>
    </div>

  </div>
</template>
<script>
export default {
  name: 'ImageMenu',
  data () {
    return {
      key: '',
      imageList: [{
        id: 'img1',
        width: 110,
        height: 152,
        url: 'https://icprs-dev.koolearn.com/files/image/080ABDFA4D14192964F932C35BA989B3.png'
      }, {
        id: 'img2',
        width: 857,
        height: 643,
        url: 'http://icprs-dev.koolearn.com/basic/3761949F905E0534/demo123/1.jpg'
      }, {
        id: 'img3',
        width: 784,
        height: 448,
        url: 'https://icprs-dev.koolearn.com/files/image/25/BE/C759DEA2C656F0111169B4089E6A.png'
      }, {
        id: 'img4',
        width: 857,
        height: 643,
        url: 'https://icprs.koolearn.com/files/image/E139DF0E4E9C5DB656D860C3CBEA0E2B.jpg'
      }, {
        id: 'img5',
        width: 913,
        height: 684,
        url: 'https://icprs.koolearn.com/files/image/69d62e5e-4649-4f6d-b0d9-8b1bc61df90d/8F28725CF808C9FB92512E1EA774BEC6.gif'
      }]
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('addElement', item)
    }
  }
}
</script>
<style lang="less">
.image-menu {
  .image-menu__hd {
    padding: 10px 10px 10px 0;
  }

  .image-menu__bd {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
    -moz-column-gap: 0;
    -webkit-column-gap: 0;
    padding-top: 0.5em;

    .common-img {
      /*float: left;*/
      /*display: inline;*/
      width: 120px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      margin-right: 10px;
      -moz-page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
      /*margin: 0 0.5em 0.5em;*/

      &:hover {
        border: 1px solid #8492a6;
      }
    }
  }
}
</style>
