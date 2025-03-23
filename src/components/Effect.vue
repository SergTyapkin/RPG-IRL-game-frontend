 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  background mix(colorBgLight, transparent)
  width var(--size)
  height var(--size)
  display flex
  border-radius borderRadiusM
  position relative
  .text-container
    border-radius borderRadiusM 0 0 borderRadiusM
    overflow hidden
    flex 1
    position relative
    padding 10px
    padding-top 15px
    .effect-bg
      z-index -1
      position absolute
      inset 0
      object-fit cover
      width 100%
      height 100%
    .name
      font-large()
      margin-bottom 10px
    .description
      font-small()
  .source-container
    flex 0.3
    position relative
    background colorSec1
    border-radius 0 borderRadiusM borderRadiusM 0
    overflow hidden
    img.source-img
      width 100%
      object-fit contain
      padding 5px 15px 0 15px
      display block
    .source-name
      font-small-extra()
      text-align center
      padding 5px
      margin 2px
      background colorBgLight
      border-radius borderRadiusM
      border-bottom-left-radius 0

  .buffs
    position absolute
    left -10px
    top -17px
    display flex
    gap 5px
    .buff
      background colorSec1
      border-radius borderRadiusMax
      padding 5px
      //width 30px
      height 30px
      white-space nowrap
      centered-flex-container()
      gap 4px
      img
        width 100%
        height 100%
      .value
        font-small()
        color colorBg
        display inline-block
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
        <img v-if="buff === BuffsTypes.hp" src="/static/icons/buff-dmg.svg" alt="hp">
        <img v-else-if="buff === BuffsTypes.protection" src="/static/icons/buff-dmg.svg" alt="protection">
        <img v-else-if="buff === BuffsTypes.experienceModifier" src="/static/icons/buff-dmg.svg" alt="experience">
        <img v-else-if="buff === BuffsTypes.moneyModifier" src="/static/icons/buff-dmg.svg" alt="money">
        <img v-else-if="buff === BuffsTypes.powerModifier" src="/static/icons/buff-dmg.svg" alt="power">
        <img v-else-if="buff === BuffsTypes.agilityModifier" src="/static/icons/buff-dmg.svg" alt="agility">
        <img v-else-if="buff === BuffsTypes.intelligenceModifier" src="/static/icons/buff-dmg.svg" alt="intelligence">
        <img v-else-if="buff === BuffsTypes.damageDoneModifier" src="/static/icons/buff-dmg.svg" alt="damage">

        <div class="value">{{ value }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { BuffsTypes } from '~/constants';

export default {
  props: {
    effect: {
      type: Object,
      required: true,
    },
    src: {
      type: String,
      default: undefined,
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
