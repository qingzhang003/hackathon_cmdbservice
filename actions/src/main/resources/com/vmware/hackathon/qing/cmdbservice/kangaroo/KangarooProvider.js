/**
 *      The following are implemented in the base class:
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbProviderBase = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "CmdbProviderBase");
        
    return Class.define(function KangarooProvider(){
        CmdbProviderBase.call(this);
        this._restInfo.urlBase = "http://kangaroo.cba.com";
        this._requestUrl.urlCreateTemplate = "/api/record";
        this._requestUrl.urlDeleteTemplate = "/api/record/{id}";     
        
        // Only need to override this base class implementation
        this.createPostParams = function(requestObj){
            if(requestObj.action == "Delete")
                return [requestObj.id];
            else
                return [];
        };

    }, null, CmdbProviderBase);
})

