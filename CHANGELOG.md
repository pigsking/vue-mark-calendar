# 更新日志

## v0.7.0

### Bug Fixes
- 修复因采用 css modules 导致无法通过指定类名覆盖组件默认样式的问题（取消使用 css modules）

### Features
- 支持 dark 模式
- 支持通过调用指定方法切换月份

### BREAKING CHANGES
- 取消切换月份时自动选中今天
- 默认样式改为 light 模式
- 取消 sundayBegin 属性的动态设置
- 已选中日子的类名由 `choose-day` 改为 `chosen-day`
- 组件 id 名由 `calendar` 改为 `v-calendar`

## v0.6.1

### Bug Fixes
- 修复周末类名为 undefined 问题

## v0.6.0

### Features

- 支持隐藏月份切换箭头
- 点击多天标记中的某天返回的对象中添加开始时间和结束时间

## v0.6.0-beta

### Code Refactoring
- 更换打包方式（rollup）以减少包体积

## v0.5.0

### Bug Fixes
- 移除生产环境存在的 console
- 修复组件样式影响全局问题(css modules)

### Features
- 支持一次标记多天
- 取消浏览器双击文字显示蓝色背景的默认行为

## v0.4.0

### Features
- prop 简单验证
- 支持禁止手动切换月份
- 支持自定义今天文字和样式

### BREAKING CHANGES
- 时间戳从 13 位数改为 10 位数

## v0.3.0

### Bug Fixes
- 修复设置 disabledFutureDay 后，从上一月份切回本月时可选择未来的天数

### Code Refactoring
- 重构原单文件形式组件为 jsx 形式组件

### Features
- 支持隐藏所有 marker
- 支持部分 props 异步变更后日历可动态改变样式

### BREAKING CHANGES
- 取消固定非本月天数的字体颜色
- 取消设置 disabledFutureDay 后隐藏未来的 marker
