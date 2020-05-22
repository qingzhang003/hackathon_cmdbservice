/*
Kangaroo CMDB test
*/
describe("***Kangaroo==>", function() {
    System = System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").SystemExtender().mockSystem();
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    it("Kangaroo test", function(){
        var addCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").AddCmdbRecord;
        expect(addCi("Kangaroo", "myKangaroo record", 331)).toBeTruthy();
    });

    it("Kangaroo Remove CMDB record test", function(){
        var removeCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").RemoveCmdbRecord;
        expect(removeCi("Kangaroo", 2341)).toBeTruthy();
    });

});