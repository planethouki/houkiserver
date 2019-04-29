$.get("https://houkiserverquery.azurewebsites.net/", function(data){
	$("#version").text(data.version.name);
	$("#max-players").text(data.players.max);
	$("#login-players").text(data.players.online);
	// $("#motd").text(data.description.text);
});