<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useEvents from '@/composables/useEvents'

const route = useRoute()
const { getEvent } = useEvents()

const event = ref(null)

onMounted(async () => {
  const id = Number(route.params.id)
  event.value = await getEvent(id)
})
</script>

<template>
  <div class="event" v-if="event">
    <div class="event__title">{{ event.NAME }} ({{ event.TYPE }})</div>
    <div class="event__detail">
      <div class="event__info">
        <div class="event__text">{{ event.DATE }}</div>
        <span class="material-symbols-outlined">calendar_month</span>
      </div>
      <div class="event__info">
        <div class="event__text">{{ event.PLACE }}</div>
        <span class="material-symbols-outlined">home</span>
      </div>
      <div class="event__info">
        <div class="event__text">{{ event.REGION }}, {{ event.ADDRESS }}</div>
        <span class="material-symbols-outlined"> location_on </span>
      </div>
    </div>
    <div class="event__content">
      {{ event.DESCRIPTION }}
    </div>
  </div>
</template>

<style scoped>
.event__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  text-align: center;
}

.event__detail {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 4px;
  padding: 20px 24px;
  border-top: 1px solid #e4ecfd;
  border-bottom: 1px solid #e4ecfd;
  margin: 16px 0;
}

.event__info {
  display: flex;
  gap: 6px;
  align-items: center;
}

.event__text {
  font-size: 16px;
  line-height: 110%;
  text-align: left;
}

.event__content {
  padding: 8px 24px 0;
  font-size: 16px;
  line-height: 150%;
  text-align: justify;
}
</style>
