<style scoped lang="stylus">
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'

bg = colorBgDark

.root-register
  width 100%
  padding 20px

  .form-section
    max-width 600px
    margin 20px auto
    padding 20px
    padding-top 10px
    color colorText1
    text-align center
    background-color colorBg
    border-radius borderRadiusM
    font-large()
    font-bold()

    header
      font-large()
      font-bold()

      color colorSec1
      text-align left
      margin-top 20px

    .info
      font-small()

      color colorText5

      &.small
        font-small-extra()
        color colorText5
        text-align left

    .signin-link
      text-align left
      text-decoration none

    .signin-button
      margin-top 20px
      color colorText2
      border none
      button()


  .classes-section
    header
      font-large()
      font-bold()

      color colorSec1

    .info
      font-small()

      margin-bottom 20px
      color colorText4

      &.small
        font-small-extra()
        color colorText5
        text-align left

    .classes-container
      list-no-styles()

      display flex
      flex-direction column
      gap 30px

      .class-card
        hover-effect()


  .images-section
    header
      font-large()
      font-bold()

      color colorSec1

    .info
      font-small()

      margin-bottom 20px
      color colorText4

      &.small
        font-small-extra()
        color colorText5
        text-align left

    .images-container
      list-no-styles()

      display flex
      flex-wrap wrap
      gap 15px
      justify-content space-evenly

      .image-card
        hover-effect()
        flex 1
        min-width 120px
        width 100%
        max-width 160px
        border-radius borderRadiusMax
        overflow-y hidden
        border 2px solid colorBorder
        trans()

        &.selected
          transform scale(1.2)
          border-color colorEmp1

        img
          width 100%
          height 100%
          display block
    .signin-button
      margin-top 40px
      color colorText2
      border none
      button()
</style>

<template>
  <div class="root-register">
    <transition mode="out-in" name="opacity">
      <section v-if="state === States.enterName" class="form-section">
        РЕГИСТРАЦИЯ<br>
        <div class="info">В гильдию: {{ guildName }} #{{ guildId }}</div>
        <header>Введите ваше имя</header>
        <div class="info small">Шаг 1 из 3</div>
        <FormWithErrors
          ref="form"
          :fields="fields"
          submit-text="К выбору класса"
          :loading="loading"
          @success="saveTextAndGoToChooseClasses"
        />
        <router-link v-if="!NO_SERVER_MODE" class="signin-link" :to="{ name: 'login' }">
          <button class="signin-button">Войти в имеющийся профиль</button>
        </router-link>
      </section>

      <section v-else-if="state === States.chooseClass" class="classes-section">
        <header>Выберите класс персонажа</header>
        <div class="info small">Шаг 2 из 3</div>
        <div class="info">Класс нельзя будет изменить!</div>
        <ul class="classes-container">
          <Class
            v-for="classObj in Classes"
            :key="classObj.type"
            class="class-card"
            :class-obj="classObj"
            @click="chooseClass(classObj)"
          />
        </ul>
      </section>

      <section v-else-if="state === States.chooseImage" class="images-section">
        <header>Выберите аватар</header>
        <div class="info small">Шаг 3 из 3</div>
        <div class="info">Аваар тоже нельзя будет изменить!</div>
        <ul class="images-container">
          <li
            v-for="(imageUrl, i) in UserAvatars"
            :key="i"
            class="image-card"
            @click="savedImageUrl = imageUrl"
            :class="{ selected: imageUrl === savedImageUrl }"
          >
            <img :src="imageUrl" :alt="i">
          </li>
        </ul>
        <button class="signin-button" :disabled="!savedImageUrl" @click="register">
          Зарегистрировать персонажа
        </button>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import FormWithErrors from '~/components/FormWithErrors.vue';
import { detectBrowser, detectOS, myUuid } from '~/utils/utils';
import Validators from '~/utils/validators';
import { Classes } from '~/constants/classes';
import ClassComponent from '~/components/Class.vue';
import { type Class, Guild, User } from '~/types/types';
import { DEFAULT_USER_MAX_UP, NO_SERVER_MODE, UserRoles } from '~/constants/constants';
import { Guilds } from '~/constants/guilds';
import { UserAvatars } from '~/constants/userAvatars';

