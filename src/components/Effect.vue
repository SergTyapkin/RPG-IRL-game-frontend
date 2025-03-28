<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  position relative
  display flex
  border-radius borderRadiusM

  .text-container
    position relative
    overflow hidden
    flex 1
    padding 10px
    padding-top 15px
    background 'linear-gradient(%s, %s), var(--bg-url) 50% 50% / 100% auto no-repeat' % (mix(colorBgLight, transparent) mix(colorBgLight, transparent))
    border-radius borderRadiusM 0 0 borderRadiusM

    .name
      font-medium()

      margin-bottom 8px

    .description
      font-small()
      font-thin()

  .source-container
    position relative
    overflow hidden
    display flex
    flex 0.3
    flex-direction column
    align-items center
    justify-content space-between
    background colorSec1
    border-radius 0 borderRadiusM borderRadiusM 0

    img.source-img
      display block
      width 100%
      max-width 60px
      object-fit contain

    .source-name
      font-small-extra()

      width calc(100% - 4px)
      margin 2px
      padding 5px
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

  &.no-source
    .text-container
      border-radius borderRadiusM
</style>

<template>
  <div class="root-effect" v-if="!effect.hidden" :class="{'no-source': withoutSource}">
    <section class="text-container" :style="{ '--bg-url': `url(${effect.imageUrl})` }">
      <header class="name">{{ effect.name }}</header>
      <div class="description">{{ effect.description }}</div>
    </section>
    <section class="source-container" v-if="!withoutSource">
      <img class="source-img" :src="effect.source?.imageUrl" alt="">
      <header class="source-name">{{ effect.source?.name }}</header>
    </section>

    <section class="buffs">
      <div v-for="(value, buff) in effect.buffs" class="buff">
        <img v-if="buff === BuffsTypes.maxHpIncrease" src="/static/icons/buff-dmg.svg" alt="hp">
        <img v-else-if="buff === BuffsTypes.protectionIncrease" src="/static/icons/buff-dmg.svg" alt="protection">
        <img v-else-if="buff === BuffsTypes.experienceModifier" src="/static/icons/buff-dmg.svg" alt="experience">
        <img v-else-if="buff === BuffsTypes.moneyModifier" src="/static/icons/buff-dmg.svg" alt="money">
        <img v-else-if="buff === BuffsTypes.powerCostDecrease" src="/static/icons/buff-dmg.svg" alt="power-low-cost">
        <img v-else-if="buff === BuffsTypes.agilityCostDecrease" src="/static/icons/buff-dmg.svg" alt="agility-low-cost">
        <img
          v-else-if="buff === BuffsTypes.intelligenceCostDecrease"
          src="/static/icons/buff-dmg.svg"
          alt="intelligence"
          class="intelligence-low-cost"
        >
        <img v-else-if="buff === BuffsTypes.powerPerLevelIncrease" src="/static/icons/buff-dmg.svg" alt="power-add">
        <img v-else-if="buff === BuffsTypes.agilityPerLevelIncrease" src="/static/icons/buff-dmg.svg" alt="agility-add">
        <img v-else-if="buff === BuffsTypes.intelligencePerLevelIncrease" src="/static/icons/buff-dmg.svg" alt="intelligence-add">
        <img v-else-if="buff === BuffsTypes.damageDoneModifier" src="/static/icons/fight.svg" alt="damage">
        <img v-else-if="buff === BuffsTypes.damageDoneIncrease" src="/static/icons/fight.svg" alt="damage">
        <img v-else-if="buff === BuffsTypes.hpEveryTurn && value > 0" src="/static/icons/heart.svg" alt="regeneration">
        <img v-else-if="buff === BuffsTypes.hpEveryTurn && value < 0" src="/static/icons/buff-dmg.svg" alt="bleeding">

        <div class="value">{{ value }}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { BuffsTypes } from '~/constants/constants';

export default {
  props: {
    effect: {
      type: Object,
      required: true,
    },
    withoutSource: Boolean,
  },

  data() {
    return {
      BuffsTypes,
    };
  },

  mounted() {},

  methods: {},
};
</script>
