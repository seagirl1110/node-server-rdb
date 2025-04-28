import { onMounted, ref } from 'vue'
import { SERVER_URL } from '@/db/config'

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
      const response = await fetch(`${SERVER_URL}/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'SELECT * FROM EVENTS', params: [] }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async function createEvent(event) {
    const { TYPE, DATE, NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS } = event
    try {
      const response = await fetch(`${SERVER_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query:
            'INSERT INTO EVENTS (TYPE, "DATE", NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          params: [TYPE, DATE, NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS],
        }),
      })

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function removeEvent(ID) {
    try {
      const response = await fetch(`${SERVER_URL}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'DELETE FROM EVENTS WHERE ID = ?', params: [ID] }),
      })

      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function updateEvent(event) {
    const { ID, TYPE, DATE, NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS } = event

    try {
      const response = await fetch(`${SERVER_URL}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query:
            'UPDATE EVENTS SET TYPE = ?, "DATE" = ?, NAME = ?, DESCRIPTION = ?, PLACE = ?, LATITUDE = ?, LONGITUDE = ?, REGION = ?, ADDRESS = ? WHERE ID = ?',
          params: [TYPE, DATE, NAME, DESCRIPTION, PLACE, LATITUDE, LONGITUDE, REGION, ADDRESS, ID],
        }),
      })

      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { events, init, getEvents, createEvent, removeEvent, updateEvent }
}
