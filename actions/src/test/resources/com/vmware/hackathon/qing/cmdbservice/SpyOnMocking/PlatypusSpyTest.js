/*
* Platypus provider test using Jasmine Spy. 
* Test the number of calls to REST Api POST was called. 
*/
describe("***Platypus SpyOn==>", function() {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice", "CmdbProviderFactory");
    var factory = new CmdbProviderFactory();
    var platypusProvider = factory.getProvider("Platypus");

    var RestApiService = Class.load("com.vmware.hackathon.qing.cmdbservice", "RestApiService");

    var myfakeRestClient = function(){
        this.post = function(urlTemplate, param, payload, options){
            expect(options.headers['Content-Type']).toBe('application/json');
            expect(options.stringifyJsonContent).toBeTruthy();
            expect(param).toEqual([]);
            if(urlTemplate == "/api/transaction/create"){
                expect(payload.name).toBe('my platypus');
                expect(payload.size).toEqual(599)
                return { "statusCode": 200, "contentAsString": "{\"transactionId\": 6}" };
            }
            else{
                expect(urlTemplate).toBe("/api/transaction/commit"); 
                expect(payload.transactionId).toEqual(6);
                return { "statusCode": 200, "contentAsString": "{}" };
            }
    
        };
    };

    var myfakeRestClient2 = function(){    
        this.post = function(urlTemplate, param, payload, options){
            expect(options.headers['Content-Type']).toBe('application/json');
            expect(options.stringifyJsonContent).toBeTruthy();
            expect(param).toEqual([]);
            if(urlTemplate == "/api/transaction/commit"){
                expect(urlTemplate).toBe("/api/transaction/commit"); 
                expect(payload.transactionId).toEqual(79);
                return { "statusCode": 200, "contentAsString": "{}" };
            }
            else{
                expect(payload.id).toEqual(45);
                return { "statusCode": 200, "contentAsString": "{\"transactionId\": 79}" };
            }
        };

    };

    it("Platypus add CMDB record", function(){
        var restApi = new RestApiService(platypusProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            return new myfakeRestClient();
        });
        platypusProvider._restApiService = restApi;
        spyOn(platypusProvider._restApiService, "restPostCall").and.callThrough();
       
        expect(platypusProvider.createCi("my platypus", 599)).toBeTruthy();
        expect(platypusProvider._restApiService.restPostCall).toHaveBeenCalledTimes(2);
    });

    it("Platypus delete CMDB record", function(){
        var restApi = new RestApiService(platypusProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            return new myfakeRestClient2();
        });
        platypusProvider._restApiService = restApi;
        spyOn(platypusProvider._restApiService, "restPostCall").and.callThrough();
        expect(platypusProvider.deleteCi(45)).toBeTruthy();        
        expect(platypusProvider._restApiService.restPostCall).toHaveBeenCalledTimes(2);

    });

});   