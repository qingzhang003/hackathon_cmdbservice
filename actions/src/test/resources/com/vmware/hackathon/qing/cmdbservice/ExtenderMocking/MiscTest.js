/*
* "After fact" unit test based on internal implementation, such as inheritence, setting and logic, etc. 
* Those tests can break if the internal implementation is changed, but it is needed when there is no other test facility during development. 
*/
describe("***Misc==>", function() {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice",
        "CmdbProviderFactory");
    var factory = new CmdbProviderFactory();
    var cmdbprovider = factory.getProvider("Kangaroo");

    it("Kangaroo Provider REST conntent type test", function(){
        expect(cmdbprovider._restInfo.contentType).toBe('application/json');
    });

    it("User name test for connecting with rest client", function(){
        expect(cmdbprovider._restInfo.username).toBe("");
    });

   it("Kangaroo provider inheritance override test", function(){
        expect(cmdbprovider.prepareCommitPayload(null)).toEqual(null);
    });

    it("Kangaroo provider inheritance override test 2", function(){
        expect(cmdbprovider._requestUrl.urlDeleteTemplate).toBe("/api/record/{id}");
    });    

    it("Kangaroo provider inheritance override test 3", function(){
        var request = {"action": "Delete", "id": 9993};
        var ret = cmdbprovider.createPostParams(request);
        expect(ret).toEqual([]);
    });

    var cmdbprovider_plat = factory.getProvider("Platypus");
    var httpData = {"statusCode": 200, "contentAsString": "{\"transactionId\": 898}"};

    it("Platypus provider inheritance override test", function(){
        expect(cmdbprovider_plat.checkResult(httpData)).toBeTruthy();
    });

    it("Platypus commit transaction payload test", function(){
        var ret2 = cmdbprovider_plat.prepareCommitPayload(httpData);
        expect(ret2).toEqual({"transactionId": 898});
    });

    it("Platypus provider inheritance override test 2", function(){
        expect(cmdbprovider_plat._requestUrl.urlCommitTemplate).toBe("/api/transaction/commit");
    });        

    var requestObj1 = { 
        "action": "Create",
        "name": "my test2",
        "size": 24
    };

    it("Kangraoo inheritence function override test 4", function(){
        var b = cmdbprovider.createPostPayload(requestObj1);
        expect(b.name).toBe("my test2");
    });

    var requestObj2 = { 
        "action": "Delete",
        "id": 232
    };
  
    it("Platypus delete payload test", function(){
        var ret3 = cmdbprovider_plat.createPostPayload(requestObj2);
        expect(ret3.id).toEqual(232);
    });    

    var cmdbprovider_wom = factory.getProvider("Wombat");
    it("Wombat delete payload test", function(){
        var ret4 = cmdbprovider_wom.createPostPayload(requestObj2);
        expect(ret4).toContain("</DeleteRecord>");
       
    });

    var httpData2 = {"statusCode": 250, "contentAsString": "{\"transactionId\": 8}"};
    it("Wombat check http result", function(){
        expect(cmdbprovider_wom.checkResult(httpData2)).toBeTruthy();
       
    });

    it("Wombat rest content type", function(){
        expect(cmdbprovider_wom._restInfo.contentType).toBe('application/xml');
    });

});