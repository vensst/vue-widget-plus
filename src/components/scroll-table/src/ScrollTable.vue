<template>
  <div
      class="vwp-scroll-table scroll-table"
      ref="rootRef"
      :style="rootStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
  >
    <!-- 表头 -->
    <div
        v-if="showHeader"
        class="table-header"
        :class="headerRowClass"
        :style="{ height: headerHeight + 'px', lineHeight: headerHeight + 'px' }"
    >
      <div v-for="(col, i) in columns" :key="i" class="th" :style="getColStyle(col, true)">
        <div class="cell">
          <slot :name="`header-${col.key}`" :column="col">
            {{ col.title }}
          </slot>
        </div>
      </div>
    </div>

    <!-- 表体 -->
    <div class="table-body" :style="{ height: bodyHeight + 'px' }">
      <div v-if="total === 0" class="empty-wrap">
        <slot name="empty">
          <div class="empty-text">{{ emptyText }}</div>
        </slot>
      </div>
      <div v-else class="body-inner" :style="{ transform: `translateY(-${scrollOffset}px)` }">
        <div
            v-for="(row, idx) in data"
            :key="rowKey(row, idx)"
            class="tr"
            :class="rowClasses[idx]"
            :style="{ height: rowHeight + 'px' }"
            @click="onRowClick(row, idx)"
        >
          <div
              v-for="(col, j) in columns"
              :key="j"
              class="td"
              :style="getColStyle(col, false)"
              :class="['td']"
              @mouseenter="onCellEnter($event, row, col)"
              @mouseleave="onCellLeave"
          >
            <div class="cell" :class="{ ellipsis: col.showOverflowTooltip }">
              <slot :name="col.key" :row="row">
                {{ row[col.key] }}
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 翻页按钮 -->
    <div class="pager-wrap" v-if="total > rowsPerPage">
      <div v-show="hovered" class="pager up" :class="{ disabled: !canPrevPage }" @click="pageUp">
        <slot name="up">
          <VwpIcon name="arrow-up"></VwpIcon>
        </slot>
      </div>
      <div
          v-show="hovered"
          class="pager down"
          :class="{ disabled: !canNextPage }"
          @click="pageDown"
      >
        <slot name="down">
          <VwpIcon name="arrow-down"></VwpIcon>
        </slot>
      </div>
    </div>

    <!-- ✅ 自定义 Tooltip -->
    <div
        v-show="tooltip.visible"
        class="custom-tooltip"
        :style="tooltip.style"
        @mouseenter="onTooltipEnter"
        @mouseleave="onTooltipLeave"
    >
      {{ tooltip.content }}
    </div>
  </div>
</template>


<script setup lang="ts">
import VwpIcon from "../../icon";

defineOptions({
  name: "VwpScrollTable"
});
</script>
<script lang="ts">
import {PropType, CSSProperties} from 'vue'

export interface ScrollTableColumn {
  key: string
  title?: string
  width?: number | string
  flex?: number | string
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  showOverflowTooltip?: boolean
}

export type ScrollTableRow = Record<string, any>

interface TooltipState {
  visible: boolean
  content: string
  style: {
    top: string
    left: string
    transform?: string
  }
}

type Nullable<T> = T | null
type RowClassFn = (payload: {
  row: ScrollTableRow
  rowIndex: number
}) => string

type TimerId = any

let RO = window.ResizeObserver

function normalizeSize(val: string | number, fallback = '100%') {
  if (val == null) return fallback
  if (typeof val === 'number') return val + 'px'
  return val
}

type AlignType = 'left' | 'center' | 'right'

function alignToJustify(a: AlignType | undefined) {
  if (!a) return 'flex-start'
  const s = String(a).toLowerCase()
  if (s === 'left') return 'flex-start'
  if (s === 'right') return 'flex-end'
  return 'center'
}

