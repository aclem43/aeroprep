<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import CheckList from '@/components/prep/CheckList.vue'
</script>

<template>
  <div>
    <AppBar></AppBar>
    <v-main>
      <div class="container">
        <div class="left">
          <div class="leftTop">
            <div class="topPanel"></div>
          </div>
          <div class="leftBottom"></div>
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
  }
  .left {
    flex-grow: 1;
    background-color: aqua;
  }

  .leftTop {
    background-color: beige;
  }
  .topPanel {
    display: flex;
    justify-content: space-between;
  }
  .optionsPanel {
    flex-grow: 1;
    min-width: 200px;
    max-width: 350px;
  }

  .leftBottom {
    background-color: bisque;
  }
  .right {
    background-color: aquamarine;
    width: 40%;
  }
</style>
