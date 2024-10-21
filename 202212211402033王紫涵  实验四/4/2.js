
const square = document.getElementById('square');
const xOffsetInput = document.getElementById('x-offset');
const yOffsetInput = document.getElementById('y-offset');
const moveButton = document.getElementById('move-button');

let currentX = 0; // 当前X位置
let currentY = 0; // 当前Y位置

moveButton.addEventListener('click', () => {
    const xOffset = parseInt(xOffsetInput.value) || 0; // 获取X方向的偏移量
    const yOffset = parseInt(yOffsetInput.value) || 0; // 获取Y方向的偏移量

    currentX += xOffset; // 更新当前X位置
    currentY += yOffset; // 更新当前Y位置

    square.style.transform = `translate(${currentX}px, ${currentY}px)`; // 应用平移
});
