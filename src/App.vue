<style lang="stylus" scoped>
@import 'styles/constants.styl'
@import 'styles/buttons.styl'
@import 'styles/fonts.styl'
@import 'styles/animations.styl'

.wrapper
  position relative
  width 100%
  max-width 400px
  min-height 100vh
  border 2px solid colorSec1
  border-radius borderRadiusL
  centered-margin()
  // overflow hidden

  > *
    position absolute
    width 100%
    min-height 100vh
    padding 60px 15px 120px 15px

  .bottom-interface
    position fixed
    bottom 0
    transform translateX(-2px)
    width 100%
    max-width 400px
    padding 0
    pointer-events none
    .bottom-line-bg
      position absolute
      bottom 0
      width 100%
      height 70px
      object-fit cover
      object-position bottom
    .buttons
      > *
        button-no-styles()
        pointer-events all

        position absolute
        bottom 28px
        transform translate(-50%, 50%)
        width 35px
        height 35px
        padding 8px
        border-radius borderRadiusS
        hover-effect()
        trans()
        &.router-link-active
          background colorBlockBg
        img
          width 100%
          height 100%
      .fight
        left 10%
      .tree
        left 27%
      .map
        left 73%
      .profile
        left 90%

      .button-scanner
        bottom 65px
        left 50%
        width 65px
        height 65px
        background none
</style>

<style lang="stylus">
@keyframes scale-out
  from
    transform scale(1)
    opacity 1

  to
    transform scale(0.95)
    opacity 0


@keyframes scale-in
  0%
    transform scale(1.05)
    opacity 0

  25%
    transform scale(1.05)
    opacity 0

  100%
    transform scale(1)
    opacity 1


.scale-in-enter-active
  overflow hidden
  animation scale-in 0.2s ease

.scale-in-leave-active
  overflow hidden
  animation scale-out 0.2s ease


.opacity-enter-active
  animation opacity 0.3s

.opacity-leave-active
  animation opacity 0.3s reverse forwards


@keyframes opacity
  0%
    opacity 0

  100%
    opacity 1
</style>

<template>
  <div class="wrapper">
    <router-view #default="{ Component }">
      <transition name="scale-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div class="bottom-interface">
      <img class="bottom-line-bg" src="/static/images/bottom-line.svg" alt="">
      <nav class="buttons">
        <router-link :to="{name: 'fight'}" class="fight"><img src="/static/icons/fight.svg" alt=""></router-link>
        <router-link :to="{name: 'skillsTree'}" class="tree"><img src="/static/icons/tree.svg" alt=""></router-link>
        <router-link :to="{name: 'map'}" class="map"><img src="/static/icons/map-2.svg" alt=""></router-link>
        <router-link :to="{name: 'profile'}" class="profile"><img src="/static/icons/profile.svg" alt=""></router-link>

        <router-link :to="{name: 'qrScanner'}" class="button-scanner"><img src="/static/icons/qr-scanner.svg" alt=""></router-link>
      </nav>
    </div>
  </div>

  <Popups ref="popups" />
  <Modals ref="modals" />
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Modals, Popups } from '@sergtyapkin/modals-popups';
import API from '~/utils/API';

export default {
  components: { Modals, Popups },

  data(): {
    transitionName: string;
    global?: Record<string, any>;
  } {
    return {
      transitionName: '',
      global: undefined,
    };
  },

  mounted() {
    this.global = getCurrentInstance()!.appContext.config.globalProperties;

    this.global.$user = this.$store.state.user;
    this.global.$modal = this.$refs.modals;
    this.global.$popups = this.$refs.popups;
    this.global.$app = this;
    this.global.$api = new API(`/api`);

    this.checkMobileScreen();
    window.addEventListener('resize', () => {
      this.checkMobileScreen();
    });
  },

  methods: {
    checkMobileScreen() {
      if (window.innerWidth <= 700) {
        this.global!.$isMobile = true;
        return;
      }
      this.global!.$isMobile = false;
    },
  },

  watch: {
    $route(to, from) {
      this.transitionName = 'scale-in';

      console.log(from.path, 'TO', to.path);
    },
  },
};
</script>
