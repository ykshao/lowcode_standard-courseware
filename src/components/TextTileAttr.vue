<template>
  <div>
    <h2>文本属性{{ abcd}}</h2>
    <el-select v-model="fontSize" placeholder="请选择" @change="handleFontSizeChange" :min="1">
      <el-option
        v-for="item in fontSizeOptions"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    fontFamily: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 12
    },
    color: {
      type: String
    }
  },
  data () {
    return {
      fontSizeOptions: [2, 4, 6, 8, 10, 12, 14, 100, 200],
      abcd: 'abcd'
    }
  },
  methods: {
    handleFontSizeChange () {
    }
  }
}
</script>
