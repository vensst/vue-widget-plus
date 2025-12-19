<script setup lang="ts">
import {nextTick, ref, watch, withDefaults} from 'vue'
import {vDrag} from './directive/drag.js'
import VwpIcon from "../../icon";
import {useZIndex} from "../../../utils/index";

defineOptions({
  name: "VwpDialog"
});

interface IProps {
  title?: string
  width?: string
  height?: string
  headerAlign?: 'left' | 'center'
  footerAlign?: 'left' | 'center' | 'right'
  isFullScreen?: boolean
  isFullScreenBtn?: boolean
  isBoundary?: boolean
  isLimitMinSize?: boolean
  zIndex?: number
  top?: string
  appendToBody?: boolean
  appendTo?: string
}

const visible = defineModel<boolean>({
  type: Boolean,
  default: false
})

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  width: '35%',
  height: 'auto',
  headerAlign: 'left',
  footerAlign: 'right',
  isFullScreen: false,
  isFullScreenBtn: true,
  isBoundary: true,
  isLimitMinSize: true,
  zIndex: undefined,
  top: '15vh',
  appendToBody: false,
  appendTo: 'body'
});

const dialogRef = ref<HTMLElement | null>(null)
const isScreen = ref(false)

async function toggleScreen() {
  isScreen.value = !isScreen.value
  await nextTick()
  initDialogStyle()
}

async function close() {
  visible.value = false
  isScreen.value = false
  await nextTick()
  initDialogStyle()
}

function initDialogStyle() {
  if (dialogRef.value) {
    dialogRef.value.style.left = ''
    dialogRef.value.style.top = ''
    dialogRef.value.style.width = ''
    dialogRef.value.style.height = ''
  }
}

const {nextZIndex} = useZIndex();
const currentZIndex = ref(props.zIndex);
const minWidth = ref(0)
const minHeight = ref(0)

watch(visible, (val) => {
  if (val) {
    currentZIndex.value = props.zIndex ?? nextZIndex();
    isScreen.value = props.isFullScreen
    nextTick(() => {
      if (!dialogRef.value) return
      const {width, height} = dialogRef.value.getBoundingClientRect()
      minWidth.value = width
      minHeight.value = height
    })
  } else {
    isScreen.value = false
  }
})

</script>

<template>
  <Teleport :to="props.appendTo" :disabled="!props.appendToBody">
    <div
        ref="dialogRef"
        :class="['dialog', isScreen ? 'dialog--screen' : '']"
        v-show="visible"
        v-drag="{
        isBoundary: props.isBoundary,
        isLimitMinSize: props.isLimitMinSize,
        minWidth,
        minHeight
      }"
        :style="{
        '--vwp-dialog-width': isScreen ? '100%' : props.width,
        '--vwp-dialog-height': isScreen ? '100vh' : props.height,
        '--z-index': currentZIndex,
        '--top': props.top
      }"
    >
      <div class="dialog__header">
        <div :class="['dialog-title', `dialog-title--${props.headerAlign}`]">
          <slot name="title">{{ props.title }}</slot>
        </div>

        <div class="btns">
          <div v-if="props.isFullScreenBtn" class="btn btn-screen" @click.stop="toggleScreen">
            <VwpIcon v-if="!isScreen" name="expand" :size="20"/>
            <VwpIcon v-else name="compress" :size="20"/>
          </div>
          <div class="btn btn-close" @click.stop="close">
            <slot name="close">
              <VwpIcon name="close" :size="20"/>
            </slot>
          </div>
        </div>
      </div>
      <div class="dialog__body">
        <slot/>
      </div>
      <div
          :class="['dialog__footer']"
          :style="{ '--footer-align': props.footerAlign }"
          v-if="$slots.footer"
      >
        <slot name="footer"/>
      </div>
      <span class="resize-handle">
        <VwpIcon name="drag" :size="10"/>
      </span>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.dialog {
  --vwp-dialog-box-shadow: var(--vwp-box-shadow);
  --vwp-dialog-bg-color: var(--vwp-bg-color);
  --vwp-dialog-border-color: var(--vwp-border-color);


  width: var(--vwp-dialog-width);
  height: var(--vwp-dialog-height);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: var(--z-index);
  top: var(--top);
  left: calc(50% - var(--vwp-dialog-width) / 2);
  box-shadow: var(--vwp-dialog-box-shadow);
  background-color: var(--vwp-dialog-bg-color);

  &.dialog--screen {
    top: 0;
    left: 0;
    transform: none;
  }

  .dialog__header {
    padding: 10px 16px;
    position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    border-bottom: 1px solid var(--vwp-border-color);

    .dialog-title {
      position: absolute;
    }

    .dialog-title--left {
      left: 16px;
    }

    .dialog-title--center {
      left: 50%;
      transform: translateX(-50%);
    }

    .btns {
      display: flex;
      flex-direction: row;
      align-items: center;

      .btn {
        height: auto;
        cursor: pointer;
      }

      .btn + .btn {
        margin-left: 4px;
      }
    }
  }

  .dialog__body {
    padding: 10px 16px;
    flex: 1;
    height: 0;
    overflow: auto;
  }

  .dialog__footer {
    padding: 10px 16px;
    border-top: 1px solid var(--vwp-border-color);
    text-align: var(--footer-align);
  }

  .resize-handle {
    line-height: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: move;
  }
}
</style>
