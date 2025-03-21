<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-map
  overflow hidden
  padding 0
  max-height 100vh
  .draggable-element
    background linear-gradient(165deg, black, mix(mix(colorEmp1, black, 40%), transparent, 40%))
    &::before
      content ""
      position absolute
      inset 0
      background linear-gradient(-20deg, colorBg, transparent), url(/static/icons/earth_icon.svg)
      background-size 100% 100%, 300px 300px
      opacity .3
    .maps
      .image.blured
        position absolute
        transform scale(1.07)
        filter brightness(.2) blur(40px) !important
        z-index -1
</style>

<template>
  <div class="root-map">
    <DraggableComponent
      ref="draggableEl"
      :min-scale="0.6"
      :max-scale="5"
      :min-x-offset="200"
      :max-x-offset="200"
      :min-y-offset="200"
      :max-y-offset="200"
      :default-scale="1"
      class="draggable-element"
    >
      <div class="maps">
        <img class="image blured" src="/static/images/map_google_3k.png" alt="">
        <img class="image" src="/static/images/map_google_3k.png" alt="" ref="image">
      </div>
    </DraggableComponent>
  </div>
</template>

<script>
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import LevelComponent from '~/components/LevelComponent.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import Equipment from '~/components/Equipment.vue';
import Inventory from '~/components/Inventory.vue';
import DraggableComponent from '~/components/DraggableComponent.vue';

export default {
  components: { DraggableComponent, Inventory, Equipment, ValueBadge, LevelComponent, UserProfileInfo, CircleLoading },

  data() {
    return {
    };
  },

  async mounted() {},

  methods: {},
};
</script>
