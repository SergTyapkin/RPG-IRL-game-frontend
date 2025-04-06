 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  position relative
  overflow hidden
  display flex
  flex-direction column
  max-height 520px
  background colorBgLight
  border-radius borderRadiusL
  hover-effect()
  aspect-ratio 3/4
  .image-container
    position relative
    width 100%
    height 100%
    img.ability-bg
      display block
      aspect-ratio 1/1
      width 100%
      height 100%
      object-fit cover
    .stats
      position absolute
      top 10px
      left 10px
      display flex
      flex-direction column
      gap 5px
      .stat
        padding 5px 10px
        white-space nowrap
        background colorSec1
        border-radius borderRadiusMax
        font-small-extra()
        &.power
          background colorEmpPower
        &.agility
          background colorEmpAgility
        &.intelligence
          background colorEmpIntelligence

  .text-container
    position absolute
    bottom 0
    display flex
    flex-direction column
    width 100%
    padding 10px
    background mix(colorBg, transparent, 50%)
    .name
      font-medium()

      flex 1
      margin-bottom 10px
    .description
      margin-bottom 7px
      white-space pre-wrap
      font-small()
      font-thin()
</style>

<template>
  <div class="root-effect">
    <section class="image-container">
      <img class="ability-bg" :src="classObj.imageUrl" alt="">

      <section class="stats">
        <div class="stat power">Сила за ур. +{{ classObj.statsPerLevel.power }}</div>
        <div class="stat agility">Ловкость за ур. +{{ classObj.statsPerLevel.agility }}</div>
        <div class="stat intelligence">Интеллект за ур. +{{ classObj.statsPerLevel.intelligence }}</div>
      </section>
    </section>
    <section class="text-container">
      <header class="name">{{ classObj.name }}</header>
      <div class="description">{{ classObj.description }}</div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    classObj: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
  },
};
</script>
