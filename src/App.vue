<style lang="stylus" scoped>
@import 'styles/constants.styl'
@import 'styles/buttons.styl'
@import 'styles/fonts.styl'
@import 'styles/animations.styl'

.wrapper
  position relative
  width 100%
  max-width 700px
  min-height 100vh
  // border solid colorSec1
  // border-width 0 1px
  // border-radius borderRadiusL
  centered-margin()
  // overflow hidden

  > *:not(.overlay)
    position absolute
    width 100%
    min-height 100vh
    padding 30px 15px 180px 15px

  .loading
    centered-absolute-transform()

  .overlay
    .loading-resources-toast
      position fixed
      z-index 999
      top 0
      width calc(100% - 20px)
      margin 10px
      padding 15px
      background colorBgLight
      border 1px solid colorBorder
      border-radius borderRadiusM
      box-shadow 0 0 5px #000
      header
        font-medium()

        display flex
        align-items center
        margin-bottom 10px
        img
          height 1lh
          margin-right 5px
      .info
        margin-top 3px
        font-small-extra()

        color colorText5

    .bottom-interface
      position fixed
      z-index 99
      bottom 0
      width 100%
      max-width 700px
      padding 0

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
          trans()

          &:not(.disabled)
            hover-effect()

          &.disabled
            cursor not-allowed
            background mix(black, transparent)

            &.router-link-active
              background mix(black, transparent)

            img
              opacity 0.5

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
      <div v-if="!Component"><CircleLoading class="loading" /></div>
    </router-view>

    <section class="overlay">
      <transition name="opacity">
        <section class="loading-resources-toast" v-if="!isAllResourcesCached">
          <header><img src="/static/icons/download.svg" alt="loading">Кэширование приложения...</header>
          <ProgressBar :progress="cachingProgress" />
          <div class="info">{{ currentCachingResource }}</div>
        </section>
      </transition>

      <section class="bottom-interface" v-if="userRoleReactiveValue !== UserRoles.guild">
        <img class="bottom-line-bg" src="/static/images/bottom-line.svg" alt="">
        <nav class="buttons">
          <router-link :to="{ name: 'fight' }" class="fight" :class="{ disabled: false }">
            <img src="/static/icons/buttons/fight.svg" alt="">
          </router-link>
          <router-link
            :to="{ name: 'skillsTree' }"
            class="tree"
            :class="{ disabled: isUserInFightReactiveValue || isUserDeadReactiveValue }"
          >
            <img src="/static/icons/buttons/tree.svg" alt="">
          </router-link>
          <router-link
            :to="{ name: 'map' }"
            class="map"
            :class="{ disabled: isUserInFightReactiveValue || isUserDeadReactiveValue }"
          >
            <img src="/static/icons/buttons/map.svg" alt="">
          </router-link>
          <router-link
            :to="{ name: 'profile' }"
            class="profile"
            :class="{ disabled: isUserInFightReactiveValue || isUserDeadReactiveValue }"
          >
            <img src="/static/icons/buttons/profile.svg" alt="">
          </router-link>

          <router-link
            :to="{ name: 'qrScanner' }"
            class="button-scanner"
            :class="{ disabled: isUserInFightReactiveValue && !isUserDeadReactiveValue }"
          >
            <img src="/static/icons/buttons/qr-scanner.svg" alt="">
          </router-link>
        </nav>
      </section>
    </section>
  </div>

  <Popups ref="popups" />
  <Modals ref="modals" />
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Modals, Popups } from '@sergtyapkin/modals-popups';
import API from '~/utils/API';
import LocalStorageManager from '~/utils/localStorageManager';
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import { saveAllAssetsByServiceWorker } from '~/utils/utils';
import ProgressBar from '~/components/ProgressBar.vue';
import { UserRoles } from '~/constants/constants';

export default {
  components: { ProgressBar, CircleLoading, Modals, Popups },

  data() {
    return {
      transitionName: '',
      global: undefined as Record<string, any> | undefined,
      prevTouchY: 0,
      isAllResourcesCached: true,
      currentCachingResource: null as string | null,
      cachingProgress: 0,

      isUserInFightReactiveValue: this.$user?.isInFight,
      isUserDeadReactiveValue: this.$user?.stats?.hp <= 0,
      userRoleReactiveValue: this.$user?.role,

      UserRoles,
    };
  },

  mounted() {
    this.global = getCurrentInstance()!.appContext.config.globalProperties;

    this.global.$user = this.$store.state.user;
    this.global.$guild = this.$store.state.guild;
    this.global.$modals = this.$refs.modals;
    this.global.$localStorageManager = new LocalStorageManager();
    this.global.$popups = this.$refs.popups;
    this.global.$app = this;
    this.global.$api = new API(`/api`);

    this.checkMobileScreen();
    window.addEventListener('resize', () => {
      this.checkMobileScreen();
    });

    saveAllAssetsByServiceWorker(({current, total, progress}) => {
      this.isAllResourcesCached = false;
      this.currentCachingResource = current;
      this.cachingProgress = progress / total;
    }, () => {
      this.isAllResourcesCached = true;
    });

    const appEl = document.getElementById('app')!;
    window.addEventListener(
      'touchmove',
      e => {
        const curPageY = e.touches[0].pageY;
        const dy = this.prevTouchY - curPageY;
        if (appEl.scrollTop === 0 && dy < 0) {
          e.preventDefault();
        }
        this.prevTouchY = curPageY;
      },
      { passive: false },
    );
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
