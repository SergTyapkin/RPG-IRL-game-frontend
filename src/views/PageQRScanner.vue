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
      <div class="result-container">
        <div class="info">Результат сканирования:</div>
        <div class="result">{{ scanResult }}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import QRScanner from '~/components/QRScanner.vue';
import { QRTypes, ResourceTypes } from '~/constants/constants';
import validateModel from '@sergtyapkin/models-validator';
import { GuildModel } from '~/utils/APIModels';
import { type Guild } from '~/types/types';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { itemIdToItem } from '~/utils/utils';

export default {
  components: { UserProfileInfo, QRScanner },

  data() {
    return {
      scanResult: '',
    };
  },

  computed: {},

  mounted() {},

  methods: {
    onScan(text: string) {
      try {
        this.scanResult = atob(text);
      } catch {
        this.$popups.error('Отсканирован неизвестный QR', 'Проверьте, действительно ли этот QR от этой игры');
        return;
      }
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
              this.$popups.success('QR отсканирован', `Добавлено ${value} монет`);
              break;
            case ResourceTypes.experience:
              this.$user.notSyncedStats.experience += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} опыта`);
              break;
            case ResourceTypes.power:
              this.$user.notSyncedStats.power += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков силы`);
              break;
            case ResourceTypes.agility:
              this.$user.notSyncedStats.agility += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков ловкости`);
              break;
            case ResourceTypes.intelligence:
              this.$user.notSyncedStats.intelligence += value;
              this.$popups.success('QR отсканирован', `Добавлено ${value} очков интеллекта`);
              break;
          }
          break;
        }
        case QRTypes.damage: {
          const value = Number(text);
          this.$user.stats.hp -= value;
          this.$popups.success('QR отсканирован', `Нанесено ${value} урона`);
          break;
        }
        case QRTypes.heal: {
          const value = Number(text);
          this.$user.stats.hp += value;
          this.$user.stats.hp = Math.min(this.$user.stats.hp, this.$user.stats.maxHp);
          this.$popups.success('QR отсканирован', `Вылечено ${value} здоровья`);
          break;
        }
        case QRTypes.item: {
          const itemId = text;
          this.$user.inventory.push(itemId);
          const item = itemIdToItem(itemId);
          this.$popups.success('QR отсканирован', `Получен предмет "${item.name}"`);
          break;
        }
        case QRTypes.sync: {
          const guild = validateModel(GuildModel, text) as Guild;
          this.$store.dispatch('SET_GUILD', guild);
          this.$popups.success('QR отсканирован', 'Данные гильдии обновлены. Ваши предметы синхронизированы');
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
