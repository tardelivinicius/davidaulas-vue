<template>
 <q-page padding class="login">
        <div class="row justify-center q-mt-xl">
          <div class="col-4">
            <q-card class="bg-white">
              <q-card-main>
                <div class="q-pa-md">
                  <div class="q-gutter-md" style="max-width: 300px">
                    <q-input v-model="text" label="E-mail" />
                    <q-input v-model="text" label="Senha" />
                  </div>
                </div>
              </q-card-main>

              <q-card-actions align="right">
                <q-btn color="primary" align="" label="Entrar" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
 </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style scoped>
.login {
  background-color: #999
}
</style>
