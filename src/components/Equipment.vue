 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-equipment
  display flex
  gap 15px
  width 100%
  justify-content space-between
  > *
    aspect-ratio 1/1
</style>

<template>
  <div class="root-equipment">
    <Cell class="hat" :src="DefaultHatImage" />
    <Cell class="main" :src="DefaultMainImage" />
    <Cell class="boots" :src="DefaultBootsImage" />
  </div>
</template>

<script>
import Cell from '~/components/Cell.vue';

import DefaultHatImage from '#/images/knife-example.png';
import DefaultMainImage from '#/images/knife-example.png';
import DefaultBootsImage from '#/images/knife-example.png';


export default {
  components: { Cell },
  props: {

  },

  data() {
    return {
      DefaultHatImage,
      DefaultMainImage,
      DefaultBootsImage,
    }
  },

  mounted() {
  },

  methods: {
  },
};
</script>
