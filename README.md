# Masaga design
The web UI basic material design

试着实现了一套基于 material design 的UI

## review
clone and open the index.html to see the result of the completed component on browser

在浏览器上打开 index.html 查看效果，已经做好的组件会在上面显示

## 已有组件
- 全局方法
- 字体
- 按钮
- 提示弹窗
- 下拉菜单
- 输入框
- 下拉框
- 单选框
- 多选框
- 滑块开关
- 折叠面板

## Usage
导入 js 文件和 css 文件
```html
<link rel="stylesheet" href="./dist/css/style.min.css">
<script src="./js/masaga.js"></script>
```

### 全局方法
```javascript
appendLoad(() => {
    //  要执行的方法
});
```
将传入的方法体在 **window.onload** 执行，多次使用会将按顺序执行。

### 字体
字体使用的是阿里巴巴普惠体，是允许免费使用的字体。

### 按钮
待说明

### 提示弹窗
使用 **mAlert.new()** 实例化一个弹窗对象
```javascript
const box = mAlert.new({
                content: 'CONTENT',
                title: 'TITLE',
                click: () => {alert('hahaha'); DD.close()},
                clickText: '提交',
                clickClass: 'btn-flat-primary'
            })
```
#### 参数说明：
```javascript
{
    content: '提示内容',
    title: '提示标题',
    click: 方法体，填写这个参数的话，会在右下角出现一个按钮，按钮的事件就是这个方法,
    clickText: '按钮的文本',
    clickClass: 按钮的样式，默认为 'btn-flat-primary'
}
```

#### function

open()
打开提示弹窗，会返回当前的弹窗对象，所以初始化的时候可以直接使用 
```javascript
const BOX = mAlert.new().open();
```

close()
关闭提示弹窗

### 下拉菜单
使用下拉菜单需要初始化
使用 **ddl.init();** 初始化

```html
<div class="dropdown-group">
    <button class="btn-raised dropdown" id="ddl-template2" data-toggle="dropdown" aria-label="dropdownlist">下拉框</button>
    <ul class="dropdown-menu" data-for="ddl-template2">
        <li class="dropdorw-item">select</li>
        <hr>
        <li class="dropdorw-item">selectselect</li>
    </ul>
</div>
<script>
    appendLoad(() => {
        //  初始化下拉框
        ddl.init();
    });
</script>
```
下拉框菜单的属性 **data-for** 的值需要与下拉框按钮的 id 相同，id为必需的。
下拉框菜单的 **class="dropdown-menu"** 为左对齐的下拉框菜单
可以使用 **class="dropdown-menu-right"** 变为右对齐的下拉框菜单
在下拉框菜单的选项中插入 
```html
<hr>
```
以使用分割线

### 输入框
单行输入框
```html
<input class="form-input mr3" type="text" placeholder="输入框">
<br><br>
<input class="form-input-primary mr3" type="text" placeholder="输入框">
<br><br>
<input class="form-input-accent mr3" type="text" placeholder="输入框">
<br><br>
<input class="form-input-warn mr3" type="text" placeholder="输入框">
```
多行输入框
```html
<textarea class="form-input-primary" autoRows></textarea>
```
添加 **autoRows** 可以启用行数根据内容自适应

### 下拉框
```html
<select class="form-select">
    <option value="">OPTION</option>
    <option value="1">OPTION1</option>
    <option value="2">OPTION2</option>
</select>
```

### 单选框
```html
<input class="form-radio" type="radio" name="single" id="rad">
<label for="rad">单选框 1</label>
<input class="form-radio" type="radio" name="single" id="rad-1">
<label for="rad-1">单选框 2</label>
```
样式默认是 primary，要使用其他样式请使用
```html
class="form-radio-accent"
class="form-radio-warn"
```

### 多选框
```html
<input class="form-checkout" type="checkbox" name="multi" id="c-primary">
<label for="c-primary">多选框 primary</label>
```
样式默认是 primary，要使用其他样式请使用
```html
class="form-checkout-accent"
class="form-checkout-warn"
```

### 滑块开关
```html
<input class="switch-primary" type="checkbox" id="switch-primary">
<label for="switch-primary">开关</label>
```
滑块开关是包装了 `checkbox`，所以可以像 `checkbox` 一样使用
样式默认是 primary，要使用其他样式请使用
```html
class="switch-accent"
class="switch-warn"
```

### 折叠面板
```html
<div class="accordion">
    <div class="panel">
        <div class="panel-header" data-toggle="accordion">
            <div class="panel-header-title">标题</div>
            <div class="panel-header-description">描述</div>
            <div class="panel-header-icon">图标</div>
        </div>
        <div class="panel-body">
            <div class="panel-content">
                CONTENT
            </div>
            <div class="panel-actions">
                <button class="btn-accent">按钮</button>
                <button class="btn-primary">按钮</button>
            </div>
        </div>
    </div>
</div>
```
要使用其他主题颜色可以将
**class="panel"** 改为
- **class="panel-primary"**
- **class="panel-accent"**
- **class="panel-warn"**
