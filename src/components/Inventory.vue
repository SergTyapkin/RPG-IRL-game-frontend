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
    aspect-ratio 1 / 1
    width calc((100% - 30px) / 3)
    animation-float()

    &.clickable
      hover-effect()
</style>

<template>
  <div class="root-inventory">
    <Cell
      v-for="(item, idx) in items"
      :key="item.id"
      :style="{ '--animation-index': idx }"
      class="cell clickable"
      :item="item"
      @click="selectItem(item)"
    />
    <Cell
      v-for="i in !items.length ? 3 : ((items.length % 3) * 2) % 3"
      :key="i"
      :style="{ '--animation-index': items.length + i }"
      class="cell"
      :item="{}"
    />
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
    },
    notSyncedItemsIds: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      items: [] as ExtendedItem[],
    };
  },

  computed: {},

  mounted() {
    this.update();
  },

  methods: {
    update() {
      const items = itemsIdsToItems(this.itemsIds as string[]);
      const notSyncedItems = itemsIdsToItems(this.notSyncedItemsIds as string[]);
      notSyncedItems.forEach(item => (item.notSynced = true));
      this.items = items.concat(notSyncedItems);
    },
    selectItem(item: ExtendedItem) {
      this.$emit('select', item);
    },
  },
};
</script>
