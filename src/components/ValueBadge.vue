<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-value-badge
  position relative

  .content
    display flex
    gap 10px

    .badge
      height 45px

    .text-block
      display flex
      flex-direction column
      align-items flex-start
      justify-content space-between

      header
        text-transform uppercase
        font-large()

      .additional
        position relative
        display inline-block
        color colorText2
        white-space nowrap

        .not-synced-label
          position absolute
          top -5px
          right -12px
          width 15px
          height 15px
          background colorSec1
          border-radius borderRadiusMax
          box-shadow -1px 1px black

          img
            width 100%
            height 100%

  &.small
    .badge
      height 30px

    .text-block
      white-space nowrap

      header
        font-small-extra()
</style>

<template>
  <div class="root-value-badge" :class="{ small }">
    <div v-if="type === ResourceTypes.hp" class="content">
      <img class="badge" src="/static/images/hp-badge.svg" alt="hp">
      <div class="text-block">
        <header>Здоровье</header>
        <div>
          {{ value }} HP
          <div class="additional" v-if="notSyncedValue">
            + {{ notSyncedValue }}
            <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type === ResourceTypes.money" class="content">
      <img class="badge" src="/static/images/money-badge.svg" alt="hp">
      <div class="text-block">
        <header>Деньги</header>
        <div>
          {{ value }}
          <div class="additional" v-if="notSyncedValue">
            + {{ notSyncedValue }}
            <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type === ResourceTypes.protection" class="content">
      <img class="badge" src="/static/images/protection-badge.svg" alt="hp">
      <div class="text-block">
        <header>Защита</header>
        <div>
          {{ value }}
          <div class="additional" v-if="notSyncedValue">
            + {{ notSyncedValue }}
            <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type === ResourceTypes.power" class="content">
      <img class="badge" src="/static/images/power-badge.svg" alt="hp">
      <div class="text-block">
        <header>Сила</header>
        <div>
          {{ value }}
          <div class="additional" v-if="notSyncedValue">
            + {{ notSyncedValue }}
            <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type === ResourceTypes.agility" class="content">
      <img class="badge" src="/static/images/agility-badge.svg" alt="hp">
      <div class="text-block">
        <header>Ловкость</header>
        <div>
          {{ value }}
          <div class="additional" v-if="notSyncedValue">
            + {{ notSyncedValue }}
            <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="type === ResourceTypes.intelligence" class="content">
      <img class="badge" src="/static/images/intelligence-badge.svg" alt="hp">
      <div class="text-block">
        <header>Интеллект</header>
        <div>
          {{ value }}
          <div class="additional" v-if="notSyncedValue">
            + {{ notSyncedValue }}
            <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ResourceTypes } from '~/constants';

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    notSyncedValue: {
      type: Number,
      default: 0,
    },
    small: Boolean,
  },
  emits: ['update:modelValue'],

  data() {
    return {
      ResourceTypes,
    };
  },

  mounted() {
    const savedData = localStorage.getItem(this.uniqueName);
    if (savedData !== null) {
      this.$emit('update:modelValue', savedData);
    }
  },

  methods: {
    onInput() {
      localStorage.setItem(this.uniqueName, this.modelValue);
      this.$emit('update:modelValue', this.modelValue);
    },
  },
};
</script>
