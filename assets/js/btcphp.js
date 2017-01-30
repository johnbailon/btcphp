var pollTimer = null;
var timerDelay = 10000;
var ask = 0;
var timestamp = 0;

var c = $('.progress');

$(window).blur(function() {
	window.clearTimeout(pollTimer);
	pollTimer = null;
});

$(window).focus(function() {
	poll();
});

function poll() {
	if (pollTimer == null) {
		i = 0;
		$.get( "http://api.btcphp.com/ticker", function(data) {
			if (ask != data.ask) {
				$("#rate").fadeOut(500, function() {
					$("#rate").text(numeral(data.ask).format('0,0.00')).fadeIn(500);
				});
				ask = data.ask;
			}
			if (timestamp != data.timestamp) {
					$("#timestamp").fadeOut(500, function() {
						$("#timestamp").text(new Date(data.timestamp * 1000)).fadeIn(500);
					});
					timestamp = data.timestamp;
			}

			pollTimer = window.setTimeout(function() { pollTimer = null; poll(); }, timerDelay);

			c.circleProgress('animation',{duration: timerDelay});
		});
	}

}

poll();

c.circleProgress({
	value: 1,
	lineCap: 'round',
	size: 20,
	fill: {color: '#fff'},
	startAngle: Math.PI * 1.5,
	animation: { duration: timerDelay, },
	emptyFill: "rgba(255, 255, 255, .1)"
  });
