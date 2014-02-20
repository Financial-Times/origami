"use strict";

var defaults = require('../../../src/js/data/defaults');

describe("default settings (./data/defaults.js)", function () {
    beforeEach(jasmine._addCustomMatchers);
    it('should define appropriate default settings', function () {
        expect(defaults.src).toEqual(undefined);
        expect(defaults.srcType).toEqual('selector');
        expect(defaults.outerClasses).toEqual('');
        expect(defaults.innerClasses).toEqual('');
        expect(defaults.preset).toEqual('modal');
        expect(defaults.isDismissable).toEqual(true);
        expect(defaults.isAnchoredToTrigger).toEqual(false);
        expect(defaults.verticalAnchorSide).toEqual(null);
        expect(defaults.horizontalAnchorSide).toEqual(null);
        expect(defaults.headingSelector).toEqual('.o-dialog__heading');
        expect(defaults.bodySelector).toEqual('.o-dialog__body');
        expect(defaults.hasHeading).toEqual(false);
        expect(defaults.hasOverlay).toEqual(false);
        expect(defaults.hasCloseButton).toEqual(false);
        expect(defaults.isCenteredVertically).toEqual(true);
        expect(defaults.isCenteredHorizontally).toEqual(true);
        expect(defaults.snapsToFullHeight).toEqual(true);
        expect(defaults.snapsToFullWidth).toEqual(true);
    });

    it('should assign empty functions to each event', function () {
        expect(defaults.onTrigger).toBeAFunction();
        expect(defaults.onTrigger === defaults.onFail).toBeTruthy();
        expect(defaults.onTrigger === defaults.onBeforeRender).toBeTruthy();
        expect(defaults.onTrigger === defaults.onAfterRender).toBeTruthy();
        expect(defaults.onTrigger === defaults.onBeforeResize).toBeTruthy();
        expect(defaults.onTrigger === defaults.onAfterResize).toBeTruthy();
        expect(defaults.onTrigger === defaults.onBeforeClose).toBeTruthy();
        expect(defaults.onTrigger === defaults.onAfterClose).toBeTruthy();
        expect(defaults.onTrigger()).toBeUndefined();
    });
});