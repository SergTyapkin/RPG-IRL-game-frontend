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
  background radial-gradient(#aa4c01, #622c01)
  border-radius borderRadiusS
  img
    position absolute
    top padding
    left padding
    size = 'calc(100% - %s)' % (padding * 2)
    width size
    height size
    padding = 10px
</style>

<template>
  <div class="root-cell" :style="{'--size': size}">
    <transition name="opacity">
      <img class="bg" v-if="bgImage" :src="bgImage" alt="">
    </transition>
    <transition name="opacity">
      <img v-if="src" :src="src" alt="">
    </transition>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    src: {
      type: String,
      default: undefined,
    },
    bgImage: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: "100%",
    }
  },

  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
  },
};
</script>
