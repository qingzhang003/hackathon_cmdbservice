/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbProviderBase = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "CmdbProviderBase");
        
    return Class.define(function PlatypusProvider(){
        CmdbProviderBase.call(this);
        this._restInfo.urlBase = "http://platypus.cba.com";
        this._requestUrl.urlCreateTemplate = "/api/transaction/create";
        this._requestUrl.urlDeleteTemplate = "/api/transaction/delete"; 
        this._requestUrl.urlCommitTemplate = "/api/transaction/commit";    
        
        this.prepareCommitPayload = function(httpData){
            if(!this.checkResult(httpData))
               return null;
            if(httpData.contentAsString != null){
                var retObj = JSON.parse(httpData.contentAsString);
                if(retObj.hasOwnProperty("transactionId"))
                    return retObj;
            }
            throw "Invalid returned transaction id object: " + httpData.contentAsString;
        };
        
        // The requestObj is defined in the createCi() and deleteCi() in the base provider
        this.createPostPayload = function(requestObj){
            if(requestObj.action === "Create"){
                return {"name": requestObj.name, "size": requestObj.size};            
            }
            else if(requestObj.action === "Delete")
                return {"id": requestObj.id};
        };

    }, null, CmdbProviderBase);
})