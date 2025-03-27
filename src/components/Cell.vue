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
      <img class="item-bg" v-if="bgImage" :src="bgImage" alt="">
    </transition>
    <transition name="opacity">
      <img class="item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
    </transition>
    <section class="stats" v-if="!noStats">
      <div class="stat damage" v-for="(damage, i) in abilitiesDamage" :key="i"><img src="/static/icons/fight.svg" alt="damage">{{ damage }}</div>
      <div class="stat heal" v-for="(heal, i) in abilitiesHealing" :key="i"><img src="/static/icons/heart.svg" alt="heal">{{ heal }}</div>
      <div class="stat protection" v-if="item.protection"><img src="/static/icons/shield.svg" alt="protection">{{ item.protection }}</div>
    </section>
    <slot />
  </div>
</template>

<script lang="ts">
import { Ability } from '~/types/types';

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
    return {};
  },

  computed: {
    abilitiesDamage(): number[] {
      if (!this.item.abilities) {
        return [];
      }
      const res: number[] = [];
      this.item.abilities.forEach((a: Ability) => {
        if (a.damage > 0) {
          res.push(a.damage);
        }
      });
      return res;
    },
    abilitiesHealing(): number[] {
      if (!this.item.abilities) {
        return [];
      }
      const res: number[] = [];
      this.item.abilities.forEach((a: Ability) => {
        if (a.heal > 0) {
          res.push(a.heal);
        }
      });
      return res;
    }
  },

  mounted() {},

  methods: {},
};
</script>
