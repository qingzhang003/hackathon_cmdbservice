/*
* Wombat provider test using Jasmine Spy. 
*/
describe("***Wombat SpyOn==>", function() {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice", "CmdbProviderFactory");
    var factory = new CmdbProviderFactory();
    var wombatProvider = factory.getProvider("Wombat");

    var RestApiService = Class.load("com.vmware.hackathon.qing.cmdbservice", "RestApiService");

    var myfakeRestClient = function(){
        this.post = function(urlTemplate, param, payload, options){
            expect(urlTemplate).toBe("/cmdb/v1/record");
            expect(param).toEqual([]);
            expect(payload).toContain('</CreateRecord>');
            expect(payload).toContain('my wombat');
            expect(payload).toContain('22');
            expect(options.headers['Content-Type']).toBe('application/xml');
            expect(options.stringifyJsonContent).toBeFalsy();
            return { "statusCode": 202, "contentAsString": "{}" };
        };
    };

    var myfakeRestClient2 = function(){    
        this.post = function(urlTemplate, param, payload, options){
            expect(urlTemplate).toBe("/cmdb/v1/record");
            expect(param).toEqual([]);
            expect(payload).toContain('<DeleteRecord>');
            expect(payload).toContain('45');
            expect(options.headers['Content-Type']).toBe('application/xml');
            expect(options.stringifyJsonContent).toBeFalsy();
            return { "statusCode": 203, "contentAsString": "{}" };
        };

    };

    it("Wombat add CMDB record", function(){
        var restApi = new RestApiService(wombatProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            return new myfakeRestClient();
        });
        wombatProvider._restApiService = restApi;
        expect(wombatProvider.createCi("my wombat", 22)).toBeTruthy();
    });

    it("Wombat delete CMDB record", function(){
        var restApi = new RestApiService(wombatProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            return new myfakeRestClient2();
        });
        wombatProvider._restApiService = restApi;
        expect(wombatProvider.deleteCi(45)).toBeTruthy();
    });
});   