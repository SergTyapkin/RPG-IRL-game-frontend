<style scoped lang="stylus">
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'

.root-signin
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
    .profile-link
      text-align left
      text-decoration none
    .profile-button
      button()
    .signin-links
      display flex
      justify-content space-between
      width 100%
      margin-top 20px
      text-decoration none
      font-small()
      .signin-by-name-link
        color colorText1
        text-decoration none
      .restore-password-link
        color colorText1
        text-decoration none
</style>

<template>
  <div class="root-signin">
    <div class="form">
      ВХОД<br>
      <FormWithErrors ref="form" :fields="fields" submit-text="Вход" :loading="loading" @success="login" />
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
      fields: {
        name: {
          title: 'Ваше имя',
          name: 'name',
          type: 'text',
          placeholder: 'Сергей Тяпкин',
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
          autocomplete: 'password',
        },
      },
      loading: false,
    };
  },

  methods: {
    async login(data) {
      this.loading = true;
      const { ok } = await this.$api.login(data.name, data.password, detectBrowser(), detectOS());
      this.loading = false;

      if (!ok) {
        this.$refs.form.setError([this.fields.name, this.fields.password], 'Неверные имя или пароль');
        return;
      }
      this.loading = true;
      await this.$store.dispatch('GET_USER');
      this.loading = false;
      this.$router.push({ name: 'profile' });
    },
  },
};
</script>
