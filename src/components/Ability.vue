 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  overflow hidden
  display flex
  flex-direction column
  width var(--size)
  height var(--size)
  background colorBgLight
  border-radius borderRadiusS
  hover-effect()
  .image-container
    position relative
    img.ability-bg
      display block
      aspect-ratio 1/1
      width 100%
    .stats
      position absolute
      top 10px
      left 10px
      display flex
      flex-direction column
      gap 5px
      .stat
        width 30px
        height 30px
        white-space nowrap
        background colorSec1
        border-radius borderRadiusMax
        centered-flex-container()
        font-medium()
        &.damage
          background colorEmpPower
        &.heal
          background colorEmpAgility

  .text-container
    padding 10px
    display flex
    flex-direction column
    height 100%
    .name
      font-medium()

      margin-bottom 7px
      flex 1
    .description
      margin-bottom 7px
      font-small-extra()
      font-thin()
    .reload-info
      font-small-extra()

      width 100%
      color colorSec1
      text-align right
</style>

<template>
  <div class="root-effect">
    <section class="image-container">
      <img class="ability-bg" :src="ability.imageUrl" alt="">

      <section class="stats">
        <div v-if="ability.damage" class="stat damage">{{ ability.damage }}</div>
        <div v-if="ability.heal" class="stat heal">{{ ability.heal }}</div>
      </section>
    </section>
    <section class="text-container">
      <header class="name">{{ ability.name }}</header>
      <div class="description">{{ ability.description }}</div>
      <div class="reload-info">{{ ability.reload }} хода на перезарядку</div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    ability: {
      type: Object,
      required: true,
    },
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
