<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/components.styl'


progressbar-width = 5px
color = colorSuccess
colorBarBg = colorBgLight

.root-progressbar
  user-select none
  width 100%
  height progressbar-width
  background linear-gradient(90deg, color 50%, colorBarBg 50%) 50% 50% / 200% 100% no-repeat
  background-position-x calc(100% - var(--progress) * 100%)
  transform skewX(-20deg)
  trans()
  position relative

  .progress
    font-small()
    position absolute
    left calc(var(--progress) * 100% + 5px)
    top 10px
    height 20px
    background color
    border-radius borderRadiusS
    padding 2px 5px 0 5px
    transform skewX(20deg) translateX(-50%)
    color colorBg
    trans()
    &::before
      content ""
      position absolute
      left 50%
      top -2px
      width 15px
      height 15px
      background color
      transform translateX(-50%) rotate(45deg)
      z-index -1
</style>

<template>
  <div class="root-progressbar" :class="{ disabled }" :style="{ '--progress': Math.min(Math.max(progress, 0), 1) }">
    <div class="progress">{{ Math.round(progress * 100) }}%</div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['change', 'update:modelValue'],

  props: {
    progress: {
      type: Number,
      required: true,
    },
    disabled: Boolean,
  },
};
</script>
