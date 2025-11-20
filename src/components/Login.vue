<template>
  <div class="login-container">
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="card p-4 shadow-sm" style="width: 360px; border-radius: 6px;">
        <h2 class="title align-content-center justify-content-center d-flex">Login</h2>
        <div class="mb-3">
          <label for="userEmail" class="form-label">Email</label>
          <InputText id="userEmail" v-model="formData.email" @input="formDirty.email = true" class="form-control" />
          <div v-if="!validarEmail() && formDirty.email" class="text-danger">
            {{ validacionForm.mensajeEmail }}
          </div>
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Contraseña</label>
          <InputText id="password" v-model="formData.password" @input="formDirty.password = true" type="password"
            class="form-control" />
          <div v-if="!validarPassword() && formDirty.password" class="text-danger">
            {{ validacionForm.mensajePassword }}
          </div>
        </div>
        <div class="d-grid gap-3">
          <div class="text-center">
            <Button label="Login" icon="pi pi-user" class="btn rounded-pill px-4" @click="handleLogin()" :disabled="puedeLogear()"></Button>
          </div>
          <div class="text-center">
            <Button label="Registrarse" icon="pi pi-user-plus" class="btn rounded-pill px-4 register-btn"
              @click="goToRegister()"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { UserService } from '../services/user.service.js';
import { useAuthStore } from '../stores/authStore.js';

export default {
  name: 'Login',
  components: {
    Button,
    InputText
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      formDirty: this.getInitialData(),
      userService : new UserService()
    }
  },
  methods: {
    getInitialData() {
      return {
        email: '',
        password: ''
      }
    },
    validarEmail() {
      const email = this.formData.email;
      const emailValido = email.includes('@') && email.includes('.');
      return emailValido;
    },
    validarPassword() {
      const password = this.formData.password;
      return password.length >= 6;
    },
    puedeLogear() {
      return !this.validacionForm.ok;
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    async handleLogin() {

        const userData = { ...this.formData };

        const res = await this.userService.userLogin(this.formData);

        if(res.success) {
          const authStore = useAuthStore();
          authStore.userLogin(res.userLogged.userName);
          this.goToHome();
        } else {
          alert(res.messageError);
        }
    }

  },
  computed: {
    validacionForm() {

      let mensajeEmail = '';

      if (!this.validarEmail()) {
        mensajeEmail = 'El email es obligatorio y debe ser válido.\n';
      };

      let mensajePassword = ''
      if (!this.validarPassword()) {
        mensajePassword = 'La contraseña es obligatoria y debe tener al menos 6 caracteres.\n';
      };

      return {
        mensajeEmail,
        mensajePassword,
        ok: mensajeEmail.length === 0 && mensajePassword.length === 0
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #75b798;
  width: 380px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.register-btn .p-button,
.register-btn.p-button {
  background-color: #0d6efd !important;
  border-color: #0d6efd !important;
  color: #fff !important;
  box-shadow: none !important;
}

.register-btn .p-button:hover,
.register-btn.p-button:hover {
  background-color: #0b5ed7 !important;
  border-color: #0b5ed7 !important;
}
</style>
