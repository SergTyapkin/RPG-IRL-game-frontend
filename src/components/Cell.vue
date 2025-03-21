 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-cell
  background radial-gradient(#AA4C01, #622C01)
  width var(--size)
  height var(--size)
  padding 10px
  img
    width 100%
    height 100%
</style>

<template>
  <div class="root-cell" :style="{'--size': size}">
    <img v-if="src" :src="src" alt="">
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
