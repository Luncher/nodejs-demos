//1
//ctx.scale(scaleX, scaleY);
//ctx.transform(scaleX, 0, 0, scaleY, 0, 0);

//2
//ctx.rotate(rotate);
//var cos = Math.cos(rotate);
//var sin = Math.sin(rotate);
//ctx.transform(cos, sin, -sin, cos, 0, 0);

function testTransformOrder(ctx) {
	var scaleX = 0.5, scaleY = 1;
	var cos = Math.cos(Math.PI/3);
	var sin = Math.sin(Math.PI/3);

	ctx.save();

	ctx.scale(scaleX, scaleY);
	ctx.rotate(Math.PI/3);
	//ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
	//ctx.transform(cos, sin, -sin, cos, 0, 0);

	ctx.fillRect(0, 0, 100, 50);
	ctx.restore();

	ctx.translate(200, 0);

	ctx.save();
	ctx.transform(cos*scaleX, sin*scaleY, -sin*scaleX, cos*scaleY, 0, 0);
	ctx.fillRect(0, 0, 100, 50);
	ctx.restore();
	
	ctx.translate(200, 0);

	ctx.save();
	var matrix = new Matrix;
	matrix.scale(scaleX, scaleY);
	matrix.rotate(Math.PI/3);
	ctx.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
	ctx.fillRect(0, 0, 100, 50);
	ctx.restore();
}

function pInPolygon(points, testx, testy) {
	var c = false;

	for (var i = 0, j = points.length-1; i < points.length; j = i++) {
		if (((points[i].y > testy) != (points[j].y > testy)) &&
			(testx < (points[j].x-points[i].x) * (testy-points[i].y) / (points[j].y-points[i].y) + points[i].x) )
			c = !c;
	}

	return c;
}

function isPointInMatrix(matrix, point) {
	
}

function isPointInRectangle(ctx, point, x, y, w, h, scaleX, scaleY, rotate) {
	//1
	//ctx.scale(scaleX, scaleY);
	//ctx.transform(scaleX, 0, 0, scaleY, 0, 0);

	//2
	//ctx.rotate(rotate);
	//var cos = Math.cos(rotate);
	//var sin = Math.sin(rotate);
	//ctx.transform(cos, sin, -sin, cos, 0, 0);

	//m1:
	//
	// scaleX 	0		0
	// 0		scaleY	0
	// 0		0		1
	
	// m2:
	//
	// cos		-sin	0
	// sin		cos		0
	// 0		0		1

	var cos = Math.cos(rotate);
	var sin = Math.sin(rotate);
	var a = scaleX*cos;
	var b = scaleY*sin;
	var c = -scaleX*sin;
	var d = scaleY*cos;
	var e = 0;
	var f = 0;

	//prev
	var p1 = {x: x, y: y};
	var p2 = {x: x+w, y: y};
	var p3 = {x: x+w, y: y+h};
	var p4 = {x: x, y: y+h};

	ctx.fillRect(x, y, w, h);	
	ctx.fillStyle = "blue";

	var p11 = calcTransformPoint(p1);
	var p21 = calcTransformPoint(p2);
	var p31 = calcTransformPoint(p3);
	var p41 = calcTransformPoint(p4);

	console.debug('p11:', p11);
	console.debug('p21:', p21);
	console.debug('p31:', p31);
	console.debug('p41:', p41);

	ctx.beginPath();
	ctx.moveTo(p11.x, p11.y);
	ctx.lineTo(p21.x, p21.y);
	ctx.lineTo(p31.x, p31.y);
	ctx.lineTo(p41.x, p41.y);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(point.x, point.y, 2, 0, 2*Math.PI);
	ctx.stroke();

	function calcTransformPoint(p) {
		var x = a*p.x + c*p.y + e;
		var y = b*p.x + d*p.y + f;

		return {x: x, y: y};
	}

	var points = [p21, p41, p11, p31];
	var ret = pInPolygon(points, point.x, point.y);
	console.debug('test point: ', point);
	console.debug('ret: ', ret);
}

function testSaveCancasState(ctx) {
	//1 black
	ctx.fillRect(10, 10, 100, 10);
	ctx.save();
	//2 red
	ctx.fillStyle = "#f00";
	ctx.fillRect(10, 40, 100, 10);
	ctx.save();
	//3 blue
	ctx.fillStyle = "#00f";
	ctx.fillRect(10, 70, 100, 10);
	//2 red
	ctx.restore();
	ctx.fillRect(10, 100, 100, 10);
	//1 black
	ctx.restore();
	ctx.fillRect(10, 130, 100, 10);
}

function testTranslate(ctx) {
	var styles = ["#f00", "#0f0", "#00f"];
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			ctx.save();	
			ctx.translate(30*j, 30*i);
			ctx.fillStyle = styles[i];
			ctx.fillRect(0,0,20,20);
			ctx.restore();
		}
	}
}

function testRotate(ctx) {
	ctx.save();	

	ctx.fillStyle = "#555";
	ctx.fillRect(0, 0, 50, 50);
	ctx.save();
	ctx.rotate(Math.PI/180*45);	
	ctx.fillStyle = "#888";
	ctx.fillRect(0, 0, 50, 50);
	ctx.restore();

	ctx.fillRect(100, 0, 50, 50);

	ctx.translate(100+25, 0+25);
	ctx.rotate(Math.PI/180*45);
	ctx.translate(-125, -25);
	ctx.fillStyle = "#888";
	ctx.fillRect(100, 0, 50, 50);

	ctx.restore();
}

function testScale(ctx) {
	ctx.save();	
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "red";
	ctx.fillStyle = 'red';
	ctx.moveTo(0, 0);
	ctx.lineTo(0, 150);
	ctx.moveTo(0, 0);
	ctx.lineTo(150, 0);
	ctx.stroke();
	ctx.fillRect(0, 0, 30, 30);
	ctx.font = "20px serif";
	ctx.fillText("hello", 0, 0);

	ctx.scale(-2, 1);
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.fillStyle = 'blue';
	ctx.lineWidth =1;
	ctx.moveTo(0, 0);
	ctx.lineTo(0, 80);
	ctx.moveTo(0, 0);
	ctx.lineTo(80, 0);
	ctx.stroke();
	ctx.fillRect(0, 0, 30, 30);
	ctx.fillText("hello", 0, 0);
	ctx.restore();
}

function testTransform(ctx) {
	var sin = Math.sin(Math.PI/6);
	var cos = Math.cos(Math.PI/6);

	ctx.save();
	ctx.translate(100, 100);
	for(var i = 0; i <= 12; i++) {
		c = Math.floor(255/12*i);	
		ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
		ctx.fillRect(0, 0, 100, 10);
		ctx.transform(cos, sin, -sin, cos, 0, 0);
	}

	ctx.setTransform(-1, 0, 0, 1, 110, 300);
	ctx.fillStyle = "rgba(255, 128, 255, 0.5)";
	ctx.fillRect(0, 50, 100, 100);
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	ctx.restore();
}
