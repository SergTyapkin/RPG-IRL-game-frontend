<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-fight
  .section-user
    margin-bottom 20px

  .section-badges
    display flex
    align-items center
    justify-content space-between
    width 100%
    margin-bottom 40px

  .section-buttons
    display flex
    flex-wrap wrap
    gap 15px
    justify-content space-between

    > *
      button-emp()

      width calc((100% - 15px) / 2)

    .button-finish-fight
      button()

    .button-take-damage
      button-emp()

  // background colorEmpHP

  // .button-take-effect
  //  background colorEmp1
  // .button-take-heal
  //  background colorEmpAgility

  .section-not-alive-info
  .section-confirm
    .image
      display block
      width 100%
      height 100px
      margin-bottom 10px

    .info
      font-small()
      list-no-styles()

      color colorText2

      li
        margin-bottom 5px
        padding-left 10px
        border-left colorText2 2px solid

        mark
          color colorEmp1
          background none

    .qr-codes
      header
        margin-top 20px
        text-align center
        font-medium()
        color colorText3

      .info
        text-align center

    .confirm-button
      margin-top 20px
      button-emp()

  .section-effects
  .section-abilities
    header
      margin-bottom 30px
      color colorSec1
      font-large()
      font-bold()

    .info
      font-small()

      color colorText5
      text-align center

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
        hover-effect()

  .section-hp-protection-only
    position fixed
    z-index 999
    inset 0
    display flex
    flex-direction column
    align-items center
    background white

    .section-hp
    .section-protection
      display flex
      flex-direction column
      align-items center
      width 100%
      height 50%
      padding 3vh 0

      img
        transform-origin 50% 50%
        transform rotate(90deg)
        height 100%

      .value
        transform-origin 50% 50%
        transform rotate(90deg)
        width min-content
        margin -2vh 0
        font-size 25vh
        color colorText1

    .section-hp
      background colorEmpHP

    .section-protection
      background colorEmpProtection

      .value
        color colorBg

  .section-modals
    position fixed
    inset 0
    overflow-y auto
    padding-bottom 100px
    background #00000050
    backdrop-filter blur(10px)

    .section-choose-damage
    .section-choose-heal
    .section-choose-effects
      position relative
      width calc(100% - 30px)
      max-width 400px
      margin 30px auto
      padding 20px
      background colorBgLight
      border-radius borderRadiusM
      box-shadow 0 0 15px #000

      button.close
        button-no-styles()

        position absolute
        top 10px
        right 10px
        width 30px
        height 30px
        opacity 0.8
        hover-effect()

        img
          width 100%
          height 100%

      header
        font-large()

        margin-bottom 30px
        color colorText2
        text-align center

      .effects-container
        display flex
        flex-direction column
        gap 15px

        > *
          trans()
          hover-effect()

          &.selected
            filter brightness(1.2)
            outline colorEmp1 2px solid

      .button-submit
        margin-top 30px
        button-emp()

    .section-choose-heal
      .range
        --color colorEmpHeal

    .section-choose-damage
      .range
        --color colorEmpDamage
</style>

