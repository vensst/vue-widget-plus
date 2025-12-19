<template>
  <div
      ref="triggerRef"
      class="contextmenu"
      v-bind="$attrs"
      @contextmenu.prevent.stop="showMenu"
  >
    <slot />
  </div>

  <Teleport to="body">
    <div
        v-if="visible"
        ref="menuRef"
        class="menus"
        :style="menuStyle"
    >
      <div
          v-for="menu in menus"
          :key="menu.name"
          class="menu-item"
          @click="handleClick(menu)"
      >
        <slot name="menu" :menu="menu" v-bind="extend">
          {{ menu.name }}
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'VwpContextMenu',
  inheritAttrs: false
})

/* ---------- types ---------- */
export interface ContextMenuItem {
  name: string
  callback?: (payload?: any) => void
  disabled?: boolean
}

/* ---------- props ---------- */
const props = defineProps<{
  menus: ContextMenuItem[]
  extend?: Record<string, any>
}>()

/* ---------- emits ---------- */
const emit = defineEmits<{
  (e: 'command', payload: { menu: ContextMenuItem } & Record<string, any>): void
}>()

/* ---------- refs ---------- */
const triggerRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()

const visible = ref(false)
const position = ref({ x: 0, y: 0 })

/* ---------- computed ---------- */
const menuStyle = computed(() => ({
  left: `${position.value.x}px`,
  top: `${position.value.y}px`,
}))

/* ---------- methods ---------- */
function showMenu(e: MouseEvent) {
  visible.value = true
  position.value = { x: e.clientX, y: e.clientY }

  nextTick(adjustPosition)
}

function hideMenu() {
  visible.value = false
}

function handleClick(menu: ContextMenuItem) {
  if (menu.disabled) return

  menu.callback?.(props.extend)

  emit('command', {
    menu,
    ...props.extend,
  })

  hideMenu()
}

/* ---------- 防止菜单超出视口 ---------- */
function adjustPosition() {
  const el = menuRef.value
  if (!el) return

  const { innerWidth, innerHeight } = window
  const rect = el.getBoundingClientRect()

  if (rect.right > innerWidth) {
    position.value.x -= rect.right - innerWidth
  }
  if (rect.bottom > innerHeight) {
    position.value.y -= rect.bottom - innerHeight
  }
}

/* ---------- global events ---------- */
onMounted(() => {
  window.addEventListener('click', hideMenu)
  window.addEventListener('contextmenu', hideMenu, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', hideMenu)
  window.removeEventListener('contextmenu', hideMenu, true)
})
</script>

<style scoped lang="scss">
.contextmenu {
  display: inline-block;
}

.menus {
  position: fixed;
  z-index: 999;
  min-width: 120px;
  padding: 6px 0;
  background: #fff;
  border: 1px solid var(--vwp-border-color);
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}

.menu-item {
  padding: 0 20px;
  line-height: 32px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: var(--vwp-primary);
    color: #fff;
  }

  &[disabled] {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
