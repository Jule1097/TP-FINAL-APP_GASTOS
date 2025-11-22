<template>
  <div class="register-container">
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="card p-4 shadow-sm" style="width: 360px; border-radius: 6px;">
        <h2 class="title d-flex justify-content-center">Register</h2>
        <div class="mb-3">
          <label for="username" class="form-label">Nombre Usuario</label>
          <InputText id="username" v-model="formData.userName" @input="formDirty.userName = true"
            class="form-control" />
          <div v-if="!validarUserName() && formDirty.userName" class="text-danger">
            {{ validacionForm.mensajeUserName }}
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <InputText id="email" v-model="formData.email" type="email" @input="formDirty.email = true"
            class="form-control" />
          <div v-if="!validarEmail() && formDirty.email" class="text-danger">
            {{ validacionForm.mensajeEmail }}
          </div>
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Contraseña</label>
          <InputText id="password" v-model="formData.password" type="password" @input="formDirty.password = true"
            class="form-control" />
          <div v-if="!validarPassword() && formDirty.password" class="text-danger">
            {{ validacionForm.mensajePassword }}
          </div>
        </div>
        <div class="d-grid gap-3">
          <div class="text-center">
            <Button label="Registrarse" icon="pi pi-user-plus" class="btn rounded-pill px-4 register-btn" :disabled="puedeRegistrar()" @click="handleRegister()"></Button>
          </div>
        </div>
        <div class="text-center mt-3">
          <small>¿Ya posees cuenta? <button class="btn btn-success rounded-pill pb-2" @click.prevent="goToLogin">Inicia sesión</button></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { UserService } from '../services/user.service.js';

export default {
  name: 'Register',
  components: {
    Button,
    InputText
  },
  data() {
    return {
      formData: {
        userName: '',
        email: '',
        password: ''
      },
      formDirty: this.getInitialData(),
      UserService: new UserService(),
    }
  },
  methods: {
    getInitialData() {
      return {
        userName: '',
        email: '',
        password: ''
      };
    },
    goToLogin() {
      this.$router.push('/login');
    },
    validarUserName() {
      const userName = this.formData.userName;
      return userName.length >= 4;
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
    puedeRegistrar() {
      return !this.validacionForm.ok;
    },
    async handleRegister() {

      const newUser = {...this.formData};

      const res = await this.UserService.registerUser(newUser);

      if(res.success) {
        alert(res.messageSuccess);
        this.goToLogin();
      } else {
        alert(res.messageError);
      }
    }

  },
  computed: {
    validacionForm() {

      let mensajeUserName = '';
      if (!this.validarUserName()) {
        mensajeUserName = 'El nombre de usuario es obligatorio y debe tener al menos 4 caracteres.\n';
      };

      let mensajeEmail = '';

      if (!this.validarEmail()) {
        mensajeEmail = 'El email es obligatorio y debe ser válido.\n';
      };

      let mensajePassword = ''
      if (!this.validarPassword()) {
        mensajePassword = 'La contraseña es obligatoria y debe tener al menos 6 caracteres.\n';
      };

      return {
        mensajeUserName,
        mensajeEmail,
        mensajePassword,
        ok: mensajeUserName.length === 0 && mensajeEmail.length === 0 && mensajePassword.length === 0
      }
    }
  }
}

</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
