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
      <header class="header">Сканирование QR-кода</header>
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
import { BuffsTypes, QRSources, QRTypes, ResourceTypes } from '~/constants/constants';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { ExtendedItem, getAllUserBuffs, getTotalUserMaxHP, itemIdToItem, itemsIdsToItems, parseQRText } from '~/utils/utils';
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import { GuildModelMockData } from '~/utils/APIModels';
import { type QRData } from '~/types/types';
import { parseGuildData, syncWithGuild, userDead } from '~/utils/userEvents';

export default {
  components: { CircleLoading, UserProfileInfo, QRScanner },

  data() {
    return {
      loading: false,

      textInput: '',
      scanResult: '',
      scannedSavedQrs: [] as string[],
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

      const qrData = await parseQRText(text);
      if (!qrData) {
        this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
        return;
      }
      const { type: QRType, source: QRSource, subType: QRSubType, value: QRValue, id: QRId } = qrData;

      const idxSaved = this.scannedSavedQrs.findIndex(qrId => qrId === QRId);
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
            case ResourceTypes.hp:
              this.$user.stats.hp += Number(QRValue);
              this.$user.stats.hp = Math.min(this.$user.stats.hp, getTotalUserMaxHP(this.$user));
              this.$popups.success('QR отсканирован', `Добавлено ${QRValue} здоровья`);
              if (this.$user.stats.hp <= 0) {
                userDead(this.$user);
              }
              break;
          }
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
          this.$user.notSyncedInventory.push(...items.map(i => i.id));
          this.$popups.success('QR отсканирован', `Получены предметы: ${items.map(i => `"${i.name}"`).join(', ')}`);
          break;
        }
        case QRTypes.guildData: {
          await this.syncData(QRValue);
          break;
        }
        case QRTypes.userData: {
          this.$popups.error('Этот QR-код может сканироваться только гильдией', 'Покажите его на основном экране в центральном месте');
          break;
        }
        default: {
          this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
          scanError = true;
        }
      }

      if (!scanError) {
        if (QRType !== QRTypes.guildData) {
          this.scannedNotSavedQrs.push({
            id: QRId,
            type: QRType,
            subType: QRSubType,
            source: QRSource,
            value: QRValue,
          });
          this.$localStorageManager.saveScannedNotSavedQrs(this.scannedNotSavedQrs);
          this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
          this.$router.push({ name: 'profile' });
        }
      }
    },

    async syncData(QRValue: string) {
      const guildData = parseGuildData(this, QRValue);
      if (!guildData) {
        return;
      }

      // Save guild QRs
      this.scannedSavedQrs.push(...(guildData.scannedQRs.map(qr => qr.qrId)));
      // Check not saved QRs
      this.scannedNotSavedQrs.forEach(qr => {
        const qrIdxInGuilds = guildData.scannedQRs.findIndex(q => (q.qrId === qr.id && q.userId !== this.$user.id));
        if (qrIdxInGuilds !== -1) {
          // QR Already scanned
          this.$modals.alert(
            'Один из QR-кодов уже отсканирован другим человеком до вас',
            `ID кода: ${qr.id}, тип кода: ${qr.type}, подтип: ${qr.subType}, значение: ${qr.value}`
          );
          // Decrease qr stats
          switch (qr.type) {
            case QRTypes.resource: {
              switch (qr.subType) {
                case ResourceTypes.money: {
                  this.$user.notSyncedStats.money -= Number(qr.value);
                  break;
                }
                case ResourceTypes.hp: {
                  this.$user.stats.hp -= Number(qr.value);
                  break;
                }
                case ResourceTypes.experience: {
                  this.$user.notSyncedStats.experience -= Number(qr.value);
                  break;
                }
                case ResourceTypes.power: {
                  this.$user.notSyncedStats.power -= Number(qr.value);
                  break;
                }
                case ResourceTypes.agility: {
                  this.$user.notSyncedStats.agility -= Number(qr.value);
                  break;
                }
                case ResourceTypes.intelligence: {
                  this.$user.notSyncedStats.intelligence -= Number(qr.value);
                  break;
                }
              }
              break;
            }
            case QRTypes.items: {
              let itemsIds: string[];
              try {
                itemsIds = JSON.parse(QRValue);
              } catch {
                this.$popups.error('Ошибка в структуре', 'Ошибка при парсинге предметов');
                return;
              }
              itemsIds.forEach(itemId => {
                const idx = this.$user.notSyncedInventory.findIndex(i => i === itemId);
                if (idx !== -1) {
                  this.$user.notSyncedInventory.splice(idx, 1);
                  this.$popups.error('Удален предмет', `"${itemIdToItem(itemId).name}"`);
                }
              });
              break;
            }
          }
          return;
        }
        this.scannedSavedQrs.push(...(this.scannedNotSavedQrs.map(qr => qr.id)));
      });
      this.scannedNotSavedQrs = [];
      this.$localStorageManager.saveScannedSavedQrs(this.scannedSavedQrs);
      this.$localStorageManager.saveScannedNotSavedQrs(this.scannedNotSavedQrs);

      // Update user stats
      this.loading = true;
      await syncWithGuild(this, QRValue);
      this.loading = false;
    },
  },
};
</script>
