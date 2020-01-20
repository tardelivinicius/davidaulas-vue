<template>
    <q-page padding>
        <div class="text-h4 q-mb-md text-secondary q-pl-md">
            <q-icon name="far fa-user" class="q-mb-sm" /> Alunos
        </div>

        <div class="row gutter-xs">
            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-md">
                <span class="text-h5 text-weight-light q-">Dados Básicos</span>
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-input v-model="name" label="Nome do Aluno" />
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-input v-model="name_responsible" label="Nome do Responsável" />
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <!-- <q-field :error="email_error" :error-label="email_error ? `${$t('email_not_unique')}` : ''"> -->
                <q-input v-model="email" label="E-mail" />
                <!-- </q-field> -->
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pt-md">
                <span class="text-h5 text-weight-light q-">Telefones</span>
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-input
                    v-model="telephone_residential"
                    label="Telefone Residencial"
                    mask="(##) ####-####"
                />
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-input
                    v-model="telephone_mobile"
                    label="Telefone Celular"
                    mask="(##) #####-####"
                />
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pt-md">
                <span class="text-h5 text-weight-light q-">Endereço</span>
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-input v-model="address" label="Endereço" />
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-input v-model="number" label="Número" />
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pt-md">
                <span class="text-h5 text-weight-light q-">Status</span>
            </div>

            <div class="col-xs-12 col-sm-12 q-pl-md q-pr-xl">
                <q-select
                        v-model="status"
                        :options="[
                            { label: 'Ativo', value: 1 },
                            { label: 'Inativo', value: 2 },
                            { label: 'Deletado', value: 3 },
                        ]"
                    />
            </div>
        </div>

        <div class="row gutter-sm justify-end q-mt-lg q-pr-xl">
            <div class="col-xs-12 col-sm-1">
                <q-btn :loading="loading" color="primary" @click="saveUser()" style="width: 150px">
                    Gravar
                    <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        Gravando...
                    </template>
                </q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      name: '',
      name_responsible: '',
      email: '',
      telephone_residential: '',
      telephone_mobile: '',
      address: '',
      number: '',
      status: '',
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      access_token: 'common/access_token'
    }),

    getAuthHeader () {
      let headers = {
        headers: {
          'content-type': 'application/json',
          // 'authorization': 'Basic ' + btoa(process.env.APP_CLIENT_ID + ':' + process.env.APP_CLIENT_SECRET),
          'authorization': 'Bearer ' + this.access_token
        }
      }
      return headers
    }
  },

  methods: {
    saveUser () {
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 3000)
    },

    fetchData () {
      this.$q.loading.show()
      this.$axios.get(`http://127.0.0.1:8000/api/students/${this.id}/`, this.getAuthHeader)
        .then(response => {
          this.name = response.data.name
          this.name_responsible = response.data.name
          this.email = response.data.email
          this.telephone_residential = response.data.telephone_residential
          this.telephone_mobile = response.data.telephone_mobile
          this.address = response.data.address
          this.number = response.data.number
          this.status = response.data.status
        },
        this.$q.loading.hide()
        )
    }
  },

  created () {
    this.id = this.$route.params.id
    if (this.id !== 0) this.fetchData()
  }
}
</script>
