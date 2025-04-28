<script setup>
defineProps(['label'])
const model = defineModel()
</script>

<template>
  <div class="form__item">
    <label class="label">{{ label }}</label>
    <input class="input" v-model="model" type="string" required />
  </div>
</template>

<style scoped>
.form__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 300px;
  flex-grow: 1;
}

.label {
  color: #0b1f33;
}

.input {
  height: 52px;
  padding: 14px 16px;
  color: #0b1f33;
  background-color: #f5f7fa;
  caret-color: #0d4cd3;
  border-radius: 4px;
  border: 2px solid transparent;
  outline: none;
}

.input:hover {
  border-color: rgba(29, 93, 235, 0.18);
}

.input:focus {
  border-color: #99b1e6;
}
</style>
