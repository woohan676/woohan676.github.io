// script.js

// 获取canvas和控件元素
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const xRotationSlider = document.getElementById('xRotation');
const yRotationSlider = document.getElementById('yRotation');

// 正方形的初始属性
const squareSize = 100;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// 初始旋转角度（X轴和Y轴）
let xRotation = 0;
let yRotation = 0;

// 监听旋转控制器变化
xRotationSlider.addEventListener('input', () => {
  xRotation = parseFloat(xRotationSlider.value);
  drawSquare();
});

yRotationSlider.addEventListener('input', () => {
  yRotation = parseFloat(yRotationSlider.value);
  drawSquare();
});


function drawSquare() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 保存当前绘图状态
  ctx.save();

  // 平移到canvas的中心
  ctx.translate(centerX, centerY);

  // 先旋转X轴
  ctx.rotate((xRotation * Math.PI) / 180); // 将角度转换为弧度
  ctx.rotate((yRotation * Math.PI) / 180); 
  // 绘制正方形
  ctx.fillStyle = 'pink'; 
  ctx.fillRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

  // 恢复到旋转之前的状态
  ctx.restore();
}

// 初始绘制正方形
drawSquare();
