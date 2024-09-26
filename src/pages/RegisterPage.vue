<template>
  <q-page class="column text-center justify-center fullscreen q-mx-sm">
    <div class="q-ma-auto register-form">
      <h1 class="text-weight-medium">Inscreva-se</h1>

      <div v-if="errorMessage" class="q-mb-md">
        <q-banner class="bg-red text-white" inline-actions>
          {{ errorMessage }}
        </q-banner>
      </div>
      <q-form class="q-gutter-lg q-pa-lg" @submit.prevent="handleSubmit">
        <q-input
          filled
          v-model="nome"
          label="Nome"
          stack-label
          :dense="dense"
          aria-required="true"
          :rules="[(val) => !!val || 'Nome é obrigatório']"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="E-mail"
          stack-label
          :dense="dense"
          aria-required="true"
          :rules="[(val) => !!val || 'E-mail é obrigatório']"
        />
        <div class="q-pa-sm justify-between q-ma-xl">
          <q-btn label="Voltar" @click="handleBack" color="dark q-mr-sm" />
          <q-btn
            label="Inscreva-se"
            type="submit"
            color="dark q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <div>
      <q-dialog
        v-model="showSuccesModal"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">Parabéns</div>
            <span>Cadastro Realizado com Sucesso </span>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { IAssinante } from "app/interface/IAssinante";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";

const nome = ref("");
const email = ref("");
const dense = ref(false);
const showSuccesModal = ref(false)
const errorMessage = ref("")

const router = useRouter();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hideMessage = (messageRef: Ref<string>) => {
  setTimeout(()=> {messageRef.value = ""}, 2000)
}

const handleSubmit = () => {
  errorMessage.value = ""

//Validações
  if(!nome.value){
    errorMessage.value = "Nome é obrigatório";
    hideMessage(errorMessage)
    return
  }

  if(!email.value){
    errorMessage.value = "E-mail é obrigatório"
    hideMessage(errorMessage)
    return
  }

  if(!emailRegex.test(email.value)){
    errorMessage.value = "E-mail inválido"
    hideMessage(errorMessage)
    return
  }

//Adiciona novo assinante
  try {
    const storeAssinantes = localStorage.getItem('assinantes');
    const assinantes: IAssinante[] = storeAssinantes ? JSON.parse(storeAssinantes) : [];
    const emailExists = assinantes.some((assinante: IAssinante) => assinante.email === email.value)

    if(emailExists){
      errorMessage.value = "E-mail já cadastrado"
      hideMessage(errorMessage)
      return
    }

    assinantes.push({nome: nome.value , email: email.value})

    localStorage.setItem('assinantes', JSON.stringify(assinantes))

    showSuccesModal.value = true

    setTimeout(() => {
      showSuccesModal.value = false;
      router.push('/')
    }, 3000);

  } catch (e) {
    console.error("Erro ao enviar dados", e);
    if(errorMessage.value === "" ){errorMessage.value = "Erro ao Salvar os Dados. Tente novamente"}
    hideMessage(errorMessage)
  }
};

const handleBack = () => {
  router.push("/");
};
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  font-family: "Sofia Sans Extra Condensed", sans-serif;
}

.register-form {
  background-color: white;
  border-radius: 5px;
  border: solid black 0.01px;
}

@media (min-width: 500px) {
  .register-form {
    width: 520px;
    margin: auto;
    padding: 40px;
  }

  h1 {
    font-size: 2rem;
  }

  .handlesButtons {
    height: fit-content;
    padding: 10px;
  }
}

@media (min-width: 800px) {
  .register-form {
    width: 650px;
    height: 550px;
    display: flex;
    flex-direction: column;
  }

  .handlesButtons {
    margin-top: 10px;
  }
}
</style>
