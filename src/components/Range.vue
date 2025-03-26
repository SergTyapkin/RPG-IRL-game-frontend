<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/components.styl'


slider-width = 8px

.slider-container
  user-select none
  display flex
  gap 15px
  align-items center

  .value
    font-medium()

    all unset
    display block
    box-sizing border-box
    width 60px
    padding 5px 8px
    color colorBg
    text-align center
    -moz-appearance textfield
    -webkit-appearance textfield
    appearance textfield
    background colorSec1
    border-radius borderRadiusMax

    &::-webkit-outer-spin-button
    &::-webkit-inner-spin-button
      display none

  .input-container
    position relative
    flex 1

    .range
      all unset
      cursor pointer
      transform skewX(-20deg)
      overflow hidden
      width 100%
      height slider-width
      background linear-gradient(170deg, var(--color, colorEmpMoney), colorSec1)

      &::-webkit-slider-thumb
        cursor pointer
        width 3px
        height slider-width
        -webkit-appearance none
        background colorEmp1
        // border-radius borderRadiusMax
        outline 2px solid colorBg

    .range-labels
      position absolute
      bottom 0
      left 0
      width 100%
      color colorText5
      font-small-extra()

      > *
        cursor pointer
        position absolute
        top 5px
        left calc((var(--i) - 1) / var(--count) * 100%)
        transform translate(-50%, -50%)
        padding 5px
        transition all 0.1s ease

        &:hover
          top 7px
          color colorText1

    .splitters-container
      pointer-events none
      position absolute
      bottom 0
      width 100%

      .splitter
        position absolute
        bottom 4px
        left calc((var(--i)) / var(--count) * 100%)
        transform skewX(-20deg)
        width 2px
        height slider-width
        background colorBg

  &.disabled
    pointer-events none
    .value
    .input-container
      opacity 0.5
      filter saturate(0.5)
</style>

<template>
  <div class="slider-container" :class="{disabled}">
    <input
      v-if="!noValue"
      type="number"
      aria-controls="off"
      ref="value"
      class="value"
      v-model="modelValue"
      :step="step"
      @change="updateVModel"
      :readonly="readonly"
      :disabled="disabled"
    >
    <div class="input-container" v-if="!readonly">
      <input
        type="range"
        class="range"
        ref="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="modelValue"
        @input="updateVModel"
        :disabled="disabled"
      >
      <div class="range-labels">
        <div
          v-for="i in labelsCount + 1"
          @click="setModelValue(Math.round(min + (i - 1) * labelsStep))"
          :style="{ '--i': i, '--count': labelsCount }"
        >
          {{ Math.round(min + (i - 1) * labelsStep) }}
        </div>
      </div>
      <div class="splitters-container">
        <div
          class="splitter"
          v-for="i in labelsCount-1"
          :style="{ '--i': i, '--count': labelsCount }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['change', 'update:modelValue'],

  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
    labelsCount: {
      type: Number,
      default: 10,
    },
    noValue: Boolean,
    readonly: Boolean,
    disabled: Boolean,

    modelValue: null,
  },

  computed: {
    labelsStep() {
      return (this.max - this.min) / this.labelsCount;
    },
  },

  methods: {
    updateVModel(event: InputEvent) {
      let value = Number((event.target as HTMLInputElement).value);
      this.$emit('update:modelValue', value);
      this.$emit('change');
    },

    setModelValue(value: number) {
      (this.$refs.value as HTMLInputElement).value = String(value);
      (this.$refs.value as HTMLInputElement).dispatchEvent(new Event('input'));
      this.$emit('update:modelValue', value);
      this.$emit('change');
    },
  },
};
</script>
