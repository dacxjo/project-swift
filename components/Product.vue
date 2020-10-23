<template>
  <div class="flex flex-col items-start relative">
    <n-link to="/" class="w-full shadow h-64 rounded z-10 relative">
      <div class="w-full bg-cover h-64 relative rounded">
        <img
          class="w-full h-full object-cover rounded"
          :src="data.imagen"
          alt=""
          loading="lazy"
        />
      </div>
    </n-link>
    <span
      class="py-2 text-sm font-light whitespace-no-wrap t-overflow text-gray-900"
    >
      {{ data.nombre }}</span
    >
    <p class="whitespace-no-wrap t-overflow text-xs text-gray-700">
      {{ data.descripcion }}
    </p>
    <div class="flex justify-between w-full items-center">
      <span class="text-base font-bold text-yellow-500"
        >{{ data.precio }}€</span
      >
      <button @click="goStripe" type="button">Comprar</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

declare global {
  interface Window {
    Stripe: any
  }
}

export default Vue.extend({
  name: 'Product',
  props: {
    data: {
      type: Object,
      required: true,
    } as PropOptions<any>,
  },
  methods: {
    async goStripe() {
      let productData: Object = {
        image: this.data.image,
        name: this.data.nombre,
        price: this.data.precio,
      }

      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      }).then((res) => res.json())

      const stripe = window.Stripe(response.publishableKey)
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      })

      if (error) {
        console.error(error)
      }
    },
  },
  computed: {
    test(): any {
      return window.Stripe || {}
    },
  },
})
</script>

<style scoped>
.t-overflow {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
