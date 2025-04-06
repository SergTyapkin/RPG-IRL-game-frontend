<style lang="stylus" scoped>
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'
@import '../../styles/fonts.styl'
@import '../../styles/utils.styl'
@import '../../styles/animations.styl'

.root-profile
  position relative
  columns = 6
  padding 30px 0 !important
  .section-qrs-grid
    position fixed
    top 0
    left 0
    display flex
    flex-wrap wrap
    gap 15px
    justify-content center
    width 100%
    padding 20px
    .qr-data
      width 100%
      opacity 0.1
    .qr-container
    .webcam
      width 'calc((100% - 15px * %s) / %s)' % ((columns - 1) columns)
      .qr
        margin-bottom 5px
      header
        centered-flex-container()

        gap 5px
      .input-container
        position absolute
        left 0
        display flex
        width 100%
        opacity 0.1
        input
          flex 1
          width 100%
          padding 5px
        button
          button()

          flex 0
</style>

<template>
  <div class="root-profile">
    <section class="section-qrs-grid">
      <div v-for="(guildData, guildId) in allGuildsData" :key="guildId" class="qr-container">
        <QRGenerator ref="qrs" class="qr" />
        <header>
          <img :src="guildData?.imageUrl" alt="logo">
          {{ guildData?.name }}
        </header>
        <input ref="qrInputs" readonly class="qr-data">
      </div>

      <br>
      <section class="webcam">
        <QRScanner @scan="onScan" no-cameras-selection @click.ctrl.shift="fakeScan" />
        <div class="input-container">
          <input class="input" v-model="textInput">
          <button class="button" @click="onScan(textInput)">Отправить</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import QRGenerator from '~/components/QRGenerator.vue';
import { Guilds } from '~/constants/guilds';
import QRScanner from '~/components/QRScanner.vue';
import { deepClone, generateQRText, parseQRText } from '~/utils/utils';
import { MAX_UUIDS_PER_QR, QRSources, QRTypes, UserRoles } from '~/constants/constants';
import validateModel from '@sergtyapkin/models-validator';
import { QRUserModel } from '~/utils/APIModels';
import { QRUserData, User } from '~/types/types';
import { GuildLevels, UserLevels } from '~/constants/levels';
import { nextTick } from 'vue';
import { type ExtendedGuild } from '~/utils/userEvents';
import { UserAvatars } from '~/constants/userAvatars';
import { NumbersToInventoryIds } from '~/constants/items';


