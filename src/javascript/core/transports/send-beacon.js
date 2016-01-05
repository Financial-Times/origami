module.exports = function () {
    let resolver;
    let rejecter;
    const p = new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
    });
    return {
        send: function (domain, path) {
            if (navigator.sendBeacon(path, domain)) {
                resolver();
            } else {
                rejecter(new Error('Failed to send beacon event: ' + domain.toString()));
            }

        },
        complete: function (callback) {
            callback && p.then(callback, callback);
        }
    };
};
