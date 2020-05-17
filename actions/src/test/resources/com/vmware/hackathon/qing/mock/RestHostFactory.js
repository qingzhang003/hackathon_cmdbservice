(function(){
    function RestHostFactory() {/*empty constructor*/}
    
    // public object API
    RestHostFactory.prototype = {};

    RestHostFactory.newHostWithBasicAuth = function(url, name, username, password) {
        // return getHost(url, name);
        return null;
    };

    RestHostFactory.newHostWithNoAuth = function(url, name) {
        // return getHost(url, name);
        return null;
    };

    return RestHostFactory;
})