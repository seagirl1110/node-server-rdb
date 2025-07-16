import { onMounted, ref } from 'vue'

const SERVER_URL = 'http://127.0.0.1:3000'
const events = ref([])

export default function useEvents() {
  onMounted(() => {
    init()
  })

  async function init() {
    events.value = await getEvents()
  }

  async function getEvents() {
    try {
      const response = await fetch(`${SERVER_URL}/events`)
      const result = await response.json()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async function getEvent(ID) {
    try {
      const response = await fetch(`${SERVER_URL}/events/${ID}`)
      const result = await response.json()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async function createEvent(event) {
    const { TYPE, DATE, NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS } = event
    try {
      const response = await fetch(`${SERVER_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TYPE,
          DATE,
          NAME,
          DESCRIPTION,
          PLACE,
          LATITUDE,
          LONGITUDE,
          REGION,
          ADDRESS,
        }),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function removeEvent(ID) {
    try {
      const response = await fetch(`${SERVER_URL}/events/${ID}`, {
        method: 'DELETE',
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function updateEvent(event) {
    const { ID, TYPE, DATE, NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS } = event

    try {
      const response = await fetch(`${SERVER_URL}/events/${ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TYPE,
          DATE,
          NAME,
          DESCRIPTION,
          PLACE,
          LATITUDE,
          LONGITUDE,
          REGION,
          ADDRESS,
        }),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { events, init, getEvents, getEvent, createEvent, removeEvent, updateEvent }
}
