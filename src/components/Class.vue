 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  overflow hidden
  display flex
  flex-direction column
  width var(--size)
  height var(--size)
  background colorBgLight
  border-radius borderRadiusL
  hover-effect()
  position relative
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
        padding 5px 10px
        white-space nowrap
        background colorSec1
        border-radius borderRadiusMax
        centered-flex-container()
        font-small-extra()
        &.power
          background colorEmpPower
        &.agility
          background colorEmpAgility
        &.intelligence
          background colorEmpIntelligence

  .text-container
    padding 10px
    display flex
    flex-direction column
    position absolute
    bottom 0
    width 100%
    background mix(colorBg, transparent, 50%)
    .name
      font-medium()

      margin-bottom 7px
      flex 1
    .description
      margin-bottom 7px
      font-small-extra()
      font-thin()
</style>

<template>
  <div class="root-effect">
    <section class="image-container">
      <img class="ability-bg" :src="classObj.imageUrl" alt="">

      <section class="stats">
        <div class="stat power">Сила +{{ classObj.statsPerLevel.power }}</div>
        <div class="stat agility">Ловкость +{{ classObj.statsPerLevel.agility }}</div>
        <div class="stat intelligence">Интеллект +{{ classObj.statsPerLevel.intelligence }}</div>
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
