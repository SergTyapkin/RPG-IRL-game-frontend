 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  position relative
  display flex
  width var(--size)
  height var(--size)
  background mix(colorBgLight, transparent)
  border-radius borderRadiusM
  .text-container
    position relative
    overflow hidden
    flex 1
    padding 10px
    padding-top 15px
    border-radius borderRadiusM 0 0 borderRadiusM
    .effect-bg
      position absolute
      z-index -1
      inset 0
      width 100%
      height 100%
      object-fit cover
    .name
      font-medium()

      margin-bottom 10px
    .description
      font-small()
  .source-container
    position relative
    overflow hidden
    flex 0.3
    background colorSec1
    border-radius 0 borderRadiusM borderRadiusM 0
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    img.source-img
      display block
      width 100%
      max-width 50px
      object-fit contain
    .source-name
      font-small-extra()

      margin 2px
      padding 5px
      width calc(100% - 4px)
      text-align center
      background colorBgLight
      border-radius borderRadiusM
      border-bottom-left-radius 0

  .buffs
    position absolute
    top -17px
    left -5px
    display flex
    gap 5px
    .buff
      gap 4px
      // width 30px
      height 30px
      padding 5px
      white-space nowrap
      background colorSec1
      border-radius borderRadiusMax
      centered-flex-container()
      img
        width 100%
        height 100%
      .value
        font-small()

        display inline-block
        color colorBg
</style>

<template>
  <div class="root-effect">
    <section class="text-container">
      <img class="effect-bg" :src="effect.imageUrl" alt="">
      <header class="name">{{ effect.name }}</header>
      <div class="description">{{ effect.description }}</div>
    </section>
    <section class="source-container">
      <img class="source-img" :src="effect.source?.imageUrl" alt="">
      <header class="source-name">{{ effect.source?.name }}</header>
    </section>

    <section class="buffs">
      <div v-for="(value, buff) in effect.buffs" class="buff">
        <img v-if="buff === BuffsTypes.maxHpIncrease" src="/static/icons/buff-dmg.svg" alt="hp">
        <img v-else-if="buff === BuffsTypes.protectionIncrease" src="/static/icons/buff-dmg.svg" alt="protection">
        <img v-else-if="buff === BuffsTypes.experienceModifier" src="/static/icons/buff-dmg.svg" alt="experience">
        <img v-else-if="buff === BuffsTypes.moneyModifier" src="/static/icons/buff-dmg.svg" alt="money">
        <img v-else-if="buff === BuffsTypes.powerCostDecrease" src="/static/icons/buff-dmg.svg" alt="power">
        <img v-else-if="buff === BuffsTypes.agilityCostDecrease" src="/static/icons/buff-dmg.svg" alt="agility">
        <img v-else-if="buff === BuffsTypes.intelligenceModifier" src="/static/icons/buff-dmg.svg" alt="intelligence">
        <img v-else-if="buff === BuffsTypes.damageDoneModifier" src="/static/icons/buff-dmg.svg" alt="damage">

        <div class="value">{{ value }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { BuffsTypes } from '~/constants/constants';

export default {
  props: {
    effect: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      BuffsTypes,
    }
  },

  mounted() {
  },

  methods: {
  },
};
</script>
