/**
 * Write a brief description of the purpose of the action.
*/
"use strict"
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    return Class.define(function CmdbProviderBase(){
        this._restInfo = {
            "urlBase" : '',
            "endpointName" : 'cmdb_endpoint',
            "username" : '',
            "password" : '',
            "contentType" : 'application/json',
            "stringifyJsonContent" : true
        };

        this._requestUrl = { 
            "urlCreateTemplate" : '',
            "urlDeleteTemplate" : '',
            "urlCommitTemplate" : ''
        };

        // Composition usage here
        this._restApiService = null;

        // Return error message context
        var _getErrContext = function(requestObj, restInfo){
            var str1 = requestObj.action + " CMDB record on " + restInfo.urlBase + requestObj.url;
            if(requestObj.action === 'Create')
                str1 += " with name " + requestObj.name + ", size " + requestObj.size + " failed: ";
            else if(requestObj.action == "Delete")
                str1 += " with id " + requestObj.id + " failed: ";
            else
                str1 += " failed: ";
            return str1;
        };

        // Assign an object for the provider, in this case it is Rest Api service.
        this._getRestApiService = function(){
            if(this._restApiService === null){
                var Class = System.getModule("com.vmware.pscoe.library.class").Class();
                var RestApiService = Class.load("com.vmware.hackathon.qing.cmdbservice", 
                    "RestApiService");
                this._restApiService = new RestApiService(this._restInfo);
            }
            return this._restApiService;
        };

        // This is the main POST function for interacting with CMDBs. cmdbRestGet() can be another one, for example
        this._cmdbRestPost = function(requestObj){
            try{
                var restApiService = this._getRestApiService(); 
                var payload = this.createPostPayload(requestObj);
                var params = this.createPostParams(requestObj);
                var httpData = restApiService.restPostCall(requestObj.url, params, payload);
                var commitPayload = this.prepareCommitPayload(httpData);
                if(commitPayload != null){
                    httpData = restApiService.restPostCall(requestObj.urlCommit, [], commitPayload);
                }
                return this.checkResult(httpData);               
            }
            catch(e){
                throw _getErrContext(requestObj, this._restInfo) + e;
            }
        };

        // An implementation which may or may not be overridden by a provider. 
        // The requestObj is defined in the createCi() and deleteCi() at the end of this class
        this.createPostPayload = function(requestObj){
            if(requestObj.action === "Create")
                return {"name": requestObj.name, "size": requestObj.size};            
            else
                return null;
        };

        // This may or may not be overridden by a provider
        this.prepareCommitPayload = function(httpData){
            return null;
        };

        // An implementation which may or may not be overridden by a provider.
        // This can be useful, but it is not used by any provider at this time 
        this.createPostParams = function(requestObj){
            return [];
        };

        // An implementation which will be overridden by wombat provider
        this.checkResult = function(responseObj){
            if(responseObj.statusCode == 200)
                return true;
            else if(responseObj.statusCode == 400)
                return false;
            else
                throw "REST call returned status code: " + responseObj.statusCode + ", and content: " + responseObj.contentAsString;
        }; 

        // Main function 
        this.createCi = function(name, size){
            var requestObj = { 
                "action": "Create",
                "url": this._requestUrl.urlCreateTemplate,
                "urlCommit": this._requestUrl.urlCommitTemplate,
                "name": name,
                "size": size
            };
            return this._cmdbRestPost(requestObj);
        };

        // Main function
        this.deleteCi = function(id){
            var requestObj = { 
                "action": "Delete",
                "url": this._requestUrl.urlDeleteTemplate,
                "urlCommit": this._requestUrl.urlCommitTemplate,
                "id": id,
            };
            return this._cmdbRestPost(requestObj);
        };

        // Call this function to set user name and password before calling main function if needed.
        this.setRestCredential = function(username, password){
            this._restInfo.username = username;
            this._restInfo.password = password;
        };

        // Standard call for REST delete
        this._cmdbRestDelete = function(urlTemplate, params, payload){
            try{
                var restApiService = this._getRestApiService(); 
                var httpData = restApiService.restDeleteCall(urlTemplate, params, payload);
                return this.checkResult(httpData);               
            }
            catch(e){
                var str1 = "Delete REST call on " + this._restInfo.urlBase + urlTemplate + " failed: ";
                throw str1 + e;
            }
        };


    }, null, null);
})