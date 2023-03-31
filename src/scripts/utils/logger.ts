import { ref, type Ref } from 'vue'
import { getDevToolEnabled } from '../dev/devTools'

type Level = 'INFO' | 'WARN' | 'ERROR'

export interface Log {
  id: number
  date: Date
  level: Level
  msg: string
}

let lastLogId = 0
const consoleText: Ref<Log[]> = ref([])
export const getConsoleText = () => {
  return consoleText
}

const verifyLength = () => {
  if (consoleText.value.length > 100 && !getDevToolEnabled().value) {
    consoleText.value.splice(0, 50)
  }
}
const log = (msg: string, level?: Level) => {
  if (level == null || level == undefined) {
    level = 'INFO'
  }
  lastLogId += 1
  consoleText.value.push({
    id: lastLogId,
    date: new Date(),
    level: level,
    msg: msg,
  })
  verifyLength()
}

const warn = (msg: string) => {
  log(msg, 'WARN')
}
const error = (msg: string) => {
  log(msg, 'ERROR')
}

export const logger = {
  log: log,
  warn: warn,
  error: error,
}
export const getClasses = (log: Log): string => {
  if (log.level == 'INFO') {
    return 'text-blue'
  }
  if (log.level == 'WARN') {
    return 'text-orange'
  }

  return 'text-red'
}

const oldInfo = console.info
console.info = (...data: any[]) => {
  log(`[WEB CONSOLE] ${data}`)
  oldInfo(data)
}
const oldLog = console.log
console.log = (...data: any[]) => {
  log(`[WEB CONSOLE] ${data}`)
  oldLog(data)
}

const oldWarn = console.warn
console.warn = (...data: any[]) => {
  warn(`[WEB CONSOLE] ${data}`)
  try {
    oldWarn(data)
  } catch (e: any) {
    error(e)
  }
}

const oldError = console.error
console.error = (...data: any[]) => {
  error(`[WEB CONSOLE] ${data}`)
  try {
    oldError(data)
  } catch (e: any) {
    error(e)
  }
}
