<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-cell
  position relative
  width var(--size)
  height var(--size)
  padding = 10px
  background radial-gradient(#aa4c01, #622c01)
  border-radius borderRadiusS

  .item-bg
  .item-img
    position absolute
    top padding
    left padding
    size = 'calc(100% - %s)' % (padding * 2)
    width size
    height size

  .stats
    user-select none
    position absolute
    top -5px
    left -5px
    display flex
    flex-direction column
    gap 5px

    .stat
      position relative
      height 30px
      padding 0 7px
      color transparent
      white-space nowrap
      background colorSec1
      border-radius borderRadiusMax
      centered-flex-container()
      font-medium()

      &.damage
        background colorEmpPower

      &.heal
        background colorEmpHeal

      &.protection
        background colorEmpProtection

      &.max-hp
        background colorEmpHP

      .main-container
      .targets-container
        position relative
        .main
          position absolute
          top 0
          left 0
          color colorText2

        .shadow
          position absolute
          bottom -1px
          left -1px
          color #000


      img
        height 1lh
        margin-right 3px
        &.targets
          margin-left 5px

  .not-synced-label
    position absolute
    inset 0
    background mix(colorSec1, transparent, 30%)
    border-radius borderRadiusS
    box-shadow 0 -2px -2px 0
    box-shadow -1px 1px black
    padding 20px
    img
      width 100%
      height 100%
      display block
      opacity 0.5

  &.not-synced
    .item-img
      opacity 0.6
      filter saturate(0.5)
    .stats
      opacity 0.6
</style>

<template>
  <div class="root-cell" :style="{ '--size': size }" :class="{'not-synced': item.notSynced}">
    <transition name="opacity">
      <img class="item-bg" v-if="bgImage" :src="bgImage" alt="">
    </transition>
    <transition name="opacity">
      <img class="item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
    </transition>
    <section class="stats" v-if="!noStats">
      <div class="stats-group">
        <div class="stat damage" v-for="({ damage, targets }, i) in abilitiesDamage" :key="i">
          <img src="/static/icons/buffs/shadow/damage.svg" alt="damage">
          <span class="main-container">
            {{ damage }}
            <span class="shadow">{{ damage }}</span>
            <span class="main">{{ damage }}</span>
          </span>
          <img src="/static/icons/buffs/shadow/person.svg" v-if="targets > 1" alt="targets" class="targets">
          <span class="targets-container" v-if="targets > 1">
            {{ targets }}
            <span class="shadow">{{ targets }}</span>
            <span class="main">{{ targets }}</span>
          </span>
        </div>
      </div>
      <div class="stats-group">
        <div class="stat heal" v-for="({ heal, targets }, i) in abilitiesHealing" :key="i">
          <img src="/static/icons/buffs/shadow/heal.svg" alt="heal">
          <span class="main-container">
            {{ heal }}
            <span class="shadow">{{ heal }}</span>
            <span class="main">{{ heal }}</span>
          </span>
          <img src="/static/icons/buffs/shadow/person.svg" v-if="targets > 1" alt="targets" class="targets">
          <span class="targets-contaier" v-if="targets > 1">
            {{ heal }}
            <span class="shadow">{{ heal }}</span>
            <span class="main">{{ heal }}</span>
          </span>
        </div>
      </div>

      <div class="stat max-hp" v-if="item.buffs && item.buffs[BuffsTypes.maxHpIncrease]">
        <img src="/static/icons/buffs/shadow/max-hp.svg" alt="maxHp">
        <span class="main-container">
          {{ item.buffs[BuffsTypes.maxHpIncrease] }}
          <span class="shadow">{{ item.buffs[BuffsTypes.maxHpIncrease] }}</span>
          <span class="main">{{ item.buffs[BuffsTypes.maxHpIncrease] }}</span>
        </span>
      </div>
      <div class="stat protection" v-if="item.buffs && item.buffs[BuffsTypes.protectionIncrease]">
        <img src="/static/icons/buffs/shadow/protection.svg" alt="protection">
        <span class="main-container">
          {{ item.buffs[BuffsTypes.protectionIncrease] }}
          <span class="shadow">{{ item.buffs[BuffsTypes.protectionIncrease] }}</span>
          <span class="main">{{ item.buffs[BuffsTypes.protectionIncrease] }}</span>
        </span>
      </div>
    </section>

    <section class="not-synced-label" v-if="item.notSynced">
      <img src="/static/icons/cloud-sync-dark.svg" alt="sync">
    </section>

    <slot />
  </div>
</template>

<script lang="ts">
import { Ability } from '~/types/types';
import { BuffsTypes } from '~/constants/constants';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    bgImage: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: '100%',
    },
    noStats: Boolean,
  },

  data() {
    return {
      BuffsTypes,
    };
  },

  computed: {
    abilitiesDamage(): { damage: number; targets: number }[] {
      if (!this.item.abilities) {
        return [];
      }
      const res: { damage: number; targets: number }[] = [];
      this.item.abilities.forEach((a: Ability) => {
        if (a.damage > 0) {
          res.push({ damage: a.damage, targets: a.targetsCount });
        }
      });
      return res;
    },
    abilitiesHealing(): { heal: number; targets: number }[] {
      if (!this.item.abilities) {
        return [];
      }
      const res: { heal: number; targets: number }[] = [];
      this.item.abilities.forEach((a: Ability) => {
        if (a.heal > 0) {
          res.push({ heal: a.heal, targets: a.targetsCount });
        }
      });
      return res;
    },
  },

  mounted() {},

  methods: {},
};
</script>
