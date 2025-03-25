 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-cell
  width var(--size)
  height var(--size)
  background radial-gradient(#aa4c01, #622c01)
  border-radius borderRadiusS
  position relative
  img
    position absolute
    padding = 10px
    size = 'calc(100% - %s)' % (padding * 2)
    left padding
    top padding
    width size
    heigth size
</style>

<template>
  <div class="root-cell" :style="{'--size': size}">
    <img class="bg" v-if="bgImage" :src="bgImage" alt="">
    <img v-if="src" :src="src" alt="">
    <slot />
  </div>
</template>

<script>
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
