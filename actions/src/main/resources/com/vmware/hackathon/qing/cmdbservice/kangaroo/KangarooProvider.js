/**
 *  Kangaroo CMDB provider, override the base implementation
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
        
        // One off which uses delete REST call.
        this.deleteCi = function(id){
            return this._cmdbRestDelete(this._requestUrl.urlDeleteTemplate, [id]);
        };

    }, null, CmdbProviderBase);
})

