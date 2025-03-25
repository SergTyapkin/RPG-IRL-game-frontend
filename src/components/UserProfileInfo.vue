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
    overflow hidden
    aspect-ratio 1/1
    width 100px
    height 100px
    border 2px solid colorBorder
    border-radius borderRadiusMax
    img
      width 100%
      height 100%
  .text-block
    .name
      font-large()
      font-bold()
    .guild-info
      display flex
      gap 5px
      align-items center
      hover-effect()
      .guild-image
        width 40px
        height 40px
        object-fit contain
      .guild-name
        font-small()
      .guild-xp-badge
        font-small-extra()

        padding 5px
        background colorEmp1
        border-radius borderRadiusS

  &.small
    .avatar
      width 70px
      height 70px
</style>

<template>
  <div class="root-user-profile-info" :class="{small}">
    <div class="avatar"><img :src="overrideAvatar || $user.imageUrl" alt="avatar"></div>
    <div class="text-block">
      <strong class="name">{{ overrideName || $user.name }}</strong>
      <router-link :to="{ name: 'guild' }" class="guild-info" v-if="showGuild">
        <img class="guild-image" :src="$user.guild.imageUrl" alt="">
        <div class="guild-name"> {{ $user.guild?.name }} </div>
        <div class="guild-xp-badge"> {{ $user.guild?.experience }} xp</div>
      </router-link>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showGuild: Boolean,
    small: Boolean,

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
