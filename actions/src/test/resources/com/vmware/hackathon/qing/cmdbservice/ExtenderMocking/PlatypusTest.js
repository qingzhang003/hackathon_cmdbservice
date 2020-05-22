/*
* Platypus CMDB test using SystemExtender
*/
describe("***Platypus==>", function() {
    System = System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").SystemExtender().mockSystem();
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    it("Platypus Add CMDB record test", function(){
        var addCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").AddCmdbRecord;
        expect(addCi("Platypus", "wombat record", 331)).toBeTruthy();
    });

    it("Platypus Remove CMDB record test", function(){
        var removeCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").RemoveCmdbRecord;
        expect(removeCi("Platypus", 331)).toBeTruthy();
    });

});