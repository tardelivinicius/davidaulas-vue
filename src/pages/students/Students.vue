<template>
  <div class="q-pa-md q-pl-xl q-pr-xl">
    <q-table
      title="Alunos"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'desc',
          required: true,
          label: '#',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Nome do Aluno', align: 'center', label: 'Nome do Aluno', field: 'name', sortable: true },
        { name: 'E-mail', label: 'E-mail', field: 'email', sortable: true },
        { name: 'Nome do Responsável', label: 'Nome do Responsável', field: 'name_responsible', sortable: true },
        { name: 'Data da Matrícula', label: 'Data da Matrícula', field: 'date_joined', sortable: true },
        { name: 'Status', label: 'Status', field: 'status', sortable: true },
        { name: 'actions', label: '', field: '', sortable: true },
        {
          name: 'act',
          required: true,
          label: 'Ações',
          align: 'left',
          field: '<q-btn>teste</q-btn>',
          sortable: true
        }
      ],
      data: [],
      original: []
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
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    },
    this.searchFields())
  },
  methods: {
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      this.loading = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // // get all rows if "All" (0) is selected
        // const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

        // // calculate starting row of data
        // const startRow = (page - 1) * rowsPerPage

        // // fetch data from "server"
        const returnedData = this.searchFields()

        // // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },
    searchFields () {
      this.$axios.get('http://127.0.0.1:8000/api/student/', this.getAuthHeader)
        .then(response => {
          this.original = response.data
        })

      return this.original
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count
        }
      })
      return count
    }
  }
}
</script>
