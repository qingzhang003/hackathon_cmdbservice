/*
* Use Jasmine Spy and RestClient implemented in System.getModule("com.vmware.hackathon.qing.ExtenderMocking.mocks"), but not system extender
* Test the number of calls to POST was made. 
*/
describe("***Mix Mocking==>", function() {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();

    var CmdbProviderFactory = Class.load("com.vmware.hackathon.qing.cmdbservice", "CmdbProviderFactory");
    var factory = new CmdbProviderFactory();
    var platypusProvider = factory.getProvider("Platypus");

    var RestApiService = Class.load("com.vmware.hackathon.qing.cmdbservice", "RestApiService");

    it("Platypus add CMDB record using mix method", function(){
        var restApi = new RestApiService(platypusProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            var RestClient = System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").RestClient();
            return new RestClient(null);
        });
        platypusProvider._restApiService = restApi;
        spyOn(platypusProvider._restApiService, "restPostCall").and.callThrough();
       
        expect(platypusProvider.createCi("my platypus", 599)).toBeTruthy();
        expect(platypusProvider._restApiService.restPostCall).toHaveBeenCalledTimes(2);
    });

    it("Platypus delete CMDB record using mix method", function(){
        var restApi = new RestApiService(platypusProvider._restInfo);
        spyOn(restApi, "_getRestClient").and.callFake(function(){
            var RestClient = System.getModule("com.vmware.hackathon.qing.cmdbservice.ExtenderMocking.mocks").RestClient();
            return new RestClient(null);
        });
        platypusProvider._restApiService = restApi;
        spyOn(platypusProvider._restApiService, "restPostCall").and.callThrough();

        expect(platypusProvider.deleteCi(45)).toBeTruthy();        
        expect(platypusProvider._restApiService.restPostCall).toHaveBeenCalledTimes(2);

    });


    

});   