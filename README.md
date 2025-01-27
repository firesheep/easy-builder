# Vue3 低代码平台

基于 Vue3 和 Element Plus 的低代码平台，用于快速生成后台管理系统。

## 功能特点

- 组件拖拽：支持组件的拖放和布局调整
- 可视化配置：通过面板配置组件属性
- 模板市场：提供丰富的页面模板
- 数据源配置：支持静态数据和API数据源
- 组件动画：丰富的动画效果
- 组件组合：支持组件组合和模板保存
- 实时预览：所见即所得的编辑体验


## 其他功能
- 复制/粘贴功能（Ctrl+C/Ctrl+V）
- 组件对齐（左对齐、居中、右对齐）
- 组件层级调整（上移、下移）
- 组件大小调整（8个调整点）
- 更完善的样式和交互效果
- 响应式布局支持
- 美化的滚动条样式
## 使用说明：
- 从左侧拖拽组件到画布
- 点击组件可以选中并编辑属性
- 拖拽组件可以移动位置
- 使用调整手柄可以改变组件大小
- 使用工具栏按钮可以对齐组件
- 使用组件操作按钮可以调整层级或删除组件
- 使用快捷键可以复制/粘贴组件

- Ctrl+C：复制选中的组件
- Ctrl+V：粘贴组件
- Ctrl+Z：撤销
- Ctrl+Shift+Z 或 Ctrl+Y：重做
- Delete：删除选中的组件
- Ctrl+S：保存



首先提出需求，界定技术方案，然后开始生成代码，多次尝试代码自动保存本地文件时没有成功。只能手动创建本地文件，给提示并拷贝生成的代码到创建的本地文件。完成后安装依赖运行时有多处报错，直接把报错给AI提示。修改了报错并忽略多处ESLint的报错后运行成功。
在测试功能时拖动按钮组件到画布中，页面没有任何反应，控制台也没报错。给出提示后，按照生成的代码修改对应本地文件。改动过程中多次出现内存溢出的问题，通过先简化代码后添加的方式，成功解决问题，拖拽功能也正常了。
接着添加完善更多功能。
引入了几个element plus不存在的小图标，提示忽略。
总体来说这个项目还是有点复杂的，完成的过程很有意思。