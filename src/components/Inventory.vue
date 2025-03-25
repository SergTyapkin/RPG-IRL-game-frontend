 <style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-inventory
  display flex
  flex-wrap wrap
  gap 15px
  justify-content space-between
  width 100%
  > *
    aspect-ratio 1/1
    width calc((100% - 30px) / 3)
</style>

<template>
  <div class="root-inventory">
    <Cell v-for="item in items" :key="item.id" class="cell" :src="item.imageUrl" @click="selectItem(item)" />
    <Cell v-for="i in (3 - items.length % 3)" :key="i" class="cell" />
  </div>
</template>

<script lang="ts">
import Cell from '~/components/Cell.vue';


export default {
  components: { Cell },

  emits: ['select'],

  props: {
    items: {
      type: Array,
      required: true,
    }
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
    }
  },
};
</script>
