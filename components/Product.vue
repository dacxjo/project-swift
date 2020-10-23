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
      <button type="button">Comprar</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'Product',
  props: {
    data: {
      type: Object,
      required: true,
    } as PropOptions<any>,
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
