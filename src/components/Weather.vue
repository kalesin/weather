<template>
  <div class="h-90 bg-white w-full mt-16">
    <div class="searchBarContainer">
      <div class="flex justify-start items-center w-full">
        <div class="flex w-full">
          <div class="searchButton" type="button" @click="getWeather(searchInput)">
            <svg focusable="false" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </div>
          <Autocomplete
            :input-class="['searchInput']"
            :results-container-class="['autocompleteContainer']"
            :results-item-class="['autocompleteItem']"
            :results="autocompletePlaces"
            :max="5"
            @input="setAutocompletePlaces"
            @onSelect="(value) => getWeather(value)"
            placeholder="Enter location"
          ></Autocomplete>
        </div>
      </div>
    </div>

    <div class="currentResultContainer">
      <div class="titleText">Current weather:</div>
      <InfoBox
        v-if="currentResult && !invalidResult"
        :weatherInfo="currentResult"
        :deletable="false"
        class="flex justify-center w-full"
      />
      <div v-else-if="invalidResult" class="element">
        <div class="bg-white flex rounded-lg w-full p-4 flex-col text-center">City not found!</div>
      </div>
    </div>

    <div class="previousResultContainer">
      <div class="titleText">Your last 5 searches:</div>
      <div v-if="previousResults.length > 0" class="elementContainer">
        <InfoBox
          v-for="(item, index) in previousResults"
          :key="index"
          :weatherInfo="item"
          :deletable="true"
          :index="index"
          @delete="(value) => deleteResult(value)"
          @reload="(value) => reloadResult(value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { getWeatherResponse } from '../api/weather.js';
import { getPlacesResponse } from '../api/autocomplete.js';
import InfoBox from './InfoBox.vue';

let previousResults = ref([]);
let currentResult = ref(null);
let invalidResult = ref(null);
let autocompletePlaces = ref([]);
let searchInput = ref('');

async function getWeather(value) {
  try {
    let response = await getWeatherResponse(value);

    invalidResult.value = null;
    currentResult.value = response;

    if (previousResults.length >= 5) previousResults.value.splice(0, 1);
    previousResults.value.push(response);
  } catch (e) {
    invalidResult.value = e.error;
  }
}

function deleteResult(index) {
  previousResults.value.splice(index, 1);
}

async function reloadResult(index) {
  let resultToReload = previousResults.value[index];
  let location = resultToReload.location;
  let response = await getWeatherResponse(location);
  searchInput.value = location;
  previousResults.value.splice(index, 1, response);
  currentResult.value = response;
}

async function setAutocompletePlaces(value) {
  let response = await getPlacesResponse(value);
  let transformedPlaces = [];
  if (response.features && response.features.length > 0) {
    transformedPlaces = response.features.map(element => {
      return element.place_name;
    });
  }
  autocompletePlaces.value = transformedPlaces;
}
</script>

<style>
.vue3-autocomplete-container {
  @apply w-full mx-3;
}

.searchInput {
  @apply relative w-full p-2 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded focus:border-blue-300 focus:outline-none;
}

.autocompleteContainer {
  @apply w-full border border-solid border-gray-300 rounded bg-white absolute px-2;
}

.autocompleteItem {
  @apply text-black m-1;
}
</style>

<style scoped>
.elementContainer {
  @apply flex bg-main w-full flex-wrap h-auto items-start justify-center px-6 py-4;
}

.currentResultContainer {
  @apply flex flex-col bg-main w-full items-center justify-center;
}

.previousResultContainer {
  @apply flex flex-col bg-main w-full items-center justify-center;
}

.titleText {
  @apply capitalize text-center flex items-center h-1/3 text-xl m-4;
}

.element {
  @apply bg-main w-1/3 p-2 flex rounded-lg;
}

.searchBarContainer {
  @apply flex items-start h-auto mx-8 pb-8 flex-col;
}

.searchButton {
  @apply px-4 bg-main opacity-60 text-white rounded shadow-md flex items-center;
}
</style>