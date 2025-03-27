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
    &.clickable
      hover-effect()
</style>

<template>
  <div class="root-equipment">
    <Cell
      class="hat"
      :item="hat ? hat : {}"
      :bg-image="hat ? undefined : DefaultHatImage"
      :class="{ clickable: hat }"
      @click="selectItem(hat)"
    />
    <Cell
      class="main"
      :item="main ? main : {}"
      :bg-image="main ? undefined : DefaultMainImage"
      :class="{ clickable: main }"
      @click="selectItem(main)"
    />
    <Cell
      class="boots"
      :item="boots ? boots : {}"
      :bg-image="boots ? undefined : DefaultBootsImage"
      :class="{ clickable: boots }"
      @click="selectItem(boots)"
    />
  </div>
</template>

<script lang="ts">
import Cell from '~/components/Cell.vue';

import DefaultHatImage from '#/icons/guild.svg';
import DefaultMainImage from '#/icons/guild.svg';
import DefaultBootsImage from '#/icons/guild.svg';
import { Item } from '~/types/types';
import { itemIdToItem } from '~/utils/utils';

export default {
  components: { Cell },

  emits: ['select'],

  props: {},

  data() {
    return {
      hat: null as Item | null,
      main: null as Item | null,
      boots: null as Item | null,

      DefaultHatImage,
      DefaultMainImage,
      DefaultBootsImage,
    };
  },

  mounted() {
    this.update();
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
