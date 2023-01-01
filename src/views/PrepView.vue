<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="left">
      <div class="leftTop"></div>
      <div class="leftBottom"></div>
    </div>
    <div class="right">a</div>
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

  .leftBottom {
    background-color: bisque;
  }
  .right {
    background-color: aquamarine;
    width: 40%;
  }
</style>
