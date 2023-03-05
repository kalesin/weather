<template>
  <div class="element">
    <div class="bg-white flex rounded-lg w-full p-4 flex-col">
      <div v-if="deletable" class="w-full flex justify-between mb-2">
        <button @click="reloadResult(index)" class="reloadButton">View again</button>
        <button @click="deleteResult(index)" class="deleteButton">X</button>
      </div>
      <div class="flex justify-between">
        <div>Location:</div>
        <div class="capitalize font-bold">{{ weatherInfo.location }}</div>
      </div>
      <div class="capitalize text-center flex justify-between">
        <div>Time:</div>
        <div>{{ weatherInfo.time }}</div>
      </div>
      <div class="flex justify-between">
        <div>Current temperature:</div>
        <div class="capitalize font-bold">{{ weatherInfo.temp }} {{ degreesCelsius }}</div>
      </div>
      <div class="flex justify-between">
        <div>Feels like:</div>
        <div>{{ weatherInfo.feels_like }} {{ degreesCelsius }}</div>
      </div>
      <div class="flex justify-between">
        <div>Temperature range:</div>
        <div>{{ getRangeString(weatherInfo.temp_min, weatherInfo.temp_max) }}</div>
      </div>
      <div class="flex justify-between">
        <div>Humidity:</div>
        <div>{{ weatherInfo.humidity }} %</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

defineProps({
  weatherInfo: Object,
  deletable: Boolean,
  index: Number,
});

const emit = defineEmits(['delete', 'reload']);

let degreesCelsius = '°C';

function getRangeString(min, max) {
  return `${min} ${degreesCelsius} to ${max} ${degreesCelsius}`;
}

function deleteResult(index) {
  emit('delete', index);
}

function reloadResult(index) {
  emit('reload', index);
}
</script>

<style scoped>
.deleteButton {
  @apply hover:opacity-70 font-bold text-base rounded flex justify-center text-white bg-sec w-6;
}

.reloadButton {
  @apply hover:opacity-70 font-bold text-base rounded flex justify-center text-white bg-main px-4;
}
</style>