"use strict";

var staticServer,
	http = require("http"),
	program = require("commander"),
	nodeStatic = require("node-static"),
	serverOptions = {
		headers: { "Cache-Control": "no-cache, must-revalidate" }
	};

function clientRequestHandler(request, response) {
	request.addListener("end", requestEndedListener).resume();
	
	function requestEndedListener() {
		staticServer.serve(request, response);
	}
}

function parseArgumentsAndLaunchServer(args) {
	program.
		version("0.0.0").
		option("-p, --port [port]", "Server port", 8080).
		parse(args);

	staticServer = new nodeStatic.Server(".", serverOptions);

	console.info("Connecting server to port", program.port);

	http.createServer(clientRequestHandler).listen(program.port);
}

module.exports = parseArgumentsAndLaunchServer;
