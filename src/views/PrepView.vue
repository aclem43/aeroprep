<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import ActionContainer from '@/components/prep/ActionContainer.vue'
  import CheckList from '@/components/prep/CheckList.vue'
</script>

<template>
  <div>
    <AppBar></AppBar>
    <v-main>
      <div class="container">
        <div class="left">
          <ActionContainer></ActionContainer>
        </div>
        <div class="right">
          <CheckList></CheckList>
        </div>
      </div>
    </v-main>
  </div>
</template>

<style>
  .container {
    display: flex;
    padding-top: 10px;
  }
  .left {
    flex-grow: 1;
  }

  .right {
    width: 40%;
  }
</style>
