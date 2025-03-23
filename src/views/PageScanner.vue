<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-qr-scanner
  .result-container
    opacity 0.5
    .info
      margin-top 30px
      margin-bottom 10px
      font-medium()
      color colorSec1
    .result
      font-small()
      color colorSec1
      border 1px solid colorSec1
      padding 3px
      min-height 1lh
      box-sizing content-box
      border-radius borderRadiusS
</style>

<template>
  <div class="root-page-qr-scanner">
    <section class="section-scanner">
      <QRScanner @scan="onScan" />
      <div class="result-container">
        <div class="info">Результат сканирования:</div>
        <div class="result">{{ scanResult }}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import QRScanner from '~/components/QRScanner.vue';
import { QRTypes, ResourceTypes } from '~/constants';
import validateModel from '@sergtyapkin/models-validator';
import { GuildModel, ItemModel } from '~/utils/APIModels';

export default {
  components: { QRScanner, CircleLoading },

  data() {
    return {
      loading: false,

      scanResult: '',
    };
  },

  computed: {
  },

  mounted() {

  },

  methods: {
    onScan(text: string) {
      this.scanResult = text;
      const qrType = text[0];
      text = text.slice(1);

      let scanError = false;
      switch (qrType) {
        case QRTypes.resource: {
          const resourceType = text[0];
          text = text.slice(1);
          const value = Number(text);
          switch (resourceType) {
            case ResourceTypes.money:
              this.$user.notSyncedStats.money += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} монет`)
              break;
            case ResourceTypes.hp:
              this.$user.notSyncedStats.maxHp += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} максимального здоровья`)
              break;
            case ResourceTypes.experience:
              this.$user.notSyncedStats.experience += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} опыта`)
              break;
            case ResourceTypes.power:
              this.$user.notSyncedStats.power += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков силы`)
              break;
            case ResourceTypes.agility:
              this.$user.notSyncedStats.agility += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков ловкости`)
              break;
            case ResourceTypes.protection:
              this.$user.notSyncedStats.protection += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков защиты`)
              break;
            case ResourceTypes.intelligence:
              this.$user.notSyncedStats.intelligence += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков интеллекта`)
              break;
          }
          break;
        }
        case QRTypes.damage: {
          const value = Number(text);
          this.$user.stats.hp -= value;
          this.$popups.success('QR отсканирован', `Нанесено ${value} урона`)
          break;
        }
        case QRTypes.heal: {
          const value = Number(text);
          this.$user.stats.hp += value;
          this.$user.stats.hp = Math.min(this.$user.stats.hp, this.$user.stats.maxHp);
          this.$popups.success('QR отсканирован', `Вылечено ${value} здоровья`)
          break;
        }
        case QRTypes.item: {
          const item = validateModel(ItemModel, text) as Item;
          item.notSynced = true;
          this.$user.inventory.push(item);
          this.$popups.success('QR отсканирован', `Получен предмет "${item.name}"`)
          break;
        }
        case QRTypes.sync: {
          const guild = validateModel(GuildModel, text) as Guild;
          this.$store.dispatch('SET_GUILD', guild)
          this.$popups.success('QR отсканирован', 'Данные гильдии обновлены. Ваши предметы синхронизированы')
          break;
        }
        default: {
          this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
          scanError = true;
        }
      }

      if (!scanError) {
        this.$router.push({name:'profile'});
      }
    },
  },
};
</script>
