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
    position absolute
    top -5px
    left -5px
    display flex
    flex-direction column
    gap 5px
    .stat
      height 30px
      padding 0 7px
      white-space nowrap
      background colorSec1
      border-radius borderRadiusMax
      centered-flex-container()
      font-medium()
      &.damage
        background colorEmpPower
        .targets
          margin-left 5px
      &.heal
        background colorEmpHeal
      &.protection
        color colorBg
        background colorEmpProtection
      img
        height 1lh
        margin-right 3px
</style>

<template>
  <div class="root-cell" :style="{ '--size': size }">
    <transition name="opacity">
      <img class="item-bg" v-if="bgImage" :src="bgImage" alt="" />
    </transition>
    <transition name="opacity">
      <img class="item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="" />
    </transition>
    <section class="stats" v-if="!noStats">
      <div class="stats-group">
        <div class="stat damage" v-for="({damage, targets}, i) in abilitiesDamage" :key="i">
          <img src="/static/icons/fight.svg" alt="damage" />{{ damage }}
          <img src="/static/icons/person.svg" alt="targets" class="targets" v-if="targets > 1" />{{ targets > 1 ? targets : '' }}
        </div>
      </div>
      <div class="stat heal" v-for="(heal, i) in abilitiesHealing" :key="i">
        <img src="/static/icons/close.svg" alt="heal" />{{ heal }}
      </div>
      <div class="stat max-hp" v-if="item.buffs && item.buffs[BuffsTypes.maxHpIncrease]">
        <img src="/static/icons/heart.svg" alt="maxHp" />{{ item.buffs[BuffsTypes.maxHpIncrease] }}
      </div>
      <div class="stat protection" v-if="item.buffs && item.buffs[BuffsTypes.protectionIncrease]">
        <img src="/static/icons/shield.svg" alt="protection" />{{ item.buffs[BuffsTypes.protectionIncrease] }}
      </div>
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
    abilitiesDamage(): { damage: number, targets: number }[] {
      if (!this.item.abilities) {
        return [];
      }
      const res: { damage: number, targets: number }[] = [];
      this.item.abilities.forEach((a: Ability) => {
        if (a.damage > 0) {
          res.push({damage: a.damage, targets: a.targetsCount});
        }
      });
      return res;
    },
    abilitiesHealing(): { heal: number, targets: number }[] {
      if (!this.item.abilities) {
        return [];
      }
      const res: { heal: number, targets: number }[] = [];
      this.item.abilities.forEach((a: Ability) => {
        if (a.heal > 0) {
          res.push({heal: a.heal, targets: a.targetsCount});
        }
      });
      return res;
    },
  },

  mounted() {},

  methods: {},
};
</script>
