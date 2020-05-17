/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    return Class.define(function CmdbService(cmdbType){
        var Class = System.getModule("com.vmware.pscoe.library.class").Class();
        var CmdbServiceFactory = Class.load("com.vmware.hackathon.qing.cmdbservice",
            "CmdbServiceFactory");
    
        var factory = new CmdbServiceFactory();
        var cmdbservice = factory.getService(cmdbType);

        this.createRecord = function(name, size){
            return cmdbservice.restCreateRecord(name, size);                
        };

        this.deleteRecord = function(id){
            return cmdbservice.restDeleteRecord(id);
        };

        this.setRestCredential = function(username, password){
            cmdbservice.setRestCredential(username, password);
        };

    }, null, null);
})