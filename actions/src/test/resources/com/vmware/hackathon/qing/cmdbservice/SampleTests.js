describe("sample", function() {
    var sample = System.getModule("com.vmware.hackathon.qing.cmdbservice").sample;
    it("should add two numbers", function() {
        expect(sample(5, 2)).toBe(7);
    });
});
