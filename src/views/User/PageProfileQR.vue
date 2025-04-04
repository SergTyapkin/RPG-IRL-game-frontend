<style lang="stylus" scoped>
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'
@import '../../styles/fonts.styl'
@import '../../styles/utils.styl'
@import '../../styles/animations.styl'

.root-profile-qr
  position relative
  .section-user-info
    animation-float(0.5s, -20px, 0, left)
  .section-qr
    animation-float(0.5s, -20px, 0, left)
    input
      width 100%
      padding 5px
      font-small()
    .text-qr
      opacity 0.1
    .qr
      margin-bottom 20px
    .info
      font-small()
      list-no-styles()

      margin-top 20px
      margin-bottom 10px
      color colorText2

      li
        animation-float(0.5s, -20px, 0, left)

        margin-bottom 5px
        padding-left 10px
        border-left colorText2 2px solid

        mark
          color colorEmp1
          background none

  .section-buttons
    margin-top 200px
    .button-logout
      button-danger()
</style>

<template>
  <div class="root-profile-qr">
    <section class="section-user-info" style="--animation-index: 0">
      <UserProfileInfo small show-class />
    </section>

    <section class="section-qr" style="--animation-index: 1">
      <div class="info">Не забудьте отсканировать QR гильдии после показа этого QR-кода</div>
      <QRGenerator ref="qr" class="qr" />
      <input ref="input" readonly class="text-qr">
      <ul class="info">
        <li style="--animation-index: 2">
          <mark>Покажите этот QR</mark>
          центральной гильдейской системе, чтобы загрузить данные о себе <mark>в гильдию</mark>.
        </li>
        <li style="--animation-index: 3">
          Всегда <mark>показывайте сначала этот qr-код</mark>, а потом уже сканируйте гильдейский!
        </li>
      </ul>
    </section>

    <section class="section-buttons">
      <button class="button-logout" @click="logout">Удалить профиль</button>
    </section>
  </div>
</template>

<script lang="ts">
import QRGenerator from '~/components/QRGenerator.vue';
import { deepClone, generateQRText } from '~/utils/utils';
import { NO_SERVER_MODE, QRSources, QRTypes } from '~/constants/constants';
import { nextTick } from 'vue';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { QRData } from '~/types/types';

export default {
  components: { UserProfileInfo, QRGenerator },

  data() {
    return {
      loading: false,

      scannedSavedQrs: [] as string[],
      scannedNotSavedQrs: [] as QRData[],
    };
  },

  computed: {},

  async mounted() {
    const scannedSavedQrs = this.$localStorageManager.loadScannedSavedQrs();
    if (scannedSavedQrs) {
      this.scannedSavedQrs = scannedSavedQrs;
    }
    const scannedNotSavedQrs = this.$localStorageManager.loadScannedNotSavedQrs();
    if (scannedNotSavedQrs) {
      this.scannedNotSavedQrs = scannedNotSavedQrs;
    }
    await nextTick();
    await this.updateQR();
  },

  methods: {
    async updateQR() {
      const userCopy = deepClone(this.$user);
      userCopy.scannedQRs = this.scannedSavedQrs
        .concat(this.scannedNotSavedQrs.map(qr => qr.id));
      const qrText = await generateQRText(QRTypes.userData, '_', QRSources.user, JSON.stringify(userCopy));
      (this.$refs.qr as typeof QRGenerator).regenerate(qrText);
      (this.$refs.input as HTMLInputElement).value = qrText;
    },

    async logout() {
      if (!(await this.$modals.confirm('Вы уверены, что хотите выйти из профиля?'))) {
        return;
      }
      if (!NO_SERVER_MODE) {
        this.loading = true;
        const { ok } = await this.$api.logout();
        this.loading = true;

        if (!ok) {
          this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
          return;
        }
      }
      await this.$store.dispatch('DELETE_USER');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
