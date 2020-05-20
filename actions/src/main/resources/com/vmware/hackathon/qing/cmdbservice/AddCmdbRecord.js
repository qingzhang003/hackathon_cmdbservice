/**
 * Write a brief description of the purpose of the action.
 * @param {string} cmdbType - cmdb type, such as Kangaroo, Wombat, or Platypus
 * @param {string} recordName - cmdb record name
 * @param {number} recordSize - cmdb record size
 * @returns {boolean} - return true = success, false = failure, or throw exception
 */
(function (cmdbType, recordName, recordSize) {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbService = Class.load("com.vmware.hackathon.qing.cmdbservice",
        "CmdbService");

    var cmdbservice = new CmdbService(cmdbType);
    return cmdbservice.createRecord(recordName, recordSize);
})