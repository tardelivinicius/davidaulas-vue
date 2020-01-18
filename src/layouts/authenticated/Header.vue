<template>
  <q-layout>
    <q-header class="shadow-1 toolbar-header">
      <q-toolbar>
        <q-toolbar-title>
          DavidAulas
        </q-toolbar-title>
        <q-btn-dropdown stretch flat label="Vinícius Valle">
            <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-side>
                    <q-icon name="far fa-cog" size="1.5rem" />
                  </q-item-side>
                    <q-item-section>
                      <q-item-label>Mensagens</q-item-label>
                    </q-item-section>
                  </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-side>
                    <q-icon name="far fa-cog" size="1.5rem" />
                  </q-item-side>
                  <q-item-section>
                    <q-item-label>Editar Perfil</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-side>
                    <q-icon name="far fa-cog" size="1.5rem" />
                  </q-item-side>
                  <q-item-section>
                    <q-item-label>Alterar Senha</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset />

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-side>
                    <q-icon name="far fa-cog" size="1.5rem" />
                  </q-item-side>
                  <q-item-section>
                    <q-item-label>Sair</q-item-label>
                  </q-item-section>
                </q-item>

            </q-list>
        </q-btn-dropdown>
      </q-toolbar>
      </q-header>
      <div class="mobile-hide shadow-1" color="black">
        <div class="row q-pt-md q-px-md fit justify-center">
          <div class="col-sm-12 q-pt-xl">
             <div class="col-10 q-mb-sm text-right self-center">
                <q-btn flat size="md" color="dark" label="Alunos"/>
                <q-btn flat size="md" color="dark" label="Cursos"/>
                <q-btn flat size="md" color="dark" label="Agenda"/>
                <q-btn flat size="md" color="dark" label="Aulas"/>
                <q-btn-dropdown flat size="md" color="dark" label="Financeiro">
                  <q-list>
                      <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section>
                            <q-item-label>Pagamentos</q-item-label>
                          </q-item-section>
                        </q-item>
                      <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                          <q-item-label>Relatórios</q-item-label>
                        </q-item-section>
                      </q-item>
                  </q-list>
                </q-btn-dropdown>
             </div>
          </div>
        </div>
      </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style scoped>
.toolbar-header {
  background-color: #3c8dbc;
}
</style>
