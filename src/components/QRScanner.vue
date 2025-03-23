<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-qr-scanner
  .section-scanner
    .header
      font-large()
      color colorSec1
    video
      max-width 100%
    .camera-buttons-container
      display flex
      width 100%
      justify-content space-between
      gap 20px
      overflow-x auto
      .camera-button
        padding 5px
        min-width 150px
        button()

</style>

<template>
  <div class="root-qr-scanner roll-active" :class="{closed: closed}">
    <section class="section-scanner">
      <header class="header">Сканирование QR-кода</header>
      <video class="qr-scanner-video" ref="video" />
      <div v-if="!noCamerasSelection" class="camera-buttons-container scrollable">
        <button
          v-for="camera in existingCameras"
          class="button bg rounded text-small camera-button"
          @click="selectCamera(camera)"
        >
          {{ camera.label ? camera.label : camera.id }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import QrScanner from "qr-scanner";

export default {
  emits: ['scan'],

  props: {
    closed: {
      type: Boolean,
      default: false,
    },
    noCamerasSelection: Boolean,
  },

  data() {
    return {
      active: false,
      existingCameras: [],
      _scanner: null,
    };
  },

  async mounted() {
    this.existingCameras = await QrScanner.listCameras(true);

    this._scanner = new QrScanner(this.$refs.video, (result) => {
      this.$emit('scan', result.data);
    }, {
      highlightScanRegion: true,
      maxScansPerSecond: 10,
    });

    this.start();
  },

  unmounted() {
    this._scanner.destroy();
  },

  methods: {
    start() {
      if (!this.active) {
        this._scanner.start().then(
            () => {},
            (error) => {
              this.$modal.alert("Не предоставлены права доступа к камере", "Настройте доступ к камере для этого сайта в браузере");
            }
        );
        this.active = true;
      }
    },

    selectCamera(camera) {
      this._scanner.setCamera(camera.id);
    },

    stop() {
      this._scanner.stop();
      this.active = false;
    },
  }
};
</script>
