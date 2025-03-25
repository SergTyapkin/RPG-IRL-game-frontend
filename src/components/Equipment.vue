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
    <Cell class="hat" :src="$user.equipment?.hat?.imageUrl" :bg-image="DefaultHatImage" @click="selectItem($user.equipment?.hat)" />
    <Cell class="main" :src="$user.equipment?.main?.imageUrl" :bg-image="DefaultMainImage" @click="selectItem($user.equipment?.main)" />
    <Cell class="boots" :src="$user.equipment?.boots?.imageUrl" :bg-image="DefaultBootsImage" @click="selectItem($user.equipment?.boots)" />
  </div>
</template>

<script lang="ts">
import Cell from '~/components/Cell.vue';

import DefaultHatImage from '#/icons/guild.svg';
import DefaultMainImage from '#/icons/guild.svg';
import DefaultBootsImage from '#/icons/guild.svg';

export default {
  components: { Cell },

  emits: ['select'],

  props: {},

  data() {
    return {
      DefaultHatImage,
      DefaultMainImage,
      DefaultBootsImage,
    };
  },

  mounted() {
  },

  methods: {
    selectItem(item: any) {
      if (item) {
        this.$emit('select', item);
      }
    }
  },
};
</script>
