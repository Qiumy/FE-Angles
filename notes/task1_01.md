## html5 部分语义化标签

### `<article>`标签
定义外部的内容，外部内容可以是来自一个外部的新闻提供者的一篇新的文章，或者来自 blog 的文本，或者是来自论坛的文本。亦或是来自其他外部源内容。
### `<header>`标签
定义文档的页眉（介绍信息）
```html
<header>
  <h2>另一篇文章一级标题</h2>
  <h3>文章二级标题</h3>
  <h4>文章作者&nbsp;文章发表时间</h4>	
</header>
<p>这是一个很长很长的段落，这是一个很长很长</p>
```
### `<nav>`标签
定义导航栏链接部分
```html5
<nav>
  <ul>
  <li><a href="#">导航链接一</a></li>
  <li><a href="#">导航链接二</a></li>
  <li><a href="#">导航链接三</a></li>
  <li><a href="#">导航链接四</a></li>
  </ul>
</nav>
```
### `<aside>`标签
定义article以外的地方
```html
<aside>
  <h3>侧边栏</h3>
</aside>
```
### `<figure>`标签
```html
<figure>
  <figcaption>好看的图片</figcaption>
  <img src="../images/leaves.jpg" alt="这里有张漂亮的图片"/>
</figure>
```
### `<label>`标签
label 元素不会向用户呈现任何特殊的样式。不过，它为鼠标用户改善了可用性，因为如果用户点击 label 元素内的文本，则会切换到控件本身。
<label> 标签的 for 属性应该等于相关元素的 id 元素，以便将它们捆绑起来。
```html
<label for="male">男</label><input type="radio" id="male" name="sex" value="male" checked/>
<label for="female">女</label><input type="radio" id="female" name="sex" value="female"/>
```
此外注意到单选按钮组的`name`值要设置为一样