export default {
  name: 'ScrollTable',

  props: {
    data: {type: Array as () => ScrollTableRow[], default: () => []},
    columns: {type: Array as () => ScrollTableColumn[], default: () => []},

    /* 新增 */
    height: {type: [Number, String], default: '100%'},
    maxHeight: {type: [Number, String], default: null},
    showHeader: {type: Boolean, default: true},
    rowClassName: {
      type: [Function, String] as PropType<string | RowClassFn | null>,
      default: null
    },
    headerRowClassName: {
      type: [Function, String] as PropType<string | (() => string) | null>,
      default: null
    },

    headerHeight: {type: Number, default: 40},
    rowsPerPage: {type: Number, default: 5},
    interval: {type: Number, default: 3000},
    autoStart: {type: Boolean, default: true},
    rowKeyField: {type: String, default: null},
    emptyText: {type: String, default: '暂无数据'}
  },

  data() {
    return {
      startIndex: 0 as number,
      scrollOffset: 0 as number,
      bodyHeight: 0 as number,
      hovered: false as boolean,

      timerId: null as Nullable<TimerId>,
      realRowHeight: 0 as number,

      _ro: null as Nullable<ResizeObserver>,
      _visibilityHandler: null as Nullable<() => void>,

      tooltip: {
        visible: false,
        content: '',
        style: {
          top: '0px',
          left: '0px'
        }
      } as TooltipState
    }
  },

  computed: {
    rootStyle() {
      return {
        height: normalizeSize(this.height),
        maxHeight: this.maxHeight ? normalizeSize(this.maxHeight) : undefined
      }
    },

    total() {
      return this.data.length
    },

    maxStart() {
      return Math.max(0, this.total - this.rowsPerPage)
    },

    rowHeight() {
      return this.realRowHeight
    },

    pageStarts() {
      if (this.total <= this.rowsPerPage) return [0]
      const arr = []
      for (let s = 0; s + this.rowsPerPage <= this.total; s += this.rowsPerPage) {
        arr.push(s)
      }
      const last = this.total - this.rowsPerPage
      if (!arr.includes(last)) arr.push(last)
      return Array.from(new Set(arr)).sort((a, b) => a - b)
    },

    canNextPage() {
      return this.pageStarts.some((s) => s > this.startIndex)
    },

    canPrevPage() {
      return this.pageStarts.some((s) => s < this.startIndex)
    },

    headerRowClass() {
      if (typeof this.headerRowClassName === 'function') {
        return this.headerRowClassName()
      }
      return this.headerRowClassName
    },

    rowClasses() {
      return this.data.map((row, idx) => {
        if (typeof this.rowClassName === 'function') return this.rowClassName({row, rowIndex: idx})
        return this.rowClassName

      })
    }
  },

  watch: {
    'data.length'() {
      if (this.startIndex > this.maxStart) {
        this.startIndex = this.maxStart
        this.scrollOffset = this.startIndex * this.rowHeight
      }
      this.restartTimerIfNeeded()
    },

    realRowHeight(newVal) {
      if (newVal > 0) {
        this.restartTimerIfNeeded()
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initResizeObserver()
      if (!this._ro) this.computeLayout()
      this.tryStartTimerOnce()
    })
  },

  beforeUnmount() {
    this.stopTimer()
    this.destroyResizeObserver()
  },

  methods: {
    rowKey(row: ScrollTableRow, idx: number) {
      return this.rowKeyField && row[this.rowKeyField] != null ? row[this.rowKeyField] : idx
    },

    getRowClass(row: ScrollTableRow, idx: number) {
      if (typeof this.rowClassName === 'function') {
        return this.rowClassName({row, rowIndex: idx})
      }
      return this.rowClassName
    },

    onRowClick(row: ScrollTableRow, idx: number) {
      this.$emit('row-click', row, idx)
    },

    computeLayout() {
      this.$nextTick(() => {
        const root = this.$refs.rootRef as HTMLElement | undefined
        if (!root) return
        const totalH = root.offsetHeight
        const headerH = this.showHeader ? this.headerHeight : 0
        const bodyH = Math.max(0, totalH - headerH)

        this.bodyHeight = bodyH
        this.realRowHeight = bodyH ? Math.floor(bodyH / this.rowsPerPage) : 0
        this.scrollOffset = this.startIndex * this.realRowHeight
      })
    },

    initResizeObserver() {
      const root = this.$refs.rootRef as HTMLElement | undefined
      if (!RO || !root) return
      this._ro = new RO(() => this.computeLayout())
      this._ro.observe(root)
    },

    destroyResizeObserver() {
      if (this._ro) {
        this._ro.disconnect()
        this._ro = null
      }
      if (this._visibilityHandler) {
        document.removeEventListener('visibilitychange', this._visibilityHandler)
        this._visibilityHandler = null
      }
    },

    shouldStartTimer() {
      if (!this.autoStart) return false
      if (!Array.isArray(this.data)) return false
      if (this.data.length <= this.rowsPerPage) return false
      if (!this.realRowHeight || this.realRowHeight <= 0) return false
      return true
    },

    tryStartTimerOnce() {
      if (this.shouldStartTimer()) {
        this.startTimer()
        return
      }
      setTimeout(() => {
        if (this.shouldStartTimer()) this.startTimer()
      }, 80)
    },

    restartTimerIfNeeded() {
      this.stopTimer()
      if (this.shouldStartTimer()) {
        setTimeout(() => {
          if (this.shouldStartTimer()) this.startTimer()
        }, 20)
      }
    },

    startTimer() {
      this.stopTimer()
      if (!this.shouldStartTimer()) return

      this.timerId = setInterval(() => {
        if (document && document.hidden) return
        if (!this.hovered) this.nextScroll()
      }, this.interval)

      if (!this._visibilityHandler) {
        this._visibilityHandler = () => {
          if (document.hidden) {
            this.stopTimer()
          } else {
            this.tryStartTimerOnce()
          }
        }
        document.addEventListener('visibilitychange', this._visibilityHandler)
      }
    },

    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
    },

    nextScroll() {
      if (this.total <= this.rowsPerPage) return
      const next = this.startIndex >= this.maxStart ? 0 : this.startIndex + 1
      this.startIndex = next
      this.scrollOffset = this.startIndex * this.rowHeight
    },

    pageDown() {
      if (!this.canNextPage) return
      const next = Math.min(this.startIndex + this.rowsPerPage, this.maxStart)
      this.startIndex = next
      this.scrollOffset = next * this.rowHeight
    },

    pageUp() {
      if (!this.canPrevPage) return
      const prev = Math.max(this.startIndex - this.rowsPerPage, 0)
      this.startIndex = prev
      this.scrollOffset = prev * this.rowHeight
    },

    handleMouseEnter() {
      this.hovered = true
      this.stopTimer()
    },

    handleMouseLeave() {
      this.hovered = false
      if (!this.hovered) {
        this.startTimer()
      }
    },

    // NEW: return style object for column cell/header
    getColStyle(col: ScrollTableColumn, isHeader: boolean) {
      // 对齐方式
      const alignKey = isHeader ? col.headerAlign || col.align : col.align
      const justify = alignToJustify(alignKey)

      const style: CSSProperties = {
        justifyContent: justify,
        textAlign: alignKey || 'left'
      }

      // 优先使用 width，如果没有就用 flex
      if (col.width) {
        style.width = typeof col.width === 'number' ? col.width + 'px' : col.width
        style.flex = '0 0 auto'
      } else {
        style.flex = col.flex != null ? col.flex : 1
      }

      return style
    },
    onCellEnter(e: MouseEvent, row: ScrollTableRow, col: ScrollTableColumn) {
      if (!col.showOverflowTooltip) return

      if (!e.currentTarget) return;

      const cell = (e.currentTarget as HTMLElement).querySelector('.cell')
      if (!cell) return

      // ✅ 真实溢出才显示
      if (cell.scrollWidth <= cell.clientWidth) return

      const rect = cell.getBoundingClientRect()

      this.tooltip.content = String(row[col.key] ?? '')

      this.tooltip.style = {
        top: rect.top - 8 + 'px', // ✅ 先放到上方
        left: rect.left + rect.width / 2 + 'px',
        transform: 'translateX(-50%) translateY(-100%)'
      }

      this.tooltip.visible = true

      // ✅ 防止贴边越界
      this.$nextTick(() => {
        const tip = document.querySelector('.custom-tooltip')
        if (!tip) return

        const r = tip.getBoundingClientRect()
        const pad = 8

        if (r.left < 0) {
          this.tooltip.style.left = pad + 'px'
          this.tooltip.style.transform = 'translateX(0) translateY(-100%)'
        }

        if (r.right > window.innerWidth) {
          this.tooltip.style.left = window.innerWidth - r.width - pad + 'px'
          this.tooltip.style.transform = 'translateX(0) translateY(-100%)'
        }

        if (r.top < 0) {
          // ✅ 如果上面放不下，自动翻到下面
          this.tooltip.style.top = rect.bottom + 8 + 'px'
          this.tooltip.style.transform = 'translateX(-50%)'
        }
      })
    },
    onCellLeave() {
      this.hideTooltip()
    },
    hideTooltip() {
      this.tooltip.visible = false
    },
    onTooltipEnter() {
      this.tooltip.visible = true
    },
    onTooltipLeave() {
      this.hideTooltip()
    }
  }
}
</script>

