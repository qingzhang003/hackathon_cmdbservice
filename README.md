PSCoE Hackathon CMDB Service
# Hackathon CMDB Service
- Support 3 CMDB providers
- Use both inheritance and **composition** patterns
- Use 2 types of mocking for unit testing

## Code Overview
### Level 1 (Top level)
- *AddCmdbRecord.js*:
  - Action
- *RemoveCmdbRecord.js*:
  - Action
- *CmdbService.js*:
  - Can be used for scriptable task in vRO, and set user name and password if needed.
### Level 2
- *CmdbProviderFactory.js*: 
  - Returns provider object based on CMDB type. Used by top level class (level 1)
### Level 3
- *CmdbProviderBase.js* <---- *RestApiService.js* (composition to provider class)\
       |\
       ---> *KangraooProvider.js* (inheritance)\
       |\
       ---> *WombatProvider.js* (inheritance)\
       |\
       ---> *PlatypusProvider.js* (inheritance)

### Notes
- Majority of functionalities are implemented in base provider
  - Very few needs to be overridden in individual providers.
  - Single function for both single POST call and 2 POST calls (Platypus)  
- Rest API service is outside of the provider class
  - Intended to leverage **composition** pattern.
- RestClient options of *returnResponseObject* and *stringifyJsonContent* are leveraged.

## Unit Test
There are two types of tests implemented, total of 28.
### System Extender Mocking
- Under /ExtenderMocking directory
- Mocks directory added *RestHostFactory.js* to supporrt Rest Host mocking
- Tests uses System Extender to mock RestClient and RestHostFactory
  - *KangraooTest.js*
  - *WombatTest.js*
  - *PlatypusTest.js*
  - *MiscTest.js*
    - Internal function testing, leveraging Jamsine, used to debug code during development.
   
 ### Jamsine Spy Mocking
 - Under /SpyOnMocking directory
 - Intersecting *RestClient* class by calling a fake function
 - Used the following *spy* features:
   - *spyOn().and.callFake()*
   - *spyOn().and.callThrough()*
   - *expect().toHaveBeenCalledTimes()* for Platypus
 - The following tests run both createCi and removeCi
   - *KangraooSpyTest.js*
   - *WombatSpyTest.js*
   - *PlatypusSpyTest.js*
   - *MixMockingTest.js*
     - Use *RestClient* mocking implemented in *mocks* folder under /ExtenderMocking as the fake class         
   
      
