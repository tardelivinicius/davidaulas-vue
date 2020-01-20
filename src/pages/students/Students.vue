<template>
  <q-page padding class="q-ma-xl">
        <q-table
            :data="students"
            @request="onRequest"
            :columns="columns"
            :pagination.sync="server_pagination"
            :loading="loading"
            :filter="filter"
            row-key="name"
            :no-data-label="$t('no_data_avaliable')"
            :no-results-label="$t('no_results_found')"
            :loading-label="$t('loading_data')"
            :rows-per-page-label="$t('items_per_page')"
            :rows-per-page-options="[5,10,50,100]"
            binary-state-sort
        >

        <template slot="top-right" slot-scope="props" :props="props">
          <q-search v-model="filter" icon="far fa-search" placeholder="Buscar" />
        </template>

         <template slot="top" slot-scope="props" :props="props">
            <q-search v-model="filter" icon="far fa-search" placeholder="Buscar" />
            <div class="col" />
            <q-btn color="primary" icon="fas fa-plus" label="Novo" @click="$router.push({ name: 'student', params: { id: 0 } })"/>
          </template>

          <q-tr slot="header" slot-scope="props" :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ $t(col.label) }}
            </q-th>
          </q-tr>

            <q-tr slot="body" slot-scope="props" :props="props">
                <q-td auto-width key="id" :props="props">
                    {{ props.row.id }}
                </q-td>

                <q-td key="name" :props="props">
                    {{ props.row.name }}
                </q-td>

                <q-td key="email" :props="props">
                    {{ props.row.email }}
                </q-td>

                <q-td key="name_responsible" :props="props">
                    {{ props.row.name_responsible }}
                </q-td>

                <q-td key="date_joined" :props="props">
                    {{ props.row.date_joined }}
                </q-td>
                <q-td key="status" :props="props" auto-width>
                    <q-chip small :icon="getIconStatus(props.row.status)" :color="getColorStatus(props.row.status)" class="full-width">
                        {{ $t(getStatus(props.row.status)) }}
                    </q-chip>
                </q-td>
                <q-td key="actions" :props="props">
                    <q-btn flat round color="primary" icon="fas fa-pencil-alt" size='10px' @click="$router.push({ name: 'student', params: { id: props.row.id  } })" />
                    <q-btn flat round color="negative" icon="fas fa-trash-alt" size='10px' />
                </q-td>
            </q-tr>
        </q-table>

  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      server_pagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 5,
        descending: false,
        sortBy: null
      },
      loading: false,
      students: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: '#',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: 'E-mail',
          align: 'left',
          field: 'email',
          sortable: true
        },
        {
          name: 'name_responsible',
          required: true,
          label: 'Nome do Responsável',
          align: 'left',
          field: 'name_responsible',
          sortable: true
        },
        {
          name: 'date_joined',
          required: true,
          label: 'Data da Matrícula',
          align: 'left',
          field: 'date_joined',
          sortable: true
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: 'edit',
          sortable: false
        },
        {
          name: 'actions',
          required: true,
          label: '',
          align: 'right',
          field: 'edit',
          sortable: false
        }
      ],
      filter: '',
      action_id: '',
      confirm_remove: false
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

  mounted () {
    this.onRequest({
      pagination: this.server_pagination,
      filter: undefined
    })
  },

  methods: {
    onRequest ({ pagination }) {
      this.loading = true
      this.server_pagination = pagination
      let order = pagination.descending ? '-' : ''
      let orderBy = pagination.sortBy ? order + pagination.sortBy : ''

      let data = {
        'page_size': this.server_pagination.rowsPerPage,
        'page': this.server_pagination.page,
        'search': this.filter,
        'ordering': orderBy
      }

      this.$axios.get('http://127.0.0.1:8000/api/students/?' + JSON.stringify(data), this.getAuthHeader)
        .then(response => {
          this.server_pagination.rowsPerPage = response.data.count
          this.students = []
          response.data.filter(result => {
            this.students.push({
              id: result.id,
              name: result.name,
              email: result.email,
              name_responsible: result.name_responsible,
              date_joined: result.date_joined,
              status: result.status
            })
          })

          this.loading = false
        })
        .catch(e => {
          this.loading = false
          console.log(e)
        })
    },

    getStatus (status) {
      if (status === 1) return 'Ativo'
      else if (status === 2) return 'Inativo'
      else if (status === 3) return 'Deletado'
    },

    getIconStatus (status) {
      if (status === 1) return 'fas fa-check'
      else if (status === 2) return 'fas fa-ban'
      else if (status === 3) return 'fas fa-trash-alt'
    },

    getColorStatus (status) {
      if (status === 1) return 'positive'
      else if (status === 2) return 'warning'
      else if (status === 3) return 'negative'
    }
  }
}
</script>
