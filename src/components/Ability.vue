<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-ability
  position relative
  overflow hidden
  display flex
  flex-direction column
  background colorBgLight
  border-radius borderRadiusS
  .image-container
    position relative
    img.ability-bg
      display block
      aspect-ratio 1/1
      width 100%
    .stats
      position absolute
      top 10px
      left 10px
      display flex
      flex-direction column
      gap 5px
      .stat
        height 30px
        padding 0 5px
        white-space nowrap
        background colorSec1
        border-radius borderRadiusMax
        centered-flex-container()
        font-medium()
        &.damage
          background colorEmpPower
        &.heal
          background colorEmpAgility
        img
          height 1lh
          margin-right 3px

  .text-container
    display flex
    flex-direction column
    height 100%
    padding 10px
    .name
      font-medium()

      flex 1
      margin-bottom 7px
    .description
      margin-bottom 7px
      font-small-extra()
      font-thin()
    .reload-info
      font-small-extra()

      width 100%
      color colorSec1
      text-align right

  &.preview
    .text-container
      position absolute
      bottom 0
      left 0
      width 100%
      height auto
      background #00000080
</style>

<template>
  <div class="root-ability" :class="{ preview }">
    <section class="image-container">
      <img class="ability-bg" :src="ability.imageUrl" alt="">

      <section class="stats">
        <div v-if="ability.damage" class="stat damage">
          <img src="/static/icons/fight.svg" alt="">{{ ability.damage }}
        </div>
        <div v-if="ability.heal" class="stat heal"><img src="/static/icons/close.svg" alt="">{{ ability.heal }}</div>
      </section>
    </section>
    <section class="text-container">
      <header class="name">{{ ability.name }}</header>
      <div class="description">{{ ability.description }}</div>
      <div class="reload-info">{{ ability.reload }} хода на перезарядку</div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    ability: {
      type: Object,
      required: true,
    },
    preview: Boolean,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
