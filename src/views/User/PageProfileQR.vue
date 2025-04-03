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
    .qr
      margin-bottom 20px
    .info
      font-small()
      list-no-styles()

      color colorText2

      li
        animation-float(0.5s, -20px, 0, left)

        margin-bottom 5px
        padding-left 10px
        border-left colorText2 2px solid

        mark
          color colorEmp1
          background none
</style>

<template>
  <div class="root-profile-qr">
    <section class="section-user-info" style="--animation-index: 0">
      <UserProfileInfo small />
    </section>

    <section class="section-qr" style="--animation-index: 1">
      <QRGenerator ref="qr" class="qr" />
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
  </div>
</template>

<script lang="ts">
import QRGenerator from '~/components/QRGenerator.vue';
import { deepClone, generateQRText } from '~/utils/utils';
import { QRSources, QRTypes } from '~/constants/constants';
import { nextTick } from 'vue';
import UserProfileInfo from '~/components/UserProfileInfo.vue';

export default {
  components: { UserProfileInfo, QRGenerator },

  data() {
    return {
      scannedSavedQrs: [] as string[],
    };
  },

  computed: {},

  async mounted() {
    const scannedSavedQrs = this.$localStorageManager.loadScannedSavedQrs();
    if (scannedSavedQrs) {
      this.scannedSavedQrs = scannedSavedQrs;
    }
    await nextTick();
    await this.updateQR();
  },

  methods: {
    async updateQR() {
      const userCopy = deepClone(this.$user);
      userCopy.scannedQRs = this.scannedSavedQrs;
      (this.$refs.qr as typeof QRGenerator).regenerate(
        await generateQRText(QRTypes.userData, '_', QRSources.user, JSON.stringify(userCopy)),
      );
    },
  },
};
</script>
