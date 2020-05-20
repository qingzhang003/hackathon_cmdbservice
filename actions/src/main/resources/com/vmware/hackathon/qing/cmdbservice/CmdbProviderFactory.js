/**
 * Write a brief description of the purpose of the action.
 * Imports
 * System.getModule("com.vmware.hackathon.qing.cmdbservice.kangaroo").KangarooProvider();
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var KangarooProvider = Class.load("com.vmware.hackathon.qing.cmdbservice.kangaroo", 
        "KangarooProvider");
    var WombatProvider = Class.load("com.vmware.hackathon.qing.cmdbservice.wombat", 
        "WombatProvider");
    var PlatypusProvider = Class.load("com.vmware.hackathon.qing.cmdbservice.platypus", 
        "PlatypusProvider");
    return Class.define(function CmdbProviderFactory(){
        this.getProvider = function(cmdbType){
            switch(cmdbType){
                case "Kangaroo":
                    return new KangarooProvider();
                case "Wombat":
                    return new WombatProvider();     
                case "Platypus":
                    return new PlatypusProvider();     
                default:  
                    throw "Not implemented";   
            }
        }        
    }, null, null);
})