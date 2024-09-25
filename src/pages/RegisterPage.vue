<template>
  <q-page class="column text-center justify-center fullscreen q-mx-sm">
    <div class="q-ma-auto register-form ">
      <h1 class="text-weight-medium">Inscreva-se</h1>
      <q-form class="q-gutter-lg q-pa-lg">
        <q-input
          filled
          v-model="nome"
          label="Nome"
          stack-label
          :dense="dense"
          aria-required="true"
          :rules="[val => !!val || 'Nome é obrigatório']" />
        <q-input
          filled
          v-model="email"
          label="E-mail"
          stack-label
          :dense="dense"
          aria-required="true"
          :rules="[val => !!val || 'Nome é obrigatório']" />
        <div class="q-pa-sm justify-between q-ma-xl">
          <q-btn label="Voltar" @click="handleBack" color="dark q-mr-sm" />
          <q-btn label="Inscreva-se" type="submit" @click="handleSubmit" color="dark q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import cliente from 'app/http';
import { error } from 'console';
import IAssinantes from 'app/interface/IAsssinante';

const nome = ref('')
const email = ref('')
const dense = ref(false)

const router = useRouter()

const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if(!nome.value || !email.value){
    console.log('Favor preencher todos os campos')
  }

  try {
    const assinantes : IAssinantes = {
      nome : nome.value,
      email: email.value
    }

    await cliente.post('/assinantes', assinantes)
    console.log('Dados enviados com sucesso')
  }catch(e){
    console.error('Erro ao enviar dados', e)
  }
}

const handleBack = () => {
  router.push('/')
}

</script>



<style scoped>
h1{
  font-size: 1.5rem;
  font-family: "Sofia Sans Extra Condensed", sans-serif ;
}

.register-form{
  background-color: white;
  border-radius: 5px;
  border: solid black .01px;
}

@media (min-width: 500px ){
  .register-form{
    width: 520px;
    margin: auto;
    padding: 40px;
  }

  h1{
    font-size: 2rem;
  }

  .handlesButtons{
    height: fit-content;
    padding: 10px;
  }
}


@media (min-width: 800px){
  .register-form{
    width: 650px;
    height: 550px;
    display: flex;
    flex-direction: column;
  }

  .handlesButtons{
    margin-top: 10px;
  }
}
</style>
