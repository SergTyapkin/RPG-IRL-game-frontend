<style scoped lang="stylus">
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'

.root-draggable-component
  overflow hidden
  width 100%
  height 100%
  // cursor grab

  &.in-drag
    cursor grabbing

  // &.in-scale
  //  cursor move

  .scale-compensating-translate-container
    transform translate(var(--transformTranslateX), var(--transformTranslateY))
    transition transform 0.2s

  .translate-container
    transform translate(var(--transformTranslateX), var(--transformTranslateY))

  .scale-container
    position relative
    transform-origin 0 0
    transform scaleX(var(--scaleX)) scaleY(var(--scaleY))
    width fit-content
    height fit-content
    transition transform 0.2s ease
</style>

<template>
  <div
    class="root-draggable-component"
    :class="{
      'in-drag': isInDrag,
      'in-scale': isInScale,
    }"
    @mousedown.prevent.stop="onDragStart"
    @mouseup.prevent="onMouseupSelf"
    @touchstart="onDragStart"
    @wheel.prevent.stop.exact="onScroll"
    @wheel.ctrl.prevent
  >
    <div
      class="translate-container"
      :style="{
        '--transformTranslateX': dragTotalOffsetX + 'px',
        '--transformTranslateY': dragTotalOffsetY + 'px',
      }"
    >
      <div
        class="scale-compensating-translate-container"
        :style="{
          '--transformTranslateX': scaleCompensatingOffsetX + 'px',
          '--transformTranslateY': scaleCompensatingOffsetY + 'px',
        }"
      >
        <div
          class="scale-container"
          :style="{
            '--scale': scale,
            '--scaleX': scalableX ? scale : 1,
            '--scaleY': scalableY ? scale : 1,
          }"
          ref="innerElement"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const SCALE_SENSITIVITY = 0.003;
const DEFAULT_MAX_SCALE = 15;
const DEFAULT_MIN_SCALE = 0.05;

