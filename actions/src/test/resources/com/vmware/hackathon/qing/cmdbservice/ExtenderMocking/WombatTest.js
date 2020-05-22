/*
* Wombat CMDB test
*/
describe("***Wombat==>", function() {
    System = System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").SystemExtender().mockSystem();
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    it("Wombat Add CMDB record test", function(){
        var addCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").AddCmdbRecord;
        expect(addCi("Wombat", "wombat record", 331)).toBeTruthy();
    });

    it("Wombat Remove CMDB record test", function(){
        var removeCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").RemoveCmdbRecord;
        expect(removeCi("Wombat", 331)).toBeTruthy();
    });

});