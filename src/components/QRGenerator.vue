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
  filter blur(10px)
  overflow hidden
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
  padding 10px 10px
  padding-bottom 0
  display flex
  border-radius 0 0 10px 10px
  width min-content
  .switch
    margin 0 10px
.range-container
  padding 10px
  border-radius 0 10px 10px 0
  width 100%
  max-width 400px
  .title
    display block
  .slider-container
    display flex
    flex-direction column
    .slider
      all unset
      margin 10px
      height slider-width
      max-width slider-length
      width calc(100% - 10px)
      background: bgColor2;
      outline: none;
      border-radius: thumb-size;
      overflow hidden
      box-shadow: inset 0 0 5px empColor1;
      @media ({mobile})
        background linear-gradient(170deg, bgColor2, bgColor3)
        box-shadow none
    .slider::-webkit-slider-thumb
      -webkit-appearance none
      width thumb-size
      height thumb-size
      border-radius 50%
      background empColor2
      cursor pointer
      border 4px solid #333
      box-shadow (- slider-length - 5px) 0 0 (slider-length) mix(empColor1, transparent, 30%)
    .range-labels
      max-width slider-length
      width calc(100% - 10px)
      display flex
      flex-direction row
      justify-content space-between

@media (min-width: 560px)
  .range-container
    width 90px
    .slider-container
      display block
      height slider-length
      flex-direction row
      .slider
        transform rotate(-90deg) translateX(- slider-length + 3px)
        transform-origin left
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
      <div ref="qr" v-html="html" class="qr-image" :class="{invert, blured: !text}"></div>

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
      <FloatingInput type="checkbox" v-model="invert" class="switch"></FloatingInput>
      <label class="text-big">Черный</label>
    </div>
  </div>
</template>

<script>
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
      _qr: null,
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
      this._qr = new qrcode(0, this.errorCorrectionLevel);
    },
    destroy() {
      delete this._qr;
      this._qr = null;
    },


    regenerate(text) {
      if (!this._qr)
        this.create();

      if (text !== undefined)
        this.text = text;
      else if (!this.text)
        this.text = '';

      this.refresh();
      this._qr.addData(this.text);
      this._qr.make();
      this.html = this._qr.createSvgTag({});
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
