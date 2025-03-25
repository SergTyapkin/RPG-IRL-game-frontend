 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-level-component
  --cur-progress unquote('min(calc(var(--cur) / var(--max) * 100%), 100%)')
  --cur-add-progress unquote('min(calc(var(--cur-add) / var(--max) * 100%), calc(100% - var(--cur-progress)))')
  --cur-total-progress unquote('min(calc((var(--cur) + var(--cur-add)) / var(--max) * 100%), 100%)')

  position relative
  width 100%
  .number-bg
    width 50px
    height 50px
  .number-value
    position absolute
    top 28px
    left 26px
    transform translate(-50%, -50%)
    filter drop-shadow(-2px 1.5px 0px black)
    font-large-extra()
  .info-block
    position absolute
    z-index -1
    inset 10px 0 8px 20px
    background colorBlockBgDark
    border-radius borderRadiusS
    .text-block
      display flex
      gap 10px
      justify-content space-between
      width 100%
      padding 5px 5px 0 30px
      text-transform uppercase
      white-space nowrap
    .progress-bar
      position relative
      transform skewX(-20deg)
      width calc(100% - 60px)
      height 7px
      margin-left 22px
      background linear-gradient(90deg, colorEmp1 50%, colorBgLight 50%) 50% 50% / 200% 100% no-repeat
      background-position-x calc(100% - var(--cur-progress))
      border-radius borderRadiusXS
      trans(0.5s)
      &:after
        content ""
        position absolute
        z-index -1
        top 0
        bottom 0
        left var(--cur-progress)
        width var(--cur-add-progress)
        border 1.5px solid colorEmp1
        border-left none
        border-radius 0 borderRadiusXS borderRadiusXS 0
        trans(0.5s)
      .part
        position absolute
        left calc(20% * var(--idx))
        width 4px
        height 100%
        background colorBlockBgDark

      .current-value-info
        position absolute
        top 0
        left var(--cur-total-progress)
        transform skewX(20deg) translate(-50%, calc(-100% - 5px))
        padding 5px
        white-space nowrap
        background colorEmp1
        border-radius borderRadiusS
        font-small-extra()
        trans(0.5s)
        &:after
          content ""
          position absolute
          left 50%
          transform rotate(45deg) translate(calc(-50% + 2px), 0)
          width 10px
          height 10px
          background colorEmp1
          z-index -1
        .not-synced-label
          position absolute
          top -5px
          right -5px
          width 12px
          height 12px
          padding 2px
          background colorEmp1
          border-radius borderRadiusMax
          box-shadow 0 -2px -2px 0
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
        <div class="part" style="--idx: 1" />
        <div class="part" style="--idx: 2" />
        <div class="part" style="--idx: 3" />
        <div class="part" style="--idx: 4" />

        <div class="current-value-info">
          <div>{{ curSyncedXp }}xp<span v-if="curNotSyncedXp"> + {{ curNotSyncedXp }}xp</span></div>
          <div class="not-synced-label" v-if="curNotSyncedXp"><img src="/static/icons/cloud-sync.svg" alt="sync"></div>
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
