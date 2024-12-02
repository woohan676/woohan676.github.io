"use strict";
const { vec3 } = glMatrix;
var canvas;
var gl;
var points = [];	// �洢�������ݵ�����
$(document).ready(function () {
	var numTimesToSubdivide = 3; // ��ʼ���ʷֲ��
	// ��ʼ������
	initTriangles(numTimesToSubdivide);
	// �����ʷֲ�β����»���
	function updateSubdivision(level) {
		console.log("Update subdivision to:", level); // ������־
		points = [];
		// ���û��ƺ���
		initTriangles(level);
	}

	// ����ֵ�仯ʱ�Ĵ�����
	$('#subdivision-slider').on('input', function () {
		var value = $(this).val();
		$('#subdivision-value').text(value); // ������ʾ��ֵ
		updateSubdivision(parseInt(value)); // �����ʷֲ�β����»���
	});


});

function initTriangles(level) {
	console.log("Initialize triangles with level:", level); // ������־
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

	// ��ʼ��л����˹�������ε�����
	// ���ȣ���ʼ�������ε���������
	var vertices = [
		-1, -1, 0,
		0, 1, 0,
		1, -1, 0
	];

	// ������ά��������ʼ��
	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues(vertices[0], vertices[1], vertices[2]);//// ��vertices��������ȡ����A��x��y��z���꣬������һ��vec3���͵�����
	// var v = vec3.create();
	// vec3.set( v, 0, 1, 0 );
	var v = vec3.fromValues(vertices[3], vertices[4], vertices[5]);
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues(vertices[6], vertices[7], vertices[8]);

	// ���ú������ݹ�ϸ��������
	divideTriangle(u, v, w, level);

	// �����ݼ��ص�GPU
	var vertexBuffer = gl.createBuffer(); // ��������������
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);// �󶨻�����
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);// ���������ݼ��ص�������

	// �Ѵ������ݵ�buffer��ֵ��vPosition
	var vPosition = gl.getAttribLocation(program, "vPosition");		// ��ȡvPosition
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);	//��vPosition��ֵ
	gl.enableVertexAttribArray(vPosition);

	renderTriangles();

};

// �����������εĶ����������ӵ�ȫ�ֵ� points �����С�
function triangle(a, b, c) {
	//var k;
	points.push(a[0], a[1], a[2]);
	points.push(b[0], b[1], b[2]);
	points.push(c[0], c[1], c[2]);
	// for( k = 0; k < 3; k++ )
	// 	points.push( a[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( b[k] );
	// for( k = 0; k < 3; k++ )
	// 	points.push( c[k] );
}

// ����ݹ�ϸ�������εĺ���
function divideTriangle(a, b, c, count) {
	// ����Ƿ�ﵽ�ݹ�����
	if (count == 0) {
		triangle(a, b, c);
	} else {
		var ab = vec3.create(); // ����һ���µ�vec3����������ʼ��Ϊ[0, 0, 0]
		//ab���洢�����������
		//a����ʼ������
		//b������������
		//alpha����ֵ���ӣ���Χ��0��1��0��ʾ�����ȫ����a��1��ʾ�����ȫ����b��0.5��ʾ���Ϊa��b���е㡣
		vec3.lerp(ab, a, b, 0.5); // ab=a*alpha+b*(1-alpha)
		var bc = vec3.create();
		vec3.lerp(bc, c, b, 0.5);
		var ca = vec3.create();
		vec3.lerp(ca, c, a, 0.5);

		// �ݹ�ϸ�������µ������Σ�ע�⣺������˳���ܱ䣬��������ʱ��˳��
		divideTriangle(a, ab, ca, count - 1); //����һ����a��ab��caΪ������������Σ����ݹ��ϸ������
		divideTriangle(b, bc, ab, count - 1);
		divideTriangle(c, ca, bc, count - 1);

		//divideTriangle( ab, bc, ca, count-1 );
	}
}

function renderTriangles() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

	//gl.drawArrays( gl.LINES, 0, lineNumber );
}