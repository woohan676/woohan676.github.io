"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];
var radius = 1;// ��ʼ�������ζ���İ뾶
var twist = false;// �Ƿ�Ť�� 
var theta = 0;// ��ʼ����ת�Ƕ�

$(document).ready(function () {
	/** Parameters */
	var numTimesToSubdivide = 3;// ��ʼ���ݹ�ϸ�ֵĴ���
	initTriangles(numTimesToSubdivide); // ��ʼ������
	// �����ʷֲ�β����»���
	function updateSubdivision(level) {
		console.log("Update subdivision to:", level); // ������־
		console.log("Update theta to:", theta); // ������־
		points = [];
		// ���û��ƺ���
		initTriangles(level);
	}
	// ����ֵ�仯ʱ�Ĵ�����
	$('#subdivision-slider').on('input', function () {
		var value = $(this).val();
		$('#subdivision-value').text(value); // ������ʾ��ֵ
		numTimesToSubdivide = parseInt(value);
		updateSubdivision(parseInt(value)); // �����ʷֲ�β����»���
	});


	$("#theta-slider").on("input", function () {
		var value = $(this).val();
		$('#theta-value').text(value); // ������ʾ��ֵ
		theta = parseInt(value);
		updateSubdivision(numTimesToSubdivide); // �����ʷֲ�β����»���
	});

	// �󶨸�ѡ���¼�
	$("#twist-checkbox").on("change", function () {
		twist = $(this).is(":checked");
		console.log("Update twist to:", twist);
		updateSubdivision(numTimesToSubdivide);
	});
});


function initTriangles(level) {
	canvas = document.getElementById("gl-canvas");

	gl = canvas.getContext("webgl2");
	if (!gl) {
		alert("WebGL isn't available");
	}
	// ����WebGL
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	// ��ʼ����ɫ�����򲢽���Ӧ���ڵ�ǰ��WebGL������
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// ��ʼ��л����˹�������ʷֵ���������
	// R=0.6, Theta = 90, 210, -30
	var vertices = [
		radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0), 0,
		radius * Math.cos(210 * Math.PI / 180.0), radius * Math.sin(210 * Math.PI / 180.0), 0,
		radius * Math.cos(-30 * Math.PI / 180.0), radius * Math.sin(-30 * Math.PI / 180.0), 0
	];

	// ʹ��vec3������������

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);

	// ��ʼ�ݹ�ϸ��������
	divideTriangle(u, v, w, level);


	// �����ݼ��ص�GPU
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

	// �Ѵ������ݵ�buffer��ֵ��vPosition
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	renderTriangles();
};

//�������ζ�����ӵ�points�����У���������ת
function tessellaTriangle(a, b, c) {
	//var k;
	var zerovec3 = vec3.create();
	vec3.zero(zerovec3);// ����һ��������
	var radian = theta * Math.PI / 180.0;// ����ת�Ƕ�ת��Ϊ����

	var a_new = vec3.create();
	var b_new = vec3.create();
	var c_new = vec3.create();


	if (twist == false) {
		// ���û��Ť������ʹ��vec3.rotateZ������ת
		vec3.rotateZ(a_new, a, zerovec3, radian);
		vec3.rotateZ(b_new, b, zerovec3, radian);
		vec3.rotateZ(c_new, c, zerovec3, radian);

		// ����ת��Ķ�����ӵ�points����
		points.push(a_new[0], a_new[1], a_new[2]);
		points.push(b_new[0], b_new[1], b_new[2]);
		points.push(b_new[0], b_new[1], b_new[2]);
		points.push(c_new[0], c_new[1], c_new[2]);
		points.push(c_new[0], c_new[1], c_new[2]);
		points.push(a_new[0], a_new[1], a_new[2]);
	} else {
		// �����Ť������ʹ�ò�ͬ����ת��ʽ
		var d_a = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
		var d_b = Math.sqrt(b[0] * b[0] + b[1] * b[1]);
		var d_c = Math.sqrt(c[0] * c[0] + c[1] * c[1]);

		vec3.set(a_new, a[0] * Math.cos(d_a * radian) - a[1] * Math.sin(d_a * radian),
			a[0] * Math.sin(d_a * radian) + a[1] * Math.cos(d_a * radian), 0);
		vec3.set(b_new, b[0] * Math.cos(d_b * radian) - b[1] * Math.sin(d_b * radian),
			b[0] * Math.sin(d_b * radian) + b[1] * Math.cos(d_b * radian), 0);
		vec3.set(c_new, c[0] * Math.cos(d_c * radian) - c[1] * Math.sin(d_c * radian),
			c[0] * Math.sin(d_c * radian) + c[1] * Math.cos(d_c * radian), 0);

		// ����ת��Ķ�����ӵ�points����
		points.push(a_new[0], a_new[1], a_new[2]);
		points.push(b_new[0], b_new[1], b_new[2]);
		points.push(b_new[0], b_new[1], b_new[2]);
		points.push(c_new[0], c_new[1], c_new[2]);
		points.push(c_new[0], c_new[1], c_new[2]);
		points.push(a_new[0], a_new[1], a_new[2]);

	}
}

function divideTriangle(a, b, c, count) {
	// check for end of recursion
	if (count == 0) {
		tessellaTriangle(a, b, c);
	} else {
		var ab = vec3.create();
		vec3.lerp(ab, a, b, 0.5);
		var bc = vec3.create();
		vec3.lerp(bc, b, c, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);

		// three new triangles
		divideTriangle(a, ab, ca, count - 1);
		divideTriangle(ab, b, bc, count - 1);
		divideTriangle(ca, bc, c, count - 1);
		divideTriangle(ab, bc, ca, count - 1);
	}
}

function renderTriangles() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.LINES, 0, points.length / 3);// ��������
}