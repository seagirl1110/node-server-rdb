<script setup>
defineProps(['type', 'name', 'handleClick'])
</script>

<template>
  <button class="btn" :type="type" @click="handleClick">
    {{ name }}
  </button>
</template>

<style scoped>
.btn {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border: none;
  outline: none;
  border-radius: 8px;
  height: 52px;
  padding: 0 8px;
  color: #0d4cd3;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.btn:hover {
  background-color: #f5f7fa;
  color: #1d5deb;
}
</style>
