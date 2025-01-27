// 验证组件属性
export function validateComponentProps(component, config) {
  const errors = []
  const props = component.props || {}
  const propConfigs = config.props || []

  propConfigs.forEach(propConfig => {
    const value = props[propConfig.name]
    const error = validateProp(value, propConfig)
    if (error) {
      errors.push({
        prop: propConfig.name,
        message: error
      })
    }
  })

  return errors
}

// 验证单个属性
function validateProp(value, config) {
  if (config.required && (value === undefined || value === null || value === '')) {
    return `${config.label}是必填项`
  }

  switch (config.type) {
    case 'number':
      if (typeof value !== 'number') {
        return `${config.label}必须是数字`
      }
      if (config.min !== undefined && value < config.min) {
        return `${config.label}不能小于${config.min}`
      }
      if (config.max !== undefined && value > config.max) {
        return `${config.label}不能大于${config.max}`
      }
      break

    case 'string':
      if (typeof value !== 'string') {
        return `${config.label}必须是字符串`
      }
      if (config.minLength && value.length < config.minLength) {
        return `${config.label}长度不能小于${config.minLength}`
      }
      if (config.maxLength && value.length > config.maxLength) {
        return `${config.label}长度不能大于${config.maxLength}`
      }
      break

    case 'array':
      if (!Array.isArray(value)) {
        return `${config.label}必须是数组`
      }
      if (config.minLength && value.length < config.minLength) {
        return `${config.label}长度不能小于${config.minLength}`
      }
      if (config.maxLength && value.length > config.maxLength) {
        return `${config.label}长度不能大于${config.maxLength}`
      }
      break
  }

  return null
}

// 验证样式属性
export function validateStyle(style) {
  const errors = []

  // 验证位置
  if (style.position === 'absolute') {
    if (typeof style.left !== 'number' && typeof style.right !== 'number') {
      errors.push('绝对定位必须设置 left 或 right')
    }
    if (typeof style.top !== 'number' && typeof style.bottom !== 'number') {
      errors.push('绝对定位必须设置 top 或 bottom')
    }
  }

  // 验证尺寸
  if (style.width !== undefined && style.width < 0) {
    errors.push('宽度不能为负数')
  }
  if (style.height !== undefined && style.height < 0) {
    errors.push('高度不能为负数')
  }

  return errors
}