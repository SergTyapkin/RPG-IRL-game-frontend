 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-effect
  background colorBgLight
  width var(--size)
  height var(--size)
  display flex
  flex-direction column
  border-radius borderRadiusS
  overflow hidden
  hover-effect()
  .image-container
    position relative
    img.ability-bg
      width 100%
      aspect-ratio 1/1
      display block
    .stats
      position absolute
      left 10px
      top 10px
      display flex
      flex-direction column
      gap 5px
      .stat
        background colorSec1
        border-radius borderRadiusMax
        width 30px
        height 30px
        white-space nowrap
        centered-flex-container()
        font-medium()
        &.damage
          background colorEmpPower
        &.heal
          background colorEmpAgility

  .text-container
    padding 10px
    .name
      font-medium()
      margin-bottom 7px
    .description
      margin-bottom 7px
      font-small()
      font-thin()
    .reload-info
      font-small-extra()
      color colorSec1
      width 100%
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

<script>
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
