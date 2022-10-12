<template>
  <div class="root-layout">
    <el-container class="root-container">

      <el-header class="main-header">
        <div class="header-bar">
          <div class="logo"><span>Header</span></div>
          <div class="other">
          </div>
        </div>
      </el-header>

      <el-container style="padding-left: 20px;">
        <div>
          <div style="font-size: 16px;font-weight:bold;margin-top:20px;text-align: left;">模板</div>
          <div style="display: block;margin-top: 20px;">
            <div class="tmpl-item" @click="handEdit">
              <el-image class="tmpl-img" style="width: 180px;" fit="contain" :src="img"></el-image>
            </div>
          </div>
        </div>
      </el-container>

    </el-container>
  </div>
</template>
<script>
import img from '@/assets/images/tmpl.png'

export default {
  name: 'Home',
  data () {
    return {
      img: img
    }
  },
  methods: {
    handEdit () {
      this.$router.push('/editor')
    }
  }
}
</script>
<style lang="less" scoped>
.tmpl-item {
  border-radius: 4px;
  padding: 0;
}

.tmpl-item:hover {
  box-shadow: 0 0 0 3px orange;
}
</style>
