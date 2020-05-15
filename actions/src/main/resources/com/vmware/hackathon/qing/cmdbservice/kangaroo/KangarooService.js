/**
 *      The following are implemented in the base class:
        // this._prepareCreateRecordPayload = function(name, size){
        // this._prepareCommitPayload = function(httpData){
        // this._prepareDeleteRecordPayload = function(id){
        // this._checkResult = function(Data){}
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbRestBase = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "CmdbRestBase");
        
    return Class.define(function KangarooService(){
        this._urlCreateTemplate = "http://kangaroo.cba.com/api/record";
        this._urlDeleteTemplate = "http://kangaroo.cba.com/api/record/{id}";     
        
        this._prepareDeleteRecordParams = function(id){
            return [id];
        };

    }, null, CmdbRestBase);
})

