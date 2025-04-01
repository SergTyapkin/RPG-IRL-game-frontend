<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-qr-scanner
  .user-info
    animation-float(0.5s, -20px, 0, left)

  .section-scanner
    margin-top 40px
    animation-float(0.5s, -20px, 0, left)

    .info
      margin-top 30px
      margin-bottom 10px
      font-medium()
      animation-float(0.5s, -20px, 0, left)

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
      animation-float(0.5s, -20px, 0, left)

      .input
        width 150px
        padding 0 5px

      .button
        button-emp()

    .result-container
      opacity 0.1 !important
</style>

<template>
  <div class="root-page-qr-scanner">
    <UserProfileInfo
      class="user-info"
      small
      @contextmenu.prevent="syncData(GuildModelMockData)"
      style="--animation-index: 0"
      @click.ctrl.shift.prevent="$router.push({ name: 'qrGeneration' })"
    />

    <section class="section-scanner" style="--animation-index: 1">
      <QRScanner @scan="onScan" />

      <div class="info" style="--animation-index: 2">Или введите код:</div>
      <div class="input-container" style="--animation-index: 3">
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
import { ExtendedItem, getAllUserBuffs, getTotalUserMaxHP, itemsIdsToItems, parseQRText } from '~/utils/utils';
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import validateModel from '@sergtyapkin/models-validator';
import { GuildModel, GuildModelMockData } from '~/utils/APIModels';
import { UserLevels } from '~/constants/levels';
import { type QRData } from '~/types/types';
import { userIncreaseLevel } from '~/utils/userEvents';

export default {
  components: { CircleLoading, UserProfileInfo, QRScanner },

  data() {
    return {
      loading: false,

      textInput: '',
      scanResult: '',
      scannedSavedQrs: [] as QRData[],
      scannedNotSavedQrs: [] as QRData[],

      GuildModelMockData,
    };
  },

  computed: {},

  mounted() {
    this.$app.isUserDeadReactiveValue = this.$user.stats.hp <= 0;

    const scannedSavedQrs = this.$localStorageManager.loadScannedSavedQrs();
    if (scannedSavedQrs) {
      this.scannedSavedQrs = scannedSavedQrs;
    }
    const scannedNotSavedQrs = this.$localStorageManager.loadScannedNotSavedQrs();
    if (scannedNotSavedQrs) {
      this.scannedNotSavedQrs = scannedNotSavedQrs;
    }
  },

  methods: {
    async onScan(text: string) {
      this.scanResult = text;

      const qrData = parseQRText(text);
      if (!qrData) {
        this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
        return;
      }
      const { type: QRType, source: QRSource, subType: QRSubType, value: QRValue, id: QRId } = qrData;

      const idxSaved = this.scannedSavedQrs.findIndex(qr => qr.id === QRId);
      const idxNotSaved = this.scannedNotSavedQrs.findIndex(qr => qr.id === QRId);
      if (idxSaved !== -1 || idxNotSaved !== -1) {
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
                getAllUserBuffs(this.$user).forEach(buffs => {
                  valueModifier *= buffs[BuffsTypes.moneyModifier] ?? 1;
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
                getAllUserBuffs(this.$user).forEach(buffs => {
                  valueModifier *= buffs[BuffsTypes.experienceModifier] ?? 1;
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
        case QRTypes.items: {
          if (this.$user.stats.hp <= 0) {
            this.$popups.error('Вы погиблил в бою', 'Прежде чем совершать любые действия, восстановитесь на базе');
            return;
          }
          let items: ExtendedItem[] = [];
          try {
            const itemsIds = JSON.parse(QRValue);
            items = itemsIdsToItems(itemsIds);
          } catch {
            this.$popups.error('Ошибка в структуре', 'Ошибка при парсинге предметов');
            return;
          }
          this.$user.inventory.push(...items.map(i => i.id));
          this.$popups.success('QR отсканирован', `Получены предметы: ${items.map(i => `"${i.name}"`).join(', ')}`);
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

      console.log(scanError, QRType);
      if (!scanError) {
        if (QRType !== QRTypes.sync) {
          this.scannedNotSavedQrs.push({
            id: QRId,
            type: QRType,
            subType: QRSubType,
            source: QRSource,
            value: QRValue,
          });
          console.log(this.$user);
          this.$localStorageManager.saveScannedNotSavedQrs(this.scannedNotSavedQrs);
          this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
          this.$router.push({ name: 'profile' });
        }
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
        this.$user.isInFight = false;
        this.$app.isUserInFightReactiveValue = false;

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

        const expNeedsToLevel = UserLevels[this.$user.level].experience;
        if (this.$user.stats.experience >= expNeedsToLevel) {
          userIncreaseLevel(this.$user, this.$modals);
        }

        this.scannedSavedQrs.push(...this.scannedNotSavedQrs);
        this.scannedNotSavedQrs = [];
        this.$localStorageManager.saveScannedSavedQrs(this.scannedSavedQrs);
        this.$localStorageManager.saveScannedNotSavedQrs(this.scannedNotSavedQrs);

        this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
      }
    },
  },
};
</script>
