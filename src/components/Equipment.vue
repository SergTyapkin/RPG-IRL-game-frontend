<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-equipment
  display flex
  gap 15px
  justify-content space-between
  width 100%

  > *
    aspect-ratio 1 / 1
    &:nth-child(1)
      animation-float(0.5s, -20px, 0, hat)
    &:nth-child(2)
      animation-opacity()
    &:nth-child(3)
      animation-float(0.5s, +20px, 0, boots)
    &.clickable
      hover-effect()
</style>

<template>
  <div class="root-equipment">
    <Cell
      class="hat"
      :item="hat ? hat : {}"
      :bg-image="!loaded || hat ? undefined : DefaultHatImage"
      :class="{ clickable: hat }"
      @click="selectItem(hat)"
      style="--animation-index: 3"
    />
    <Cell
      class="main"
      :item="main ? main : {}"
      :bg-image="!loaded || main ? undefined : DefaultMainImage"
      :class="{ clickable: main }"
      @click="selectItem(main)"
      style="--animation-index: 0"
    />
    <Cell
      class="boots"
      :item="boots ? boots : {}"
      :bg-image="!loaded || boots ? undefined : DefaultBootsImage"
      :class="{ clickable: boots }"
      @click="selectItem(boots)"
      style="--animation-index: 3"
    />
  </div>
</template>

<script lang="ts">
import Cell from '~/components/Cell.vue';

import DefaultHatImage from '#/icons/helmet.svg';
import DefaultMainImage from '#/icons/main.svg';
import DefaultBootsImage from '#/icons/boots.svg';
import { ExtendedItem, itemIdToItem } from '~/utils/utils';

export default {
  components: { Cell },

  emits: ['select'],

  props: {},

  data() {
    return {
      hat: null as ExtendedItem | null,
      main: null as ExtendedItem | null,
      boots: null as ExtendedItem | null,

      loaded: false,

      DefaultHatImage,
      DefaultMainImage,
      DefaultBootsImage,
    };
  },

  mounted() {
    this.update();
    this.loaded = true;
  },

  methods: {
    update() {
      this.hat = this.$user.equipment.hat ? itemIdToItem(this.$user.equipment.hat) : null;
      this.main = this.$user.equipment.main ? itemIdToItem(this.$user.equipment.main) : null;
      this.boots = this.$user.equipment.boots ? itemIdToItem(this.$user.equipment.boots) : null;
    },
    selectItem(item: any) {
      if (item) {
        this.$emit('select', item);
      }
    },
  },
};
</script>
