import { ref, type Ref } from 'vue'

export interface Log {
  id: number
  date: Date
  level: 'INFO' | 'WARN' | 'ERROR'
  msg: string
}

let lastLogId = 0
const consoleText: Ref<Log[]> = ref([])
export const getConsoleText = () => {
  return consoleText
}
const log = (msg: string) => {
  lastLogId += 1

  consoleText.value.push({
    id: lastLogId,
    date: new Date(),
    level: 'INFO',
    msg: msg,
  })
}

const warn = (msg: string) => {
  lastLogId += 1

  consoleText.value.push({
    id: lastLogId,
    date: new Date(),
    level: 'WARN',
    msg: msg,
  })
}
const error = (msg: string) => {
  lastLogId += 1

  consoleText.value.push({
    id: lastLogId,
    date: new Date(),
    level: 'ERROR',
    msg: msg,
  })
}

export const logger = {
  log: log,
  warn: warn,
  error: error,
}
export const getClasses = (log: Log): string => {
  if (log.level == 'INFO') {
    return ''
  }
  if (log.level == 'WARN') {
    return 'text-orange'
  }

  return 'text-red'
}