export default {
  emits: [
    'clickClean', // click only if it wasn't dragging. Default "click" can be emitted many times and after dragging
    'move', // (deltaX, deltaY) - emits when screen moves by drag or scale
    'drag', // (deltaX, deltaY) - emits when user drags screen
    'scale', // (scaleDelta) - emits when user scales screen
  ],

  props: {
    uniqueName: {
      type: String,
      default: undefined,
    },
    scalableX: {
      type: Boolean,
      default: true,
    },
    scalableY: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    movableX: {
      type: Boolean,
      default: true,
    },
    movableY: {
      type: Boolean,
      default: true,
    },
    sensitivityMultiplier: {
      type: Number,
      default: 1,
    },
    maxScale: {
      type: Number,
      default: DEFAULT_MAX_SCALE,
    },
    minScale: {
      type: Number,
      default: DEFAULT_MIN_SCALE,
    },
    minScaleFullSize: Boolean,
    innerElementWidth: {
      type: Number,
      default: undefined,
    },
    innerElementHeight: {
      type: Number,
      default: undefined,
    },
    minXOffset: {
      type: Number,
      default: undefined,
    },
    maxXOffset: {
      type: Number,
      default: undefined,
    },
    minYOffset: {
      type: Number,
      default: undefined,
    },
    maxYOffset: {
      type: Number,
      default: undefined,
    },
    defaultOffsetX: {
      type: Number,
      default: undefined,
    },
    defaultOffsetY: {
      type: Number,
      default: undefined,
    },
    defaultScale: {
      type: Number,
      default: undefined,
    },
    noResetOnChangeSizes: Boolean,
  },

  data() {
    return {
      isInDrag: false,
      isInScale: false,
      scale: 1,
      scaleCompensatingOffsetX: 0,
      scaleCompensatingOffsetY: 0,
      dragTotalOffsetX: 0,
      dragTotalOffsetY: 0,
      dragOffsetX: 0,
      dragOffsetY: 0,
      dragStartX: undefined,
      dragStartY: undefined,
      dragCurrentDeltaX: 0,
      dragCurrentDeltaY: 0,
      savedDragOffsetX: undefined,
      savedDragOffsetY: undefined,

      scaleTimeoutObject: undefined,

      LocalStorageNames: {
        scale: this.$props.uniqueName + '-scale',
        totalOffsetX: this.$props.uniqueName + '-total-offset-x',
        totalOffsetY: this.$props.uniqueName + '-total-offset-y',
        scaleCompensatingOffsetX: this.$props.uniqueName + '-scale-compensating-offset-x',
        scaleCompensatingOffsetY: this.$props.uniqueName + '-scale-compensating-offset-y',
      },
    };
  },

  computed: {
    minScaleComputed() {
      if (this.minScaleFullSize) {
        return Math.max(
          this.$el?.clientHeight / this.innerElementHeightComputed,
          this.$el?.clientWidth / this.innerElementHeightComputed,
        );
      }
      return this.minScale;
    },
    maxScaleComputed() {
      return this.maxScale;
    },

    totalOffsetX() {
      return this.dragTotalOffsetX + this.scaleCompensatingOffsetX;
    },
    totalOffsetY() {
      return this.dragTotalOffsetY + this.scaleCompensatingOffsetY;
    },

    innerElementWidthComputed() {
      return this.innerElementWidth !== undefined ? this.innerElementWidth : this.$refs.innerElement.clientWidth;
    },
    innerElementHeightComputed() {
      return this.innerElementHeight !== undefined ? this.innerElementHeight : this.$refs.innerElement.clientHeight;
    },
  },

  mounted() {
    // window.addEventListener('touchend', this.onClickOther);
    window.addEventListener('mouseup', this.onMouseupOther);
    window.addEventListener('touchend', this.onMouseupOther);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onMouseMove);

    this.scale = this.loadNumberFromLocalStorage(this.LocalStorageNames.scale, this.$props.defaultScale || 1);

    this.dragOffsetX = this.loadNumberFromLocalStorage(
      this.LocalStorageNames.totalOffsetX,
      this.$props.defaultOffsetX || 0,
    );
    this.dragOffsetY = this.loadNumberFromLocalStorage(
      this.LocalStorageNames.totalOffsetY,
      this.$props.defaultOffsetY || 0,
    );

    this.scaleCompensatingOffsetX = this.loadNumberFromLocalStorage(this.LocalStorageNames.scaleCompensatingOffsetX, 0);
    this.scaleCompensatingOffsetY = this.loadNumberFromLocalStorage(this.LocalStorageNames.scaleCompensatingOffsetY, 0);

    this.updateTotalDragOffset();
  },
  unmounted() {
    window.removeEventListener('mouseup', this.onMouseupOther);
    window.removeEventListener('touchend', this.onMouseupOther);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onMouseMove);
  },

  methods: {
    addOffsetsToTouchEvent(event) {
      const rect = this.$el.getBoundingClientRect();
      if (event.offsetX === undefined && event.offsetY === undefined) {
        // mobile
        event.pageX = event.changedTouches[0].pageX - rect.left;
        event.pageY = event.changedTouches[0].pageY - rect.top;
      }
      event.onElementX = event.pageX - rect.left;
      event.onElementY = event.pageY - rect.top;
      return event;
    },

    loadNumberFromLocalStorage(fieldName, defaultValue) {
      const savedStr = localStorage.getItem(fieldName);
      const savedValue = Number(savedStr);
      if (!this.uniqueName || savedStr === null || isNaN(savedValue)) {
        return defaultValue;
      }
      return savedValue;
    },
    onDragStart(e) {
      // console.log("Dragstart:", e, e.target, this.$el);
      this.addOffsetsToTouchEvent(e);
      this.isInDrag = true;
      this.dragStartPageX = e.pageX;
      this.dragStartPageY = e.pageY;
      this.savedDragOffsetX = this.totalOffsetX;
      this.savedDragOffsetY = this.totalOffsetY;
    },
    onMouseupSelf(e) {
      // console.log("CLICK SELF", e.target, this.$el, e)
      if (this.isInDrag && this.dragCurrentDeltaX === 0 && this.dragCurrentDeltaY === 0) {
        this.isInDrag = false;
        this.$emit('clickClean', e); // emit just click
        return;
      }
      this.isInDrag = false;
    },
    onMouseupOther(e) {
      // console.log("CLICK OTHER", e.target, this.$el)
      this.isInDrag = false;
      if (this.dragCurrentDeltaX === 0 && this.dragCurrentDeltaY === 0) {
        return;
      }
      this.addOffsetsToTouchEvent(e);

      this.dragOffsetX += this.dragCurrentDeltaX;
      this.dragOffsetY += this.dragCurrentDeltaY;
      this.dragStartX = undefined;
      this.dragStartY = undefined;
      this.dragCurrentDeltaX = 0;
      this.dragCurrentDeltaY = 0;
    },
    onMouseMove(e) {
      // console.log("Move", e)
      if (!this.isInDrag) {
        return;
      }
      this.addOffsetsToTouchEvent(e);

      let deltaX = e.pageX - this.dragStartPageX;
      let deltaY = e.pageY - this.dragStartPageY;
      const { x: allowedDeltaX, y: allowedDeltaY } = this.isCanMoveBy(
        deltaX,
        deltaY,
        this.savedDragOffsetX,
        this.savedDragOffsetY,
      );
      this.dragCurrentDeltaX = allowedDeltaX;
      this.dragCurrentDeltaY = allowedDeltaY;

      if (this.draggable && (this.movableX || this.movableY)) {
        this.$emit('drag', deltaX, deltaY);
        this.$emit('move', deltaX, deltaY);
      }
      this.updateTotalDragOffset();
    },
    onScroll(e) {
      if (!this.scalableX && !this.scalableY) {
        return;
      }
      // console.log("Scroll:", e)
      this.addOffsetsToTouchEvent(e);
      const scrollValue = e.deltaY;
      let scaleDelta = -1 * scrollValue * SCALE_SENSITIVITY * this.sensitivityMultiplier;

      if (this.scale + scaleDelta > this.maxScaleComputed) {
        scaleDelta = this.maxScaleComputed - this.scale;
      }
      if (this.scale + scaleDelta < this.minScaleComputed) {
        scaleDelta = this.minScaleComputed - this.scale;
      }

      let compensatingX = 0;
      let compensatingY = 0;
      if (this.movableX && this.scalableX) {
        compensatingX = (-(e.onElementX - this.totalOffsetX) / this.scale) * scaleDelta;
      }
      if (this.movableY && this.scalableY) {
        compensatingY = (-(e.onElementY - this.totalOffsetY) / this.scale) * scaleDelta;
      }
      this.scale += scaleDelta;
      const { x: allowedDeltaX, y: allowedDeltaY } = this.isCanMoveBy(compensatingX, compensatingY);
      this.scaleCompensatingOffsetX += allowedDeltaX;
      this.scaleCompensatingOffsetY += allowedDeltaY;

      this.$emit('scale', scaleDelta);
      this.$emit('move', compensatingX, compensatingY);
      if (this.uniqueName) {
        localStorage.setItem(this.LocalStorageNames.scale, this.scale);
        localStorage.setItem(this.LocalStorageNames.scaleCompensatingOffsetX, this.scaleCompensatingOffsetX);
        localStorage.setItem(this.LocalStorageNames.scaleCompensatingOffsetY, this.scaleCompensatingOffsetY);
      }
      this.isInScale = true;
      clearTimeout(this.scaleTimeoutObject);
      this.scaleTimeoutObject = setTimeout(() => {
        this.isInScale = false;
      }, 500);
      this.updateTotalDragOffset();
    },
    updateTotalDragOffset() {
      // console.log("Update total:", this.dragTotalOffsetX)
      this.dragTotalOffsetX = this.dragOffsetX + this.dragCurrentDeltaX;
      this.dragTotalOffsetY = this.dragOffsetY + this.dragCurrentDeltaY;
      if (this.uniqueName) {
        localStorage.setItem(this.LocalStorageNames.totalOffsetX, this.dragTotalOffsetX);
        localStorage.setItem(this.LocalStorageNames.totalOffsetY, this.dragTotalOffsetY);
      }
    },

    isCanMoveBy(offsetX, offsetY, startPosX = this.totalOffsetX, startPosY = this.totalOffsetY) {
      let canMoveOnX = 0;
      let canMoveOnY = 0;
      console.log(this.innerElementWidthComputed, this.innerElementHeightComputed);
      console.log(this.$el.clientWidth, this.$el.clientHeight);
      const minX = this.minXOffset * this.scale;
      const maxX = -this.innerElementWidthComputed * this.scale + this.$el.clientWidth - this.maxXOffset * this.scale;
      const minY = this.minYOffset * this.scale;
      const maxY = -this.innerElementHeightComputed * this.scale + this.$el.clientHeight - this.maxYOffset * this.scale;
      console.log(minX, minY, maxX, maxY);
      if (this.movableX) {
        canMoveOnX = offsetX;
        if (
          this.minXOffset !== undefined &&
          (startPosX + offsetX > minX ||
            this.innerElementWidthComputed * this.scale <
              this.$el.clientWidth - this.minXOffset * this.scale - this.maxXOffset * this.scale)
        ) {
          canMoveOnX = minX - startPosX;
        } else if (this.maxXOffset !== undefined && startPosX + offsetX < maxX) {
          canMoveOnX = maxX - startPosX;
        }
      }
      if (this.movableY) {
        canMoveOnY = offsetY;
        if (
          this.minYOffset !== undefined &&
          (startPosY + offsetY > minY ||
            this.innerElementHeightComputed * this.scale <
              this.$el.clientHeight - this.minYOffset * this.scale - this.maxYOffset * this.scale)
        ) {
          canMoveOnY = minY - startPosY;
        } else if (this.maxYOffset !== undefined && startPosY + offsetY < maxY) {
          canMoveOnY = maxY - startPosY;
        }
      }
      return { x: canMoveOnX, y: canMoveOnY };
    },

    reset() {
      this.dragOffsetX = this.defaultOffsetX || 0;
      this.dragOffsetY = this.defaultOffsetY || 0;
      this.scaleCompensatingOffsetX = 0;
      this.scaleCompensatingOffsetY = 0;
      this.scale = this.defaultScale || 1;
      this.updateTotalDragOffset();
      const { x: allowedDeltaX, y: allowedDeltaY } = this.isCanMoveBy(0, 0);
      this.dragOffsetX += allowedDeltaX;
      this.dragOffsetY += allowedDeltaY;
      this.updateTotalDragOffset();
    },
    innerElementUpdated() {
      const { x: allowedDeltaX, y: allowedDeltaY } = this.isCanMoveBy(0, 0);
      this.dragOffsetX += allowedDeltaX;
      this.dragOffsetY += allowedDeltaY;
      this.updateTotalDragOffset();
    },
    getMousePosOnInnerElement(event) {
      this.addOffsetsToTouchEvent(event, this.$refs.innerElement);
      const mouseX = (event.onElementX - this.totalOffsetX) / this.scale;
      const mouseY = (event.onElementY - this.totalOffsetY) / this.scale;
      return { x: mouseX, y: mouseY };
    },
    getScale() {
      return this.scale;
    },
    getTotalTranslate() {
      return { x: this.totalOffsetX, y: this.totalOffsetY };
    },
  },

  watch: {
    offsetX(to) {
      this.dragOffsetX = to;
    },
    offsetY(to) {
      this.dragOffsetY = to;
    },
    scale(to) {
      this.scale = to;
    },
    innerElementWidth() {
      if (!this.noResetOnChangeSizes) {
        this.reset();
      }
    },
    innerElementHeight() {
      if (!this.noResetOnChangeSizes) {
        this.reset();
      }
    },
  },
};
</script>
