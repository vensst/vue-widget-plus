<template>
  <span
      class="vwp-speech"
      :class="{ 'is-speaking': isSpeaking, 'is-disabled': disabled }"
      @click="handleClick"
  >
    <slot>
      <VwpIcon
          name="sound"
          :class="{ active: isSpeaking }"
      />
    </slot>
  </span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import VwpIcon from '../../icon'
import { SpeechManager } from './speech-manager'
import type { SpeechOptions } from './types'

defineOptions({
  name: 'VwpSpeech'
})

/* ================= props ================= */

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  options: {
    type: Object as PropType<SpeechOptions>,
    default: () => ({})
  },
  auto: Boolean,
  disabled: Boolean
})

/* ================= state ================= */

const isSpeaking = ref(false)

let utterance: SpeechSynthesisUtterance | null = null
let synthesis: SpeechSynthesis | null = null

/* ================= env ================= */

const hasSupport = () =>
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window

/* ================= init ================= */

onMounted(() => {
  if (!hasSupport()) return

  synthesis = window.speechSynthesis
  utterance = new SpeechSynthesisUtterance()

  utterance.onstart = (e) => {
    isSpeaking.value = true
    emit('start', e)
  }

  utterance.onend = () => {
    isSpeaking.value = false
    SpeechManager.clear(instance)
    emit('end')
  }

  utterance.onerror = (e) => {
    isSpeaking.value = false
    emit('error', e)
  }

  if (props.auto) {
    speak()
  }
})

onBeforeUnmount(() => {
  cancel()
})

/* ================= emit ================= */

const emit = defineEmits<{
  (e: 'start', ev: SpeechSynthesisEvent): void
  (e: 'end'): void
  (e: 'error', ev: SpeechSynthesisErrorEvent): void
}>()

/* ================= instance ================= */

const instance = {
  cancel
}

/* ================= core ================= */

function speak() {
  if (!utterance || !synthesis || !props.message) return

  SpeechManager.set(instance)

  const opt = props.options

  utterance.text = props.message
  if (opt.lang) utterance.lang = opt.lang
  if (opt.voice) utterance.voice = opt.voice

  utterance.volume = opt.volume ?? 1
  utterance.rate = opt.rate ?? 1
  utterance.pitch = opt.pitch ?? 1

  synthesis.cancel()
  synthesis.speak(utterance)
}

function cancel() {
  if (!synthesis) return
  synthesis.cancel()
  isSpeaking.value = false
  SpeechManager.clear(instance)
}

function handleClick() {
  if (props.disabled) return
  isSpeaking.value ? cancel() : speak()
}

/* ================= watch ================= */

watch(
    () => props.message,
    (val) => {
      if (props.auto && val) {
        cancel()
        speak()
      }
    }
)

/* ================= expose ================= */

defineExpose({
  speak,
  cancel
})
</script>

<style scoped lang="scss">
.vwp-speech {
  display: inline-flex;
  cursor: pointer;
  align-items: center;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  i.active {
    color: var(--vwp-primary);
  }
}
</style>
