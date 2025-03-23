<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-fight
  .section-badges
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin-top 20px

  .section-buttons
    margin-top 40px
    display flex
    justify-content space-between
    gap 15px
    .button-finish-fight
      button-no-styles()
      button()
    .button-take-damage
      button-no-styles()
      button-emp()

  .section-effects
  .section-abilities
    header
      color colorSec1
      font-large()
      font-bold()
      margin-bottom 30px

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
      <header>Эффекты</header>
      <div class="effects-container">
        <Effect v-for="effect in effects" :effect="effect" />
      </div>
    </section>

    <section class="section-abilities">
      <header>Способности</header>
      <div class="abilities-container">
        <Ability v-for="ability in abilities" :ability="ability" />
      </div>
    </section>
  </div>
</template>

<script>
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { IterableSkillTrees, ResourceTypes } from '~/constants';
import Effect from '~/components/Effect.vue';
import Ability from '~/components/Ability.vue';

export default {
  components: { Ability, Effect, ValueBadge, UserProfileInfo },

  data() {
    return {
      loading: false,

      ResourceTypes,
    };
  },

  computed: {
    effects() {
      const effects = [];
      this.$user.inventory.forEach(item => effects.push(...item.effects));
      this.$user.skills
        .map(id => {
          const treeType = id[0];
          const skillIdx = id.slice(1);
          return IterableSkillTrees[treeType][skillIdx];
        })
        .forEach(skill => effects.push(...skill.effects));
      return effects;
    },

    abilities() {
      const abilities = [];
      this.$user.inventory.forEach(item => abilities.push(...item.abilities));
      this.$user.skills
        .map(id => {
          const treeType = id[0];
          const skillIdx = id.slice(1);
          return IterableSkillTrees[treeType][skillIdx];
        })
        .forEach(skill => abilities.push(...skill.abilities));
      return abilities;
    },
  },

  mounted() {},

  methods: {},
};
</script>
