<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-qr-scanner
  .section-scanner
    margin-top 40px

    .result-container
      opacity 0.1

    .info
      margin-top 30px
      margin-bottom 10px
      font-medium()

      color colorSec1

    .input-container .input
    .result-container .result
      input-no-styles()
      font-small()

      box-sizing content-box
      min-height 1lh
      padding 3px
      color colorSec1
      border 1px solid colorSec1
      border-radius borderRadiusS

    .input-container
      display flex
      gap 15px
      .input
        padding 0 5px
        width 150px
      .button
        button-emp()
</style>

<template>
  <div class="root-page-qr-scanner">
    <UserProfileInfo small @contextmenu.prevent="syncData(GuildModelMockData)" />

    <section class="section-scanner">
      <QRScanner @scan="onScan" />

      <div class="info">Или введите код:</div>
      <div class="input-container">
        <input class="input" v-model="textInput">
        <button class="button" @click="onScan(textInput)">Отправить</button>
      </div>

      <CircleLoading v-if="loading" />
      <div class="result-container">
        <div class="info">Результат сканирования:</div>
        <div class="result">{{ scanResult }}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import QRScanner from '~/components/QRScanner.vue';
import { BuffsTypes, NO_SERVER_MODE, QRSources, QRTypes, ResourceTypes } from '~/constants/constants';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { getAllUserEffects, getTotalUserMaxHP, itemIdToItem, parseQRText } from '~/utils/utils';
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import validateModel from '@sergtyapkin/models-validator';
import { GuildModel, GuildModelMockData } from '~/utils/APIModels';
import { UserLevels } from '~/constants/levels';

