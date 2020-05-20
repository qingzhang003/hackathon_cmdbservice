/*
This is a test
*/
describe("CMDB Service Test", function() {
    System = System.getModule("com.vmware.hackathon.qing.mock").SystemExtender().mockSystem();
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    it("kangaroo test", function() {
        var CmdbService = Class.load("com.vmware.hackathon.qing.cmdbservice",
            "CmdbService");
        var service = new CmdbService("Kangaroo");

        // spyOn(service, "createRecord").and.returnValue(true);

        expect(service.createRecord("my record", 2333)).toBeTruthy();
    });

    it("Wombat test", function(){
        var addCi = System.getModule("com.vmware.hackathon.qing.cmdbservice").AddCmdbRecord;
        expect(addCi("Wombat", "wombat record", 331)).toBeTruthy();
    });

    var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice",
        "CmdbProviderFactory");
    var factory = new CmdbProviderFactory();
    var cmdbprovider = factory.getProvider("Kangaroo");

    it("user name test", function(){
        expect(cmdbprovider._restInfo.contentType).toBe('application/json');
    });

    // var myfakeCls = function() {
    //     this.post = function(urlTemplate, param, playlod){
    //         expect(urlTemplate).toBe("/api/record");
    //         return { "statusCode": 200, "contentAsString": "{}" };
    //     }            
    // };

    // it("kangaroo service test", function(){
    //     spyOn(cmdbprovider, "_getRestClient").and.callFake(function(){
    //         // var RestClient = System.getModule("com.vmware.hackathon.qing.mock").RestClient();
    //         // return new RestClient(null);
    //         return new myfakeCls();
    //     });
    //     expect(cmdbprovider.restCreateRecord("ads", 22)).toBeTruthy();
    // });

    it("user name test 2", function(){
        expect(cmdbprovider._restInfo.username).toBe("");
    });

//    it("kangaroo test 3", function(){
//         var b = cmdbprovider.createPostPayload("my test", 1);
//         expect(b.name).toBe("my test");
//     });

   it("kangaroo test 4", function(){
        expect(cmdbprovider.prepareCommitPayload(null)).toEqual(null);
    });

    it("kangaroo test 2", function(){
        expect(cmdbprovider._requestUrl.urlDeleteTemplate).toBe("/api/record/{id}");
    });    

    // cmdbprovider.setRestCredential('usename', 'abcd');

    // it("set option test", function(){
    //     expect(cmdbprovider._password).toBe("abcd");
    // });

    it("kangroo prepare params test", function(){
        var request = {"action": "Delete", "id": 9993};
        var ret = cmdbprovider.createPostParams(request);
        expect(ret).toEqual([9993]);
    });

    var cmdbprovider_plat = factory.getProvider("Platypus");
    var httpData = {"statusCode": 230, "contentAsString": "{\"transactionId\": 898}"};

    // it("Test status code", function(){
    //     expect(cmdbprovider_plat.checkResult(httpData)).toBeTruthy();
    // });

    // it("Platypus test 2", function(){
    //     expect(cmdbprovider_plat._urlCommitTemplate).toBe("/api/transaction/commit");
    // });        


    // it("kangaroo test 5", function(){
    //     var b = cmdbprovider.createRecordPayload("my test2", 22);
    //     expect(b.name).toBe("my test2");
    // });

    // it("test Platypus commit transaction payload", function(){
    //     var ret2 = cmdbprovider_plat._prepareCommitPayload(httpData);
    //     expect(ret2).toEqual('{"transactionId": 898}');
        
    // });
  
    // it("test Platypus commit transaction payload", function(){
    //     var ret3 = cmdbprovider_plat._prepareDeleteRecordPayload(156);
    //     expect(ret3.id).toEqual(156);
    // });    

    // var cmdbprovider_wom = factory.getService("Wombat");
    // var httpData2 = {"statusCode": 250, "contentAsString": "{\"transactionId\": 8}"};
    // it("test Wombat check http result", function(){
    //     // try{
    //     //     cmdbprovider_wom._checkResult(httpData2);
    //     // }
    //     // catch(e){
    //     //     expect(e).toContain("Wombat REST");
    //     // }
    //     expect(cmdbprovider_wom._checkResult(httpData2)).toBeTruthy();
       
    // });


    // it("Wombat delete record test", function(){
    //     var ret4 = cmdbprovider_wom._prepareDeleteRecordPayload(2);
    //     expect(ret4).toContain('<DeleteRecord>');
    // });

});