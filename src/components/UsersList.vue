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
    align-items center
    gap 15px
    .avatar
      aspect-ratio 1/1
      border 1px solid colorBorder
      position relative
      width 50px
      height 50px
      img
        border-radius borderRadiusMax
        width 100%
        height 100%
      .level
        position absolute
        right -9px
        bottom -5px
        width 26px
        height 26px
        centered-flex-container()
        border-radius borderRadiusMax
        background colorEmp1
        box-shadow -1px 1px black
        font-small()
    .text-block
      .name
        font-medium()
</style>

<template>
  <ul class="root-users-list">
    <li v-for="user in users" class="user">
      <div class="avatar">
        <img src="/static/images/user-avatar-example.png" alt="avatar">
        <div class="level">{{ user.level || 5 }}</div>
      </div>

      <div class="text-block">
        {{ user.name }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
};
</script>
