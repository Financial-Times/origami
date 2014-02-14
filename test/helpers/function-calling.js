 o = window.o || {};

 o.verifyFunctionCalls = function (initiator, spiesConf) {
    var callOrder = [];
    spiesConf.forEach(function (spyConf) {
        var original = spyConf.obj[spyConf.method];
        if (spyConf.obj[spyConf.method]) {
            spyOn(spyConf.obj, spyConf.method);
        } else {
           spyConf.obj[spyConf.method] = jasmine.createSpy(spyConf.method);
        }

        spyConf.obj[spyConf.method].and.callFake(function (args) {
            callOrder.push(spyConf);
            if (spyConf.callThrough) {
                return original.apply(spyConf.obj, args);
            }
            if (spyConf.callFake) {
                return spyConf.callFake.apply(spyConf.obj, args);
            }
        });

    });

    initiator();

    spiesConf.forEach(function (spyConf) {
        var expectation;
        if (spyConf.params) {
            expectation = expect(spyConf.obj[spyConf.method]);
            expectation.toHaveBeenCalledWith.apply(expectation, spyConf.params);
        } else {
            expect(spyConf.obj[spyConf.method]).toHaveBeenCalled();
        }
    });   

    expect(callOrder).toEqual(spiesConf);

};