/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbRestBase = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "CmdbRestBase");
        
    return Class.define(function PlatypusService(){
        CmdbRestBase.call(this);
        this._urlBase = "http://platypus.cba.com";
        this._urlCreateTemplate = "/api/transaction/create";
        this._urlDeleteTemplate = "/api/transaction/delete"; 
        this._urlCommitTemplate = "/api/transaction/commit";    
        
        this._prepareCommitPayload = function(httpData){
            if(!this._checkResult(httpData))
               return null;
            return httpData.contentAsString;
            if(httpData.contentAsString != null){
                var retObj = JSON.parse(httpData.contentAsString);
                if(retObj.hasOwnProperty("transactionId"))
                    return retObj;
            }
            throw "Invalid returned transaction id object: " + httpData.contentAsString;
        };

        this._prepareDeleteRecordPayload = function(id){
            return { "id": id };
        };


    }, null, CmdbRestBase);
})