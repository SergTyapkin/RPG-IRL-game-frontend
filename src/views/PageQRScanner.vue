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
      opacity 0.5
      .info
        margin-top 30px
        margin-bottom 10px
        font-medium()

        color colorSec1
      .result
        font-small()

        box-sizing content-box
        min-height 1lh
        padding 3px
        color colorSec1
        border 1px solid colorSec1
        border-radius borderRadiusS
</style>

<template>
  <div class="root-page-qr-scanner">
    <UserProfileInfo small />

    <section class="section-scanner">
      <QRScanner @scan="onScan" />
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
import { NO_SERVER_MODE, QRTypes, ResourceTypes } from '~/constants/constants';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { getTotalUserMaxHP, itemIdToItem, parseQRText } from '~/utils/utils';
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import validateModel from '@sergtyapkin/models-validator';
import { GuildModel } from '~/utils/APIModels';

export default {
  components: { CircleLoading, UserProfileInfo, QRScanner },

  data() {
    return {
      loading: false,

      scanResult: '',
    };
  },

  computed: {},

  mounted() {},

  methods: {
    async onScan(text: string) {
      const QRResult = parseQRText(text);
      if (!QRResult) {
        this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
        return;
      }
      const {QRType, QRSubType, QRSource, QRValue} = QRResult;

      let scanError = false;
      switch (QRType) {
        case QRTypes.resource: {
          switch (QRSubType) {
            case ResourceTypes.money:
              this.$user.notSyncedStats.money += Number(QRValue);
              this.$popups.success('QR отсканирован', `Добавлено ${QRValue} монет`);
              break;
            case ResourceTypes.experience:
              this.$user.notSyncedStats.experience += Number(QRValue);
              this.$popups.success('QR отсканирован', `Добавлено ${QRValue} опыта`);
              break;
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
          this.$user.stats.hp -= Number(QRValue);
          this.$popups.success('QR отсканирован', `Нанесено ${QRValue} урона`);
          break;
        }
        case QRTypes.heal: {
          this.$user.stats.hp += Number(QRValue);
          this.$user.stats.hp = Math.min(this.$user.stats.hp, getTotalUserMaxHP(this.$user));
          this.$popups.success('QR отсканирован', `Вылечено ${QRValue} здоровья`);
          break;
        }
        case QRTypes.item: {
          this.$user.inventory.push(QRValue);
          const item = itemIdToItem(QRValue);
          this.$popups.success('QR отсканирован', `Получен предмет "${item.name}"`);
          break;
        }
        case QRTypes.sync: {
          if (!NO_SERVER_MODE) {
            this.loading = true;
            await this.$api.syncAllData(
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
            await this.$store.dispatch('GET_USER');
            this.loading = false;
            this.$popups.success('QR отсканирован', 'Ваши предметы и данные, а также данные гильдии синхронизированы');
          } else {
            const guildData = validateModel(GuildModel, QRValue);
            await this.$store.commit('SET_GUILD', guildData);
            this.$popups.success('QR отсканирован', 'Данные гильдии обновлены');
          }
          break;
        }
        default: {
          this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
          scanError = true;
        }
      }

      if (!scanError) {
        this.$router.push({ name: 'profile' });
      }
    },
  },
};
</script>
