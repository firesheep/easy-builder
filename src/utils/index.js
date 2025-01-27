// 生成唯一ID
export function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// 深拷贝对象
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  const clone = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key])
    }
  }
  return clone
}

// 防抖函数
export function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 节流函数
export function throttle(fn, delay) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

// 计算组件位置
export function calculatePosition(event, canvas) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

// 检查组件碰撞
export function checkCollision(rect1, rect2) {
  return !(rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom)
}

// 格式化样式对象
export function formatStyle(style) {
  const result = {}
  for (let key in style) {
    if (typeof style[key] === 'number') {
      result[key] = style[key] + 'px'
    } else {
      result[key] = style[key]
    }
  }
  return result
}