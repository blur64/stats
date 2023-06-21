<template>
  <form
    class="login-wrapper border border-2 rounded-3 center position-absolute top-50 start-50 translate-middle"
  >
    <div class="fs-4 mb-4 mt-3">
      <span class="registration-text" @click="$router.push('/login')"
        >Вход</span
      >
      / Регистрация
    </div>
    <div class="error-message" :class="{ hidden: !errorMessage }">
      {{ errorMessage }}
    </div>
    <label class="mt-3" for="login-input">Имя пользователя</label>
    <input
      type="text"
      id="login-input"
      class="form-control mt-1 mb-2"
      required
      v-model="name"
    />
    <label for="password-input">Пароль</label>
    <input
      type="password"
      id="password-input"
      class="form-control mb-2 mt-1 mb-4 fs-7"
      required
      v-model="password"
    />
    <button
      type="submit"
      class="btn border mb-3 form-button"
      @click="sendRegistrationRequest"
    >
      Зарегистрироваться
    </button>
  </form>
</template>

<script>
import { sendRequestToUserRegistration } from '../api.js';

export default {
  data() {
    return {
      name: '',
      password: '',
      errorMessage: '',
    };
  },

  methods: {
    sendRegistrationRequest(e) {
      if (!this.password || !this.name) {
        return;
      }

      e.preventDefault();

      sendRequestToUserRegistration({
        name: this.name,
        password: this.password,
      }).then((isUserRegistered) => {
        if (!isUserRegistered) {
          this.errorMessage = 'Такой пользователь уже существует';
        } else {
          this.$router.push({ name: 'login', query: { isRegistered: 'true' } });
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  width: 400px;
  height: max-content;
}

.registration-text {
  color: var(--bs-gray-500);
  cursor: pointer;
}

.registration-text:hover {
  color: inherit;
}

.form-button:hover {
  background-color: var(--bs-gray-200);
}

#password-input {
  font-family: initial;
}

.error-message {
  color: var(--bs-danger);
  height: 24px;
}

.hidden {
  visibility: hidden;
}
</style>
