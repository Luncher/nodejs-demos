/**
* @class egret.Matrix
* @classdesc
* 2D矩阵类，包括常见矩阵算法
*/
var Matrix = (function () {
	/**
	* @method egret.Matrix#constructor
	* @constructor
	* @param a {number}
	* @param b {number}
	* @param c {number}
	* @param d {number}
	* @param tx {number}
	* @param ty {number}
	*/
	function Matrix(a, b, c, d, tx, ty) {
		if(a === void 0) a = 1;
		if(b === void 0) b = 0;
		if(c === void 0) c = 0;
		if(d === void 0) d = 1;
		if(tx === void 0) tx = 0;
		if(ty === void 0) ty = 0;

		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	/**
	* @member {any} egret.Matrix#
	*/
	// public methods:
	/**
	* 前置矩阵
	* @method egret.Matrix#prepend
	* @param a {number}
	* @param b {number}
	* @param c {number}
	* @param d {number}
	* @param tx {number}
	* @param ty {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.prepend = function (a, b, c, d, tx, ty) {
		if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
			var aa = this.a, 
				cc = this.c;

			this.a = this.a*a + this.b*c;
			this.b = this.a*b + this.b*d;
			this.c = a*this.c + c*this.d;
			this.d = b*cc + d*this.d;
		}

		var tx1 = this.tx;

		this.tx = a*tx1 + c*this.ty + tx;
		this.tx = b*tx1 + d*this.ty + ty;

		return this;
	};

	/**
	* 后置矩阵
	* @method egret.Matrix#append
	* @param a {number}
	* @param b {number}
	* @param c {number}
	* @param d {number}
	* @param tx {number}
	* @param ty {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.append = function (a, b, c, d, tx, ty) {
		if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
			var aa = this.a,
				bb = this.b,
				cc = this.c,
				dd = this.d;

			this.a = this.a*a + b*this.c;
			this.b = a*this.b + b*this.d;
			this.c = aa*c + this.c*d;
			this.d = bb*c + this.d*d;
		}

		this.tx = aa*tx + cc*ty + this.tx;
		this.ty = bb*tx + dd*ty + this.ty;

		return this;
	};

	/**
	* 前置矩阵
	* @method egret.Matrix#prependMatrix
	* @param matrix {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.prependMatrix = function (matrix) {
		return this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	};

	/**
	* 后置矩阵
	* @method egret.Matrix#appendMatrix
	* @param matrix {egret.Matrix}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.appendMatrix = function (matrix) {
		return this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	};

	/**
	* 前置矩阵
	* @method egret.Matrix#prependTransform
	* @param x {number}
	* @param y {number}
	* @param scaleX {number}
	* @param scaleY {number}
	* @param rotation {number}
	* @param skewX {number}
	* @param skewY {number}
	* @param regX {number}
	* @param regY {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.prependTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
		var cos, sin, r = rotation%360;

		if(r) {
			r*=Matrix.DEG_TO_RAD;
			cos = Math.cos(r);
			sin = Math.sin(r);
		}
		else {
			cos = 1;
			sin = 0;
		}


		
	};

	/**
	* 后置矩阵
	* @method egret.Matrix#appendTransform
	* @param x {number}
	* @param y {number}
	* @param scaleX {number}
	* @param scaleY {number}
	* @param rotation {number}
	* @param skewX {number}
	* @param skewY {number}
	* @param regX {number}
	* @param regY {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.appendTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {

	};

	/**
	* 矩阵旋转，以角度制为单位
	* @method egret.Matrix#rotate
	* @param angle {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.rotate = function (angle) {

	};

	/**
	* 矩阵斜切，以角度值为单位
	* @method egret.Matrix#skew
	* @param skewX {number}
	* @param skewY {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.skew = function (skewX, skewY) {
	};

	/**
	* 矩阵缩放
	* @method egret.Matrix#scale
	* @param x {number}
	* @param y {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.scale = function (x, y) {
	};

	/**
	* 矩阵唯一
	* @method egret.Matrix#translate
	* @param x {number}
	* @param y {number}
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.translate = function (x, y) {
	};

	/**
	* 矩阵重置
	* @method egret.Matrix#identity
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.identity = function () {
	};

	/**
	* 矩阵翻转
	* @method egret.Matrix#invert
	* @returns {egret.Matrix}
	*/
	Matrix.prototype.invert = function () {
	};

	/**
	* 根据一个矩阵，返回某个点在该矩阵上的坐标
	* @method egret.Matrix.transformCoords
	* @param matrix {egret.Matrix}
	* @param x {number}
	* @param y {number}
	* @returns {numberPoint}
	* @stable C 该方法以后可能删除
	*/
	Matrix.transformCoords = function (matrix, x, y) {

	};
	Matrix.identity = new Matrix();

	Matrix.DEG_TO_RAD = Math.PI / 180;
	return Matrix;
})();
