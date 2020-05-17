/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbRestBase = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "CmdbRestBase");
        
    return Class.define(function WombatService(){
        CmdbRestBase.call(this);
        this._contentType = 'application/xml';
        this._stringifyJsonContent = false;
        this._urlBase = "http://wombat.cba.com";
        this._urlCreateTemplate = "/cmdb/v1/record";
        this._urlDeleteTemplate = "/cmdb/v1/record";     
        
        this._prepareCreateRecordPayload = function(name, size){
            var ret = "<CreateRecord>";
            var ret2 = "<Name>" + name + "</Name>"; 
            var ret3 = "<Size>" + size + "</Size>";
            return ret + ret2 + ret3 + "</CreateRecord>";
        };

        this._prepareDeleteRecordPayload = function(id){
            var ret = "<DeleteRecord>";
            var ret2 = "<Id>" + id + "</Id>"; 
            return ret + ret2 + "</DeleteRecord>";
        };

        this._checkResult = function(responseObj){
            if(responseObj.statusCode >= 200 && responseObj.statusCode <= 299)
                return true;
            else if(responseObj.statusCode >= 400 && responseObj.statusCode <= 499)
                return false;
            else
                throw new Error("Wombat REST call returned status code: " + responseObj.statusCode + ", and content: " + responseObj.contentAsString);
        }

    }, null, CmdbRestBase);
})