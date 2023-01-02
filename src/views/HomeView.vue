<script setup lang="ts">
  import router from '@/router'

  const goToPrep = () => {
    router.push('prep')
  }
</script>

<template>
  <v-main>
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
            <strong class="buttonText">PREP</strong>
          </v-sheet>
        </template>
      </v-hover>

      <v-sheet rounded="xl" class="button mx-auto" color="green-lighten-3">
      </v-sheet>
    </div>
  </v-main>
</template>

<style scoped>
  .group {
    display: flex;
    align-items: center;
    height: 100%;
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