<template>
  <div class="root-page-fight">
    <section class="section-user">
      <UserProfileInfo show-guild />
    </section>

    <section class="section-badges" @click="isHpProtectionShowedOnly = true">
      <ValueBadge :type="ResourceTypes.hp" :value="`${$user.stats?.hp}/${userMaxHp}`" />
      <ValueBadge :type="ResourceTypes.protection" :value="String(userProtection)" />
    </section>

    <transition name="opacity" mode="out-in">
      <section class="section-not-alive-info" v-if="$user.stats.hp <= 0">
        <img class="image" src="/static/icons/fight.svg" alt="death">
        <ul class="info">
          <li>
            Вы погибли в бою.
            <mark>Доберитесь до вашей базы</mark>
            , чтобы восстановить здоровье
          </li>
          <li>
            Вы не можете совершать
            <mark>никакие действия</mark>
            , пока не вылечитесь
          </li>
          <li>
            Не уходите с места боя. Сперва дайте
            <mark>одному из противников</mark>
            отсканировать все QR-коды ниже и
            <mark>забрать выпавшие из вас предметы</mark>
          </li>
        </ul>
        <section class="qr-codes">
          <header v-if="loosedMoney">{{ loosedMoney }} монет ({{ MONEY_LOSE_BY_DEATH_PERCENT * 100 }}% монет):</header>
          <QRGenerator v-if="loosedMoney" ref="qrMoney" />
          <header>Все недонесённые до базы QR'ы:</header>
          <div v-if="!scannedNotSavedQrs.length" class="info">Таких QR'ов нет</div>
          <QRGenerator ref="allQrs" v-for="qr in scannedNotSavedQrs" :key="qr.id" />
        </section>
        <router-link :to="{ name: 'qrScanner' }">
          <button class="confirm-button">На страницу сканирования</button>
        </router-link>
      </section>

      <section class="section-confirm" v-else-if="!isUserInFightReactiveValue">
        <ul class="info">
          <li>
            После начала боя вы
            <mark>не сможете выйти с этой страницы</mark>
            до его конца
          </li>
          <li>
            Чтобы начать бой, объявите противникам об этом. В этом случае
            <mark>все участники боя должны немедленно начать бой</mark>
          </li>
          <li>
            Если вы погибаете в бою, вы передаете противникам
            <mark>50% ваших монет</mark>
            и
            <mark>все не донесенные до базы предметы</mark>
          </li>
          <li>
            Бой можно
            <mark>досрочно завершить</mark>
            , если одна из команд решает сдаться. Сделать это можно только
            <mark>после смерти</mark>
            хотя бы одного игрока этой команды
          </li>
        </ul>
        <button class="confirm-button" @click="startFight">Начать бой</button>
      </section>

      <section class="section-buttons" v-else>
        <button class="button-take-damage" @click="chooseDamage">Нанесли урон</button>
        <button class="button-take-effect" @click="chooseEffect">Дали эффект</button>
        <button class="button-take-heal" @click="chooseHeal">Вылечили</button>
        <button class="button-finish-fight" @click="onEndFight">Завершить бой</button>
      </section>
    </transition>

    <section class="section-effects">
      <header>Постоянные эффекты</header>
      <div class="effects-container">
        <div v-if="!shownEffects.length" class="info">Эффектов нет</div>
        <EffectComponent v-for="effect in shownEffects" :key="effect.id" :effect="effect" />
      </div>
    </section>

    <section class="section-effects">
      <header>Временные эффекты</header>
      <div class="effects-container">
        <div v-if="!fightEffects.length" class="info">Эффектов нет</div>
        <EffectComponent v-for="effect in fightEffects" :key="effect.id" :effect="effect" without-source />
      </div>
    </section>

    <transition name="opacity">
      <section v-if="fightPowers.length" class="section-abilities">
        <header>Усиления текущего хода</header>
        <div class="abilities-container">
          <AbilityComponent v-for="ability in fightPowers" :key="ability.id" :ability="ability" />
        </div>
      </section>
    </transition>

    <section class="section-abilities">
      <header>Способности</header>
      <div v-if="!abilities.length" class="info">Способностей нет</div>
      <div class="abilities-container">
        <AbilityComponent
          v-for="ability in abilities"
          @click="playAbility(ability)"
          :key="ability.id"
          :ability="ability"
        />
      </div>
    </section>

    <transition name="opacity">
      <section
        v-if="isHpProtectionShowedOnly"
        class="section-hp-protection-only"
        @click="isHpProtectionShowedOnly = false"
      >
        <section class="section-hp">
          <img src="/static/icons/heart.svg" alt="">
          <div class="value">{{ $user.stats.hp }}</div>
        </section>
        <section class="section-protection">
          <img src="/static/icons/shield.svg" alt="">
          <div class="value">{{ userProtection }}</div>
        </section>
      </section>
    </transition>

    <transition mode="out-in" name="opacity">
      <section v-if="modalState !== ModalStates.none" class="section-modals" @click="modalState = ModalStates.none">
        <transition mode="out-in" name="opacity">
          <section class="section-choose-damage" v-if="modalState === ModalStates.chooseDamage" @click.stop>
            <button class="close">
              <img src="/static/icons/close.svg" alt="close" @click="modalState = ModalStates.none">
            </button>
            <header>Введите кол-во урона</header>
            <Range class="range" :min="1" :max="15" v-model="chosenValue" :labels-count="14" />
            <button class="button-submit" @click="takeDamage(chosenValue)">Выбрать</button>
          </section>
          <section class="section-choose-heal" v-else-if="modalState === ModalStates.chooseHeal" @click.stop>
            <button class="close">
              <img src="/static/icons/close.svg" alt="close" @click="modalState = ModalStates.none">
            </button>
            <header>Введите кол-во лечения</header>
            <Range class="range" :min="1" :max="10" v-model="chosenValue" :labels-count="9" />
            <button class="button-submit" @click="takeHeal(chosenValue)">Выбрать</button>
          </section>

          <section class="section-choose-effects" v-else-if="modalState === ModalStates.chooseEffect" @click.stop>
            <button class="close">
              <img src="/static/icons/close.svg" alt="close" @click="modalState = ModalStates.none">
            </button>
            <header>Выберите эффект</header>
            <div class="effects-container">
              <EffectComponent
                v-for="effect in FightEffects"
                :key="effect.id"
                :effect="effect"
                without-source
                :class="{ selected: selectedEffect === effect }"
                @click="selectedEffect = effect"
              />
            </div>
            <transition name="opacity">
              <button v-show="selectedEffect" class="button-submit" @click="takeEffect(selectedEffect)">Выбрать</button>
            </transition>
          </section>
        </transition>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import {
  AbilityTypes,
  BuffsTypes,
  MONEY_LOSE_BY_DEATH_PERCENT,
  QRSources,
  QRTypes,
  ResourceTypes,
} from '~/constants/constants';
import EffectComponent from '~/components/Effect.vue';
import AbilityComponent from '~/components/Ability.vue';
import {
  deepClone,
  effectsIdsToEffects,
  generateQRText,
  getAllUserAbilities,
  getAllUserEffects,
  getTotalUserMaxHP,
  getTotalUserProtection,
  type InFightExtendedAbility,
} from '~/utils/utils';
import Range from '~/components/Range.vue';
import { Effects, FightEffects, TeamEffectsIds } from '~/constants/effects';
import type { AbilityChance, Effect, QRData } from '~/types/types';
import QRGenerator from '~/components/QRGenerator.vue';
import { nextTick } from 'vue';
import { userDead, userRevive } from '~/utils/userEvents';
import { Abilities } from '~/constants/abilities';
import { Items } from '~/constants/items';