export default {
  components: { CircleLoading, UserProfileInfo, QRScanner },

  data() {
    return {
      loading: false,

      textInput: '',
      scanResult: '',
      scannedQrs: [] as string[],

      GuildModelMockData,
    };
  },

  computed: {},

  mounted() {
    const scannedQrs = this.$localStorageManager.loadScannedQrs();
    if (scannedQrs) {
      this.scannedQrs = scannedQrs;
    }
  },

  methods: {
    async onScan(text: string) {
      this.scanResult = text;

      const {QRType, QRSource, QRSubType, QRValue, QRId} = parseQRText(text);
      if (QRType === undefined) {
        this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
        return;
      }

      if (this.scannedQrs.includes(QRId)) {
        this.$popups.error('QR отсканирован повторно', 'Вы уже сканировали этот QR');
        return;
      }

      let scanError = false;
      switch (QRType) {
        case QRTypes.resource: {
          if (this.$user.stats.hp <= 0) {
            this.$popups.error('Вы погиблил в бою', 'Прежде чем совершать любые действия, восстановитесь на базе');
            return;
          }
          switch (QRSubType) {
            case ResourceTypes.money: {
              let value = Number(QRValue);
              let valueModifier = 1;
              if (QRSource === QRSources.quest) {
                getAllUserEffects(this.$user).forEach(e => {
                  valueModifier *= e.buffs[BuffsTypes.moneyModifier] ?? 1;
                });
              }
              value *= valueModifier;
              value = Math.round(value);

              this.$user.notSyncedStats.money += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} монет`);
              break;
            }
            case ResourceTypes.experience: {
              let value = Number(QRValue);
              let valueModifier = 1;
              if (QRSource === QRSources.quest) {
                getAllUserEffects(this.$user).forEach(e => {
                  valueModifier *= e.buffs[BuffsTypes.experienceModifier] ?? 1;
                });
              }
              value *= valueModifier;
              value = Math.round(value);

              this.$user.notSyncedStats.experience += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} опыта`);
              break;
            }
            case ResourceTypes.power:
              this.$user.notSyncedStats.power += Number(QRValue);
              this.$popups.success('QR отсканирован', `Добавлено ${QRValue} очков силы`);
              break;
            case ResourceTypes.agility:
              this.$user.notSyncedStats.agility += Number(QRValue);
              this.$popups.success('QR отсканирован', `Добавлено ${QRValue} очков ловкости`);
              break;
            case ResourceTypes.intelligence:
              this.$user.notSyncedStats.intelligence += Number(QRValue);
              this.$popups.success('QR отсканирован', `Добавлено ${QRValue} очков интеллекта`);
              break;
          }
          break;
        }
        case QRTypes.damage: {
          if (this.$user.stats.hp <= 0) {
            this.$popups.error('Вы погиблил в бою', 'Прежде чем совершать любые действия, восстановитесь на базе');
            return;
          }
          this.$user.stats.hp -= Number(QRValue);
          this.$popups.success('QR отсканирован', `Нанесено ${QRValue} урона`);
          break;
        }
        case QRTypes.heal: {
          if (this.$user.stats.hp <= 0) {
            this.$popups.error('Вы погиблил в бою', 'Прежде чем совершать любые действия, восстановитесь на базе');
            return;
          }
          this.$user.stats.hp += Number(QRValue);
          this.$user.stats.hp = Math.min(this.$user.stats.hp, getTotalUserMaxHP(this.$user));
          this.$popups.success('QR отсканирован', `Вылечено ${QRValue} здоровья`);
          break;
        }
        case QRTypes.item: {
          if (this.$user.stats.hp <= 0) {
            this.$popups.error('Вы погиблил в бою', 'Прежде чем совершать любые действия, восстановитесь на базе');
            return;
          }
          this.$user.inventory.push(QRValue);
          const item = itemIdToItem(QRValue);
          this.$popups.success('QR отсканирован', `Получен предмет "${item.name}"`);
          break;
        }
        case QRTypes.sync: {
          await this.syncData(QRValue);
          break;
        }
        default: {
          this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
          scanError = true;
        }
      }

      if (!scanError) {
        this.scannedQrs.push(QRId);
        this.$localStorageManager.saveScannedQrs(this.scannedQrs);
        this.$router.push({ name: 'profile' });
      }
    },

    async syncData(QRValue: string) {
      if (!NO_SERVER_MODE) {
        this.loading = true;
        const { ok } = await this.$api.syncAllData(
          this.$user.stats.experience + this.$user.notSyncedStats.experience,
          this.$user.stats.money + this.$user.notSyncedStats.money,
          this.$user.inventory,
          {
            hat: this.$user.equipment.hat,
            main: this.$user.equipment.main,
            boots: this.$user.equipment.boots,
          },
          this.$user.skills,
          this.$user.stats.power + this.$user.notSyncedStats.power,
          this.$user.stats.agility + this.$user.notSyncedStats.agility,
          this.$user.stats.intelligence + this.$user.notSyncedStats.intelligence,
        );
        this.loading = false;
        if (!ok) {
          this.$popups.success('Ошибка сети', 'Проверьте подключение к сети и повторите попытку синхронизации');
          return;
        }
        this.loading = true;
        await this.$store.dispatch('GET_USER');
        this.loading = false;
        this.$popups.success('QR отсканирован', 'Ваши предметы и данные, а также данные гильдии синхронизированы');
      } else {
        const guildData = validateModel(GuildModel, QRValue);
        await this.$store.commit('SET_GUILD', guildData);
        this.$popups.success('QR отсканирован', 'Данные гильдии обновлены');

        this.$user.stats.hp = getTotalUserMaxHP(this.$user);
        this.$app.isUserDeadReactiveValue = false;

        this.$user.stats.experience += this.$user.notSyncedStats.experience;
        this.$user.stats.money += this.$user.notSyncedStats.money;
        this.$user.stats.power += this.$user.notSyncedStats.power;
        this.$user.stats.agility += this.$user.notSyncedStats.agility;
        this.$user.stats.intelligence += this.$user.notSyncedStats.intelligence;
        this.$user.notSyncedStats.experience = 0;
        this.$user.notSyncedStats.money = 0;
        this.$user.notSyncedStats.power = 0;
        this.$user.notSyncedStats.agility = 0;
        this.$user.notSyncedStats.intelligence = 0;
        this.$user.isInFight = false;

        const expNeedsToLevel = UserLevels[this.$user.level].experience;
        if (this.$user.stats.experience >= expNeedsToLevel) {
          this.$user.stats.experience -= expNeedsToLevel;
          this.$user.level += 1;
          const maxLevel = Math.max(...Object.keys(UserLevels).map(Number));
          this.$modals.alert('Уровень повышен!', `Вы получили уровень ${this.$user.level}!
${this.$user.level < maxLevel ? `Для уровня ${this.$user.level + 1} понадобится ${UserLevels[this.$user.level + 1].experience}xp` : ''}`);
        }

        this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
      }
    }
  },
};
</script>