<style scoped lang="scss">
.vwp-scroll-table {

  --vwp-scroll-table-border-color: var(--vwp-border-color);
  --vwp-scroll-table-font-size: var(--vwp-font-size-base);
  --vwp-scroll-table-text-color: var(--vwp-text-color-regular);
  --vwp-scroll-table-header-text-color: var(--vwp-text-color-regular);
}

.scroll-table {
  width: 100%;
  position: relative;
  overflow: hidden;
  font-size: var(--vwp-scroll-table-font-size);
  color: var(--vwp-scroll-table-text-color);
}

/* make th/td flex containers and align by justify-content */
.table-header,
.tr {
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--vwp-scroll-table-border-color);
  box-sizing: border-box;
}


.table-header {
  color: var(--vwp-scroll-table-header-text-color);
}

.th,
.td {
  display: flex;
  align-items: center;
  padding: 4px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.th {
  font-weight: 600;
}

/* allow justify-content to take effect */
.td .cell {
}

.cell {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  line-height: 23px;
}


.ellipsis {
  display: block !important;
  width: 100%;
  white-space: nowrap !important;

}

.table-body {
  width: 100%;
  overflow: hidden;
}

.body-inner {
  transition: transform 0.4s ease;
}


.pager-wrap {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}

.pager {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  background: var(--vwp-primary);
  color: #fff;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(1.2);
  }
}

.pager.down {
  margin-top: 10px;
}

.pager.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.custom-tooltip {
  position: fixed;
  z-index: 9999;
  max-width: 300px;

  padding: 8px 12px;
  font-size: 12px;
  line-height: 1.5;

  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 6px;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);

  pointer-events: auto;
}

@keyframes tooltip-fade {
  from {
    opacity: 0;
    transform: translate(-50%, -4px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.empty-wrap {
  width: 100%;
  height: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
  background: #fff;
}

.empty-text {
  padding: 12px 20px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.02);
}
</style>
