(function () {

	var SystemExtender = (function () {
		var Original = System;
		var methods = {
			"com.vmware.pscoe.library.rest": {
				"RestClient": function () {
					return System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").RestClient();
				},
				"RestTemplate": function (host) {
					return Original.getModule("com.vmware.pscoe.library.rest").RestTemplate(host);
				},
				"RestHostMock": function () {
					return Original.getModule("com.vmware.pscoe.library.rest").RestHostMock();
				},
				// "RestHostFactory": function () {
				// 	return Original.getModule("com.vmware.pscoe.library.rest").RestHostFactory();
				// }
				"RestHostFactory": function(){
					return System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").RestHostFactory();
				}

			}
		};

		function initDefaultData() {
			return mockSystemGetModule();
		}

		function mockSystemGetModule() {
			var OriginalSystem = System;

			return {
				waitUntil: function () {
					return "string"
				},
				getContext: function() {
					return OriginalSystem.getContext();
				},
				getModule: function (name) {
					if (methods[name]) {
						OriginalSystem.log("Calling mock action getModule: " + name);
					}
					return !methods[name] ? OriginalSystem.getModule(name) : methods[name];
				},
				log: function (msg) {
					OriginalSystem.log(msg);
				},
				warn: function (msg) {
					OriginalSystem.warn(msg);
				},
				error: function (msg) {
					OriginalSystem.error(msg);
				},
				debug: function (msg) {
					OriginalSystem.debug(msg);
				},
				formatDate: function (date, format) {
					return {
						toString: function() {}
					}
				},
				nextUUID: function () {
					OriginalSystem.nextUUID();
				},
				sleep: function () {}
			}
		}

		return {
			mockSystem: function () {
				System = initDefaultData();
				return System;
			}
		}

	}())

	return SystemExtender;
})
