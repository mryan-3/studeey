import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiBase } from './user'


apiBase.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error) {
    console.error('Error retrieving token', error)
    return config
  }
}, (error) => {
  return Promise.reject(error)
})

// Get Events
// @route GET /api/v1/events
export const getEvents = async () => {
  try {
    const response = await apiBase.get('/events')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to fetch events')
    throw err
  }
}

interface IEventData {
  title: string
  description: string
  date: Date
  type: 'study_session' | 'assignment' | 'exam'
  linkedNotes: string[]
  reminder?: boolean
}
// Create Event
// @route POST /api/v1/events
export const createEvent = async (eventData: IEventData) => {
  try {
    const response = await apiBase.post('/events', eventData)
    toast.success('Event created successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to create event')
    throw err
  }
}


interface IEventUpdateData {
  title?: string
  description?: string
  date?: Date
  type?: 'study_session' | 'assignment' | 'exam'
  linkedNotes?: string[]
  reminder?: boolean
}
// Update Event
// @route PUT /api/v1/events
export const updateEvent = async (eventData: IEventUpdateData) => {
  try {
    const response = await apiBase.put('/events', eventData)
    toast.success('Event updated successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to update event')
    throw err
  }
}

// Delete Event
// @route DELETE /api/v1/events
export const deleteEvent = async (eventId: string) => {
  try {
    const response = await apiBase.delete('/events', {
      data: { id: eventId },
    })
    toast.success('Event deleted successfully')
    return response.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Failed to delete event')
    throw err
  }
}