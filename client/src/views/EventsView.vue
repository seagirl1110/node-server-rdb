<script setup>
import { ref } from 'vue'
import useEvents from '@/composables/useEvents'
import EventCard from '@/components/EventCard.vue'
import EventForm from '@/components/EventForm.vue'
import AppButton from '@/components/AppButton.vue'
import AppModal from '@/components/AppModal.vue'

const { events, init, createEvent, removeEvent, updateEvent } = useEvents()

const selectedEvent = ref(null)
const openModal = ref(false)

const modalResult = ref(null)
const openResultModal = ref(false)

const handleOpenModal = () => {
  selectedEvent.value = null
  openModal.value = true
}

const handleCloseModal = () => {
  openModal.value = false
  selectedEvent.value = null
}

const handleCloseResultModal = () => {
  openResultModal.value = false
  openModal.value = false
}

const handleEditEvent = (event) => {
  handleOpenModal()
  selectedEvent.value = event
}

const handleCreateEvent = async (event) => {
  const response = await createEvent(event)
  if (response.ok) {
    modalResult.value = 'Мероприятие создано'
    openResultModal.value = true
    await init()
  }
}

const handleRemoveEvent = async (ID) => {
  const response = await removeEvent(ID)
  if (response.ok) {
    modalResult.value = 'Мероприятие удалено'
    openResultModal.value = true
    await init()
  }
}

const handleUpdateEvent = async (event) => {
  const response = await updateEvent(event)
  if (response.ok) {
    modalResult.value = 'Мероприятие обновлено'
    openResultModal.value = true
    await init()
  }
}
</script>

<template>
  <div class="events">
    <div class="events__header">
      <h2 class="events__title">Мероприятия</h2>
      <AppButton type="button" name="Создать новое мероприятие" :handleClick="handleOpenModal" />
    </div>
    <div class="events__list" v-if="events.length">
      <EventCard
        v-for="event in events"
        :key="event.ID"
        :event="event"
        @remove-event="handleRemoveEvent"
        @edit-event="handleEditEvent"
      />
    </div>
    <AppModal v-if="openModal" :handleClick="handleCloseModal">
      <EventForm
        :event="selectedEvent"
        @create-event="handleCreateEvent"
        @update-event="handleUpdateEvent"
      />
    </AppModal>
    <AppModal v-if="openResultModal" :handleClick="handleCloseResultModal">
      {{ modalResult }}
    </AppModal>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.events__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.events__list {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
</style>