export default {
  components: { QRGenerator, Range, AbilityComponent, EffectComponent, ValueBadge, UserProfileInfo },

  data() {
    return {
      userProtection: 0,
      userMaxHp: 0,
      isUserInFightReactiveValue: this.$user.isInFight,
      isHpProtectionShowedOnly: false,
      modalState: 0,
      chosenValue: 0,
      loosedMoney: 0,
      selectedEffect: undefined as Effect | undefined,
      fightEffects: [] as Effect[],
      fightPowers: [] as InFightExtendedAbility[],
      scannedNotSavedQrs: [] as QRData[],

      ModalStates: {
        none: 0,
        chooseDamage: 1,
        chooseEffect: 2,
        chooseHeal: 3,
      },

      ResourceTypes,
      FightEffects,
      MONEY_LOSE_BY_DEATH_PERCENT,
    };
  },

  computed: {
    shownEffects() {
      return getAllUserEffects(this.$user, true);
    },
    effects() {
      return getAllUserEffects(this.$user);
    },

    abilities() {
      return getAllUserAbilities(this.$user) as unknown as InFightExtendedAbility[];
    },
  },

  async mounted() {
    this.$app.isUserInFightReactiveValue = this.isUserInFightReactiveValue;
    this.$app.isUserDeadReactiveValue = this.$user.stats.hp <= 0;
    this.recalculateUserStats();

    const abilitiesReloads = this.$localStorageManager.loadAbilitiesReloads();
    if (abilitiesReloads) {
      this.abilities.forEach(ability => {
        if (abilitiesReloads[ability.id] !== undefined) {
          ability.reloadLeft = abilitiesReloads[ability.id];
        }
      });
    }

    const fightEffects = this.$localStorageManager.loadFightEffects();
    if (fightEffects) {
      this.fightEffects = fightEffects;
    }

    const fightPowers = this.$localStorageManager.loadFightPowers();
    if (fightPowers) {
      this.fightPowers = fightPowers as unknown as InFightExtendedAbility[];
    }

    const loosedMoney = this.$localStorageManager.loadLosedMoney();
    if (loosedMoney) {
      this.loosedMoney = loosedMoney;
    }

    const scannedNotSavedQrs = this.$localStorageManager.loadScannedNotSavedQrs();
    if (scannedNotSavedQrs) {
      this.scannedNotSavedQrs = scannedNotSavedQrs;
    }

    if (this.$user.stats.hp <= 0) {
      await nextTick();
      this.regenerateDeadQrs();
    }
  },

  methods: {
    recalculateUserStats() {
      this.userProtection = getTotalUserProtection(this.$user);
      this.userMaxHp = getTotalUserMaxHP(this.$user);

      this.fightEffects.forEach(e => {
        this.userProtection += e.buffs[BuffsTypes.protectionIncrease] ?? 0;
        this.userMaxHp += e.buffs[BuffsTypes.maxHpIncrease] ?? 0;
      });
    },

    async startFight() {
      if (
        !(await this.$modals.confirm(
          'Начать бой?',
          `Выполнять любые другие действия можно будет только после его завершения`,
        ))
      ) {
        return;
      }
      this.$user.isInFight = true;
      this.isUserInFightReactiveValue = true;
      this.$app.isUserInFightReactiveValue = true;
      this.fightEffects = [];
      this.fightPowers = [];
      this.$localStorageManager.removeFightPowers();
      this.$localStorageManager.removeFightEffects();
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
      this.isHpProtectionShowedOnly = true;
      this.$forceUpdate();
      await this.$modals.alert(
        'Бой начат',
        `Закройте это уведомление и покажите экран всем противникам, чтобы они знали, сколько у вас HP и защиты.
Закрыть его можно нажатием. Открыть заново - нажатием на свои HP или очки защиты`,
      );
    },

    async onEndFight() {
      if (
        !(await this.$modals.confirm(
          'Закончить бой?',
          `Вы уверены, что одна из команд сдалась, и в ней погиб хотя бы один участник боя?`,
        ))
      ) {
        return;
      }
      this.$user.isInFight = false;
      this.finishFight();
    },
    finishFight() {
      this.isUserInFightReactiveValue = false;
      this.$app.isUserInFightReactiveValue = false;
      this.$localStorageManager.removeAbilitiesReloads();
      this.fightEffects = [];
      this.fightPowers = [];
      this.$localStorageManager.removeFightPowers();
      this.$localStorageManager.removeFightEffects();
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);

      this.abilities.forEach(ability => (ability.reloadLeft = 0));
      this.$forceUpdate();
    },

    async playAbility(ability: InFightExtendedAbility) {
      if (this.$user.isInFight && this.$user.stats.hp <= 0) {
        if (ability.id === Abilities.phoenixLive.id) {
          if (
            !(await this.$modals.confirm(
              'Использовать "Жизнь Феникса"?',
              `Артефакт будет использован и пропадет из вашего инвентаря`,
            ))
          ) {
            return;
          }
          const idx = this.$user.inventory.findIndex(i => i === Items.artefactPhoenixLive.id);
          if (idx === -1) {
            this.$popups.error('Ошибка', 'Предмета нет в инвентаре');
            return;
          }
          this.$user.inventory.splice(idx, 1);
          userRevive(this.$user);
          this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
          this.recalculateUserStats();
          this.$forceUpdate();
          return;
        }
      }
      if (!this.$user.isInFight || this.$user.stats.hp <= 0) {
        return;
      }
      if (ability.reloadLeft) {
        return;
      }
      if (ability.id === Abilities.phoenixLive.id) {
        return;
      }
      if (
        !(await this.$modals.confirm(
          'Разыграть способность?',
          `Сейчас точно ваш ход и вы используете "${ability.name}"?`,
        ))
      ) {
        return;
      }
      ability.reloadLeft = ability.reload;

      // Ability is power charger ------------
      if (ability.type === AbilityTypes.power) {
        await this.$modals.alert(
          'Разыграйте ещё одну способность',
          'Ваш ход ещё не закончен. Разыграйте ещё одну способность, которая будет усилена использованной',
        );
        const abilityCopy = deepClone(ability);
        abilityCopy.reloadLeft = 0;
        this.fightPowers.push(abilityCopy);
        this.$localStorageManager.saveFightPowers(this.fightPowers);
        this.saveAbilitiesReloads();
        this.recalculateUserStats();
        this.$forceUpdate();
        return;
      }

      // Calculate played stats ------------
      const totalEffects = (this.effects as Effect[]).concat(this.fightEffects);
      // Calculate damage
      let damage = ability.damage;
      const damageTargets = ability.damageTargets;
      let damageModifier = 1;
      totalEffects.forEach(e => {
        damage += e.buffs[BuffsTypes.damageDoneIncrease] ?? 0;
        damageModifier *= e.buffs[BuffsTypes.damageDoneModifier] ?? 1;
      });
      damage *= damageModifier;
      damage = Math.round(damage);
      // Calculate heal
      let heal = ability.heal;
      // Calculate effects
      const effectsToTargets = ability.effectsToTargets;
      const effectsForMe = ability.effectsForMe;
      // Calculate chances
      (ability.chances || []).forEach((chance: AbilityChance) => {
        if (Math.random() < chance.probability) {
          damage += chance.damage ?? 0;
          heal += chance.heal ?? 0;
          effectsToTargets.push(...effectsIdsToEffects(chance.effectsToTargets ?? []));
          effectsForMe.push(...effectsIdsToEffects(chance.effectsForMe ?? []));
        }
      });
      // Calculate special effects
      const efficiencyModifiers = {
        [AbilityTypes.sword]: 1,
        [AbilityTypes.dagger]: 1,
        [AbilityTypes.spell]: 1,
        [AbilityTypes.potion]: 1,
        [AbilityTypes.pistol]: 1,
      };
      totalEffects.forEach(e => {
        if (e.id === Effects.swordEfficiency.id) {
          efficiencyModifiers[AbilityTypes.sword] *= 1.3;
        } else if (e.id === Effects.daggerEfficiency.id) {
          efficiencyModifiers[AbilityTypes.dagger] *= 1.3;
        } else if (e.id === Effects.spellEfficiency.id) {
          efficiencyModifiers[AbilityTypes.spell] *= 1.3;
        } else if (e.id === Effects.potionEfficiency.id) {
          efficiencyModifiers[AbilityTypes.potion] *= 1.3;
        } else if (e.id === Effects.pistolEfficiency.id) {
          efficiencyModifiers[AbilityTypes.pistol] *= 1.3;
        }
      });
      damage *= efficiencyModifiers[ability.type];
      heal *= efficiencyModifiers[ability.type];
      // Calculate power affects
      this.fightPowers.forEach(power => {
        if (power.id === Abilities.powerDoubleDamage.id) {
          damage *= 2;
        }
      });

      // Inform user ------------
      if (ability.damage > 0 && damage > 0) {
        await this.$modals.alert(
          `Вы наносите ${damage} урона по ${damageTargets} противник${damageTargets > 1 ? 'ам' : 'у'}`,
          'Выберите противников и громко скажите им, от какой способности и сколько урона они получают. Они должны ввести его себе сами',
        );
      }
      if (effectsToTargets.length > 0) {
        const effectsToTargetsNames = effectsToTargets.map(e => `"${e.name}"`).join(', ');
        await this.$modals.alert(
          `Вы накладываете эффект${effectsToTargets.length > 1 ? 'ы' : ''}: ${effectsToTargetsNames} на ${damageTargets} противник${damageTargets > 1 ? 'ов' : 'а'}`,
          'Выберите противников и громко скажите им, от какой способноси и сколько урона они получают. Они должны ввести его себе сами',
        );
      }
      if (effectsForMe.length > 0) {
        const effectsForMeNames = effectsForMe.map(e => `"${e.name}"`).join(', ');
        await this.$modals.alert(
          `Вы получаете эффект${effectsToTargets.length > 1 ? 'ы' : ''}: ${effectsForMeNames}`,
          'Эффекты уже применены',
        );
        effectsForMe.forEach(e => {
          this.takeEffect(Effects[e.id]);
        });
      }
      if (ability.heal > 0 && heal > 0) {
        if (ability.damageTargets === 0) {
          this.takeHeal(heal); // User gets heal by himself
        } else {
          await this.$modals.alert(
            `Вы лечите ${heal} HP ${damageTargets} союзник${damageTargets > 1 ? 'ам' : 'у'}`,
            'Выберите союзников и громко скажите им, от чего и сколько очков здоровья они восстанавливают. Они должны ввести это себе сами',
          );
        }
      }

      this.fightPowers = [];
      this.$localStorageManager.removeFightPowers();
      this.applyOneTurnEffects();
      this.saveAbilitiesReloads();
      this.recalculateUserStats();
    },
    saveAbilitiesReloads() {
      const abilitiesReloads: { [key: string]: number } = {};
      this.abilities.forEach(ability => {
        abilitiesReloads[ability.id] = ability.reloadLeft ?? 0;
      });

      this.$localStorageManager.saveAbilitiesReloads(abilitiesReloads);
    },
    applyOneTurnEffects() {
      // Abilities reload decrease by 1
      this.abilities.forEach(ability => {
        ability.reloadLeft = Math.max((ability.reloadLeft ?? 1) - 1, 0);
      });

      // Personal bleeding
      let totalHPChangeVal = 0;
      this.fightEffects.concat(this.effects).forEach(effect => {
        totalHPChangeVal += effect.buffs[BuffsTypes.hpEveryTurn] ?? 0;
      });
      if (totalHPChangeVal < 0) {
        this.takeDamage(totalHPChangeVal);
      } else if (totalHPChangeVal > 0) {
        this.takeHeal(totalHPChangeVal);
      }

      // Team bleeding
      let teamTotalHPChangeVal = 0;
      this.fightEffects.concat(this.effects).forEach(effect => {
        if (TeamEffectsIds.includes(effect.id)) {
          teamTotalHPChangeVal += effect.buffs[BuffsTypes.hpEveryTurn] ?? 0;
        }
      });
      if (teamTotalHPChangeVal < 0) {
        this.$modals.alert(
          `Все ваши союзники получают по ${teamTotalHPChangeVal} урона`,
          'Громко скажите им это. Они должны ввести этот урон себе сами',
        );
      } else if (teamTotalHPChangeVal > 0) {
        this.$modals.alert(
          `Все ваши союзники восстанавливают по ${teamTotalHPChangeVal} единиц здоровья`,
          'Громко скажите им это. Они должны ввести этот урон себе сами',
        );
      }

      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
      this.$forceUpdate();
    },

    chooseEffect() {
      this.modalState = this.ModalStates.chooseEffect;
    },
    chooseDamage() {
      this.modalState = this.ModalStates.chooseDamage;
    },
    chooseHeal() {
      this.modalState = this.ModalStates.chooseHeal;
    },

    takeDamage(value: number, isPiercing = false) {
      let resultDamage = 0;
      if (isPiercing) {
        resultDamage = value;
      } else {
        resultDamage = Math.max(0, value - this.userProtection);
      }
      let damageGottenModifier = 1;
      this.fightEffects.concat(this.effects).forEach(effect => {
        damageGottenModifier *= effect.buffs[BuffsTypes.damageGottenModifier] ?? 1;
      });
      resultDamage *= damageGottenModifier;
      resultDamage = Math.round(resultDamage);

      this.$user.stats.hp -= resultDamage;
      this.$popups.success('Урон получен', `Вы потеряли ${resultDamage} HP`);
      if (this.$user.stats.hp <= 0) {
        this.userDead();
      }
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);

      this.modalState = this.ModalStates.none;
      this.chosenValue = 0;
      this.recalculateUserStats();
      this.$forceUpdate();
    },
    takeHeal(value: number) {
      if (this.$user.stats.hp > 0) {
        this.$popups.success(
          'Лечение засчитано',
          `Вы восстановили ${Math.min(value, this.userMaxHp - this.$user.stats.hp)} HP`,
        );
        this.$user.stats.hp += value;
        this.$user.stats.hp = Math.min(this.$user.stats.hp, this.userMaxHp);
      }
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);

      this.modalState = this.ModalStates.none;
      this.chosenValue = 0;
      this.recalculateUserStats();
      this.$forceUpdate();
    },
    takeEffect(effect: Effect) {
      this.fightEffects.push(effect);
      this.$localStorageManager.saveFightEffects(this.fightEffects);

      this.modalState = this.ModalStates.none;
      this.selectedEffect = undefined;
      this.recalculateUserStats();
      this.$forceUpdate();
    },

    async userDead() {
      this.loosedMoney = userDead(this.$user);
      this.$localStorageManager.saveLosedMoney(this.loosedMoney);
      this.$app.isUserDeadReactiveValue = true;
      this.finishFight();

      await nextTick();
      this.regenerateDeadQrs();
    },
    regenerateDeadQrs() {
      if (this.$refs.qrMoney) {
        (this.$refs.qrMoney as typeof QRGenerator).regenerate(
          generateQRText(QRTypes.resource, ResourceTypes.money, QRSources.user, String(this.loosedMoney)),
        );
      }
      ((this.$refs.allQrs as (typeof QRGenerator)[]) || []).forEach((qrElem: typeof QRGenerator, idx: number) => {
        const qr = this.scannedNotSavedQrs[idx];
        qrElem.regenerate(generateQRText(qr.type, qr.subType, qr.source, qr.value, qr.id));
      });
    },
  },
};
</script>
