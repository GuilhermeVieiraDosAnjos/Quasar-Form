<template>
  <q-page class="column">
    <h1 class="text-weight-thin text-center border-radius-inherit q-mx-">Olá, receba nossa NewsLetter</h1>
    <div class="q-ma-lg text-weight-regular text-center main-content row ">
      <q-img
        src="newsletter_img.svg"
        class="side-img col gt-sm"
        spinner-color="primary"
        spinner-size="82px"
        alt="svg de uma mulher abrindo um gigante envelope com cartas saindo dele"

      />
      <article class="col side-content">
        <p>
          Uma newsletter é uma publicação enviada por e-mail para seus assinantes com o objetivo de compartilhar conteudos, notícias e informações sobre um determinado assunto
        </p>
        <p>
          Ao se inscrever, você receberá semanalmente um resumo dos fatos mais importantes do cenário político mundial e nacional, diretamente no seu email
        </p>
        <div class="text-center">
          <q-btn color="dark" icon="assignment" label="Inscreva-se" @click="onClick" />
        </div>
      </article>
    </div>

  </q-page>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter()

const onClick =() => {
  router.push('/register')
}

</script>

<style scoped>
h1 {
  font-size: 2rem;
}

.main-content{
  font-family:"Sofia Sans Extra Condensed", sans-serif ;
  font-size: 1.5rem;

}

.side-content{
  padding: 10px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}

.side-img{
  width: 400px;
}

@media (max-width: 768px){
  .side-img{
    width: 200px;
  }
}
</style>
