<style lang="stylus" scoped>
@import '../../styles/constants.styl'
</style>

<template>
  <input v-model="modelValue" @input="onInput">
</template>

<script lang="ts">
export default {
  props: {
    modelValue: undefined,
    uniqueName: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],

  mounted() {
    const savedData = localStorage.getItem(this.uniqueName);
    if (savedData !== null) {
      this.$emit('update:modelValue', savedData);
    }
  },

  methods: {
    onInput() {
      localStorage.setItem(this.uniqueName, this.modelValue);
      this.$emit('update:modelValue', this.modelValue);
    },
  },
};
</script>
