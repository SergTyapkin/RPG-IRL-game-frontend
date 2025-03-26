<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'
@require '../styles/utils.styl'
@require '../styles/animations.styl'
@require '../styles/components.styl'


slider-width = 7px

.slider-container
  user-select none
  display flex
  align-items center
  gap 15px

  .value
    font-medium()
    all unset
    box-sizing border-box
    display block
    padding 5px 8px
    background colorSec1
    color colorBg
    border-radius borderRadiusMax
    text-align center
    width 60px

    -moz-appearance textfield
    -webkit-appearance textfield
    appearance textfield

    &::-webkit-outer-spin-button
    &::-webkit-inner-spin-button
      display none

  .input-container
    flex 1
    position relative

    .range
      all unset
      height slider-width
      width 100%
      background linear-gradient(170deg, colorEmpMoney, colorSec1)
      border-radius borderRadiusMax
      overflow hidden
      cursor pointer

      &::-webkit-slider-thumb
        -webkit-appearance none
        width slider-width
        height slider-width
        border-radius borderRadiusMax
        background colorEmp1
        cursor pointer
        outline 2px solid colorBg

    .range-labels
      position absolute
      left 0
      bottom 0
      width 100%
      font-small-extra()
      color colorText5

      > *
        position absolute
        centered-absolute-transform()
        cursor pointer
        transition all 0.1s ease
        top 5px
        left calc((var(--i) - 1) / var(--count) * 100%)
        padding 5px

        &:hover
          color colorText1
          top 7px

    .splitters-container
      pointer-events none
      position absolute
      bottom 0
      width 100%

      .splitter
        position absolute
        bottom 4px
        height slider-width
        left calc((var(--i)) / var(--count) * 100%)
        width 2px
        background colorBg

  &.disabled
    pointer-events none
    .value
    .input-container
      filter saturate(0.5)
      opacity 0.5
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
