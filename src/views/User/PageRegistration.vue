<style scoped lang="stylus">
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'

bg = colorBgDark

.root-register
  width 100%
  padding 20px
  .form
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
    .signin-link
      text-align left
      text-decoration none
    .signin-button
      button()
</style>

<template>
  <div class="root-register">
    <div class="form">
      РЕГИСТРАЦИЯ<br>
      <FormWithErrors
        ref="form"
        :fields="fields"
        submit-text="Зарегистрироваться"
        :loading="loading"
        @success="register"
      />
      <router-link class="signin-link" :to="{ name: 'login' }">
        <button class="signin-button">Войти</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import FormWithErrors from '~/components/FormWithErrors.vue';
import { detectBrowser, detectOS } from '~/utils/utils';
import Validators from '~/utils/validators';

export default {
  components: { FormWithErrors },
  data() {
    return {
      guildId: this.$route.query.guildId,

      fields: {
        name: {
          title: 'Имя',
          name: 'name',
          type: 'text',
          placeholder: 'Тяпкин Сергей',
          validationRegExp: Validators.name.regExp,
          prettifyResult: Validators.name.prettifyResult,
          autocomplete: 'name',
        },
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
      loading: false,
    };
  },

  mounted() {
    if (this.guildId === undefined) {
      this.$popups.error("Ошибка", "Необходимо отсканировать QR гильдии, чтобы зарегистрироваться!");
      this.$router.push({name: 'page404'})
    }
  },

  methods: {
    async register(data) {
      if (data.password !== data.passwordAgain) {
        this.$refs.form.setError([this.fields.password, this.fields.passwordAgain], 'Пароли не совпадают');
        return;
      }

      this.loading = true;
      const { ok } = await this.$api.register(
        data.name,
        data.password,
        detectBrowser(),
        detectOS(),
      );
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError([this.fields.email], 'Неизвестная ошибка. Проверьте подключение к сети');
        return;
      }
      this.loading = true;
      await this.$store.dispatch('GET_USER');
      this.loading = true;
      this.$router.push({ name: 'profile' });
    },
  },
};
</script>
