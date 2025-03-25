<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'


slider-length = 300px
slider-width = 13px
thumb-size = 15px

.qr-generator
  overflow hidden

.qr-image
  width 400px
  max-height 400px
  transition filter 0.5s ease
.qr-image.invert
  filter invert(1)
.qr-image.blured
  overflow hidden
  filter blur(10px)
.qr-image.invert.blured
  filter invert(1) blur(10px)

.switch
  display inline-block

.link
  word-break break-all


.flex-container
  display flex
  flex-wrap wrap

.container-bg
  background #00000044
  box-shadow 0 0 10px colorShadow

  @media ({mobile})
    box-shadow none

.switch-container
  display flex
  width min-content
  padding 10px 10px
  padding-bottom 0
  border-radius 0 0 10px 10px
  .switch
    margin 0 10px
.range-container
  width 100%
  max-width 400px
  padding 10px
  border-radius 0 10px 10px 0
  .title
    display block
  .slider-container
    display flex
    flex-direction column
    .slider
      all unset
      overflow hidden
      width calc(100% - 10px)
      max-width slider-length
      height slider-width
      margin 10px
      background bgColor2
      border-radius thumb-size
      outline none
      box-shadow inset 0 0 5px empColor1

      @media ({mobile})
        background linear-gradient(170deg, bgColor2, bgColor3)
        box-shadow none
    .slider::-webkit-slider-thumb
      cursor pointer
      width thumb-size
      height thumb-size
      -webkit-appearance none
      background empColor2
      border 4px solid #333
      border-radius 50%
      box-shadow (- slider-length - 5px) 0 0 (slider-length) mix(empColor1, transparent, 30%)
    .range-labels
      display flex
      flex-direction row
      justify-content space-between
      width calc(100% - 10px)
      max-width slider-length

@media (min-width 560px)
  .range-container
    width 90px
    .slider-container
      display block
      flex-direction row
      height slider-length
      .slider
        transform-origin left
        transform rotate(-90deg) translateX(- slider-length + 3px)
        min-width slider-length
      .range-labels
        transform translate(slider-width + 10px, - slider-width - 10px)
        flex-direction column-reverse
        width unset
        height slider-length
</style>

<template>
  <div class="qr-generator">
    <div v-if="!noText">
      <div class="text-big">Закодировано:</div>
      <div class="text-middle link">{{ text || '???' }}</div>
    </div>

    <div class="flex-container">
      <div ref="qr" v-html="html" class="qr-image" :class="{invert, blured: !text}" />

      <div class="range-container container-bg">
        <label class="text-big title">Размер</label>
        <div class="slider-container">
          <input type="range" class="slider" min="1" max="3" step="1" v-model="size" @input="onInput">
          <div class="range-labels text-small">
            <div>Low</div>
            <div>Mid</div>
            <div>High</div>
          </div>
        </div>
      </div>
    </div>

    <div class="switch-container container-bg">
      <label class="text-big">Белый</label>
      <FloatingInput type="checkbox" v-model="invert" class="switch" />
      <label class="text-big">Черный</label>
    </div>
  </div>
</template>

<script lang="ts">
import qrcode from "qrcode-generator-es6";
import FloatingInput from "./FloatingInput.vue";

export default {
  components: {FloatingInput},
  emits: ['scan'],

  props: {
    initialText: {
      type: String,
      default: ''
    },
    errorCorrection: {
      type: String,
      default: 'L',
    },
    noText: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      qr: null,
      html: '',
      text: this.$props.initialText || '',

      size: 0,
      errorCorrectionLevel: this.$props.errorCorrection,
      invert: false,
    };
  },

  mounted() {
    this.create()
  },

  unmounted() {
    this.destroy();
  },


  methods: {
    create() {
      this.qr = new qrcode(0, this.errorCorrectionLevel);
    },
    destroy() {
      delete this.qr;
      this.qr = null;
    },


    regenerate(text) {
      if (!this.qr)
        this.create();

      if (text !== undefined)
        this.text = text;
      else if (!this.text)
        this.text = '';

      this.refresh();
      this.qr.addData(this.text);
      this.qr.make();
      this.html = this.qr.createSvgTag({});
    },
    refresh() {
      this.destroy();
      this.create();
    },


    onInput() {
      if (this.size === '1')
        this.errorCorrectionLevel = 'L';
      else if (this.size === '2')
        this.errorCorrectionLevel = 'M';
      else if (this.size === '3')
        this.errorCorrectionLevel = 'H';
      this.regenerate();
    }
  }
};
</script>
