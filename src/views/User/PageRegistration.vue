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

    .info
      font-small()
      color colorText5

    .signin-link
      text-align left
      text-decoration none

    .signin-button
      margin-top 20px
      button()
      border none
      color colorText2

  .classes-section
    header
      font-large()
      color colorSec1

    .info
      font-small()
      color colorText4
      margin-bottom 20px

    .classes-container
      list-no-styles()
      display flex
      flex-direction column
      gap 30px

      .class-card
        hover-effect()
</style>

<template>
  <div class="root-register">
    <transition mode="out-in" name="opacity">
      <section v-if="!textFieldsFilledState" class="form-section">
        РЕГИСТРАЦИЯ<br>
        <div class="info">В гильдию: {{ guildName }} #{{ guildId }}</div>
        <FormWithErrors
          ref="form"
          :fields="fields"
          submit-text="Зарегистрироваться"
          :loading="loading"
          @success="saveTextAndGoToChooseClasses"
        />
        <router-link class="signin-link" :to="{ name: 'login' }">
          <button class="signin-button">Войти в имеющийся профиль</button>
        </router-link>
      </section>
      <section v-else class="classes-section">
        <header>Выбери класс персонажа</header>
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
    </transition>
  </div>
</template>

<script lang="ts">
import FormWithErrors from '~/components/FormWithErrors.vue';
import { detectBrowser, detectOS } from '~/utils/utils';
import Validators from '~/utils/validators';
import { Classes } from '~/constants/classes';
import ClassComponent from '~/components/Class.vue';
import { type Class, Guild, User } from '~/types/types';
import { DEFAULT_USER_MAX_UP, DefaultAbilityImage, DefaultAvatarImage, NO_SERVER_MODE } from '~/constants/constants';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: { Class: ClassComponent, FormWithErrors },
  data() {
    return {
      guildId: this.$route.query.guildId as string,
      guildName: this.$route.query.guildName as string,

      textFieldsFilledState: false,
      savedTextData: {} as {name: string, password: string, passwordAgain: string},

      fields: Object.assign({
        name: {
          title: 'Имя',
          name: 'name',
          type: 'text',
          placeholder: 'Тяпкин Сергей',
          validationRegExp: Validators.name.regExp,
          prettifyResult: Validators.name.prettifyResult,
          autocomplete: 'name',
        },
      },
        NO_SERVER_MODE ? {} : {
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
      }),
      loading: false,

      Classes,
    };
  },

  mounted() {
    if (this.guildId === undefined || this.guildName === undefined) {
      this.$popups.error('Ошибка', 'Необходимо отсканировать QR гильдии, чтобы зарегистрироваться!');
      this.$router.push({ name: 'page404' });
    }
  },

  methods: {
    saveTextAndGoToChooseClasses(data: {name: string, password: string, passwordAgain: string}) {
      if (!NO_SERVER_MODE && (data.password !== data.passwordAgain)) {
        (this.$refs.form as typeof FormWithErrors).setError([this.fields.password, this.fields.passwordAgain], 'Пароли не совпадают');
        return;
      }

      this.savedTextData = data;
      this.textFieldsFilledState = true;
    },

    async chooseClass(classObj: Class) {
      if (!(await this.$modals.confirm(`Выбираем класс "${classObj.name}"`, 'Вы уверены? Выбранный класс нельзя будет изменить!'))) {
        return;
      }
      if (!NO_SERVER_MODE) {
        this.loading = true;
        const { ok } = await this.$api.register(
          this.savedTextData.name,
          this.savedTextData.password,
          classObj.type,
          this.guildId,
          detectBrowser(),
          detectOS(),
        );
        this.loading = false;

        if (!ok) {
          this.textFieldsFilledState = false;
          (this.$refs.form as typeof FormWithErrors).setError([this.fields.name], 'Неизвестная ошибка. Проверьте подключение к сети');
          return;
        }
      } else {
        const newUser: User = {
          id: uuidv4(),
          name: this.savedTextData.name,
          level: 1,
          imageUrl: DefaultAvatarImage,
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
          classType: classObj.type,
          guildId: String(this.guildId),
          skills: [],
          inventory: [],
          equipment: {},
          role: 'user',

          isSignedIn: true,
        };
        await this.$store.commit('SET_USER', newUser);
        const newGuild: Guild = {
          id: this.guildId,
          name: this.guildName,
          description: '',
          money: 0,
          experience: 0,
          inventory: [],
          level: 1,
          imageUrl: DefaultAbilityImage,
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
