<template>
  <main>
    <section
      class="index bg-gray-400 flex flex-col justify-center items-center"
    >
      <div class="container mx-auto flex flex-col justify-center items-center">
        <h1 class="font-bold text-6xl">Jamstack Store Demo</h1>
        <p class="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <p>
          Reprehenderit expedita beatae veritatis rerum et veniam dicta in nulla
          alias!
        </p>
        <n-link to="/" class="bg-black text-white p-2 mt-4 rounded">
          Button text
        </n-link>
      </div>
    </section>
    <section class="container mx-auto h-screen">
      <h2 class="text-center py-4 text-2xl">Productos recientes</h2>
      <div class="grid grid-cols-4 gap-10">
        <div v-for="product in productos" :key="product.id">
          <product :data="product" />
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

interface Productos {
   productos: Array<any> 
}

export default Vue.extend({
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
  async asyncData(context: any): Promise<Productos> {
    const productos = await context.$content('productos').fetch()

    return {
      productos,
    }
  }, 
 
})
</script>

<style scoped>
.index {
  height: 80vh;
  @apply bg-cover;
}
</style>