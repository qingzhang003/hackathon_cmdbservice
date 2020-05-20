/**
 * REST API Service for CMDB provider. This is ONE of the functionalities of the CMDB provider. 
*/
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    return Class.define(function RestApiService(restInfo){
        this._restInfo = restInfo;
        this._restClient = null;


        this.setRestCredential = function(username, password){
            this._restInfo.username = username;
            this._restInfo.password = password;
        };

        this._getRestClient = function(){
            if(this._restClient == null){
                var RestHostFactory = Class.load("com.vmware.pscoe.library.rest", "RestHostFactory");
                var restHost = null;
                if(this._username != '')
                    restHost = RestHostFactory.newHostWithBasicAuth(this._restInfo.urlBase, this._restInfo.endpointName, this._restInfo.username, this._restInfo.password);
                else                
                    restHost = RestHostFactory.newHostWithNoAuth(this._restInfo.urlBase, this._restInfo.endpointName);
                var RestClient = Class.load("com.vmware.pscoe.library.rest", "RestClient");  
                this._restClient = new RestClient(restHost);
            }
            return this._restClient;
        };

        this.restPostCall = function(urlTemplate, params, payload){
           var restClient = this._getRestClient();
            var httpData = restClient.post(urlTemplate, params, payload, {
                    headers: {
                        "Content-Type": this._restInfo.contentType
                    },
                    returnResponseObject: true,
                    stringifyJsonContent: this._restInfo.stringifyJsonContent
            });            
            return httpData;
        };


    }, null, null);
})