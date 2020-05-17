/*
This is a test
*/
describe("CMDB Service Test", function() {
    System = System.getModule("com.vmware.hackathon.qing.mock").SystemExtender().mockSystem();
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbService = Class.load("com.vmware.hackathon.qing.cmdbservice",
        "CmdbService");
    
    // beforeEach(function() {
    //     // var someObject = jasmine.createSpyObj('RestHostFactory', ['newHostWithNoAuth']);
    //     var someObject = jasmine.createSpyObj('CmdbService', ['_getRestClient']);
        
    //     someObject._getRestClient.and.callFake(function() {
    //         return null;
    //     });
    
    // });    

    it("kangaroo test", function() {
        var service = new CmdbService("Kangaroo");
 
        // spyOn(service, "createRecord").and.returnValue(true);

        // // var someObject = jasmine.createSpyObj('RestHostFactory', ['newHostWithNoAuth']);
        // var someObject = jasmine.createSpyObj('service', ['_getRestClient']);
        
        // someObject._getRestClient.and.callFake(function() {
        //     return null;
        // });

        expect(service.createRecord("my record", 2333)).toBeTruthy();
    });

    var CmdbServiceFactory = Class.load("com.vmware.hackathon.qing.cmdbservice",
        "CmdbServiceFactory");
    var factory = new CmdbServiceFactory();
    var cmdbservice = factory.getService("Kangaroo");

    it("user name test", function(){
        expect(cmdbservice._contentType).toBe('application/json');
    });

    it("user name test 2", function(){
        expect(cmdbservice._username).toBe("");
    });

   it("kangaroo test 3", function(){
        var b = cmdbservice._prepareCreateRecordPayload("my test", 1);
        expect(b.name).toBe("my test");
    });

   it("kangaroo test 4", function(){
        expect(cmdbservice._prepareCommitPayload(null)).toEqual(null);
    });

    it("kangaroo test 2", function(){
        expect(cmdbservice._urlDeleteTemplate).toBe("/api/record/{id}");
    });    

    // cmdbservice.setRestCredential('usename', 'abcd');

    // it("set option test", function(){
    //     expect(cmdbservice._password).toBe("abcd");
    // });

    it("kangroo prepare params test", function(){
        var ret = cmdbservice._prepareDeleteRecordParams(9993);
        expect(ret).toEqual([9993]);
    });

    var cmdbservice_plat = factory.getService("Platypus");
    var httpData = {"statusCode": 200, "contentAsString": "{\"transactionId\": 898}"};

    it("Test status code", function(){
        expect(cmdbservice_plat._checkResult(httpData)).toBeTruthy();
    });

    it("Platypus test 2", function(){
        expect(cmdbservice_plat._urlCommitTemplate).toBe("/api/transaction/commit");
    });        


    it("kangaroo test 5", function(){
        var b = cmdbservice._prepareCreateRecordPayload("my test2", 22);
        expect(b.name).toBe("my test2");
    });

    it("test Platypus commit transaction payload", function(){
        var ret2 = cmdbservice_plat._prepareCommitPayload(httpData);
        expect(ret2).toEqual('{"transactionId": 898}');
        
    });
  
    it("test Platypus commit transaction payload", function(){
        var ret3 = cmdbservice_plat._prepareDeleteRecordPayload(156);
        expect(ret3.id).toEqual(156);
    });    

    var cmdbservice_wom = factory.getService("Wombat");
    var httpData2 = {"statusCode": 250, "contentAsString": "{\"transactionId\": 8}"};
    it("test Wombat check http result", function(){
        // try{
        //     cmdbservice_wom._checkResult(httpData2);
        // }
        // catch(e){
        //     expect(e).toContain("Wombat REST");
        // }
        expect(cmdbservice_wom._checkResult(httpData2)).toBeTruthy();
        //expect(httpData2.statusCode >= 200 && httpData2.statusCode <= 400).toBeTruthy();
    });


    it("Wombat delete record test", function(){
        var ret4 = cmdbservice_wom._prepareDeleteRecordPayload(2);
        expect(ret4).toContain('<DeleteRecord>');
    });

});