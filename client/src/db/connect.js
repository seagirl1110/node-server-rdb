import { SERVER_URL, dataDB } from '@/db/config.js'

export async function connectToDB() {
  try {
    const response = await fetch(`${SERVER_URL}/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataDB),
    })

    const result = await response.json()
    console.log('Connection to the database:', result)
    return result
  } catch (error) {
    console.error('Error connection to the database:', error)
  }
}