export default {
  components: { Class: ClassComponent, FormWithErrors },
  data() {
    return {
      guildId: Number(this.$route.query.guildId) as number,
      userRole: this.$route.query.userRole as string,

      guildName: '',

      savedTextData: {} as { name: string; password: string; passwordAgain: string },
      savedClass: {} as Class,
      savedImageUrl: '',

      state: 0,
      States: {
        enterName: 0,
        chooseClass: 1,
        chooseImage: 2,
      },

      fields: Object.assign(
        {
          name: {
            title: 'Имя',
            name: 'name',
            type: 'text',
            placeholder: 'Сергей Тяпкин',
            validationRegExp: Validators.name.regExp,
            prettifyResult: Validators.name.prettifyResult,
            info: 'Имя Фамилия',
            autocomplete: 'name',
          },
        },
        NO_SERVER_MODE
          ? {}
          : {
              password: {
                title: 'Пароль',
                name: 'password',
                type: 'password',
                placeholder: '●●●●●●',
                validationRegExp: Validators.password.regExp,
                prettifyResult: Validators.password.prettifyResult,
                info: 'Ваш пароль хэшируется и не может быть раскрыт, вводите надёжный пароль',
                autocomplete: 'password',
              },
              passwordAgain: {
                title: 'Пароль ещё раз',
                name: 'password',
                type: 'password',
                placeholder: '●●●●●●',
                validationRegExp: Validators.password.regExp,
                prettifyResult: Validators.password.prettifyResult,
              },
            },
      ),
      loading: false,

      Classes,
      UserAvatars,
      NO_SERVER_MODE,
    };
  },

  mounted() {
    if (isNaN(this.guildId) || Guilds[this.guildId] === undefined) {
      this.$popups.error('Ошибка', 'Необходимо отсканировать QR гильдии, чтобы зарегистрироваться!');
      this.$router.push({ name: 'page404' });
      return;
    }
    this.guildName = Guilds[this.guildId].name;
  },

  methods: {
    saveTextAndGoToChooseClasses(data: { name: string; password: string; passwordAgain: string }) {
      if (!NO_SERVER_MODE && data.password !== data.passwordAgain) {
        (this.$refs.form as typeof FormWithErrors).setError(
          [this.fields.password, this.fields.passwordAgain],
          'Пароли не совпадают',
        );
        return;
      }

      this.savedTextData = data;
      this.state = this.States.chooseClass;
    },
    async chooseClass(classObj: Class) {
      if (
        !(await this.$modals.confirm(
          `Выбираем класс "${classObj.name}"`,
          'Вы уверены? Выбранный класс нельзя будет изменить!',
        ))
      ) {
        return;
      }
      this.savedClass = classObj;
      this.state = this.States.chooseImage;
    },
    async chooseImage(imageUrl: string) {
      this.savedImageUrl = imageUrl;
      this.state = this.States.chooseImage;
    },

    async register() {
      if (!NO_SERVER_MODE) {
        this.loading = true;
        const { ok } = await this.$api.register(
          this.savedTextData.name,
          this.savedTextData.password,
          this.savedClass.type,
          this.guildId,
          detectBrowser(),
          detectOS(),
        );
        this.loading = false;

        if (!ok) {
          this.state = this.States.enterName;
          (this.$refs.form as typeof FormWithErrors).setError(
            [this.fields.name],
            'Неизвестная ошибка. Проверьте подключение к сети',
          );
          return;
        }
      } else {
        const newUser: User = {
          id: myUuid(),
          name: this.savedTextData.name,
          level: 1,
          imageUrl: this.savedImageUrl,
          stats: {
            hp: DEFAULT_USER_MAX_UP,
            experience: 0,
            money: 0,
            power: 0,
            agility: 0,
            intelligence: 0,
          },
          notSyncedStats: {
            experience: 0,
            money: 0,
            power: 0,
            agility: 0,
            intelligence: 0,
          },
          classType: this.savedClass.type,
          guildId: String(this.guildId),
          skills: [],
          inventory: [],
          notSyncedInventory: [],
          equipment: {},
          role: this.userRole || UserRoles.user,
          isInFight: false,

          isSignedIn: true,
        };
        await this.$store.commit('SET_USER', newUser);
        const guildInfo = Guilds[this.guildId];
        const newGuild: Guild = {
          id: String(this.guildId),
          name: guildInfo.name,
          description: '',
          money: 0,
          experience: 0,
          inventory: [],
          level: 1,
          imageUrl: guildInfo.imageUrl,
          leaderId: '',
          members: [],
        };
        await this.$store.commit('SET_GUILD', newGuild);
      }
      this.loading = true;
      await this.$store.dispatch('GET_USER');
      this.loading = true;
      this.$router.push({ name: 'profile' });
    },
  },
};
</script>
