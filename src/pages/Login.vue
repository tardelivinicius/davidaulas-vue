<template>
 <q-page padding class="login">
        <div class="row justify-center q-mt-xl">
          <div class="col-8 col-sm-4">
           <q-card class="my-card">
      <q-img src="https://i.pinimg.com/originals/84/8a/9b/848a9b44e8cd21df86edd296d9c8245b.jpg">
        <div class="absolute-center">
            <h3>DavidAulas</h3>
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
      headers: ''
    }
  },

  computed: {
    getHeader () {
      let headers = {}
      return headers = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'Basic ' + btoa(process.env.APP_CLIENT_ID + ':' + process.env.APP_CLIENT_SECRET)
        }
      }
    },
    // getAuthHeader () {
    //   let headers = {}
    //   return headers = {
    //     headers: {
    //       'content-type': 'application/json',
    //       'authorization': 'Basic ' + btoa(process.env.APP_CLIENT_ID + ':' + process.env.APP_CLIENT_SECRET),
    //       'authorization': 'Bearer ' + this.access_token
    //     }
    //   }
    // }
  },

  methods: {
    login () {
      this.$q.loading.show()
      let data = {
        grant_type: 'password',
        username: this.username,
        password: this.password
      }

      // this.$axios.post('http://127.0.0.1:8000/o/token/', this.$qs.stringify(data), this.getHeader)
      //   .then(response => {
      //     this.$store.dispatch('params/SET_ATTEMPTS', [0])
      //     this.setUserData(response)
      //   })
      //   .catch(e => {
      //     this.$q.loading.hide()
      //     this.show_error = true

      //     if (e.response) {
      //       if (e.response.data.qty_login_attempts) {
      //         this.$store.dispatch('params/SET_ATTEMPTS', [e.response.data.qty_login_attempts])
      //       }
      //     }
      //     console.log(e)
      //   })
    }
  },

  name: 'PageIndex'
}
</script>

<style scoped>
.login {
  background-color: #999
}
</style>
