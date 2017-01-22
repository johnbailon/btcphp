$.get( "http://localhost:3050/ticker", function(data) {
	var d = new Date(data.timestamp * 1000);
  $("#rate").text(data.ask);
	$("#timestamp").text(d);
});
