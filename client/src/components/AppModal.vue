<script setup>
defineProps(['handleClick'])
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__close" @click="handleClick">
        <span class="material-symbols-outlined">close</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__content {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  gap: 4px;
  min-height: 150px;
}

.modal__close {
  align-self: flex-end;
  border-radius: 50%;
  cursor: pointer;
  width: 52px;
  height: 52px;
  padding: 12px;
  color: #9dacce;
  fill: currentColor;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin: 8px;
}

.modal__close:hover {
  background-color: #f5f7fa;
}
</style>
