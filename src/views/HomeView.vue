<script setup lang="ts">
  import router from '@/router'

  const goToPrep = () => {
    router.push('prep')
  }
</script>

<template>
  <div class="group center">
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
          <strong>Prep</strong>
        </v-sheet>
      </template>
    </v-hover>

    <v-sheet rounded="xl" class="button mx-auto" color="green-lighten-3">
    </v-sheet>
  </div>
</template>

<style scoped>
  .group {
    display: flex;
    align-items: center;
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
  }

  .button :hover {
  }

  @media only screen and (max-width: 1000px) {
    .button {
      height: 100px;
      line-height: 100px;
      width: 100px;
    }
  }
</style>
