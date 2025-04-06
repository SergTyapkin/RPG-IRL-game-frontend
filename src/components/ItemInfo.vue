<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-item-info
  position relative

  button.close
    button-no-styles()
    hover-effect()

    position absolute
    top 10px
    right 10px
    width 30px
    height 30px

    img
      display block
      width 100%
      height 100%

  header
    font-large()

    width 100%
    margin-bottom 20px
    text-align center

  .image-container
    position relative
    width 100%
    height 180px
    margin-bottom 10px

    .shadow
      position absolute
      bottom 0
      left 50%
      transform translate(-50%, 0)
      width 50%
      height 30px
      background radial-gradient(#000000e0, transparent 75%)

    .obj-img
      position absolute
      z-index 2
      display block
      width 100%
      height 100%
      object-fit contain

    .not-synced-label
      position absolute
      z-index 3
      inset 0
      display block
      padding 50px
      opacity 0.6

      img
        display block
        width 100%
        height 100%
        object-fit contain

  .section-stats
    top 70px
    display flex
    flex-direction column
    gap 5px

    > *
      centered-margin()

      gap 5px
      width min-content
      margin-bottom 10px
      padding 0 10px 0 5px
      color colorBg
      background colorSec1
      border-radius borderRadiusMax
      centered-flex-container()

      &.protection
        background colorEmpProtection
        padding 5px 10px
        img
          width 20px
          height 20px
          display block

  .description
    font-small()

    margin-bottom 20px
    color colorText4

  .section-not-synced-info
  .section-effects
  .section-abilities
    margin-bottom 15px

    header
      font-medium()

      margin-bottom 2px
      color colorText2
      text-align left

    .info
      font-small()

      color colorText5
      text-align left

  .section-effects
    .text-block
      margin-bottom 25px

    .effects-container
      display flex
      flex-direction column
      gap 20px

  .section-abilities
    .text-block
      margin-bottom 10px

    .abilities-container
      display flex
      flex-wrap wrap
      gap 15px

      > *
        width calc((100% - 15px) / 2)

  .buttons-container
    display flex
    flex-direction column
    gap 15px

    button
      button()

      &.trade
        button-emp()

  &.not-synced
    .image-container .obj-img
    .effects-container
    .abilities-container
      opacity 0.4
</style>

<template>
  <div class="root-item-info" :class="{ 'not-synced': obj.notSynced }">
    <button v-if="closable" class="close" @click="close">
      <img src="/static/icons/close.svg" alt="close">
    </button>
    <header>{{ obj.name }}</header>
    <div class="image-container" v-if="obj.imageUrl">
      <div v-if="imageWithShadow" class="shadow" />
      <img class="obj-img" :src="obj.imageUrl" alt="">
      <section class="not-synced-label" v-if="obj.notSynced">
        <img src="/static/icons/cloud-sync-dark.svg" alt="not-synced">
      </section>
    </div>
    <section class="section-stats">
      <div v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)" class="protection">
        <img src="/static/icons/buffs/flat/protection.svg" alt=""> {{ obj.buffs[BuffsTypes.protectionIncrease] }}
      </div>
    </section>

    <section class="section-not-synced-info" v-if="obj.notSynced">
      <header>Предмет не синхронизирован!</header>
      <div class="info">
        Синхронизируйтесь со своей гильдией, чтобы с предметом можно было взаимодействовать и его эффекты стали
        применяться
      </div>
    </section>

    <section class="description">
      {{ obj.description }}
      <div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.maxHpIncrease]">
          - Увеличивает макс. здоровье на {{ obj.buffs[BuffsTypes.maxHpIncrease] }}
        </div>
        <div
          v-if="
            obj.buffs &&
              obj.buffs[BuffsTypes.protectionIncrease] &&
              ![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)
          "
        >
          - Увеличивает защиту на {{ obj.buffs[BuffsTypes.protectionIncrease] }}
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.damageDoneIncrease]">
          - Увеличивает наносимый вами урон на {{ obj.buffs[BuffsTypes.damageDoneIncrease] }}
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.maxHpModifier]">
          - Ваше макс. здоровье становится равно {{ obj.buffs[BuffsTypes.maxHpModifier] * 100 }}% от текущего
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.protectionModifier]">
          - Ваша защита {{ obj.buffs[BuffsTypes.protectionModifier] * 100 }}% от текущего
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.damageDoneModifier]">
          - Весь наносимый вами урон умножается на {{ obj.buffs[BuffsTypes.damageDoneModifier] * 100 }}%
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.hpEveryTurn]">
          - Каждый ход в бою добавляет к здоровью {{ obj.buffs[BuffsTypes.damageDoneModifier] }}ед.
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.experienceModifier]">
          - Вы получаете от бутылочек опыта {{ obj.buffs[BuffsTypes.experienceModifier] * 100 }}% опыта
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.moneyModifier]">
          - Вы получаете от мешочков монет {{ obj.buffs[BuffsTypes.moneyModifier] * 100 }}% монет
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.powerCostDecrease]">
          - Дает скидку {{ obj.buffs[BuffsTypes.powerCostDecrease] }} на прокачку всех скиллов в дереве Силы
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.agilityCostDecrease]">
          - Дает скидку {{ obj.buffs[BuffsTypes.agilityCostDecrease] }} на прокачку всех скиллов в дереве Ловкости
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.intelligenceCostDecrease]">
          - Дает скидку {{ obj.buffs[BuffsTypes.intelligenceCostDecrease] }} на прокачку всех скиллов в дереве Интеллекта
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.powerPerLevelIncrease]">
          - Увеличивает очки силы, получаемые за каждый уровень, на {{ obj.buffs[BuffsTypes.powerPerLevelIncrease] }}
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.agilityPerLevelIncrease]">
          - Увеличивает очки ловкости, получаемые за каждый уровень, на {{ obj.buffs[BuffsTypes.powerPerLevelIncrease] }}
        </div>
        <div v-if="obj.buffs && obj.buffs[BuffsTypes.intelligencePerLevelIncrease]">
          - Увеличивает очки интеллекта, получаемые за каждый уровень, на {{ obj.buffs[BuffsTypes.powerPerLevelIncrease] }}
        </div>
      </div>
    </section>

    <section v-if="obj.effects?.length" class="section-effects">
      <div class="text-block">
        <header>Эффекты</header>
        <div v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)" class="info">
          Действуют только если предмет экипирован!
        </div>
        <div v-if="obj.applyable" class="info">Применяются после использования предмета</div>
        <span v-if="obj.notSynced" class="info">Работают только после синхронизации с гильдией</span>
      </div>
      <div class="effects-container">
        <Effect v-for="effect in obj.effects" :key="effect.id" :effect="effect" without-source />
      </div>
    </section>
    <section v-if="obj.abilities?.length" class="section-abilities">
      <div class="text-block">
        <header>Способности</header>
        <div v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(obj.type)" class="info">
          Доступны только если предмет экипирован!
          <span v-if="obj.notSynced" class="info">Работают только после синхронизации с гильдией</span>
        </div>
        <!--        <div v-if="obj.applyable" class="info">-->
        <!--          Применяются после использования предмета-->
        <!--        </div>-->
      </div>
      <div class="abilities-container">
        <Ability v-for="ability in obj.abilities" :key="ability.id" :ability="ability" preview />
      </div>
    </section>
    <slot />
    <div class="buttons-container">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script lang="ts">
import Effect from '~/components/Effect.vue';
import Ability from '~/components/Ability.vue';
import { BuffsTypes, ItemTypes } from '~/constants/constants';

export default {
  components: { Ability, Effect },

  props: {
    obj: {
      type: Object,
      required: true,
    },
    imageWithShadow: Boolean,
    closable: Boolean,
  },

  data() {
    return {
      BuffsTypes,
    };
  },
  computed: {
    ItemTypes() {
      return ItemTypes;
    },
  },
  emits: ['close'],

  mounted() {},

  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
