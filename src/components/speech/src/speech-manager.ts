export interface SpeechInstance {
  cancel: () => void
}

export const SpeechManager = {
  current: null as SpeechInstance | null,

  set(instance: SpeechInstance) {
    this.current?.cancel()
    this.current = instance
  },

  clear(instance: SpeechInstance) {
    if (this.current === instance) {
      this.current = null
    }
  }
}
