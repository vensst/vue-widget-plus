<template>
  <input
      class="vwp-input"
      :value="modelValue"
      @input="onInput"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: "VwpInput"
});

defineProps<{
  modelValue?: string
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<style scoped>
.vwp-input {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  outline: none;
}
.vwp-input:focus {
  border-color: var(--vwp-primary);
}
</style>
