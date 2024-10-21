document.getElementById('squareForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单提交

    // 获取输入的值
    const x = parseInt(document.getElementById('x').value);
    const y = parseInt(document.getElementById('y').value);
    const size = parseInt(document.getElementById('size').value);

    // 获取画布和绘图上下文
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // 清空画布
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制正方形
    context.fillStyle = 'pink'; // 设置填充颜色
    context.fillRect(x, y, size, size); // 绘制正方形
});
