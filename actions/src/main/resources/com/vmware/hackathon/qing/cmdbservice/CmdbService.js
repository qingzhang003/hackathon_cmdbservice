/**
 * This is the entry point to the cmdb service when using in a script
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    return Class.define(function CmdbService(cmdbType){
        var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice",
            "CmdbProviderFactory");
    
        var factory = new CmdbProviderFactory();
        var cmdbprovider = factory.getProvider(cmdbType);

        this.createRecord = function(name, size){
            return cmdbprovider.createCi(name, size);                
        };

        this.deleteRecord = function(id){
            return cmdbprovider.deleteCi(id);
        };

        // This can be called before createRecord() and deleteRecord()
        this.setRestCredential = function(username, password){
            cmdbprovider.setRestCredential(username, password);
        };

    }, null, null);
})