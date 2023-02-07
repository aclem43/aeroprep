<script setup lang="ts">
  import router from '@/router'

  const goToPrep = () => {
    router.push('prep')
  }
  const goToFly = () => {
    router.push('/fly')
  }
</script>

<template>
  <div>
    <v-main>
      <div class="d-flex height align-center">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-sheet
              v-bind="props"
              rounded="xl"
              class="button mx-auto prevent-select"
              elevation="12"
              :color="isHovering ? 'blue-lighten-3' : 'blue-lighten-2'"
              @click="goToPrep()"
            >
              <strong class="buttonText">PREP</strong>
            </v-sheet>
          </template>
        </v-hover>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-sheet
              v-bind="props"
              rounded="xl"
              class="button mx-auto prevent-select"
              elevation="12"
              :color="isHovering ? 'green-lighten-3' : 'green-lighten-2'"
              @click="goToFly()"
            >
              <strong class="buttonText">FLY</strong>
            </v-sheet>
          </template>
        </v-hover>
      </div>
    </v-main>
  </div>
</template>

<style scoped>
  .height {
    height: 100vh;
  }

  .button {
    height: 10vw;
    line-height: 10vw;
    width: 10vw;
    text-align: center;
    cursor: pointer;
  }
  .buttonText {
    font-family: 'roboto';
    font-size: x-large;
  }

  @media only screen and (max-width: 1000px) {
    .button {
      height: 100px;
      line-height: 100px;
      width: 100px;
    }
  }
</style>
