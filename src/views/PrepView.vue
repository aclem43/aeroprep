<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import ActionContainer from '@/components/prep/ActionContainer.vue'
  import CheckList from '@/components/prep/CheckList.vue'
  import { isMobile } from '@/scripts/utils/mobile'
</script>

<template>
  <div>
    <AppBar></AppBar>
    <v-main>
      <div v-if="!isMobile()" class="container">
        <div class="left">
          <ActionContainer></ActionContainer>
        </div>
        <div class="right">
          <CheckList></CheckList>
        </div>
      </div>
      <div v-else>
        <ActionContainer></ActionContainer>
      </div>
    </v-main>
  </div>
</template>

<style>
  .container {
    display: flex;
    padding: 10px;
  }
  .left {
    flex-grow: 1;
    margin-right: 10px;
  }

  .right {
    width: 40%;
  }
</style>
