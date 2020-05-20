/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbProviderBase = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "CmdbProviderBase");
        
    return Class.define(function WombatProvider(){
        CmdbProviderBase.call(this);
        this._restInfo.contentType = 'application/xml';
        this._restInfo.stringifyJsonContent = false;
        this._restInfo.urlBase = "http://wombat.cba.com";
        this._requestUrl.urlCreateTemplate = "/cmdb/v1/record";
        this._requestUrl.urlDeleteTemplate = "/cmdb/v1/record";             

        // Overriding base class implementation
        // The requestObj is defined in the createCi() and deleteCi() in the base provider
        this.createPostPayload = function(requestObj){
            if(requestObj.action === "Create"){
                var ret = "<CreateRecord>";
                var ret2 = "<Name>" + requestObj.name + "</Name>"; 
                var ret3 = "<Size>" + requestObj.size + "</Size>";
                return ret + ret2 + ret3 + "</CreateRecord>";              
            }
            else if(requestObj.action === "Delete"){
                var ret = "<DeleteRecord>";
                var ret2 = "<Id>" + requestObj.id + "</Id>"; 
                return ret + ret2 + "</DeleteRecord>";
            }
        },

        // Overriding base class implementation
        this.checkResult = function(responseObj){
            if(responseObj.statusCode >= 200 && responseObj.statusCode <= 299)
                return true;
            else if(responseObj.statusCode >= 400 && responseObj.statusCode <= 499)
                return false;
            else
                throw new Error("Wombat REST call returned status code: " + responseObj.statusCode + ", and content: " + responseObj.contentAsString);
        }

    }, null, CmdbProviderBase);
})