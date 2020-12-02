# 更新日志

## 0.4.0

### Features
- prop 简单验证
- 支持禁止手动月份切换
- 支持自定义今天文字和样式

### BREAKING CHANGES
- 时间戳从 13 位数改为 10 位数

## 0.3.0

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
