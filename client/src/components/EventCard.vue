<script setup>
import AppButton from '@/components/AppButton.vue'

const props = defineProps(['event'])

const emit = defineEmits(['removeEvent', 'editEvent'])

const handleRemove = () => {
  emit('removeEvent', props.event.ID)
}

const handleEdit = () => {
  emit('editEvent', props.event)
}
</script>

<template>
  <div class="card">
    <div class="card__primary">
      <div class="card__header">
        <div class="card__title">{{ event.NAME }} ({{ event.TYPE }})</div>
      </div>
      <div class="card__header">
        <div class="card__info">
          <span class="material-symbols-outlined">calendar_month</span>
          <div class="card__text">{{ event.DATE }}</div>
        </div>
        <div class="card__info">
          <span class="material-symbols-outlined">home</span>
          <div class="card__text">{{ event.PLACE }}</div>
        </div>
        <div class="card__info">
          <span class="material-symbols-outlined"> location_on </span>
          <div class="card__text">{{ event.REGION }}, {{ event.ADDRESS }}</div>
        </div>
      </div>
      <div class="card__content">
        <div class="card__text">{{ event.DESCRIPTION }}</div>
      </div>
    </div>
    <div class="card__actions">
      <AppButton type="button" name="Удалить" :handleClick="handleRemove" />
      <AppButton type="button" name="Редактировать" :handleClick="handleEdit" />
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 420px;
  width: 100%;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow:
    0px 24px 48px 0px rgba(230, 235, 245, 0.4),
    0px 1px 4px 0px #e3ebfc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-style: normal;
  text-align: justify;
  color: #0b1f33;
}

.card__primary {
  flex-grow: 1;
  flex-direction: column;
  display: flex;
}

.card__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 24px;
  border-bottom: 1px solid #e4ecfd;
}

.card__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 24px 0;
}

.card__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  text-align: left;
}

.card__text {
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
}

.card__info {
  display: flex;
  gap: 6px;
  align-items: center;
}

.card__info .card__text {
  line-height: 110%;
  text-align: left;
}

.card__actions {
  display: flex;
  column-gap: 8px;
  align-items: center;
  padding: 12px 16px;
}
</style>
