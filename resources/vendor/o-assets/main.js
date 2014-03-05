
var globalPrefix = '/bower_components/';
var moduleVersions = {}, modulePaths = {};

function trim(s) { return s.replace(/^\/+/, '').replace(/\/+$/, ''); }

module.exports = {
    setGlobalPathPrefix: function (newprefix) {
        if (typeof newprefix != 'undefined') globalPrefix = newprefix;
        return this;
    },
    setModuleVersions: function (map) {
        for (var i in map) moduleVersions[i] = trim(map[i]);
        return this;
    },
    setModulePaths: function (map) {
        for (var i in map) modulePaths[i] = trim(map[i]);
        return this;
    },
    resolve: function (path, modulename) {
        var fullpath = trim(path);
        if (typeof modulePaths[modulename] == 'undefined') modulePaths[modulename] = modulename;

        if (modulePaths[modulename]) {
            fullpath = modulePaths[modulename] + (moduleVersions[modulename] ? ('@' +  moduleVersions[modulename]) : '') + '/' + fullpath;
        }
        if (globalPrefix) fullpath = globalPrefix + fullpath;
        return fullpath;
    }
};
