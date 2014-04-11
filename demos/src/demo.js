/*global require*/

// Normalise/polyfill Element.matches
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector || function (selector) {
        "use strict";
        var nodes = (this.parentNode || this.document).querySelectorAll(selector),
            i = -1;
        while (nodes[++i] && nodes[i] !== this){}
        return !!nodes[i];
    };
}

/*! Element.classList API polyfill. @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if(typeof document!=="undefined"&&!("classList"in document.documentElement)){(function(view){"use strict";if(!('HTMLElement'in view)&&!('Element'in view))return;var
    classListProp="classList",protoProp="prototype",elemCtrProto=(view.HTMLElement||view.Element)[protoProp],objCtr=Object,strTrim=String[protoProp].trim||function(){return this.replace(/^\s+|\s+$/g,"");},arrIndexOf=Array[protoProp].indexOf||function(item){var
        i=0,len=this.length;for(;i<len;i++){if(i in this&&this[i]===item){return i;}}
        return-1;},DOMEx=function(type,message){this.name=type;this.code=DOMException[type];this.message=message;},checkTokenAndGetIndex=function(classList,token){if(token===""){throw new DOMEx("SYNTAX_ERR","An invalid or illegal string was specified");}
        if(/\s/.test(token)){throw new DOMEx("INVALID_CHARACTER_ERR","String contains an invalid character");}
        return arrIndexOf.call(classList,token);},ClassList=function(elem){var
        trimmedClasses=strTrim.call(elem.className),classes=trimmedClasses?trimmedClasses.split(/\s+/):[],i=0,len=classes.length;for(;i<len;i++){this.push(classes[i]);}
        this._updateClassName=function(){elem.className=this.toString();};},classListProto=ClassList[protoProp]=[],classListGetter=function(){return new ClassList(this);};DOMEx[protoProp]=Error[protoProp];classListProto.item=function(i){return this[i]||null;};classListProto.contains=function(token){token+="";return checkTokenAndGetIndex(this,token)!==-1;};classListProto.add=function(){var
    tokens=arguments,i=0,l=tokens.length,token,updated=false;do{token=tokens[i]+"";if(checkTokenAndGetIndex(this,token)===-1){this.push(token);updated=true;}}
while(++i<l);if(updated){this._updateClassName();}};classListProto.remove=function(){var
    tokens=arguments,i=0,l=tokens.length,token,updated=false;do{token=tokens[i]+"";var index=checkTokenAndGetIndex(this,token);if(index!==-1){this.splice(index,1);updated=true;}}
while(++i<l);if(updated){this._updateClassName();}};classListProto.toggle=function(token,forse){token+="";var
    result=this.contains(token),method=result?forse!==true&&"remove":forse!==false&&"add";if(method){this[method](token);}
    return!result;};classListProto.toString=function(){return this.join(" ");};if(objCtr.defineProperty){var classListPropDesc={get:classListGetter,enumerable:true,configurable:true};try{objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc);}catch(ex){if(ex.number===-0x7FF5EC54){classListPropDesc.enumerable=false;objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc);}}}else if(objCtr[protoProp].__defineGetter__){elemCtrProto.__defineGetter__(classListProp,classListGetter);}}(self));}

require('./../../main');