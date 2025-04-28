<script setup>
import { ref, computed, watch } from 'vue'
import FormItem from '@/components/FormItem.vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps(['event'])

const eventData = ref({
  TYPE: '',
  DATE: '',
  NAME: '',
  DESCRIPTION: '',
  PLACE: '',
  LATITUDE: '',
  LONGITUDE: '',
  REGION: '',
  ADDRESS: '',
})

watch(
  () => props.event,
  (newEvent) => {
    if (newEvent) {
      eventData.value = { ...newEvent }
    } else {
      eventData.value = {
        TYPE: '',
        DATE: '',
        NAME: '',
        DESCRIPTION: '',
        PLACE: '',
        LATITUDE: '',
        LONGITUDE: '',
        REGION: '',
        ADDRESS: '',
      }
    }
  },
  { immediate: true },
)

const eventDataLabel = {
  TYPE: 'Тип',
  NAME: 'Название',
  DATE: 'Дата проведения',
  PLACE: 'Место проведения',
  LATITUDE: 'Широта',
  LONGITUDE: 'Долгота',
  REGION: 'Регион',
  ADDRESS: 'Адрес',
  DESCRIPTION: 'Описание',
}

const isEditForm = computed(() => !!props.event)

const emit = defineEmits(['updateEvent', 'createEvent'])

const handleSubmit = () => {
  if (isEditForm.value) {
    emit('updateEvent', eventData.value)
  } else {
    emit('createEvent', eventData.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="event__form">
    <div class="form__items">
      <FormItem
        v-for="(value, key) in eventDataLabel"
        :key="key"
        :label="value"
        v-model="eventData[key]"
      />
    </div>
    <div class="form__action">
      <AppButton type="submit" :name="isEditForm ? 'Сохранить' : 'Создать'" />
    </div>
  </form>
</template>

<style scoped>
.event__form {
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;
}

.form__items {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
}

.form__action {
  align-self: flex-end;
}
</style>
