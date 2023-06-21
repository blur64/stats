<template>
  <form
    class="login-wrapper border border-2 rounded-3 center position-absolute top-50 start-50 translate-middle"
  >
    <div class="fs-4 mb-4 mt-3">
      Вход /
      <span class="registration-text" @click="$router.push('/registration')"
        >Регистрация</span
      >
    </div>
    <div
      class="info-message"
      :class="{
        hidden: !isRegistered && !errorMessage,
        'error-message': errorMessage,
      }"
    >
      {{ isRegistered ? 'Регистрация была успешно пройдена' : errorMessage }}
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
      @click="sendLoginRequest"
    >
      Войти
    </button>
  </form>
</template>

<script>
import { sendRequestToUserLogin, fetchUserTables } from '../api.js';
import {
  addTables,
  notifyTablesLoadedStateSubs,
} from '../tables/tablesList.js';

export default {
  data() {
    return {
      isRegistered: false,
      password: '',
      name: '',
      errorMessage: '',
    };
  },

  methods: {
    sendLoginRequest(e) {
      if (!this.password || !this.name) {
        return;
      }

      if (this.isRegistered) {
        this.isRegistered = false;
      }

      e.preventDefault();

      sendRequestToUserLogin({ name: this.name, password: this.password }).then(
        (result) => {
          if (!result.errorMessage) {
            localStorage.setItem('userId', result.userId);
            fetchUserTables(result.userId).then((tables) => {
              addTables(tables);
              notifyTablesLoadedStateSubs();
            });
            this.$router.push('/');
          } else if (result.errorMessage === 'Incorrect user name sent') {
            this.errorMessage = 'Неверное имя пользователя.';
          } else {
            this.errorMessage = 'Неверный пароль.';
          }
        }
      );
    },
  },

  created() {
    if (this.$route.query.isRegistered) {
      this.isRegistered = true;
    }
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

.info-message {
  height: 24px;
  line-height: 1rem;
}

.error-message {
  color: var(--bs-danger);
}

.hidden {
  visibility: hidden;
}

#password-input {
  font-family: initial;
}
</style>
