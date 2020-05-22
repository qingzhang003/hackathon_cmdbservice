(function (host) {

	var RestClient = function () {}

	function bundleResponse(content, statusCode) {
		return {
			"contentAsString": content,
			"contentLength": 16,
			"statusCode": statusCode,
			"responseHeaders": {
				"Content-Type": "application/json"
			}
		}
	}



	RestClient.prototype.get = function (urlTemplate, params, headers, options) {
		return null;
	}
	RestClient.prototype.post = function (urlTemplate, params, headers, options) {
		if (urlTemplate == "/cmdb/v1/record") {
			return bundleResponse("", 200);
		} else if (urlTemplate == "/api/transaction/create") {
			var payload = {
				"transactionId" : 1
			  }
			return bundleResponse(JSON.stringify(payload), 200);
		} else if (urlTemplate == "/api/transaction/delete") {
			var payload = {
				"transactionId" : 5
			  }
			return bundleResponse(JSON.stringify(payload), 200);
		} else if (urlTemplate == "/api/transaction/commit") {
			return bundleResponse("", 200);
		}
		else if(urlTemplate == "/api/record"){
			return bundleResponse("", 200);	
		}

		return null;
	}
	RestClient.prototype.put = function (urlTemplate, params, options) {
		if (urlTemplate == "/api/record") {
			return bundleResponse("", 200);
		}

		return null;
	}
	RestClient.prototype.delete = function (urlTemplate, params, options) {
		if (urlTemplate == "/api/record/{id}") {
			return bundleResponse("", 200);
		} else if (urlTemplate == "/cmdb/v1/record") {
			return bundleResponse("", 200);
		}

		return null;
	}

	return RestClient;
})
