import mitt from 'mitt'

const eventBus = mitt()

export default eventBus

// 事件类型常量
export const EventTypes = {
  COMPONENT_SELECTED: 'component:selected',
  COMPONENT_MOVED: 'component:moved',
  COMPONENT_RESIZED: 'component:resized',
  COMPONENT_DELETED: 'component:deleted',
  CANVAS_CLICKED: 'canvas:clicked',
  HISTORY_CHANGED: 'history:changed',
  SAVE_PAGE: 'page:save',
  PREVIEW_PAGE: 'page:preview',
  PUBLISH_PAGE: 'page:publish'
}