<template>
 <q-page padding class="login">
        <div class="row justify-center q-mt-xl">
          <div class="col-8 col-sm-4">
           <q-card class="my-card">
      <q-img src="https://i.pinimg.com/originals/84/8a/9b/848a9b44e8cd21df86edd296d9c8245b.jpg">
        <div class="text-subtitle2 absolute-top text-center">
            DavidAulas
        </div>
      </q-img>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            <q-input v-model="username" label="E-mail" />
            <q-input v-model="password" type="password" label="Senha" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Entrar" @click="login()"/>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="show_error" @ok="hideError()" :cancel="false">
      <q-card>
        <q-card-section>
          <div class="text-h6">Erro de Login</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Usuário ou senha inválidos
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
          </div>
        </div>
 </q-page>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      show_error: false
    }
  },

  computed: {
    getHeader () {
      let headers = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
          // 'authorization': 'Basic ' + btoa(process.env.APP_CLIENT_ID + ':' + process.env.APP_CLIENT_SECRET)
        }
      }
      return headers
    }
  },

  methods: {
    login () {
      this.$q.loading.show()
      let fd = new FormData()
      fd.append('grant_type', 'password')
      fd.append('username', this.username)
      fd.append('password', this.password)
      fd.append('client_id', process.env.APP_CLIENT_ID)
      fd.append('client_secret', process.env.APP_CLIENT_SECRET)
      this.$axios.post('http://127.0.0.1:8000/o/token/', fd, this.getHeader)
        .then(response => {
          this.$store.dispatch('common/SET_ACCESS_TOKEN', [response.data.access_token, response.data.refresh_token])
          window.location = '/students'
        })
        .catch(e => {
          this.$q.loading.hide()
          this.show_error = true
          console.log(e)
        })
    },

    hideError () {
      this.show_error = false
      this.custom_error_message = false
    }
  },

  name: 'PageIndex'
}
</script>

<style scoped>
.login {
  background-color: rgb(190, 189, 189)
}
</style>
