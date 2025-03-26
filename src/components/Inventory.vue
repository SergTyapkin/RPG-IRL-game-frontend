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
    <Cell v-for="i in (!items.length ? 3 : ((items.length % 3) * 2) % 3)" :key="i" class="cell" />
  </div>
</template>

<script lang="ts">
import Cell from '~/components/Cell.vue';
import { ExtendedItem, itemsIdsToItems } from '~/utils/utils';


export default {
  components: { Cell },

  emits: ['select'],

  props: {
    itemsIds: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      items: [] as ExtendedItem[],
    }
  },

  computed: {
  },

  mounted() {
    this.update();
  },

  methods: {
    update() {
      this.items = itemsIdsToItems(this.itemsIds as string[]);
    },
    selectItem(item: any) {
      this.$emit('select', item);
    }
  },
};
</script>
