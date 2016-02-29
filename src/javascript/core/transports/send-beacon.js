module.exports = function () {
    let resolver;
    let rejecter;
    const p = new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
    });
    return {
        send: function (url, data) {
            if (navigator.sendBeacon(url, data)) {
                resolver();
            } else {
                rejecter(new Error('Failed to send beacon event: ' + data.toString()));
            }

        },
        complete: function (callback) {
            callback && p.then(callback, callback);
        }
    };
};
