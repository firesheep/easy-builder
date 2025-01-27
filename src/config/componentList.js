export const componentList = [
  {
    type: 'Button',
    label: '按钮',
    icon: 'Pointer',
    category: 'basic',
    defaultProps: {
      type: 'primary',
      text: '按钮',
      size: 'default'
    },
    defaultStyle: {
      width: '80px',
      height: '32px',
      position: 'absolute'  // 添加position
    }
  },
  {
    type: 'Input',
    label: '输入框',
    icon: 'Edit',
    category: 'form',
    defaultProps: {
      placeholder: '请输入',
      type: 'text',
      clearable: true
    },
    defaultStyle: {
      width: '200px',
      height: '32px'
    }
  },
  {
    type: 'Table',
    label: '表格',
    icon: 'Grid',
    category: 'data',
    defaultProps: {
      border: true,
      stripe: true,
      data: []
    },
    defaultStyle: {
      width: '100%',
      height: 'auto'
    }
  },
  {
    type: 'Chart',
    label: '图表',
    icon: 'TrendCharts',
    category: 'chart',
    defaultProps: {
      type: 'line',
      data: {}
    },
    defaultStyle: {
      width: '400px',
      height: '300px'
    }
  }
]

export const componentConfig = {
  Button: {
    props: [
      {
        name: 'type',
        label: '类型',
        type: 'select',
        options: [
          { label: '主要', value: 'primary' },
          { label: '成功', value: 'success' },
          { label: '警告', value: 'warning' },
          { label: '危险', value: 'danger' }
        ]
      },
      {
        name: 'text',
        label: '文本',
        type: 'input'
      },
      {
        name: 'size',
        label: '尺寸',
        type: 'select',
        options: [
          { label: '大', value: 'large' },
          { label: '默认', value: 'default' },
          { label: '小', value: 'small' }
        ]
      }
    ],
    events: [
      {
        name: 'click',
        label: '点击'
      }
    ]
  },
  Input: {
    props: [
      {
        name: 'placeholder',
        label: '占位文本',
        type: 'input'
      },
      {
        name: 'type',
        label: '类型',
        type: 'select',
        options: [
          { label: '文本', value: 'text' },
          { label: '密码', value: 'password' },
          { label: '数字', value: 'number' }
        ]
      },
      {
        name: 'clearable',
        label: '可清除',
        type: 'switch'
      }
    ],
    events: [
      {
        name: 'input',
        label: '输入'
      },
      {
        name: 'change',
        label: '变化'
      }
    ]
  }
}