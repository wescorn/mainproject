

<script setup>
import { reactive, ref, onMounted } from 'vue'

defineProps({
    orders: Object,
    columns: Array
});

const orderLinesModal = reactive({
  show: false,
  order: null
})

const shipmentsModal = reactive({
  show: false,
  order: null
})

const showOrderLines = (order) => {
  orderLinesModal.order = order
  orderLinesModal.show = true
}

const showShipments = (order) => {
  shipmentsModal.order = order
  shipmentsModal.show = true
}

// Close modal when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.bg-custom-modal-bg')) {
      console.log('clicked outside modal');
      orderLinesModal.show = false
      shipmentsModal.show = false
    }
  })
})

// Close modal on Escape key press
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    console.log('escape down');
    orderLinesModal.show = false
    shipmentsModal.show = false
  }
})

</script>

<template>
  <div class="container mx-auto">
    <!-- Table of Orders -->
    <table class="min-w-full dark:bg-gray-900 border-b border border-gray-300">
      <!-- Table header -->
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-white border-b font-semibold uppercase tracking-wider">ID</th>
          <th class="px-6 py-3 text-left text-white border-b font-semibold uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-white border-b font-semibold uppercase tracking-wider">Created At</th>
          <th class="px-6 py-3 text-left text-white border-b font-semibold uppercase tracking-wider"></th>
          <th class="px-6 py-3 text-left text-white border-b font-semibold uppercase tracking-wider"></th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="px-6 py-4 whitespace-nowrap text-white">{{ order.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-white">{{ order.status }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-white">{{ order.created_at }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-white">
            <button @click.stop="showOrderLines(order)" class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Order Lines
            </button>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-white">
            <button @click.stop="showShipments(order)" class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
              Shipments
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Order Lines Modal -->
    <div v-if="orderLinesModal.show" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-custom-modal-bg dark:bg-custom-modal-bg-dark shadow-lg rounded-lg mx-auto max-h-[50vh] overflow-y-auto">
        <div class="p-4">
          <div class="flex justify-end">
            <button @click.stop="orderLinesModal.show = false" class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Order Lines</h2>
          <table class="min-w-full mt-4">
            <!-- Table header -->
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Quantity</th>
                <th class="px-4 py-2 text-left">Product Name</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="orderLine in orderLinesModal.order.order_lines" :key="orderLine.id">
                <td class="px-4 py-2">{{ orderLine.quantity }}</td>
                <td class="px-4 py-2">{{ orderLine.product.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Shipments Modal -->
    <div v-if="shipmentsModal.show" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-custom-modal-bg dark:bg-custom-modal-bg-dark shadow-lg rounded-lg mx-auto max-h-[50vh] overflow-y-auto">
        <div class="p-4">
          <div class="flex justify-end">
            <button @click.stop="shipmentsModal.show = false" class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Shipments</h2>
          <table class="min-w-full mt-4">
            <!-- Table header -->
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Carrier Name</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2 text-left">Delivery Address</th>
                <th class="px-4 py-2 text-left">Pickup Address</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="shipment in shipmentsModal.order.shipments" :key="shipment.id">
                <td class="px-4 py-2">{{ shipment.carrier.name }}</td>
                <td class="px-4 py-2">{{ shipment.status }}</td>
                <td class="px-4 py-2">{{ shipment.delivery_address }}</td>
                <td class="px-4 py-2">{{ shipment.pickup_address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Layout from "../Layouts/Layout.vue";
export default {
    layout: Layout,
    methods: {
        ship(order) {
          console.log('ORDER', order.id);
        }
    },
}
</script>

<style>
.bg-custom-modal-bg {
  background-color: #f3f4f6;
  color: #111827;
}

.dark .bg-custom-modal-bg-dark {
  background-color: #4b5563;
  color: #f9fafb;
}
</style>