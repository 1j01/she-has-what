
(function () {
	var fontDummy = new Image();
	var loaded = false;
	fontDummy.onerror = function () {
		loaded = true;
	};
	fontDummy.src = "font/FontStuck-Extended.ttf";

	$DocScratchReaction = function (text) {
		text = text.toUpperCase();
		var t = 0;

		var $canvas = $(document.createElement("canvas"));
		var canvas = $canvas[0];
		var ctx = canvas.getContext("2d");

		var interval = 50;
		var recording = false;
		var recordingLength = 0;
		var ff = "fontstuck";
		var px = "px ";
		var fs = 50;
		ctx.font = fs + px + ff;
		var textWidth = ctx.measureText(text).width;
		canvas.width = Math.max(1, textWidth * 1.1);
		canvas.height = fs * 1;
		var textY = canvas.height * 4 / 4;

		var lightning = function (life, x, y, xd, yd, xtend) {
			if (life-- < 0) return;

			var r = 4;
			var r2 = 6;

			if (y < textY - fs) {
				yd += 2;
			}
			if (y > textY - 5) {
				yd -= 2;
			}

			var nx = x + xd * Math.random() * 5 + xtend * Math.random() * 2;
			var ny = y + yd * Math.random() * 5;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(nx, ny);
			ctx.stroke();
			lightning(
				life * 0.9,
				nx, ny,
				(xd + Math.random() * r - r / 2) / 2,
				(yd + Math.random() * r - r / 2) / 2,
				xtend
			);
			if (Math.random() < 0.1 && life > 10) {
				lightning(
					life * 0.49,
					nx, ny,
					(xd + Math.random() * r2 - r2 / 2) / 2,
					(yd + Math.random() * r2 - r2 / 2) / 2,
					xtend
				);
			}
		};

		var lx = 50;
		var animate = function () {
			ctx.font = fs + px + ff;
			ctx.textBaseline = "bottom";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#eee";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			//raylike shadowy stuff
			if (t >= 4 && t <= 6 || t == 19 || t == 22) {
				var start = 0, end = 10;
				ctx.fillStyle = "rgba(0,0,0,0.1)";
				if (t == 5) ctx.fillStyle = "rgba(0,0,0,0.3)";
				if (t == 6) ctx.fillStyle = "rgba(0,0,0,0.07)";
				if (t == 6) start = 7, end = 17;
				for (var i = start; i < end; i++) {
					ctx.fillText(text, i, textY);
				}
			}
			if (t == 14) {
				var l = 10;
				ctx.fillStyle = "rgba(0,0,0,0.4)";
				ctx.fillText(text, 0, textY - 2);
				ctx.fillStyle = "rgba(255,255,255,0.4)";
				ctx.fillText(text, 0, textY - 1);
			}
			if (t == 15 || t == 19) {
				var l = 10;
				ctx.fillStyle = "rgba(0,0,0,0.1)";
				if (t == 14) l = 17;
				for (var i = 0; i < l; i++) {
					ctx.fillText(text, 0, textY - i);
				}
			}

			//main text
			ctx.fillStyle = "#FFF"
			if (t == 6 || (t >= 14 && t <= 16)) {
				ctx.fillStyle = "#00FF36";
			}
			if (t == 17) {
				ctx.fillStyle = "rgba(0,0,0,0)";
			}
			if (t == 7 || t == 8 || t == 10 || t == 18) {
				ctx.fillStyle = "#000";
			}
			if (t == 19) {
				ctx.fillStyle = "#111";
			}
			if (t == 19) {
				ctx.fillStyle = "#666";
			}
			if (t == 20) {
				ctx.fillStyle = "#666";
			}
			if (t == 21) {
				ctx.fillStyle = "#AAA";
			}
			ctx.fillText(text, 0, textY);

			//secondary black text that sort of zooms a bit
			if (t >= 16 && t < 19) {
				ctx.font = (fs + 2 * (19 - t)) + px + ff;
				ctx.fillStyle = "#000";
				ctx.fillText(text, 0, textY);
			}

			//draw... lightning!
			ctx.strokeStyle = "yellow";
			if (Math.random() < 0.3) {
				lx = Math.random() * textWidth * 0.8;
			}
			if ((t % 8) < 4) {
				lightning(
					100,
					lx, textY - Math.random() * fs,
					0, Math.random() * 2 - 1,
					Math.random() * 4 - 2
				);
			}

			t = (t + 1) % 23;

			if (!recording && loaded) {
				recording = true;
			}
			if (recording) {
				if (++recordingLength < 100) {
					$canvas.trigger("frame", [canvas, interval]);
				} else if (recordingLength == 100) {
					$canvas.trigger("animation-complete");
				}
			}
		};
		setInterval(animate, interval);

		return $canvas;
	};
})();
