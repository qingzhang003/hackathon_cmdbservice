/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    return Class.define(function CmdbRestBase(){
        this._endpointUrl = '';
        this._endpointName = '';
        this._username = '';
        this._password = '';
        this._contentType = 'application/json';
        this._stringifyJsonContent = true;

        this._restClient = null;
        this._urlCreateTemplate = '';
        this._urlDeleteTemplate = '';
        this._urlCommitTemplate = '';
    }, {

        setRestOptions: function(endpointUrl, endpointName, username, password){
            this._endpointUrl = endpointUrl;
            this._endpointName = endpointName;
            this._username = username;
            this._password = password;
        },

        _getRestClient: function(){
            if(this._restClient == null){
                var RestHostFactory = System.getModule("com.vmware.pscoe.library.rest").RestHostFactory();
                var restHost = RestHostFactory.newHostWithBasicAuth(this._endpointUrl, this._endpointName, this._username, this._password);
                this._restClient = System.getModule("com.vmware.pscoe.library.rest").RestClient();        
            }
            return this._restClient;
        },

        _restPostCall: function(urlTemplate, params, payload){

            var restClient = this._getRestClient();
            var httpData = restClient.post(urlTemplate, params, payload, {
                    headers: {
                        "Content-Type": this._contentType
                    },
                    returnResponseObject: true,
                    stringifyJsonContent: this._stringifyJsonContent
            });            
            return httpData;
        },

        _prepareCreateRecordPayload: function(name, size){
            var ret = {};
            ret.name = name;
            ret.size = size;
            return ret;            
        },

        _prepareCommitPayload: function(httpData){
            return null;
        },

        _prepareDeleteRecordPayload: function(id){
            return null;
        },

        _prepareDeleteRecordParams: function(id){
            return [];
        },

        _checkResult: function(responseObj){
            if(responseObj.statusCode == 200)
                return true;
            else if(responseObj.statusCode == 400)
                return false;
            else
                throw "REST call returned status code: " + responseObj.statusCode + ", and content: " + responseObj.contentAsString;

        },

        restCreateRecord: function(name, size){
            try{
                var payload = this._prepareCreateRecordPayload(name, size);
                var httpData = this._restPostCall(this._urlCreateTemplate, [], payload);
                var commitPayload = this._prepareCommitPayload(httpData);
                if(commitPayload != null){
                    httpData = this._restPostCall(this._urlCommitTemplate, [], commitPayload);
                }
                return this._checkResult(httpData);
            }
            catch(e){
                throw ("Creating CMDB record at " + this._urlCreateTemplate + " with name " + name + ", and size " + size + " failed: " + e);
            }

        },

        restDeleteRecord: function(id){
            try{
                var payload = this._prepareDeleteRecordPayload(id);
                var params = this._prepareDeleteRecordParams(id);
                var httpData = this._restPostCall(this._urlDeleteTemplate, params, payload);
                var commitPayload = this._prepareCommitPayload(httpData);
                if(commitPayload != null){
                    httpData = this._restPostCall(this._urlCommitTemplate, [], commitPayload);
                }
                return this._checkResult(httpData);
            }
            catch(e){
                throw ("Deleting CMDB record at " + this._urlDeleteTemplate + " with id " + id + " failed: " + e);
            }
        }

    }, null);
})