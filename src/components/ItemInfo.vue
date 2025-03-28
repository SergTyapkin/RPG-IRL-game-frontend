<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-item-info
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
      display block
      width 100%
      height 100%

  header
    font-large()

    width 100%
    margin-bottom 20px
    text-align center

  .image-container
    position relative
    width 100%
    height 180px
    margin-bottom 10px

    .shadow
      position absolute
      bottom 0
      left 50%
      transform translate(-50%, 0)
      width 50%
      height 30px
      background radial-gradient(#000000e0, transparent 75%)

    img
      position absolute
      z-index 2
      display block
      width 100%
      height 100%
      object-fit contain

  .section-stats
    top 70px
    display flex
    flex-direction column
    gap 5px
    > *
      centered-margin()

      gap 5px
      width min-content
      margin-bottom 10px
      padding 0 10px 0 5px
      color colorBg
      background colorSec1
      border-radius borderRadiusMax
      centered-flex-container()
      &.protection
        background colorEmpProtection

  .description
    font-small()

    margin-bottom 20px
    color colorText4

  .section-effects
  .section-abilities
    margin-bottom 15px

    header
      font-medium()

      margin-bottom 2px
      color colorText2
      text-align left

    .info
      font-small()

      color colorText5
      text-align left

  .section-effects
    .text-block
      margin-bottom 25px

    .effects-container
      display flex
      flex-direction column
      gap 20px

  .section-abilities
    .text-block
      margin-bottom 10px

    .abilities-container
      display flex
      flex-wrap wrap
      gap 15px

      > *
        width calc((100% - 15px) / 2)

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
  <div class="root-item-info">
    <button v-if="closable" class="close" @click="close">
      <img src="/static/icons/close.svg" alt="close">
    </button>
    <header>{{ obj.name }}</header>
    <div class="image-container" v-if="obj.imageUrl">
      <div v-if="imageWithShadow" class="shadow" />
      <img :src="obj.imageUrl" alt="">
    </div>
    <section class="section-stats">
      <div v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)" class="protection">
        <img src="/static/icons/shield.svg" alt=""> {{ obj.buffs[BuffsTypes.protectionIncrease] }}
      </div>
    </section>
    <div class="description">{{ obj.description }}</div>
    <section v-if="obj.effects?.length" class="section-effects">
      <div class="text-block">
        <header>Эффекты</header>
        <div v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)" class="info">
          Действуют только если предмет экипирован!
        </div>
      </div>
      <div class="effects-container">
        <Effect v-for="effect in obj.effects" :key="effect.id" :effect="effect" without-source />
      </div>
    </section>
    <section v-if="obj.abilities?.length" class="section-abilities">
      <div class="text-block">
        <header>Способности</header>
        <div v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)" class="info">
          Доступны только если предмет экипирован!
        </div>
      </div>
      <div class="abilities-container">
        <Ability v-for="ability in obj.abilities" :key="ability.id" :ability="ability" preview />
      </div>
    </section>
    <slot />
    <div class="buttons-container">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script lang="ts">
import Effect from '~/components/Effect.vue';
import Ability from '~/components/Ability.vue';
import { BuffsTypes, ItemTypes } from '~/constants/constants';

export default {
  components: { Ability, Effect },

  props: {
    obj: {
      type: Object,
      required: true,
    },
    imageWithShadow: Boolean,
    closable: Boolean,
  },

  data() {
    return {};
  },
  computed: {
    BuffsTypes() {
      return BuffsTypes
    },
    ItemTypes() {
      return ItemTypes;
    },
  },
  emits: ['close'],

  mounted() {
  },

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
