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
      user-select none
      position absolute
      z-index 1
      top 10px
      left 10px
      display flex
      flex-direction column
      gap 5px
      align-items flex-start
      .damage-group
        display flex
        gap 5px
      .stat
        height 25px
        padding 0 7px
        white-space nowrap
        background colorSec1
        border-radius borderRadiusMax
        centered-flex-container()
        font-small()
        img
          height 16px
          margin-right 3px
        &.damage
          background colorEmpPower
          .targets
            margin-left 5px
        &.heal
          background colorEmpHeal
        &.chances
          background colorEmp1
          img
            margin 0

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

  .section-reloading
    content ''
    position absolute
    inset 0
    font-size 70px
    color colorText3
    opacity 0
    background mix(#666, transparent, 30%)
    centered-flex-container()
    trans()
    img
      width 100%
      height 100%
      opacity 0.5


  &.in-reloading
    .image-container
      img.ability-bg
        filter saturate(0) !important
    .section-reloading
      cursor not-allowed
      opacity 1

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
  <div class="root-ability" :class="{ preview, 'in-reloading': ability.reloadLeft }">
    <section class="image-container">
      <img class="ability-bg" :src="ability.imageUrl" alt="">

      <section class="stats">
        <div class="damage-group">
          <div v-if="ability.damage" class="stat damage">
            <img src="/static/icons/fight.svg" alt="damage">{{ ability.damage }}
            <img src="/static/icons/person.svg" alt="targets" class="targets" v-if="ability.targetsCount > 1">{{ ability.targetsCount > 1 ? ability.targetsCount : '' }}
          </div>
        </div>
        <div v-if="ability.heal" class="stat heal"><img src="/static/icons/heart.svg" alt="">{{ ability.heal }}</div>
        <div v-if="ability.chances?.length" class="stat chances"><img src="/static/icons/percent.svg" alt=""></div>
      </section>
    </section>
    <section class="text-container">
      <header class="name">{{ ability.name }}</header>
      <div class="description">{{ ability.description }}</div>
      <div class="reload-info">{{ ability.reload }} хода на перезарядку</div>
    </section>

    <section class="section-reloading">
      <div v-if="Number.isFinite(ability.reloadLeft)">{{ ability.reloadLeft }}</div>
      <img v-else src="/static/icons/close.svg" alt="">
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
