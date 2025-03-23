 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-cell
  width var(--size)
  height var(--size)
  padding 10px
  background radial-gradient(#aa4c01, #622c01)
  border-radius borderRadiusS
  img
    width 100%
    height 100%
</style>

<template>
  <div class="root-cell" :style="{'--size': size}">
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
