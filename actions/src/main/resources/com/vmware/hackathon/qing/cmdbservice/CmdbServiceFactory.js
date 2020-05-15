/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var KangarooService = Class.load("com.vmware.hackathon.qing.cmdbservice.kangaroo", 
        "KangarooService");
    var WombatService = Class.load("com.vmware.hackathon.qing.cmdbservice.wombat", 
        "WombatService");
    var PlatypusService = Class.load("com.vmware.hackathon.qing.cmdbservice.platypus", 
        "PlatypusService");
    return Class.define(function CmdbServiceFactory(){
        this.getService = function(cmdbType){
            switch(cmdbType){
                case "Kangaroo":
                    return new KangarooService();
                case "Wombat":
                    return new WombatService();     
                case "Platypus":
                    return new PlatypusService();     
                default:  
                    throw "Not implemented";   
            }
        }        
    }, null, null);
})