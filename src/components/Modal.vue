 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-modal
  margin 30px auto
  background colorBgLight
  padding 20px
  width calc(100% - 30px)
  border-radius borderRadiusM
  box-shadow 0 0 15px #000
  max-width 400px
  position relative

  button.close
    button-no-styles()
    hover-effect()
    position absolute
    top 10px
    right 10px
    width 30px
    height 30px

    img
      width 100%
      height 100%
      display block

  header
    font-large()
    width 100%
    text-align center
    margin-bottom 20px

  .image-container
    width 100%
    height 200px
    position relative
    margin-bottom 10px

    .shadow
      position absolute
      width 50%
      height 30px
      background radial-gradient(#000000E0, transparent 75%)
      bottom 0
      left 50%
      transform translate(-50%, 0)

    img
      position absolute
      width 100%
      height 100%
      object-fit contain
      display block
      z-index 2

  .description
    font-small()
    margin-bottom 20px

  .buttons-container
    display flex
    flex-direction column
    gap 15px

    button
      button()

      &.trade
        button-emp()
</style>

<template>
  <div class="root-modal">
    <button class="close" @click="close">
      <img src="/static/icons/close.svg" alt="close">
    </button>
    <header>{{ title }}</header>
    <div class="image-container" v-if="imageUrl">
      <div v-if="imageWithShadow" class="shadow" />
      <img :src="imageUrl" alt="">
    </div>
    <div class="description">{{ description }}</div>
    <slot />
    <div class="buttons-container">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['select', 'close'],

  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imageWithShadow: Boolean,
  },

  data() {
    return {
    }
  },

  mounted() {
  },

  methods: {
    selectItem(item: any) {
      this.$emit('select', item);
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>
