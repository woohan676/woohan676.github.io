
const square = document.getElementById('square');
const xScale = document.getElementById('xScale');
const yScale = document.getElementById('yScale');
const xValue = document.getElementById('xValue');
const yValue = document.getElementById('yValue');

xScale.addEventListener('input', function() {
    const xScaleValue = xScale.value;
    square.style.width = (100 * xScaleValue) + 'px'; 
    xValue.textContent = xScaleValue;
});

// 监听Y轴缩放滑块变化
yScale.addEventListener('input', function() {
    const yScaleValue = yScale.value;
    square.style.height = (100 * yScaleValue) + 'px';
    yValue.textContent = yScaleValue; 
});
