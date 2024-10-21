<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<title>欢迎来到我的博客</title>
  </head>
  <body>
    <div class="container-lg px-3 my-5 markdown-body">
    <h1><a href="https://woohan676.github.io/skills-github-pages/">skills-github-pages</a></h1>
      

      <h1 id="欢迎来到我的博客">欢迎来到我的博客</h1>

<p>这是我的第一篇博客，我将在这里分享我的学习经验和教程。</p>
<h2 id="计算机图形学作业">计算机图形学作业</h2>
<!-- HTML 部分 -->
<h3 id="menuTitle1">2024-09-10作业1</h3>

<div id="popupMenu1" class="menu">
    <ul>
        <li><a href="https://woohan676.github.io/202212211402033 王紫涵实验一/三角形.html">任务1</a></li>
        <li><a href="https://woohan676.github.io/202212211402033 王紫涵实验一/不同颜色三角形，四边形.html.html">任务2</a></li>
        <li><a href="https://woohan676.github.io/202212211402033 王紫涵实验一/四边形.html.html">任务3</a></li>
        <li><a href="https://woohan676.github.io/202212211402033 王紫涵实验一/相同颜色三角形，四边形.html">任务4</a></li>
    </ul>
</div>
<h3 id="menuTitle2">2024-09-24作业2</h3>
<div id="popupMenu2" class="menu">
    <ul>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵实验二/a.html">任务a</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵实验二/b.html">任务b</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵实验二/c.html">任务c</a></li>
    </ul>
</div>

<h3 id="menuTitle3">2024-10-08作业3</h3>
<div id="popupMenu3" class="menu">
    <ul>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵 实验三/a.html">任务a</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵 实验三/b.html">任务b</a></li>
    </ul>
</div>

<h3 id="menuTitle4">2024-10-15作业4</h3>

<div id="popupMenu4" class="menu">
    <ul>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵  实验四/a.html">任务a</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵  实验四/b.html">任务b</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵  实验四/c.html">任务c</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵  实验四/d.html">任务d</a></li>
        <li><a href="https://woohan676.github.io/202212211402033王紫涵  实验四/e.html">任务d</a></li>
    </ul>
</div>

<!-- CSS 部分 -->
<style>
body {
    font-family: Arial, sans-serif;
}

h3 {
    cursor: pointer;
    background-color: #f8f9fa;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    text-align: center;
}

h3:hover {
    background-color: #e2e6ea;
}

/* 菜单初始隐藏状态 */
.menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    margin-top: 5px;
}

.menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.menu ul li {
    padding: 10px;
}

.menu ul li a {
    text-decoration: none;
    color: #333;
}

.menu ul li a:hover {
    color: #007bff;
}

/* 展开时菜单的最大高度 */
.menu.show {
    max-height: 300px; /* 根据内容调整 */
}
</style>

<!-- JavaScript 部分 -->
<script>
document.getElementById('menuTitle1').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu1');
    menu.classList.toggle('show');
});
 document.getElementById('menuTitle2').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu2');
    menu.classList.toggle('show');
});
 document.getElementById('menuTitle3').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu3');
    menu.classList.toggle('show');
});
 document.getElementById('menuTitle4').addEventListener('click', function() {
    var menu = document.getElementById('popupMenu4');
    menu.classList.toggle('show');
});
</script>



      
      <div class="footer border-top border-gray-light mt-5 pt-3 text-right text-gray">
        This site is open source. <a href="https://github.com/kongyinshui/skills-github-pages/edit/main/index.md">Improve this page</a>.
      </div>
      
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/anchor-js/4.1.0/anchor.min.js" integrity="sha256-lZaRhKri35AyJSypXXs4o6OPFTbTmUoltBbDCbdzegg=" crossorigin="anonymous"></script>
    <script>anchors.add();</script>
  </body>
</html>