export default {
  components: { QRScanner, QRGenerator },

  data() {
    return {
      allGuildsData: {} as {[key: number]: ExtendedGuild},

      showHiddenGuilds: (this.$route.query.showHidden === 'true'),

      scannedQRs: [] as {u: string, q: string}[],
    };
  },

  computed: {
  },

  async mounted() {
    this.$app.userRoleReactiveValue = this.$user.role;

    const allGuildsData = this.$localStorageManager.loadAllGuildsData();
    if (!allGuildsData) {
      this.allGuildsData = {};
      Object.keys(Guilds).forEach(guildId => {
        const guildIdNum = Number(guildId)
        const guild = Guilds[guildIdNum];
        if (guild && (this.showHiddenGuilds || !guild.hidden)) {
          this.allGuildsData[guildIdNum] = {
            id: guildId,
            name: guild.name,
            description: guild.description,
            money: 0,
            experience: 0,
            level: 0,
            imageUrl: guild.imageUrl,
            inventory: [] as string[],
            leaderId: '',
            members: [] as object[],
            hidden: false,
          } as ExtendedGuild;
        }
      });
      this.$localStorageManager.saveAllGuildsData(this.allGuildsData);
    } else {
      this.allGuildsData = allGuildsData as unknown as {[key: number]: ExtendedGuild};
    }

    this.scannedQRs = this.$localStorageManager.loadGuildScannedQrs() || [];

    await nextTick();
    this.regenerateQRs();
  },

  unmounted() {
  },

  methods: {
    async regenerateGuildQr(guildId: number) {
      const qrElements = this.$refs.qrs as typeof QRGenerator[];
      const qrInputs = this.$refs.qrInputs as HTMLInputElement[];
      const qrIdx = Object.keys(this.allGuildsData).findIndex(gId => Number(gId) === Number(guildId))
      const guild = this.allGuildsData[guildId];
      const guildDataCopy = deepClone(guild);
      guildDataCopy.scannedQRs = this.scannedQRs;
      guildDataCopy.leaderId = guildDataCopy.members?.length ? guildDataCopy.members[0].id : '';
      console.log(guildDataCopy);
      const qrData = await generateQRText(
        QRTypes.guildData, '_', QRSources.guild, JSON.stringify(guildDataCopy),
      );
      if (qrElements && qrIdx !== -1 && qrElements[qrIdx]) {
        qrElements[qrIdx].regenerate(qrData);
        qrInputs[qrIdx].value = qrData;
      }
    },
    regenerateQRs() {
      Object.keys(this.allGuildsData).forEach(guildId =>  {
        this.regenerateGuildQr(Number(guildId));
      });
    },

    recalculateGuildLevel(guild: ExtendedGuild) {
      function getTotalMemberExperience($user: {level: number, experience: number}): number {
        let res = 0;
        for (let level = 1; level < $user.level; level++) {
          res += UserLevels[level].experience;
        }
        res += $user.experience;
        return res;
      }

      guild.experience = 0;
      guild.members.forEach(member => guild.experience += getTotalMemberExperience(member));

      const maxLevel = Math.max(...Object.keys(GuildLevels).map(Number));
      const prevLevel = guild.level;
      guild.level = 1;
      while (guild.level < maxLevel) {
        const newLevelExp = GuildLevels[guild.level].experience;
        if (newLevelExp <= guild.experience) {
          guild.level += 1;
          guild.experience -= newLevelExp;
        } else {
          return;
        }
      }
      if (guild.level > prevLevel) {
        this.$popups.success(`Уровень гильдии ${guild.name} повышен до ${guild.level}`);
      }
    },

    async onScan(text: string) {
      const res = await parseQRText(text);
      if (!res) {
        this.$popups.error('Неизвестный QR-код', 'Проверьте, что этот QR код от этой игры');
        return;
      }
      const {type: QRType, value: QRValue} = res;
      if (QRType !== QRTypes.userData) {
        this.$popups.error('Это не QR вашего персонажа', 'Этому экрану можно показывать только QR персонажа');
        return;
      }
      let userData: User;
      try {
        const u = validateModel(QRUserModel, QRValue) as QRUserData;
        userData = {
          id: u.id,
          name: u.n,
          level: u.l,
          imageUrl: UserAvatars[u.iU],
          stats: {hp: 0, experience: 0, money: 0, power: 0, agility: 0, intelligence: 0},
          notSyncedStats: {experience: 0, money: 0, power: 0, agility: 0, intelligence: 0},
          classType: u.cT,
          guildId: u.gId,
          skills: [],
          inventory: u.i.map(i => NumbersToInventoryIds[i]),
          notSyncedInventory: [],
          equipment: {
            hat: u.e.h ? NumbersToInventoryIds[u.e.h] : undefined,
            main: u.e.m ? NumbersToInventoryIds[u.e.m] : undefined,
            boots: u.e.b ? NumbersToInventoryIds[u.e.b] : undefined,
          },
          scannedQRs: u.newQrs,
          role: UserRoles.user,
          isInFight: false,
          isSignedIn: false,
        }
      } catch (err) {
        this.$popups.error('Ошибка чтения QR', 'Ошибка при парсинге объекта пользователя');
        console.error("Ошибка при парсинге объекта пользователя", err);
        return;
      }

      // Add user data into guild
      const guildId = Number(userData.guildId);
      const guild = this.allGuildsData[guildId];
      if (!guild) {
        this.$popups.error('Вашей гильдии не существует');
        return;
      }
      // Update members
      const memberIdx = guild.members.findIndex(m => m.id === userData.id)
      if (memberIdx !== -1) {
        const member = guild.members[memberIdx];
        member.level = userData.level;
        member.experience = userData.stats.experience;
      } else {
        guild.members.push({
          id: userData.id,
          name: userData.name,
          imageUrl: userData.imageUrl,
          experience: userData.stats.experience,
          level: userData.level,
        });
      }
      this.recalculateGuildLevel(guild);
      // Update scanned QRs
      (userData.scannedQRs || []).forEach(q => {
        const idx = this.scannedQRs.findIndex(qr => qr.q === q);
        if (idx === -1) {
          if (this.scannedQRs.length >= (MAX_UUIDS_PER_QR / 2)) {
            this.scannedQRs.shift();
          }
          this.scannedQRs.push({u: userData.id, q: q});
        }
      });
      this.$localStorageManager.saveGuildScannedQrs(this.scannedQRs);
      this.$localStorageManager.saveAllGuildsData(this.allGuildsData);

      // Info
      this.$popups.success(`Данные гильдии ${guild.name} обновлены`);
      // Regenerate
      this.regenerateQRs();
    },

    async fakeScan() {
      // const userData = UserModelMockData;
      // userData.stats.experience = 40;
      // this.onScan(await generateQRText(QRTypes.userData, '_', QRSources.user, JSON.stringify(userData)));
    }
  }
};
</script>
