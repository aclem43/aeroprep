export const initializeEvents: (() => void)[] = []

export const initialize = () => {
  for (const initFunc of initializeEvents) {
    initFunc()
  }
}

export const addInitializer = (initFunc: () => void) => {
  initializeEvents.push(initFunc)
}
