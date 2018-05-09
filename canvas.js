/**
 * line canvas
 * */
let lineCanvas = document.getElementById("lineCanvas"),
	canvasWidth = lineCanvas.parentNode.offsetWidth,
	canvasHeight = lineCanvas.parentNode.offsetHeight,
	percent = 0.3,
	handleTimer = null;
if (lineCanvas.getContext) {
	var lineContext = lineCanvas.getContext("2d"); //取得绘图上下文的引用
	function draw(A, k, w, begin_y, color) { //峰值，水平偏移，水平跨度，纵向偏移，canvas背景色
		lineContext.beginPath() //开始绘画
		lineContext.moveTo(0, begin_y); //移到绘画开始点
		lineContext.fillStyle = color; //设置填充canvas填充的颜色
		for (let x = 0; x < canvasWidth; x++) { //根据y=Asin(ωx+φ)+k画canvas sin曲线
			lineContext.lineTo(x, A * Math.sin(w * x + k) + begin_y)
		}
		lineContext.lineTo(canvasWidth, canvasHeight); //连接canvas右下角的点
		lineContext.lineTo(0, canvasHeight); //连接canvas左下角的点
		lineContext.closePath(); //连接开始点
		lineContext.fill(); //填充canvas
		lineContext.fillStyle = '#124539';
		lineContext.font = 'bold 16px Arial';
		lineContext.textAlign = 'center';
		lineContext.textBaseline = 'middle';
		lineContext.fillText(Math.round(percent * 100) + '%', canvasWidth / 2, canvasHeight / 2)
	}

	function drawSinLine() {
		var k1 = 300;
		var k2 = 0;
		clearInterval(handleTimer);
		handleTimer = setInterval(function () {
			lineContext.clearRect(0, 0, canvasWidth, canvasHeight); //清除canvas
			draw(-9, k1, 0.01, canvasHeight * (1 - percent), '#bbf3e6');
			k1 += .15;
			draw(10, k2, 0.02, canvasHeight * (1 - percent), '#69e0c4');
			k2 += .1;
			return
		}, 100);
	}
	drawSinLine();
}


/**
 * arc canvas
 */
let arcCanvas = document.getElementById("arcCanvas"),
	startArc = Math.PI, //开始角度
	endAngle = 180; //结束角度
if (arcCanvas.getContext) {
	var arcContext = arcCanvas.getContext("2d");
	arcContext.beginPath();
	arcContext.lineWidth = 14; //线宽
	arcContext.lineCap = "round"; //线头形状
	arcContext.fillStyle = '#124539';
	function drawArc() {
		var endArc = Math.PI / 180 * (endAngle + 180);
		var step = Math.PI / 180;
		if (startArc <= endArc) {
			arcContext.clearRect(0, 0, 300, 300);
			arcContext.arc(150, 150, 143, startArc, startArc + step, false);
			arcContext.strokeStyle = '#69e0c4';
			arcContext.stroke();
			arcContext.font = 'bold 16px Arial';
			arcContext.textAlign = 'center';
			arcContext.textBaseline = 'middle';
			arcContext.fillText(Math.round((startArc - Math.PI) * 180 / Math.PI / 360 * 100) + '%', 150, 150);
			startArc += step;
		} else {
			clearInterval(int);
		}
	}
	var int = setInterval(drawArc, 5);
}


/**
 * operation
 */
var ope = function (operate, per, ang) {
	if (operate === 'stop') {
		clearInterval(handleTimer);
	} else if (operate === 'start') {
		drawSinLine();
	} else if (operate === 'reset') {
		//重设line canvas		
		percent = per / 100;
		drawSinLine();
		//重设arc canvas
		arcContext.clearRect(0, 0, 300, 300); //注意：重新绘制arc 的时候需要先清楚canvas和重设弧线样式
		arcContext.beginPath();
		arcContext.lineWidth = 14;
		arcContext.lineCap = "round";
		startArc = Math.PI;
		endAngle = ang;
		setInterval(drawArc, 5);
	}
}