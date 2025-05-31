<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-map
  overflow hidden
  max-height 100vh
  padding-bottom 100px !important
  .draggable-element
    //position unset
    max-height calc(100vh - 90px)
    background linear-gradient(165deg, black, mix(mix(colorEmp1, black, 40%), transparent, 40%))
    &::before
      content ""
      position absolute
      inset 0
      opacity 0.3
      background linear-gradient(-20deg, colorBg, transparent), url(/static/icons/earth_icon.svg)
      background-size 100% 100%, 300px 300px
    .maps
      .image.blured
        position absolute
        z-index -1
        transform scale(1.07)
        filter brightness(0.2) blur(40px) !important
</style>

<template>
  <div class="root-map">
    <ZoomPinch
      :min-scale="0.2"
      :max-scale="5"
      :default-scale="0.4"
      :offsets="{ left: 100, top: 100, right: 100, bottom: 100 }"
      mouse
      touch
      ref="draggableEl"
      class="draggable-element"
    >
      <div class="maps">
        <img class="image blured" src="/static/images/map.png" alt="">
        <img class="image" src="/static/images/map.png" alt="" ref="image">
      </div>
    </ZoomPinch>
  </div>
</template>

<script lang="ts">
import ZoomPinch from '@sergtyapkin/vue3-zoompinch';
import { nextTick } from 'vue';

export default {
  components: { ZoomPinch },

  data() {
    return {};
  },

  async mounted() {
    await nextTick();
    this.$refs.draggableEl.$forceUpdate();
  },

  methods: {},
};
</script>
