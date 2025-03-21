<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-user-profile-info
  display flex
  gap 15px
  .avatar
    border-radius borderRadiusMax
    aspect-ratio 1/1
    overflow hidden
    border 2px solid colorBorder
    img
      width 100%
      height 100%
  .text-block
    .name
      font-large()
      font-bold()
    .guild-info
      display flex
      align-items center
      gap 5px
      .guild-name
        font-small()
      .guild-xp-badge
        font-small-extra()
        padding 5px
        border-radius borderRadiusS
        background colorEmp1
</style>

<template>
  <div class="root-user-profile-info">
<!--    <div class="avatar"><img :src="overrideAvatar || $user.avatarUrl" alt="avatar"></div>-->
    <div class="avatar"><img src="/static/images/user-avatar-example.png" alt="avatar"></div>
    <div class="text-block">
      <strong class="name">{{ overrideName || $user.name }}</strong>
      <div class="guild-info" v-if="showGuild">
        <img src="/static/icons/guild.svg" alt="">
        <div class="guild-name"> {{ $user.guild?.name || 'Гильдия' }} </div>
        <div class="guild-xp-badge"> {{ $user.guild?.experience }} xp </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showGuild: Boolean,

    overrideName: {
      type: String,
      default: undefined,
    },
    overrideAvatar: {
      type: String,
      default: undefined,
    },
  },

  mounted() {
  },

  methods: {
  },
};
</script>
