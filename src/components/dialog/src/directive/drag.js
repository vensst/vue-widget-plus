
function initDrag(el, binding) {
  el.__resizeData__ = {
    minWidth: el.offsetWidth,
    minHeight: el.offsetHeight
  }
}
function updateMinSize(el, binding) {
  const { minWidth, minHeight } = binding.value || {}

  if (minWidth) {
    el.__resizeData__.minWidth = minWidth
  }

  if (minHeight) {
    el.__resizeData__.minHeight = minHeight
  }
}


export const vDrag = {
  mounted(el, binding, vnode) {
    initDrag(el, binding)
    const {isBoundary, isLimitMinSize} = binding.value
    const dialogHeaderEl = el.querySelector('.dialog__header')
    dialogHeaderEl.style.cursor = 'move'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = el.currentStyle || window.getComputedStyle(el, null)
    const moveDown = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      // 获取到的值带px 正则匹配替换
      let styL, styT
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.onmousemove = function (e) {
        e.preventDefault()
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        let left, top
        // 边界处理
        if (isBoundary) {
          left = l + styL
          top = t + styT
          // 边界处理
          if (left < 0) {
            left = 0
          } else if (left > document.body.clientWidth - el.offsetWidth) {
            left = document.body.clientWidth - el.offsetWidth
          }
          if (top < 0) {
            top = 0
          } else if (top > document.body.clientHeight - el.offsetHeight) {
            top = document.body.clientHeight - el.offsetHeight
          }
        } else {
          left = l + styL
          top = t + styT
        }

        // 移动当前元素
        el.style.left = `${left}px`
        el.style.top = `${top}px`
        // 将此时的位置传出去
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    dialogHeaderEl.onmousedown = moveDown
    // 右下角拖拽 ------start
    const resizeHandleEl = el.querySelector('.resize-handle')

    const resizeData = {
      // 最小宽度和高度
      minWidth: el.offsetWidth,
      minHeight: el.offsetHeight,
      // 浏览器窗口的最大宽度和高度
      maxWidth: document.body.clientWidth,
      maxHeight: document.body.clientHeight,
      // 当前元素的宽度和高度
      width: el.offsetWidth,
      height: el.offsetHeight,
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0
    }
    const startResize = (e) => {
      e.preventDefault()
      // 初始化数据
      // 浏览器窗口的最大宽度和高度
      resizeData.maxWidth = document.body.clientWidth
      resizeData.maxHeight = document.body.clientHeight
      resizeData.width = el.offsetWidth
      resizeData.height = el.offsetHeight

      resizeData.startX = e.clientX
      resizeData.startY = e.clientY
      resizeData.startWidth = resizeData.width
      resizeData.startHeight = resizeData.height

      resizeData.isResizing = true

      // 添加全局事件监听器
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', stopResize)
    }

    const handleResize = (e) => {
      if (!resizeData.isResizing) return
      const minWidth = el.__resizeData__.minWidth || 166
      const minHeight = el.__resizeData__.minHeight || 66
      // 计算鼠标移动距离
      const deltaX = e.clientX - resizeData.startX
      const deltaY = e.clientY - resizeData.startY
      // 计算新尺寸（限制最小和最大尺寸）
      resizeData.width = Math.max(
          isLimitMinSize ? minWidth : resizeData.minWidth,
          Math.min(resizeData.maxWidth, resizeData.startWidth + deltaX)
      )
      resizeData.height = Math.max(
          isLimitMinSize ? minHeight : resizeData.minHeight,
          Math.min(resizeData.maxHeight, resizeData.startHeight + deltaY)
      )
      // 设置新的宽度和高度
      el.style.width = `${resizeData.width}px`
      el.style.height = `${resizeData.height}px`
    }

    const stopResize = () => {
      resizeData.isResizing = false
      // 移除事件监听器
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
    }
    resizeHandleEl.onmousedown = startResize
    // 右下角拖拽 ------end
  },
  updated(el, binding, vnode, prevVnode) {
    updateMinSize(el, binding)
  },
}
