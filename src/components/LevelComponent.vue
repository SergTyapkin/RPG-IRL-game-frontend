 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-level-component
  position relative
  width 100%
  --cur-progress unquote('min(calc(var(--cur) / var(--max) * 100%), 100%)')
  --cur-add-progress unquote('min(calc(var(--cur-add) / var(--max) * 100%), calc(100% - var(--cur-progress)))')
  --cur-total-progress unquote('min(calc((var(--cur) + var(--cur-add)) / var(--max) * 100%), 100%)')
  .number-bg
    width 50px
    height 50px
  .number-value
    position absolute
    left 26px
    top 28px
    transform translate(-50%, -50%)
    font-large-extra()
    filter drop-shadow(-2px 1.5px 0px black)
  .info-block
    position absolute
    background colorBlockBgDark
    border-radius borderRadiusS
    inset 10px 0 8px 20px
    z-index -1
    .text-block
      display flex
      justify-content space-between
      width 100%
      padding 5px 5px 0 30px
      text-transform uppercase
      white-space nowrap
      gap 10px
    .progress-bar
      height 7px
      width calc(100% - 60px)
      margin-left 22px
      border-radius borderRadiusXS
      transform skewX(-20deg)
      position relative
      background linear-gradient(90deg, colorEmp1 50%, colorBgLight 50%) 50% 50% / 200% 100% no-repeat
      background-position-x calc(100% - var(--cur-progress))
      trans(0.5s)
      &:after
        content ""
        position absolute
        top 0
        bottom 0
        left var(--cur-progress)
        width var(--cur-add-progress)
        border 1.5px solid colorEmp1
        border-left none
        border-radius 0 borderRadiusXS borderRadiusXS 0
        z-index -1
        trans(0.5s)
      .part
        background colorBlockBgDark
        position absolute
        left calc(20% * var(--idx))
        height 100%
        width 4px

      .current-value-info
        position absolute
        left var(--cur-total-progress)
        transform skewX(20deg) translate(-50%, calc(-100% - 5px))
        top 0
        background colorEmp1
        font-small-extra()
        padding 5px
        border-radius borderRadiusS
        trans(0.5s)
        white-space nowrap
        &:after
          content ""
          position absolute
          background colorEmp1
          width 10px
          height 10px
          transform rotate(45deg) translate(calc(-50% + 2px), 0)
          left 50%
        .not-synced-label
          background colorEmp1
          border-radius borderRadiusMax
          box-shadow 0 -2px -2px 0
          padding 2px
          width 12px
          height 12px
          position absolute
          right -5px
          top -5px
          box-shadow -1px 1px black
          img
            width 100%
            height 100%
</style>

<template>
  <div class="root-level-component" :style="{'--max': maxXp, '--cur': curSyncedXp, '--cur-add': curNotSyncedXp || 0}">
    <img class="number-bg" src="/static/images/level-circle-bg.svg" alt="">
    <div class="number-value">{{ level }}</div>

    <div class="info-block">
      <div class="text-block">
        <div>Уровень</div>
        <div>MAX: {{ maxXp }} XP</div>
      </div>
      <div class="progress-bar">
        <div class="part" style="--idx: 1"></div>
        <div class="part" style="--idx: 2"></div>
        <div class="part" style="--idx: 3"></div>
        <div class="part" style="--idx: 4"></div>

        <div class="current-value-info">
          <div>{{ curSyncedXp }}xp<span v-if="curNotSyncedXp"> + {{ curNotSyncedXp }}xp</span></div>
          <div class="not-synced-label"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true,
    },
    maxXp: {
      type: Number,
      required: true,
    },
    curSyncedXp: {
      type: Number,
      required: true,
    },
    curNotSyncedXp: {
      type: Number,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],

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
