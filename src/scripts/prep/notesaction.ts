import { ref, type Ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'

const notes: Ref<string> = ref('')

export const getNotes = (): Ref<string> => {
  return notes
}

export const initNotes = async () => {
  const note = await getSimpleDataByKey('action_note')

  if (note == null) {
    notes.value = ''
    return
  }
  notes.value = note
}

export const setNotes = async (note: string) => {
  notes.value = note
  await setSimpleDataByKey('action_note', note, true)
}

addInitializer(initNotes)
