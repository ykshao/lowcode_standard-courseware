<template>
  <div
    :id="id"
    class="tile"
    :class="{ 'active': activeId===id }"
    @click.stop
    @mousedown.stop.prevent="$emit('bodyDown',$event,id)"
    :style="styleTileObj">
    <div
      :style="`width:${nature.realWidth}px;height: ${nature.realHeight}px;overflow:hidden;transform-origin:0px 0px;transform: scale(${scale/100})`">
      <div style="width: 100%; height: 100%; display: inline-block;">
        <img :src="url"
             draggable="false"
             style="position: absolute;top: 0px;left: 0px;"
             :style="styleImageObj" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextTile',
  props: {
    id: {
      type: String
    },
    url: {
      type: String
    },
    activeId: {
      type: String
    },
    scale: {
      type: Number,
      default: 100,
      validator: function (val) {
        return val >= 10
      }
    },
    nature: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    styleTileObj () {
      return {
        cursor: 'move',
        'z-index': this.nature.zIndex,
        width: `${this.nature.width}px`,
        height: `${this.nature.height}px`,
        opacity: this.nature.opacity / 100,
        position: 'absolute',
        top: `${this.nature.top}px`,
        left: `${this.nature.left}px`,
        transform: `rotate(${this.nature.deg}deg)`,
        outline: 'none'
      }
    },
    styleImageObj () {
      return {
        width: `${this.nature.realWidth}px`,
        height: `${this.nature.realHeight}px`,
        clip: `rect(0px, ${this.nature.realWidth}px, ${this.nature.realHeight}px, 0px)`,
        display: 'inline-block',
        transform: `scaleX(${this.nature.flipX}) scaleY(${this.nature.flipY})`
      }
    }
  }
}
</script>
