<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-users-list
  display flex
  flex-direction column
  gap 5px
  .user
    display flex
    gap 15px
    align-items center
    animation-float(0.5s, -20px, 0, left)
    .avatar
      position relative
      aspect-ratio 1/1
      width 50px
      height 50px
      border 1px solid colorBorder
      border-radius borderRadiusMax
      img
        width 100%
        height 100%
        border-radius borderRadiusMax
      .level
        position absolute
        right -9px
        bottom -5px
        width 26px
        height 26px
        background colorEmp1
        border-radius borderRadiusMax
        box-shadow -1px 1px black
        centered-flex-container()
        font-small()
    .text-block
      .name
        font-medium()
</style>

<template>
  <ul class="root-users-list">
    <li v-for="(user, idx) in users" :key="user.id" class="user" :style="{'--animation-index': idx}">
      <div class="avatar">
        <img :src="user.imageUrl" alt="avatar">
        <div class="level">{{ user.level }}</div>
      </div>

      <div class="text-block">
        {{ user.name }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  mounted() {
  },
};
</script>
