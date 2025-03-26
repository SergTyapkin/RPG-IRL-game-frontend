<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-fight
  .section-badges
    display flex
    align-items center
    justify-content space-between
    width 100%
    margin-top 20px

  .section-buttons
    display flex
    gap 15px
    justify-content space-between
    margin-top 40px
    .button-finish-fight
      button-no-styles()
      button()
    .button-take-damage
      button-no-styles()
      button-emp()

  .section-effects
  .section-abilities
    header
      margin-bottom 30px
      color colorSec1
      font-large()
      font-bold()

  .section-effects
    margin-top 40px
    .effects-container
      display flex
      flex-direction column
      gap 25px

  .section-abilities
    margin-top 60px
    .abilities-container
      display flex
      flex-wrap wrap
      gap 15px
      hover-effect()
      > *
        width calc((100% - 15px) / 2)
</style>

<template>
  <div class="root-page-fight">
    <section class="section-user-info">
      <UserProfileInfo show-guild />
    </section>

    <section class="section-badges">
      <ValueBadge :type="ResourceTypes.hp" :value="$user.stats?.hp" />
      <ValueBadge :type="ResourceTypes.protection" :value="$user.stats?.protection" />
    </section>

    <section class="section-buttons">
      <button class="button-finish-fight">Завершить бой</button>
      <button class="button-take-damage">Нанесли урон</button>
    </section>

    <section class="section-effects">
      <header>Действующие эффекты</header>
      <div class="effects-container">
        <Effect v-for="effect in effects" :key="effect.id" :effect="effect" />
      </div>
    </section>

    <section class="section-abilities">
      <header>Способности</header>
      <div class="abilities-container">
        <Ability @click="playAbility(ability)" v-for="ability in abilities" :key="ability.id" :ability="ability" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { ResourceTypes } from '~/constants/constants';
import Effect from '~/components/Effect.vue';
import Ability from '~/components/Ability.vue';
import { getAllUserAbilities, getAllUserEffects } from '~/utils/utils';

export default {
  components: { Ability, Effect, ValueBadge, UserProfileInfo },

  data() {
    return {
      ResourceTypes,
    };
  },

  computed: {
    effects() {
      return getAllUserEffects(this.$user);
    },

    abilities() {
      return getAllUserAbilities(this.$user);
    },
  },

  mounted() {
    console.log(this.effects);
  },

  methods: {
    async playAbility(ability: Ability) {
      if (!(await this.$modals.confirm('Разыграть способность', `Точно используем "${ability.name}"?`))) {
        return;
      }
    }
  },
};
</script>
