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
</style>

<template>
  <div class="root-equipment">
    <Cell
      class="hat"
      :src="hat?.imageUrl"
      :bg-image="hat ? undefined : DefaultHatImage"
      @click="selectItem(hat)"
    />
    <Cell
      class="main"
      :src="main?.imageUrl"
      :bg-image="main ? undefined : DefaultMainImage"
      @click="selectItem(main)"
    />
    <Cell
      class="boots"
      :src="boots?.imageUrl"
      :bg-image="boots ? undefined : DefaultBootsImage"
      @click="selectItem(boots)"
    />
  </div>
</template>

<script lang="ts">
import Cell from '~/components/Cell.vue';

import DefaultHatImage from '#/icons/guild.svg';
import DefaultMainImage from '#/icons/guild.svg';
import DefaultBootsImage from '#/icons/guild.svg';
import { Items } from '~/constants/items';
import { Item } from '~/types/types';
import { itemIdToItem } from '~/utils/utils';

export default {
  components: { Cell },

  emits: ['select'],

  props: {},

  data() {
    return {
      hat: undefined as Item,
      main: undefined as Item,
      boots: undefined as Item,

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
