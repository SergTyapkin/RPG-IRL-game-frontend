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
      aspect-ratio 1 / 1
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
        color colorText1
        white-space nowrap
        background colorSec1
        border-radius borderRadiusMax
        centered-flex-container()
        font-small()

        img
          height 16px
          margin-right 3px
          &.targets
            margin-left 5px

        &.piercing-damage
          background colorEmpHP

        &.damage
          background colorEmpPower

        &.heal
          background colorEmpHeal

        &.chances
          background colorEmpChance

          img
            margin 0

        .main-container
        .targets-container
          position relative
          .main
            position absolute
            top 0
            left 0
            color colorText1

          .shadow
            position absolute
            bottom -1px
            left -1px
            color #000

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
      <img v-if="ability.imageUrl" class="ability-bg" :src="ability.imageUrl" alt="">
      <img v-else-if="ability.type === AbilityTypes.sword" class="ability-bg" src="/static/images/abilities/swordAttack.png" alt="">
      <img v-else-if="ability.type === AbilityTypes.dagger" class="ability-bg" src="/static/images/abilities/swordAttack.png" alt="">
      <img v-else-if="ability.type === AbilityTypes.pistol" class="ability-bg" src="/static/images/abilities/shotAttack.png" alt="">
      <img v-else-if="ability.type === AbilityTypes.spell" class="ability-bg" src="/static/images/abilities/magicAttack.png" alt="">
      <img v-else-if="ability.type === AbilityTypes.charge" class="ability-bg" src="/static/images/abilities/charge.png" alt="">
      <img v-else-if="ability.type === AbilityTypes.potion" class="ability-bg" src="/static/images/abilities/potion.jpg" alt="">
      <img v-else class="ability-bg" src="/static/images/abilities/defaultImage.png" alt="">

      <section class="stats">
        <div v-if="ability.damage" class="damage-group">
          <div class="stat damage">
            <img src="/static/icons/buffs/shadow/damage.svg" alt="damage">
            <span class="main-container">
              {{ ability.damage }}
              <span class="shadow">{{ ability.damage }}</span>
              <span class="main">{{ ability.damage }}</span>
            </span>
            <img src="/static/icons/buffs/shadow/person.svg" v-if="ability.targetsCount > 1" alt="targets" class="targets">
            <span class="targets-container" v-if="ability.targetsCount > 1">
              {{ ability.targetsCount }}
              <span class="shadow">{{ ability.targetsCount }}</span>
              <span class="main">{{ ability.targetsCount }}</span>
            </span>
          </div>
        </div>
        <div v-if="ability.piercingDamage" class="damage-piercing-group">
          <div class="stat piercing-damage">
            <img src="/static/icons/buffs/shadow/damage.svg" alt="damage">
            <span class="main-container">
              {{ ability.piercingDamage }}
              <span class="shadow">{{ ability.piercingDamage }}</span>
              <span class="main">{{ ability.piercingDamage }}</span>
            </span>
            <img src="/static/icons/buffs/shadow/person.svg" v-if="ability.targetsCount > 1" alt="targets" class="targets">
            <span class="targets-container" v-if="ability.targetsCount > 1">
              {{ ability.targetsCount }}
              <span class="shadow">{{ ability.targetsCount }}</span>
              <span class="main">{{ ability.targetsCount }}</span>
            </span>
          </div>
        </div>
        <div v-if="ability.heal" class="stat heal">
          <img src="/static/icons/buffs/shadow/heal.svg" alt="">{{ ability.heal }}
        </div>
        <div v-if="ability.chances?.length" class="stat chances">
          <img src="/static/icons/buffs/shadow/percent.svg" alt="">
        </div>
      </section>
    </section>
    <section class="text-container">
      <header class="name">{{ ability.name }}</header>
      <div class="description">{{ ability.description }}</div>
      <div class="reload-info" v-if="isFinite(ability.reload)">{{ ability.reload }} хода на перезарядку</div>
      <div class="reload-info" v-else>Один раз за бой</div>
    </section>

    <section class="section-reloading">
      <div v-if="isFinite(ability.reloadLeft)">{{ ability.reloadLeft }}</div>
      <img v-else src="/static/icons/close.svg" alt="">
    </section>
  </div>
</template>

<script lang="ts">
import { AbilityTypes } from '~/constants/constants';

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
  computed: {
    AbilityTypes() {
      return AbilityTypes
    }
  },

  mounted() {},

  methods: {},
  watch: {
    ability(to) {
      console.log(to);
    }
  }
};
</script>
