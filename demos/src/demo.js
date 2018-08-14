/*global require*/
import OLazyLoad from './../../main.js';

// Cannot be setup declaratively because the document element and body element cannot be modified
new OLazyLoad(document.documentElement);
