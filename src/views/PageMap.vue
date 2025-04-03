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
    <DraggableComponent
      ref="draggableEl"
      :min-scale="0.2"
      :max-scale="2"
      :min-x-offset="200"
      :max-x-offset="200"
      :min-y-offset="200"
      :max-y-offset="200"
      :default-scale="0.5"
      unique-name="map"
      class="draggable-element"
    >
      <div class="maps">
        <img class="image blured" src="/static/images/map.png" alt="">
        <img class="image" src="/static/images/map.png" alt="" ref="image">
      </div>
    </DraggableComponent>
  </div>
</template>

<script lang="ts">
import DraggableComponent from '~/components/DraggableComponent.vue';
import { nextTick } from 'vue';

export default {
  components: { DraggableComponent },

  data() {
    return {
    };
  },

  async mounted() {
    await nextTick();
    (this.$refs.draggableEl as typeof DraggableComponent).$forceUpdate();
  },

  methods: {},
};
</script>
