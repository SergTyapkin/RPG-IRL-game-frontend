<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/components.styl'

color = colorSuccess
colorBarBg = colorBgLight


progressbar-width = 5px

.root-progressbar
  user-select none
  position relative
  transform skewX(-20deg)
  width 100%
  height progressbar-width
  background linear-gradient(90deg, color 50%, colorBarBg 50%) 50% 50% / 200% 100% no-repeat
  background-position-x calc(100% - var(--progress) * 100%)
  trans()

  .progress
    font-small()

    position absolute
    top 10px
    left calc(var(--progress) * 100% + 5px)
    transform skewX(20deg) translateX(-50%)
    height 20px
    padding 2px 5px 0 5px
    color colorBg
    background color
    border-radius borderRadiusS
    trans()
    &::before
      content ""
      position absolute
      z-index -1
      top -2px
      left 50%
      transform translateX(-50%) rotate(45deg)
      width 15px
      height 15px
      background color
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
