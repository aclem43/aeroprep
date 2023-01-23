<script setup lang="ts">
  import { getNotes, setNotes } from '@/scripts/prep/notesaction'
  import { markdownParser } from '@/scripts/utils/markdown'
  import { computed } from 'vue'
  import { ref } from 'vue'
  const notes = getNotes()

  const editDialog = ref(false)
  const newNotes = ref('')
  const openDialog = () => {
    newNotes.value = notes.value
    editDialog.value = true
  }
  const cancelDialog = () => {
    editDialog.value = false
    newNotes.value = ''
  }
  const saveDialog = async () => {
    await setNotes(newNotes.value)
    editDialog.value = false
    newNotes.value = ''
  }
  const markedNotes = computed(() => {
    return markdownParser(notes.value)
  })
</script>

<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      Notes
      <v-btn icon="mdi-pencil" variant="tonal" @click="openDialog"></v-btn>
    </v-card-title>

    <v-card-text><div v-html="markedNotes"></div></v-card-text>
  </v-card>

  <v-dialog v-model="editDialog">
    <v-card>
      <v-card-title> Edit </v-card-title>
      <v-card-item>
        <v-textarea
          label="Label"
          variant="solo"
          v-model="newNotes"
        ></v-textarea>
      </v-card-item>
      <v-card-actions class="justify-space-between">
        <v-btn @click="cancelDialog"> Cancel </v-btn>
        <v-btn @click="saveDialog"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
