/*
* Kangraoo provider test using Jasmine Spy. 
*/
describe("***Kangraoo SpyOn==>", function() {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice",
        "CmdbProviderFactory");
    var factory = new CmdbProviderFactory();
    var kangarooProvider = factory.getProvider("Kangaroo");

    var RestApiService = Class.load("com.vmware.hackathon.qing.cmdbservice", 
        "RestApiService");

    var myfakeRestClient = function(){
        this.post = function(urlTemplate, param, payload, options){
            expect(urlTemplate).toBe("/api/record");
            expect(param).toEqual([]);
            expect(payload.name).toEqual("my kangraoo");
            expect(payload.size).toEqual(22);
            expect(options.headers['Content-Type']).toBe('application/json');
            expect(options.stringifyJsonContent).toBeTruthy();            
            return { "statusCode": 200, "contentAsString": "{}" };
        };
        
        this.delete = function(urlTemplate, param, options){
            expect(urlTemplate).toBe("/api/record/{id}");
            expect(param).toEqual([45]);
            expect(options.returnResponseObject).toEqual(true);
            return { "statusCode": 200, "contentAsString": "{}" };
        };       

    };
  
    beforeEach(function(){
        var restApi = new RestApiService(kangarooProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            return new myfakeRestClient();
        });
        kangarooProvider._restApiService = restApi;   
    });

    it("Kangaroo add CMDB record", function(){
        expect(kangarooProvider.createCi("my kangraoo", 22)).toBeTruthy();
    });

    it("Kangaroo delete CMDB record", function(){
        expect(kangarooProvider.deleteCi(45)).toBeTruthy();
    });

});   