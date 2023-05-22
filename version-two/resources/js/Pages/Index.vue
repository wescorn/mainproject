<script>
import Layout from "../Layouts/Layout.vue";
export default {
  layout: Layout
}
</script>

<script setup>
import { reactive, ref } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
defineProps({
  orders: Object,
});

const data = reactive({
  processing_id:null
})

const submit = (id) => {
  console.log('submitted id: ',id)
  data.processing_id = id;
  axios.post('/print', {
    id: id
  })
  .then(function (response) {
    console.log('GOT RESPONSE', response);
    console.log('GOT RESPONSE', response.data);
  })
  .catch(function (error) {
    console.log('GOT ERROR', error);
  }).finally(() => {
    data.processing_id = null;
  });
}
</script>

<template>
    <div class="max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-10">
      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="order in orders" :key="order.id" class="flex justify-between gap-x-6 py-5">
          <div class="flex gap-x-4">
            <div class="min-w-0 mx-auto flex items-center px-5">
              <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center"
                type="submit" :disabled="data.processing_id !== null" @click="submit(order.id)">
                <div>
                  <svg v-show="order.id == data.processing_id" aria-hidden="true"
                    class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                  <svg v-show="order.id != data.processing_id" aria-hidden="true" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                    stroke-width="1.5" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                  </svg>
                </div>
                Print
            </button>
            <p class="text-sm font-semibold leading-6 text-gray-300 m-2" for="id">Order Id: {{ order.id }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

