/*
   SiteTracker 12.0.425
   Copyright (C) 2013 iJento Ltd.
*/

// Namespace for SI javascript
var SITEINTEL = {};

SITEINTEL.config = {
   taggingServer: null, // Send tags to same server as document comes from
   cookieName: "SIVISITOR",
   tracerCookieName: "SITRACER",
   linkAttribute: "si:link",  // This must either be "si:link" or "id"
   searchTracerPath: "/search",
   cookieQPName: "simigvis",
   cookiePath: "/",
   cookieTimeout: 315360000000,
   cookiePreferenceCallback: null,   // call back function for deciding to create a cookie or not. If null always allows cookies.
   cookiePreferenceCookieName: "ijCookieCookie",  //  name of the temp cookie used to keep track of us being allowed to use persistent cookies
   cookieValueCallback: null,       // call back function to provide the value of a cookie if its not possible to store it.
   tracerTimeout: 1000, // ms to wait maximum for tracer to be sent
   domainList: [".co.uk",".com",".org",".net",".org.uk"],
   centralCookie: false,
   centralReqName: "req",
   centralRefName: "refer",
   centralURL: "",
   trackerUrl: "/si/track.gif",
   determineTrackingBase: null, // e.g. "/tag-determination",
   determineTrackingScript: null // e.g. "tag-determination.js"
};

/* Compressed javascript code follows */
/* Uncompressed javascript site-tracker.js code follows */
/*
 * This file contains the main implementation of the SiteTracker javascript.
 * All functionality apart from user-definable variables should live within
 * this file.
 *
 * As part of the release build, the contents of this file are compressed
 * and obfuscated which means all comments are stripped out - so feel free
 * to put lots of explanatory comments as these will neither bloat the file
 * nor be seen by any external parties.
 */

var undefined; // For JS engines that don't support this keyword natively; see bug 3899

// Define functions to serve as a reference to the best method the browser supports
// for URL decoding/encoding.  encodeURIComponent and its brother are the best methods
// as these are Unicode-safe, but not supported in all browsers.  Correspondingly we
// try to use these, but fall back to escape and unescape if they are not supported.
// See bug 4879.
try
{
   SITEINTEL.encode = encodeURIComponent;
   SITEINTEL.encode('test');
}
catch (e)
{
   SITEINTEL.encode = escape;
}

try
{
   SITEINTEL.decode = decodeURIComponent;
   SITEINTEL.decode('test');
}
catch (err)
{
   SITEINTEL.decode = unescape;
}

SITEINTEL.UTILS = {
   isArray     : function(a) { return(typeof(a)==='object')?a.constructor.toString().match(/array/i)!==null||a.length!==undefined:false; },
   isBoolean   : function(a) { return(typeof(a)==='boolean')?true:(typeof(a)==='object')?a.constructor.toString().match(/boolean/i)!==null:false; },
   isDate      : function(a) { return(typeof(a)==='date')?true:(typeof(a)==='object')?a.constructor.toString().match(/date/i)!==null:false; },
   isFunction  : function(a) { return(typeof(a)==='function')?a.constructor.toString().match(/Function/)!==null:false; },
   isHTML      : function(a) { return(typeof(a)==='object')?a.constructor.toString().match(/html/i)!==null:false; },
   isNull      : function(a) { return a===null; },
   isNumber    : function(a) { return(typeof(a)==='number')?true:(typeof(a)==='object')?a.constructor.toString().match(/Number/)!==null:false; },
   isNT        : function(a) { return(a===null||a===undefined); },
   isString    : function(a) { return(typeof(a)==='string')?true:(typeof(a)==='object')?a.constructor.toString().match(/string/i)!==null:false; },
   isUndefined : function(a) { return a===undefined; },
   isObject    : function(a) { return(typeof(a)==='object')?a.constructor.toString().match(/object/i)!==null:false; },
   isRegExp    : function(a) { return(typeof(a)==='function')?a.constructor.toString().match(/regexp/i)!==null:false; },

   // Serialize an array of form elements or a set of
   // key/values into a query string
   processToParamString : function( input ) {
      if(input) {
         var s = [],
            add = function( key, value ) {
               s[ s.length ] = SITEINTEL.encode(key) + "=" + SITEINTEL.encode(value);
            };

         // If an array was passed in, assume that it is an array of objects with name/value properties
         if ( SITEINTEL.UTILS.isArray(input) ) {
            for (var i = input.length-1; i >= 0; i--) {
               var element = input[i];
               add(element.name, element.value);
            }
         } else if ( SITEINTEL.UTILS.isString(input) ) {
            // pass this straight through
            s[s.length] = input;
         } else {
            // and this should be an object (associative array)
            // from which we want to add name value pairs for the properties
            for ( var name in input ) {
               if(input.hasOwnProperty(name)) {
                  add( name, input[name] );
               }
            }
         }

         // Return the resulting serialization
         return s.join("&").replace(/%20/g, "+");
      }
      else {
         return '';
      }
   }
};

SITEINTEL.is = {
      Null      : SITEINTEL.UTILS.isNull,
      Undefined : SITEINTEL.UTILS.isUndefined,
      nt        : SITEINTEL.UTILS.isNT,
      Function  : SITEINTEL.UTILS.isFunction,
      String    : SITEINTEL.UTILS.isString,
      Array     : SITEINTEL.UTILS.isArray,
      Boolean   : SITEINTEL.UTILS.isBoolean,
      Date      : SITEINTEL.UTILS.isDate,
      HTML      : SITEINTEL.UTILS.isHTML,
      Number    : SITEINTEL.UTILS.isNumber,
      Object    : SITEINTEL.UTILS.isObject,
      RegExp    : SITEINTEL.UTILS.isRegExp
   };

SITEINTEL.getType = {
      of:function(a){
         for(var i in SITEINTEL.is){
            if(SITEINTEL.is[i](a)){
               return i.toLowerCase();
            }
         }
      }
   };



/**
 * An implementation of a string builder that uses an array to perform
 * multiple concatenations much faster than the naive String concatenation,
 * particularly on Internet Explorer.
 * 
 * This class should be used any time that multiple string concatenations
 * are performed, especially in a loop.  However, if performance is critical,
 * then clarity can be traded for efficiency by hand-rolling the array creation
 * and appending - the method overhead makes calling {@link #append} approximately
 * 3 times slower than simply performing the array insert inline.  This should
 * still be fast enough unless a significant proportion of an expensive operation
 * consists of calls to append().
 * 
 * @param initStr {string} (Optional) if provided, the initial contents to use
 * within this string builder.
 * 
 * @constructor
 */
SITEINTEL.StringBuilder = function(initStr)
{
   var m_buffer = [];
   var m_length = 0;
   
   /**
    * Adds the given string to this string builder.
    * 
    * @param str The string to append
    * @return This string builder itself, so that multiple calls to append()
    * can be chained.
    * @type SITEINTEL.StringBuilder
    */
   this.append = function(str)
   {
   	m_buffer[m_buffer.length] = str;
   	m_length += str.length;
   	return this;
   };
   
   /**
    * @return The concatenation of all the strings that were appended to this
    * string builder, in the order they were appended.
    * @type string
    */
   this.toString = function()
   {
   	return m_buffer.join('');
   };
   
   /**
    * @return The total length of the strings appended so far; in other words,
    * the length of the string that would be returned by {@link #toString}.
    * @type int
    */
   this.length = function()
   {
   	return m_length;
   };
   
   // Constructor code itself - just add the initial string, if any
   if (initStr)
   {
   	this.append(initStr);
   }
};


/**
 * 'Constructor' function for a SiteTracker class.  This class broadly defines a
 * single 'page' that is being tracked.
 * 
 * This uses a pseudo-access control mechanism for information hiding, a la
 * http://www.crockford.com/javascript/private.html.  Essentially all fields and
 * methods are private unless assigned as "this.foo =" instead of just "var foo =".
 * In the case of the 'public' functions, they are created as a closure in order
 * to retain references to the private functions and methods that would otherwise
 * be uncallable.
 *  
 * One quirk of this is that when calling a public function from another public
 * function, the "this" reference must be explicitly specified.
 * 
 * @param autoTracer - if truthy, send a page tracer when the object is created.
 * Otherwise, send no tracer.
 * 
 * @constructor
 */
SITEINTEL.SiteTracker = function(autoTracer)
{
   //////////////////// Variables - all private //////////////////////
   
   var m_isCookieNew     = "N";
   var m_cookieValue     = null;
   var m_extClickID      = "t"+(new Date()).getTime()+"h"+window.history.length;
   var m_sendParams      = "";
   var m_tracerCookieIdx = 0;
   var m_imageSet        = [];
   var m_referrer        = document.referrer;
   var m_request         = document.URL;
   var m_pageIDAttrName  = "si:pageID";
   var m_oldCookie       = null;
   var m_tracerIndex     = 1;
   var m_pageTracerSent  = false;
   var m_determineTrackingControl = null;
   var m_determineTrackingCallbackStacks = [];
   
   // Short reference to the config parameters
   var conf = SITEINTEL.config;
   
   var m_isFrameset      = false;
   var m_isMenu          = false;
   var m_isExtraFrame    = false;
   var m_isRedirection   = false;
   var m_isPopup         = false;
   
   /**
    * The maximum number of characters we consider we can send in one go,
    * when sending form tracers.  Note there are some hard(ish) limits to
    * bear in mind: the 'request-url' entry in the log record table is only
    * 2000 characters wide, so this allows 200 characters for the protocol,
    * hostname, port and path ("/si/form").
    * 
    * If the log record table is widened, we still need to compete with the
    * maximum URL length, which is undefined according to HTTP specs but for
    * I.E. at least is around 2048.  Given that the payload is base64 encoded
    * and that the tracer path and format string are included in this limit,
    * we have probably around 1600 plaintext characters to use in the query
    * string payload. With this in mind it is probably imprudent to increase
    * this limit much over 1200 anyway. 
    * 
    * @private
    */
   var m_formQueryLimit  = 1200;
   
   /**
    * Stores the number of requests that were made via async tracers that have not yet completed.
    * Rationale is that we don't navigate away from a page until all tracers come back, since an
    * event can spawn multiple tracers that complete in an arbitrary order.
    * 
    * @private
    */
   var m_syncTracersOutstanding = 0;
   
   /**
    * Stores the action to be executed when all outstanding tracers have been sent.  This is
    * needed since the tracer that was sent with this action is not necessarily the last one
    * to complete, so the action must be visible outside that specific closure.  This is well-
    * defined as it is not permissable to fire two outstanding sync tracers with different
    * actions (were this to happen, the last one would win anyway which is probably what we want
    * in a situation where the user clicks on two hyperlinks in very quick succession).
    * 
    * @private
    */
   var m_syncFinishedAction = null;
   
   
   /**
    * An array of characters used by the base-64 encoding methods.
    * 
    * @private
    * @final
    */
   var TRANS_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


   // Convenience variables for shorthand referencing encode and decode methods within this class
   var encode = SITEINTEL.encode;
   var decode = SITEINTEL.decode;
   
   /////////////////////// Private methods //////////////////////////

   var resetState = function()
   {
      // Reset the external click ID
      // Clear any queued state from addTrackParams that hasnt been sent etc
   };


   /**
   FNV1 hash - a fast hash (but not guaranteed not to have collisions)
   We may want to review this and instead use hash function here:- http://www.developersdex.com/asp/message.asp?p=2978&r=6895347
   */
   var hash = function(txt) {
      if (txt == null) {
        return "";
      }
      var seed = 0x811c9dc5;
      for (var i = 0; i < txt.length; i++) {
         seed += (seed << 1) + (seed << 4) + (seed << 7) + (seed << 8) + (seed << 24);
         seed ^= txt.charCodeAt(i);
      }
      return Number(seed & 0x00000000ffffffff).toString(16);
   };

   /**
    * Given an anchor tag, returns a function (closure) that will perform the same
    * action as clicking on the bare anchor tag would.  You'd think this would be
    * quite simple but it gets complex because the anchor can have a 'target'
    * attribute which means it doesn't simply change the current document.
    *
    * Returns null if the anchor tag will not cause the current window to be unloaded.
    *
    * Note that the closure returned will *not* invoke the onclick handlers; this
    * is by design as they should all have already been called and given their assent
    * to the link navigation by the time we think about setting up this closure.
    */
    var getLinkClickingClosure = function(anchor)
    {
        var destination = anchor.href;
        var target = anchor.getAttribute("target");

        if (!target || target == "_self")
        {
            return function() { location.href = destination; };
        }
        else if (target.length > 0 && target.substring(0, 1) == '_')
        {
            // special targets _parent, _top etc
            return null;
        }
        else
        {
            // We have a literal frame name.  Search from the top frame down
            // TODO check the defacto standards to see if we should do this recursively
            var targetLoc = top.frames[target];
            if (targetLoc)
            {
                return function() { targetLoc.location.href = destination; };
            }
            else
            {
                // no matching frame - open new window with specified name
                return null;
            }
        }
    };

   /**
    * Creates a closure to handle processing of a given form.  Optionally adds an element
    * to the form as &lt;input type="hidden"&gt;, with the name and value of the given submit
    * button, if that button would have been considered a successful control.
    *
    * In particular this closure will <em>not</em> call the form's onsubmit handlers, as
    * these are expected to have already been called and returned true (otherwise the form
    * will not be submitted and we should not be tracking the event).
    *
    * @param form The form element to submit with the closure
    * @param activatedSubmit (optional) the submit button that caused this activation.
    *
    * @return A closure suitable for use with the external link tracking functions that will
    * submit the form (including information about the submit button if appropriate) when invoked.
    * @type Function
    *
    * @private
    */
   var getFormSubmissionClosure = function(form, activatedSubmit)
   {
      return function()
      {
         // If we have a clicked submit button, and that button would have been considered a
         // successful control, then add a hidden field to the form with its value so that
         // calling form.submit() will still pass through its data (see bug 6111)
         var input = null;
         if (activatedSubmit && activatedSubmit.name)
         {
            input = document.createElement('input');
            input.setAttribute('name', activatedSubmit.name);
            input.setAttribute('value', activatedSubmit.value);        
            form.appendChild(input);
         }

         // Submit the form; no need to call onsubmit() as by definition we only track the
         // form if it really is going to be submitted
         form.submit();

         // Set a short timer to remove any extra input now, just in case the user clicks back
         // and the page state is maintained; it would be confusing if they resubmitted the
         // form with a different button and the other button's name/value pair were still sent!
         if (input)
         {
            window.setTimeout(function() { form.removeChild(input); }, 100);
         }
      };
   };
   
   /**
    * Encodes a given input string in base64.
    * @param Input the string to encode
    * @return The base64-encoded value of the input string.
    */
   var encodeString = function(input)
   {
     if (!input)
     {
       return "";
     }
   
     var output     = new SITEINTEL.StringBuilder();
     for (var i = 0; i < input.length; i += 3)
     {
       var numBytesLeft = input.length - i;
       var value        = 0;
       value  = (input.charCodeAt(i) << 16) & 0x00ff0000;
       value |= (numBytesLeft > 1)? (input.charCodeAt(i + 1) << 8) & 0x0000ff00 : 0;
       value |= (numBytesLeft > 2)? input.charCodeAt(i + 2) & 0x000000ff : 0;
       output.append(TRANS_CHARS.charAt((value & 0x00fC0000) >> 18));
       output.append(TRANS_CHARS.charAt((value & 0x0003f000) >> 12));
       output.append((numBytesLeft > 1)? TRANS_CHARS.charAt((value & 0x00000fc0) >> 6) : '_');
       output.append((numBytesLeft > 2)? TRANS_CHARS.charAt((value & 0x0000003f)) : '_');
     }
     return output.toString();
   };
   
   /**
    * Encode all the relevent details into a string.  Depending on the detail
    * type, it is either taken from a local variable or from the 'tracer context'
    * object passed in.
    * 
    * @param Format a string describing which details should be encoded.  Each
    * character of the string represents a single detail according to the list
    * below:<ul>
    *    <li>r - Referrer</li>
    *    <li>p - Page request</li>
    *    <li>d - Match IP hash (used when no cookie present)</li>
    *    <li>c - Cookie</li>
    *    <li>u - Uniqueness value (random value, is not decoded in log loading)</li>
    *    <li>t - External Click ID</li>
    *    <li>f - Tag request path</li>
    *    <li>q - Tag request query string</li>
    *    <li>g - "Tag data", comprising local time, screen resolution & colour
    *            depth, java status, page rules and SiteTracker information</li>
    *    <li>w - Is cookie new flag</li>
    *    <li>y - Tag type</li>
    * </ul>
    * 
    * @param Context Contains information about those variables that are not
    * static across a page but instead will vary from request to request.  An
    * example is tracer query parameters; as opposed to, say, external click ID
    * which is a property of this SiteTracker object instead.  This argument
    * should be an object with a subset of the following properties defined:<ul>
    *    <li>path          - The value to use for the 'f' format detail</li>
    *    <li>query         - The value to use for the 'q' format detail</li>
    *    <li>tagType       - The value to use for the 'y' format detail</li>
    *    <li>clickedLinkID - The ID of the link that is being clicked, if relevant
    *                        (used in the tag data 'g' format detail)</li>
    *    <li>refClickID    - The ID of the previous click, if relevant</li>
    * </ul>
    */
   var encodeDetails = function(format, context)
   {
      var output = new SITEINTEL.StringBuilder();
      for (var i = 0; i < format.length; i++)
      {
         var data;
         switch (format.charAt(i))
         {
         case 'r':
            data = m_referrer;
            break;
         case 'p':
            data = m_request;
            break;
         case 'd':
            data = screen.availWidth + "x" + screen.availHeight + "x" + screen.colorDepth + "." + navigator.javaEnabled();
            if (navigator.plugins)
            {
            	data += "."+navigator.plugins.length;
            }
            break;
         case 'c':
            if(! SITEINTEL.is.Function(conf.cookieValueCallback))
            {
                data = m_cookieValue;
            }
            else {
                data = conf.cookieValueCallback();
            }
            break;
         case 'u':
            data = window.history.length+"."+(Math.random()*1000)+"."+(new Date()).getTime() + "." + hash(document.location.href + document.referrer);
            break;
         case 't':
            // Allow this to be overridden by the context
            if (typeof context.extClickID != "undefined")
            {
               data = context.extClickID;
            }
            else   
            {
               data = m_extClickID;
            }
            break;
         case 'f':
            data = context.path;
            break;
         case 'q':
            data = context.query;
            break;
         case 'g':
            data = collateTagData(context);
            break;
         case 'w':
            data = m_isCookieNew;
            break;
         case 'y':
            data = context.tagType;
            break;
         case 'o':
            data = (m_tracerIndex++).toString();
            break;
         }
         output.append(encodeString(data)+"*");
      }
      return output.toString();
   };

   var determinePageID = function(allowId)
   {
      var pageID = document.body.getAttribute(m_pageIDAttrName);
      if (!pageID)
      {
         var colonPos = m_pageIDAttrName.indexOf(":");
         if (colonPos > -1)
         {
            pageID = document.body.getAttribute(m_pageIDAttrName.substring(colonPos + 1));
         }
         if (!pageID && allowId)
         {
            pageID = document.body.getAttribute("id");
         }
      }
      return pageID;
   };
   
   
   var collateTagData = function(context)
   {
      var tagData = new SITEINTEL.StringBuilder();
   
      tagData.append("co=").append(window.screen.colorDepth);
      tagData.append("&sr=").append(window.screen.width).append('x').append(window.screen.height);
      tagData.append("&lt=" + formatDate(new Date()));
      if (navigator.javaEnabled())
      {
         tagData.append("&jv=1");
      }
      else
      {
         tagData.append("&jv=0");
      }
      
      if (null !== m_oldCookie)
      {
      	tagData.append("&mc=").append(m_oldCookie);
      }
      
      tagData.append(collatePageRules());
   
      if (document.body)
      {
         var pageID = determinePageID(false);
         if (pageID)
         {
            tagData.append("&req=" + pageID);
         }
      }
   
      if (context.clickedLinkID)
      {
         tagData.append("&rl=" + context.clickedLinkID);
      }
   
      if (context.refClickID)
      {
         tagData.append("&rcid=" + context.refClickID);
      }
   
      return tagData.toString();
   };
   
   var collatePageRules = function()
   {
      var pageData = "";
   
      if (m_isFrameset)
      {
         pageData += "&page:fset";
      }
      if (m_isMenu)
      {
         pageData += "&page:menu";
      }
      if (m_isExtraFrame)
      {
         pageData += "&page:x-frame";
      }
      if (m_isRedirection)
      {
         pageData += "&page:redir";
      }
      if (m_isPopup)
      {
         pageData += "&page:popup";
      }
   
      return pageData;
   };

   /**
    * Formats a given date in XML format
    * @param date A date for format
    * @return a textual representation of the date, in XML format. 
    */
   var formatDate = function(date)
   {
      var output = new SITEINTEL.StringBuilder();
      output.append(date.getFullYear());
      output.append("-");
      output.append(leadingZero(date.getMonth()+1));
      output.append("-");
      output.append(leadingZero(date.getDate()));
      output.append("T");
      output.append(leadingZero(date.getHours()));
      output.append(":");
      output.append(leadingZero(date.getMinutes()));
      output.append(":");
      output.append(leadingZero(date.getSeconds()));
      return output.toString();
   };
   
   /**
    * Prefixes any single-digit numbers with a '0' character. Useful for ensuring
    * all numbers are two characters or more, e.g. when formatting date/times.
    * Note that as a workaround to bug 3634, any negative values are returned as
    * "00" as the expectation is that the input and output of this function are
    * both non-negative, though for the input this is merely an expectation and
    * not a precondition.
    * 
    * @param n The number to potentially prefix
    * @return A string representation of the input that is at least two characters
    * long, that is, prefixing any single-digit numebrs with zero.  (As noted above,
    * any non-positive inputs result in a return value of "00").
    */
   var leadingZero = function(n)
   {
      if (n < 1)
      {
         // Workaround weirdness in Opera 9.5 - bug 3634
      	return "00";
      }
      return (n > 9 ? "" : "0") + n;
   };

   var extractLinkID = function(idVar)
   {
      var clickedLinkID;
      if (/string/.test(typeof(idVar)))
      {
         clickedLinkID = idVar;
      }
      else
      {
         // We have an anchor tag or equivalent
         clickedLinkID = idVar.getAttribute(conf.linkAttribute);
         if (!clickedLinkID)
         {
            // Check for colon-prefixing as some browsers (correctly) treat this as a namespace
            var colonPos = conf.linkAttribute.indexOf(":");
            if (colonPos > -1)
            {
               clickedLinkID = idVar.getAttribute(conf.linkAttribute.substring(colonPos + 1));
            }
         }
      }
      return clickedLinkID;
   };
   
   var internalTrackLink = function(tracerInfo)
   {
      internalDoLinkTrack(deferTracer, tracerInfo);
   };
   
   var internalTrackLinkImmediate = function(tracerInfo)
   {
      internalDoLinkTrack(sendSyncTracer, tracerInfo);
   };
   
   var internalTrackLinkPassiveSend = function(tracerInfo)
   {
      internalDoLinkTrack(sendTracer, tracerInfo);
   };
   
   var internalTrackLinkWait = function(tracerInfo)
   {
      internalDoLinkTrack(sendTracerWithWait, tracerInfo);
   };

   var internalTrackLinkViaSynchronousSend = function(tracerInfo, idVar, closure)
   {
      // If we have an explicit closure passed in use that, else
      // create one based on the ID-bearing element
      if (!closure)
      {
         // Determine what type of element we have and thus what type of closure to create
         var elType = idVar.nodeName.toLowerCase();
         if (elType == "a")
         {
            // It's a hyperlink, so create a closure that navigates the client to its href
            // bearing in mind any target specified.
            closure = getLinkClickingClosure(idVar);
         }
         else if ((elType == "input" || elType == "button") && (idVar.type == "submit" || idVar.type == "image"))
         {
            closure = function()
            {
               // Click the Submit button; as per bug 6074 submit the form this way so that the
               // button is included in the submitted data if appropriate
               // button is included in the submitted data if appropriate
               idVar.click();

               // Clear the outstanding tracer flag; we should be leaving the page but some browsers
               // maintain the page state if the user clicks Back, and this means we can track a
               // click on the same submit button again just as we would do with other links
               idVar.siOutstandingTracer = false;
            };

            // Test whether this being called from the closure (i.e. the tracer has been
            // sent and so we can proceed) or not
            if (idVar.siOutstandingTracer)
            {
               // The flag exists and is true, so this must be the call from the tracer.  Thus
               // simply return true in order to let the form submission happen
               return true;
  }
         else
         {
               // No outstanding tracer, so we set the flag to true and proceed with sending
               // a tracer and then returning false to wait for the above closure to fire
               idVar.siOutstandingTracer = true;
            }
         }
         else
         {
            // Not a supported type of element, and since we have no idea what it is or what it does
            // we can't reproduce that functionality.  Thus the only sensible option is to throw an
            // error here, which will prevent link tracking happening and allowing the original action
            // to go through unmodified
            throw new Error("Unknown element supplied to internal track link");
         }
      }

      internalDoLinkTrack(sendSyncTracer, tracerInfo, closure, conf.tracerTimeout);
      return (closure == null);
   };
   
   var internalDoLinkTrack = function(dispatcher, tracerInfo, closure, timeout)
   {
      tracerInfo.refClickID = m_extClickID;
      tracerInfo.path = "http://" + document.location.hostname + "/si/link";
   
      // Call the dispatcher with appropriate arguments
      dispatcher("fctgyuo","fdtgyuo", tracerInfo, closure, timeout);
   };
   
   var buildCookie = function()
   {
      var cookieValue = extractPart(conf.cookieQPName,document.URL,"&");
      if (cookieValue !== null)
      {
      	// We have a migrated cookie.  Remember the old one for the tag data
      	m_oldCookie = getCookie(conf.cookieName);
      	
         setCookie(conf.cookieName, cookieValue, conf.cookieTimeout);
   
         if (conf.centralCookie)
         {
            // Extract original referrer
            var extractedURL = extractPart(conf.centralRefName, document.URL, "&");
            if (extractedURL !== null)
            {
               m_referrer = decode(extractedURL);
            }
   
            // Extract original request
            extractedURL = extractPart(conf.centralReqName, document.URL, "&");
            if (extractedURL !== null)
            {

               m_request = decode(extractedURL);
            }
         }
      }
      else
      {
         cookieValue = getCookie(conf.cookieName);
         if (cookieValue === null)
         {
            cookieValue = encodeDetails("u");
            m_isCookieNew = 'Y';
            setCookie(conf.cookieName, cookieValue, conf.cookieTimeout);
   
            if (conf.centralCookie)
            {
               // Check cookies can be set
               cookieValue = getCookie(conf.cookieName);
               if (cookieValue !== null)
               {
                  var centralURL = conf.centralURL;

                  // Bug 4873 - add protocol if required, otherwise check it matches the document's
                  // to avoid security warnings
                  var validProtocol;
                  if (centralURL.substring(0,4) != "http")
                  {
                     centralURL = document.location.protocol + "//" + centralURL;
                     validProtocol = true;
                  }
                  else
                  {
                     validProtocol = (centralURL.substring(0, centralURL.indexOf(':') + 1) == document.location.protocol);
                  }

                  if (validProtocol)
                  {
                     if (centralURL.indexOf("?") == -1)
                     {
                        centralURL += "?";
                     }
                     else
                     {
                        centralURL += "&";
                     }
                     centralURL += conf.centralReqName + "=" + encode(document.URL) + "&" + conf.centralRefName + "="  + encode(document.referrer);

                     // Stop any possibility of tag firing in compatibility mode
                     if (typeof window.siAutoTracer != 'undefined')
                     {
                        window.siAutoTracer = false;
                     }

                     // Redirect to central cookie server
                     document.location = centralURL;

                     // Return an object indicating that redirection is pending
                     return { redirecting: true };
                  }
               }
            }
         }
      }
      cookieValue = getCookie(conf.cookieName);
      return cookieValue;
   };
   
   var getCookie = function(name)
   {
      return extractPart(name,document.cookie,";");
   };

   var extractPart = function(name, dataSource, dataEndChar)
   {
     var prefix = name + "=";
     var value  = null;
     var begin  = dataSource.indexOf(prefix);
     if ((begin != -1) && (name.length > 0))
     {
       var end = dataSource.indexOf(dataEndChar, begin);
       if (end == -1)
       {
       	 end = dataSource.length;
       }
       value = dataSource.substring(begin + prefix.length, end);
     }
     return value;
   };
   
   var processTracer = function(cookieForm, noCookieForm, tracerInfo, dispatcher)
   {
      var format = (m_cookieValue === null) ? noCookieForm : cookieForm;
      var query = "f=" + format + "&d=" + encodeDetails(format, tracerInfo);
      var checksum = "&c=" + generateChecksum(query);

      var tracer = conf.taggingServer + conf.trackerUrl + "?" + query + checksum;
       
      dispatcher(tracer);
   };

   /**
    * Generates an Adler 32 checksum of the input data.
    */
   var generateChecksum = function(input)
   {
      var a = 1;
      var b = 0;
      for (var i = 0; i < input.length; i++)
      {
         a += input.charCodeAt(i);
         b += a;
      }

      // A and B must be modulo 65521 (the largest prime number smaller than 2^16)
      a %= 65521;
      b %= 65521;

      var chk = (b * 65536) + a;
      return chk.toString(16);
   };

   /**
    * Adds an element to a form as &lt;input type="hidden"&gt;, with the given name and value.
    * The element itself is returned for continued use/modification.
    *
    * @param form The form element to add the input to
    * @param name The name attribute for the hidden input
    * @param value The value attribute for the hidden input
    *
    * @return The newly-created hidden input element
    * @type Node
    *
    * @private
    */
   var addHiddenInput = function(form, name, value)
   {
      var input = document.createElement('input');
      input.setAttribute('name', name);
      input.setAttribute('value', value);
      form.appendChild(input);

      return input;
   };
   
   var sendTracer = function(cookieForm, noCookieForm, tracerInfo)
   {
      var sendNow = function(tracer) {
         var Tracker = new Image();
         Tracker.src = tracer;
         m_imageSet[m_imageSet.length] = Tracker;
      };
   
      processTracer(cookieForm, noCookieForm, tracerInfo, sendNow);
   };
   
   /**
    * Assembles a tracer and dispatches it by setting it as the source of an image
    * kept in a global array.  Once this is set, a busy loop is entered for a
    * configurable amount of time, to give the browser a chance to make a request
    * for the tracer and have it logged at the server.
    */
   var sendTracerWithWait = function(cookieForm, noCookieForm, tracerInfo)
   {
      sendTracer(cookieForm,noCookieForm, tracerInfo);
      busySleep(conf.tracerTimeout);
   };
   
   /**
    * Sends a tracer asynchronously and optionally proceeds with a given action
    * when the send is completed, or when a timeout is up.
    *
    * This isn't really a synchronous send but is used to give the appearance of
    * such.  Used in an "onevent" handler, the handler should call this and pass
    * in the action that represents proceeding with the event (e.g. a closure
    * encapsulating form.submit(), or similar).  The handler itself should return
    * false to inhibit the natural firing of the action, which will be performed
    * once the async send has completed successfully (hence the sync term).
    *
    * If multiple 'sync' tracers are queued up at once, then the action will not
    * happen until all of them have completed.  Queueing multiple sync tracers with
    * distinct non-null actions is not supported and the outcome (i.e. which action
    * actually fires to navigate away from the page) is undefined.
    */
   var sendSyncTracer = function(cookieForm, noCookieForm, tracerInfo, action, timeout)
   {
      // Create a closure that will send the tracer and wait for it to complete, manage the
      // count of outstanding tracers and perform the post-send action once all
      // outstanding tracers have completed.
      var send = function(tracer) {
   
         // Create an image that will be used to make the request
         var tracker = new Image();
   
         // Update the sync finished action, and potentially set a timeout,
         // if there is a specific closure associated with this request
         if (action) {
            m_syncFinishedAction = action;
   
            if (timeout) {
               // Create a function that will unset the global function
               // before executing it (so it doesn't get run twice)
               var timeoutFn = function() {
                  if (m_syncFinishedAction) {
                     var exec = m_syncFinishedAction;
                     m_syncFinishedAction = null;
                     exec();
                  }
               };
   
               // Workaround for old browsers that don't support function references
               // in timeouts (IE 5.2 Mac).  These only support strings which are evaluated
               // in place.  Thus any functions passed in are coerced into strings and we
               // take advantage of this here by overriding the toString method to provide
               // the code to execute in that situation.
               timeoutFn.toString = function() { return 'var exec = m_syncFinishedAction; m_syncFinishedAction = null; exec();'; };
   
               var runningTimeout = window.setTimeout(timeoutFn, timeout);
            }
         }
   
         // Create an event listener for the image that will be called back
         // when its ready state changes
         var checkDone = function() {
            // Check that the request was completed successfully,
            // AND that there are no more tracers pending completion
            // AND of course that we have an action to perform.
            // If all these are met, perform the post-sync action.
            // Note that the tests must be done in the current order
            // to keep the outstanding tracer count correct
            if (tracker.complete &&
                  --m_syncTracersOutstanding === 0 &&
                  m_syncFinishedAction)
            {
               // Stop the timeout associated with this tracer, if there is one
               if (runningTimeout)
               {
                  window.clearTimeout(runningTimeout);
               }
   
               // Nullify the variable before running it so it doesn't
               // get run twice.  This could otherwise happen if
               // navigation away from the page occurred, followed by a
               // click on Back, then an async tracer with no action was
               // fired.  It might also otherwise happen if the timeout
               // and the tracer completion happened in very quick succession.
               var exec = m_syncFinishedAction;
               m_syncFinishedAction = null;
               exec();
            }
         };
   
         // Attach the event listener - account for both IE and non-IE browsers
         try {
            if (tracker.addEventListener)
            {
               tracker.addEventListener("load", checkDone, false);
            }
            else
            {
               tracker.attachEvent("onreadystatechange", checkDone);
            }
         }
         // If we couldn't attach a handler then never mind, we'll just wait
         // until the timeout and fire then
         catch (ignore) {}
   
         // Now all is in place, increment the outstanding count and trigger
         // the tracer send by setting the image src
         ++m_syncTracersOutstanding;
         tracker.src = tracer;
         m_imageSet[m_imageSet.length] = tracker;
      };
   
      processTracer(cookieForm, noCookieForm, tracerInfo, send);
   };
   
   /**
    * 'Sleeps' for a given number of milliseconds.  WARNING - this is a busy loop,
    * and as such will consume 100% of CPU and prevent the browser from responding
    * to events (in many cases locking up the browser chrome).  Using this for any
    * but the shortest intervals may lead to browsers killing the script execution,
    * or prompting users to do the same.
    */
   var busySleep = function(millis)
   {
      var startTime = new Date().getTime();
      while (new Date().getTime() - startTime < millis) {}
   };
   
   var deferTracer = function(cookieForm, noCookieForm, tracerInfo)
   {
      // Bug 3516 - if we've already deferred 25 tracers for this page (which
      // we really shouldn't as deferred tracers should really only be set
      // immediately before navigation away), then don't defer any more.
      if (m_tracerCookieIdx < 25)
      {
         var defer = function(tracer) {
            // Check that the previous cookie exists (if there should be one),
            // otherwise reset the index on assumption that some tracers have
            // been deferred & submitted and then the back button was pushed (bug 3006)
            if (m_tracerCookieIdx    > 0)
            {
               if (getCookie(conf.tracerCookieName + (m_tracerCookieIdx - 1)) === null)
               {
                  m_tracerCookieIdx = 0;
               }
            }
   
            var cookieName = conf.tracerCookieName + m_tracerCookieIdx++;
            setCookie(cookieName, tracer, 1800000); // 30 minute lifetime
         };
   
         processTracer(cookieForm, noCookieForm, tracerInfo, defer);
      }
   };
   
    /**
     * level of redirection to avoid having to deal with how this method is called.
     */
    var activeTrackElement = function()
    {
        activeTrackTargetElement(this);
    };

   /**
    * Inspects the state of a form field to see whether it has recently been filled
    * out, and if so sends a tracer recording this fact.  This method is expected to
    * be called from handlers for events that may signify a change in the field's
    * state, such as onBlur.
    * If such a tracer is sent, its type is "extra" so that its payload is auto-
    * collapsed onto the parent click's query parameters.  The tracer URL is
    * "/si/formfield" which enables it to be distinguished from other
    * 'extra data' tracers.
    *
    */
   var activeTrackTargetElement = function(target)
   {
       /**
        * if we have levels of closures going on which is causing 'this' to point where we don't expect it to.
        */
       var ourTarget = this;
       if( target ) {
           ourTarget = target;
       }

      // Only consider sending a tracer if the element has a name (to prevent oddness
      // with event handler bubbling) and has been filled in (different from its
      // default value, which varies between 'normal' inputs and radio/checkbox).
      if (ourTarget.name && ((ourTarget.type == "radio" || ourTarget.type == "checkbox") ? (ourTarget.checked != ourTarget.defaultChecked) : (ourTarget.value != ourTarget.defaultValue)))
      {
         // Input is viable for sending; check we haven't already sent a tracer
         // for an input of this name (see comments at end of method for details)
         var list = ourTarget.form.siFilledFields;
         for (var i=0; i < list.length; i++)
         {
            if(ourTarget.name == list[i])
            {
               // Already sent a tracer saying this field is populated, so nothing else to do
               return;
            }
         }

         // Create and send a tracer noting that this form field has been populated
         var attrName = "siform:" + ourTarget.name;
         var tracerInfo = {
            path    : "http://" + document.location.hostname + "/si/formfield",
            query   : encode(attrName) + "=Y",
            tagType : "formfield"
         };

         sendTracer("fqctyuo","fqdtyuo", tracerInfo);

         // Record that we've sent a tracer communicating that this field
         // has been filled in - so we don't send an additional tracer if it
         // is changed later.
         // With the way we currently collapse all the requests, additional
         // tracers for the same field would be a no-op and add bandwidth
         // and processing costs.  However, if we refine the way that form
         // information is handled we may be able to do something useful with
         // multiple tracers for a single field (e.g. create a view of which
         // forms were filled out in a given order, allowing for multiple
         // revisits to any field).  In this case, multiple tracers should be
         // allowed.
         // We need to do this at the form level rather than the element as
         // multiple radio/checkbox elements may have the same name and thus
         // only the first modified element should fire the tracer.
         list[list.length] = ourTarget.name;
      }
   };

   
   /**
    * Iterates over a form, finding all the elements that are considered
    * active and building up a query string representing their value.  This
    * string is then sent as a tracer with a type of "extra", so is
    * collapsed onto the 'parent' click's query parameter during
    * clickstream resolution.
    * 
    * This function considers the m_formQueryLimit variable and so may
    * end up sending the data across multiple 'extra' tracers so as
    * to keep the size of each tracer's query string payload below this
    * limit.  This is not absolutely guaranteed - as every field will
    * be sent and field values are not subdivided - so if the length of
    * a field's value is greater than the m_formQueryLimit, a tracer of
    * this size will be sent.
    * 
    * @param form The form to track.  Required.
    * @param send A function to call in order to actually send the tracer.
    * This will be invoked with no arguments, so is expected to be a closure
    * set up by the caller to do the right thing with the global variables.
    * Also required else a Javascript error will occur and no sending will
    * take place.
    * @param list An optional array of field names.  If supplied and non-null,
    * only fields whose name is in this array will be tracked.  Otherwise,
    * every field is tracked.
    */
   var buildAndSendFormTracerQuery = function(form, tracerInfo, send, list)
   {
      if (form.elements && (form.elements.length > 0))
      {
         var doamp = false;
         var formQuery = new SITEINTEL.StringBuilder();
         for (var i=0; i < form.elements.length; i++)
         {
            var el = form.elements[i];
            if (el.name)
            {
               var capture = (!list);
               if (list)
               {
                  for (var j=0; !capture && (j<list.length); j++)
                  {
                     if (el.name == list[j])
                     {
                     	capture = true;
                     }
                  }
               }
               
               // Don't capture file selector fields at all - see bug 3687
               if (el.type == "file")
               {
               	capture = false;
               }
               
               // Always capture the clicked submit button and ignore the rest,
               // regardless of any includes list (see comments to bug 3798)
               // As per bug 6120, treat graphical submit buttons exactly the same here
               else if ((el.nodeName.toLowerCase() == "input" || el.nodeName.toLowerCase() == "button") && (el.type == "submit" || el.type == "image"))
               {
               	capture = (el == form.siActivatedSubmit);
               }
               
               // Only capture radio buttons that are enabled
               else if (capture && (el.type == "radio"))
               {
               	capture = el.checked;
               }
               
               if (capture)
               {
                  // Determine what we'll be appending to the query string built up so far
                  var field = extractFieldName(el) + "=" + extractFieldValue(el);
                  
                  // See how long the resulting query string would be - specifically if it exceeds
                  // the limit we can send in one go
                  if (formQuery.length() + field.length > m_formQueryLimit)
                  {
                     // It would be too long - send what we've built up so far now, and reset the query string
                     tracerInfo.query = formQuery.toString();
                     send();
                     formQuery = new SITEINTEL.StringBuilder();
                     doamp=false;
                  }
                  if (doamp)
                  {
                     formQuery.append("&");
                  }
                  
                  // Always append this field's value whether we just sent or not
                  formQuery.append(field);
                  doamp=true;
               }
            }
         }
         // Just finished iterating over all the elements - assuming there was at least
         // one active element, we will always have at least one field in siTracerQuery
         // so send it all off now.
         tracerInfo.query = formQuery.toString();
         send();
      }
   };


    var getElementsByName = function(list, name)
    {
        var res = [];
	    for (var j = 0; j < list.length; j++)
	    {
            var el = list[j];
            if (name == el.name)
            {
                res.push(el);
            }
       }
       return res;
    };

    /**
     * Extracts the name from a given form element, in a suitable format.
     * For most elements this is simply their "name" attribute with the following
     * exceptions:-<ul>
     * <li>Checkbox groups (multiple checkboxes with the same name within the form) have
     * a name of "name" attribute + "value" attribute.  See bug 7522.
     * <li>
     * </ul>
     */
    var extractFieldName = function(thisEl)
    {
        var multiValue = false;
        if (thisEl.type == "checkbox")
        {
            if (getElementsByName(thisEl.form.elements, thisEl.name).length > 1)
            {
                multiValue = true;
            }
        }
        // Note currently multi-value select is not considered multiValue in this context
        // See bug 7522 for details.

        // If it's multiValue mangle the extracted field name 
        if (multiValue)
        {
            return encode( thisEl.name.replace(/:/g, "::") + ":" + thisEl.value);
        }
        else
        {
            return encode( thisEl.name);
        }
    };

   /**
    * Extracts the value from a given form element, in a suitable format.
    * For most elements this is simply their "value" attribute, with a couple
    * of exceptions:<ul>
    *   <li>Checkboxes' value is either "true" or "false" corresponding to
    *       whether they are checked.</li>
    *   <li>A SELECT input that allows multiple values - we want this to appear
    *       as "fieldname=value1&fieldname=value&...&fieldname=valuen", so as
    *       a result we construct and return  "value1&fieldname=value2&..." since
    *       the field name will be prepended (once).</li>
    * </ul>
    * In all cases the returned value is URL-encoded.
    *
    * @param el The form field element to extract the value from
    * @return   A string representation of the given element's value.
    */
   var extractFieldValue = function(el)
   {
      // Deal with checkboxes separately
      if (el.type=="checkbox")
      {
         // Return checked (boolean) attribute as a string
         return (el.checked) ? "true" : "false";
      }
      else
      {
         // Check whether this is a multi-choice select (bug 3957)
         if (el.options && el.multiple)
         {
            var first = true;
            var out = new SITEINTEL.StringBuilder();
            var fieldName = extractFieldName(el);
            for (var i = 0; i < el.options.length; i++)
            {
               if (el.options[i].selected)
               {
                  if (first)
                  {
                     first = false;
                  }
                  else
                  {
                     // Add the query parameter name prefix again
                     out.append("&").append(fieldName).append("=");
                  }
                  out.append(encode(el.options[i].value));
               }
            }
            return out.toString();
         }
         else
         {
            return encode(el.value);
         }
      }
   };
   
   var internalTrackTracer = function(filePath,queryString,tagType)
   {
      // If a base relative path prepend it with document protocol and hostname
      if (filePath.substring(0,1) == '/')
      {
         filePath = document.location.protocol + "//" + document.location.hostname + filePath;
      }
      
      var tracerInfo = {
         path    : filePath,
         query   : queryString,
         tagType : tagType
      };
      
      sendTracer("fqctyuo", "fqdtyuo", tracerInfo);
   };
   
   var sendDeferredTracers = function()
   {
      var i = 0;
      var cookieName = conf.tracerCookieName + i++;
      var tracer = getCookie(cookieName);
      while (tracer)
      {
         // Check for incorrectly-deferred http: images to an https: page and suppress their
         // sending so as not to generate the "mixed secure and insecure" warning
         if (tracer.substring(0, tracer.indexOf(':') + 1) == document.location.protocol)
         {
            var Tracker = new Image();
            Tracker.src = tracer;
            m_imageSet[m_imageSet.length] = Tracker;
         }

         SITEINTEL.deleteCookie(cookieName);

         cookieName = conf.tracerCookieName + i++;
         tracer = getCookie(cookieName);
      }
   };
   
   /**
    * Called by all of the public functions when an exception is thrown during
    * their execution.  Contains generic code to handle exceptions - currently
    * this just returns true and does nothing with the exception, but see
    * feature request 3691.
    * 
    * @param e The exception that occurred during method invocation
    * @return true, always, so that any event that may have been handled continues
    * normally despite our internal error
    */
   var internalError = function(e)
   {
      return true;
   };
   
   // Support for testing - only exposed if test parameter is set in config
   if (conf.visibleTracers)
   {
      /**
       * @return A list of the URLs of images queued up in the image set for
       * 'normal' non-synchronous sending.
       */
      this.getQueuedTracers = function()
      {
         var tracers = [];
         for (var i = 0; i < m_imageSet.length; i++)
         {
            tracers[i] = m_imageSet[i].src;
         }
         return tracers;
      };
   }
   
   
   
   //////////////////////// Public methods ////////////////////////
   
   this.markAsMenu = function()
   {
      m_isMenu = true;
   };
   
   this.markAsFrameset = function()
   {
      m_isFrameset = true;
   };
   
   this.markAsExtraFrame = function()
   {
      m_isExtraFrame = true;
   };
   
   this.markAsRedirection = function()
   {
      m_isRedirection = true;
   };
   
   this.markAsPopup = function()
   {
      m_isPopup = true;
   }; 

   /**
    * Sets the page's pageID as seen by the Javascript
    * @param id The ID to set for the page
    */
   SITEINTEL.SiteTracker.prototype.setPageID = function(id)
   {
      document.body.setAttribute(m_pageIDAttrName,id);
   };

   this.shouldCreateCookie = function()
   {
      if(! SITEINTEL.is.Function(conf.cookiePreferenceCallback))
      {
          return true;
      }
       
      var co = getCookie(conf.cookiePreferenceCookieName);
      if(SITEINTEL.is.Null(co)) // don't have a cookie already
      {
          // try and set a cookie to see if it is possible.
          // if possible then update the cookie with the correct value depending on the users choice.
          document.cookie=buildCookieText(conf.cookiePreferenceCookieName, "tempValue"); 
          if("tempValue" == getCookie(conf.cookiePreferenceCookieName))
          {
              var res = conf.cookiePreferenceCallback();
              document.cookie=buildCookieText(conf.cookiePreferenceCookieName, res); 
              return res;
          }
          else {
              // Can not create a cookie. So no point asking about it just assume false.
              return false;
          }
      }
      else {
          return (co == "true");
      }
       
   };
    var shouldCreateCookie = this.shouldCreateCookie;
    
   this.buildCookieText = function(cookieName, cookieValue)
   {
       var domain = SITEINTEL.getDomain();
       return cookieName + "=" + cookieValue + ((SITEINTEL.config.cookiePath) ? "; path=" + SITEINTEL.config.cookiePath : "") + ((domain) ? "; domain=" + domain : "");
   }; 
    var buildCookieText = this.buildCookieText;
    
   /**
    * Sets a cookie with the given name, value and lifetime.  This is a method adds convenience in hiding
    * the gory details, and also determines the domain and path to set the cookie on based on the config
    * parameters.
    * @param name      The name of the cookie to set
    * @param value     The value to set the cookie to
    * @param timeout   The length of time the cookie should be valid for, in milliseconds
    */
   this.setCookie = function(name, value, timeout)
   {
      if(shouldCreateCookie())
      {
          var expiry = new Date();
          expiry.setTime(expiry.getTime() + timeout);
          
          var cookieDetails = buildCookieText(name, value);
          document.cookie = cookieDetails + "; expires=" + expiry.toGMTString();
          if (getCookie(name) != value)
          {
             // Failed to set persistent cookie so try session cookie
             document.cookie=cookieDetails;
    
             if (getCookie(name) != value)
             {
                // Couldn't even set a session cookie.  This could be due to hitting IE's
                // length limit (as per bug 5467) - in which case we really need to delete
                // this cookie now, as if this is the case it has actually been set but
                // all cookies are being hidden because of the IE bug!  Deleting it will
                // work and thus let all cookies that previously existed be seen again.
                // And of course if the cookie really isn't set (because all cookies are
                // being blocked for example) then this deletion is just a no-op, so it's
                // safe to do unconditionally at this point.
                document.cookie = cookieDetails + "; expires=Thu, 1 Jan 1970 00:00:01 GMT";
             }
          }
      }
   };
   var setCookie = this.setCookie; // So it can be referenced in a non-surprising way by "private" methods
   

    
   this.trackLink = function(idVar)
   {
      try
      {
         var tracerInfo = {
            clickedLinkID: extractLinkID(idVar),
            tagType: "trace"
         };
      
         internalTrackLink(tracerInfo);
         return true;
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         return internalError(e);
      }
   };
   
   this.trackEvent = function(idVar)
   {
      try
      {
         var tracerInfo = {
            clickedLinkID: extractLinkID(idVar),
            tagType: "trace"
         };
         
         // Send via the usual image set method as we won't be navigating away from the page
         internalTrackLinkPassiveSend(tracerInfo);
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };
   
   /**
    * Tracks an external link by sending the tracers synchronously before continuing
    * with the
    */
   this.trackExternalLink = function(idVar, closure)
   {
      try
      {
         var tracerInfo = {
            clickedLinkID: extractLinkID(idVar),
            tagType: "trace"
         };
      
         return internalTrackLinkViaSynchronousSend(tracerInfo, idVar, closure);
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         return internalError(e);
      }
   };
   
   this.trackLinkToUntagged = function(anchorTag)
   {
      try
      {
         // Send a tracer to track the link - no wait required as we'll
         // send a waiting tracer later on
         var traceInfo = {
             clickedLinkID : extractLinkID(anchorTag),
             tagType : "trace"
         };
         internalTrackLinkImmediate(traceInfo);
      
         // Now send a second tracer that will create a page impression
         var linkPath = anchorTag.href;

         // We'll need to deal with non-absolute URLs
         if (linkPath.indexOf('://') == -1)
         {
            // Is it relative to the document root or current directory?
            if(linkPath.substring(0,1) != '/')
            {
               // relative to the current directory - so work that out
               var lastSlash = document.location.pathname.lastIndexOf('/');
               var currentDirectory = document.location.pathname.substring(0, lastSlash + 1);
               linkPath = currentDirectory + linkPath;
            }

            // At this stage siTracerPath is directory-prefixed, starting with a slash

            // Check for the unusual-but-legal "//foo.com/path/file" style links
            if(linkPath.substring(0,2) != '//')
            {
               // It's a normal locally-absolute link, so just add the hostname
               linkPath = '//' + document.location.hostname + linkPath;
            }

            // Now we're just missing the protocol so add that and we're done
            linkPath = document.location.protocol + linkPath;
         }
      
         // Send the page tracer with a wait - this means  we stop navigation away from
         // the page until *both* tracers are sent, which is what we want.  Specify a
         // different external click ID for this page explicitly (bug 4946).
         var closure = getLinkClickingClosure(anchorTag);
         var pageInfo = {
             tagType    : "page",
             extClickID : "t"+(new Date()).getTime()+"h"+window.history.length
         };
         // Reset m_request and send via 'p' format so the queryString is used when decoding
         m_request = linkPath;
         sendSyncTracer("pctgyuo","pdtgyuo", pageInfo, closure, conf.tracerTimeout);
      
         return (closure == null);
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         return internalError(e);
      }
   };
   
   this.trackData = function(query)
   {
      var tracerInfo = {
         path    : "http://" + document.location.hostname + "/si/data",
         query   : query,
         tagType : "extra"
      };
      sendTracer("fqctyuo", "fqdtyuo", tracerInfo);
   };
   
   this.addTrackParam = function( name, value )
   {
      try
      {
         if (m_sendParams !== "")
         {
            m_sendParams += "&";
         }
         m_sendParams += encode(name) + "=" + encode(value);
         
         if (m_sendParams.length >= 512)
         {
            this.sendTrackParams();
         }
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };
   
   this.sendTrackParams = function()
   {
      try
      {
         if (m_sendParams !== "")
         {
            this.trackData(m_sendParams);
            m_sendParams = "";
         }
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };
   
   this.migrateCookie = function(migrateEl)
   {
      try
      {
         var cookieValue = getCookie(conf.cookieName);
         if (cookieValue !== null)
         {
            // Determine whether the migration is via an anchor or a form
            if (migrateEl.nodeName.toLowerCase() == "a")
            {
               // It's an anchor tag, so modify the href
               migrateEl.href = migrateEl.href + ((migrateEl.href.indexOf('?') > 0) ? "&" : "?") + conf.cookieQPName + "=" + cookieValue;
            }
            else if (migrateEl.nodeName.toLowerCase() == "form")
            {
               // It's a form, so add a hidden field
               if (migrateEl.method.toUpperCase() == "GET")
               {
                     try
                     {
                        // Required for IE since it doesn't let you set the value of hidden elements otherwise
                        var element = document.createElement('<input name="' + conf.cookieQPName + '" type="hidden" value="' + cookieValue + '" />');
                     }
                     catch (exception)
                     {
                        // Standards-compliant way of creating the hidden element
                        element = document.createElement("input");
                        element.setAttribute("name", conf.cookieQPName);
                        element.setAttribute("type", "hidden");
                        element.setAttribute("value", cookieValue);
                     }
                     // Add the element to the form; now it will be included when the form is sent
                     migrateEl.appendChild(element);
               }
               else
               {
                  // Just add the query parameter to the form action
                  migrateEl.action = migrateEl.action+((migrateEl.action.indexOf('?') > 0) ? "&" : "?") + conf.cookieQPName + "=" + cookieValue;
               }
            }
            else
            {
               // This method was called with an incorrect argument
               throw new Error("Illegal argument");
            }
         }
         return true;
      }
      catch (e)
      {
         return internalError(e);
      }
   };
   
   this.trackExternalFormData = function(form,list,closure)
   {
      try
      {
         var tracerInfo = {
            path : "http://" + document.location.hostname + "/si/form",
            tagType : "extra"
         };
      
         // If we have a closure provided, use that; else generate one
         if (!closure)
         {
            closure = getFormSubmissionClosure(form, form.siActivatedSubmit);
         }
            
         // Create the action to be performed when the form tracers are ready to send,
         // which is to send via sendSyncTracer
         var syncSend = function() { sendSyncTracer("fqctyuo", "fqdtyuo", tracerInfo, closure, conf.tracerTimeout); };
         
         // Build up the form data, sending it as necessary via sendSyncTracer
         buildAndSendFormTracerQuery(form, tracerInfo, syncSend, list);
         
         // Don't actually submit the form; let the closure do it once the tracers are sent
         return false;
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         return internalError(e);
      }
   };
   
   this.trackFormData = function(form, list, filePath)
   {
      try
      {
         var tracerInfo = {
            path : "http://" + document.location.hostname + (filePath ? filePath : "/si/form"),
            tagType : "extra"
         };

         // Build up the form data, sending it as necessary via SiDeferTracer
         buildAndSendFormTracerQuery(form, tracerInfo, function() { deferTracer("fqctyuo", "fqdtyuo", tracerInfo); }, list);
         
         // Proceed with the normal form submit
         return true;
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         return internalError(e);
      }
   };

   this.clearDeferredTracers = function()
   {
      try
      {
         var i = 0;
         var cookieName = conf.tracerCookieName + i++;
         var tracer = getCookie(cookieName);
         while (tracer)
         {
            SITEINTEL.deleteCookie(cookieName);
            cookieName = conf.tracerCookieName + i++;
            tracer = getCookie(cookieName);
         }
         m_tracerCookieIdx = 0;
         return true;
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         return internalError(e);
      }
   };


   
   /**
    * Registers a form for 'active tracking'; that is, inspection of which fields
    * are filled in (primarily for use with form abandonment).  Registering the
    * form entails a handler being added to the onblur event of each of its fields,
    * that will send a tracer if that field has been populated.
    * 
    * Forms are not actively tracked by default as this form of tracking can create
    * a lot of traffic; in the ideal case where every form impression is completed, it
    * will fire one tracer per field per visitor.  This can be reduced by specifying a
    * list of fields to be tracked along with the form; then only these fields will be
    * actively tracked.
    * 
    * @param form The form to track
    * @param list (optional) A list of names of form fields; only fields appearing in
    * this list will be actively tracked.  If not specified, all fields are tracked.
    */
   this.activeTrackForm = function(form, list)
   {
      try
      {
         if (form.elements && (form.elements.length > 0))
         {
            form.siFilledFields = [];
            for (var i=0; i<form.elements.length; i++)
            {
               // We're looking at all top-level elements, so only track ones with a name
               var el = form.elements[i];
               if (el.name)
               {
                  // Default capturing is true if no list supplied, otherwise false
                  var capture = (typeof(list) == 'undefined' || list === null);
                  if (!capture)
                  {
                     // See if this field is in the list, and if so, capture it
                     for (var j=0; !capture && (j<list.length); j++)
                     {
                        if (el.name == list[j])
                        {
                        	capture=true;
                        }      
                     }
                  }
                  if (capture)
                  {
                     // Add the tracing method to the element's onblur, preserving
                     // any previous handler that may have been registered.
                     // We do the assignment conditionally so that in the very common
                     // case of no previous onblur event, there is no additional
                     // function created thus minimising memory usage.
                     var prev = el.onblur;
                     if (prev)
                     {
                        // Need two inner functions as prev is mutated as we traverse
                        // the loop.  Extracting it here keeps fn local to the closure.
                        (function() {
                           var fn = prev;
                           var target = el;
                           el.onblur = function(e) { activeTrackTargetElement(target); return fn.call(target,e); };
                        })();
                     }
                     else
                     {
                        el.onblur = activeTrackElement;
                     }
                  }
               }
               el = null; // Break circular reference through DOM to avoid IE memory leaks
            }
         }
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };

   /**
    * Sends a tracer recording that an internal search took place.
    *
    * @param searchTerm The search term that was queried (required).  <p>This should
    * be a simple string; there is no explicit support for search options, though
    * if desired the string could be passed through with "modifiers" in order to
    * support this (e.g. "image: camera" instead of just "camera").  Each string is
    * simply freeform and lexographically distinct values will be counted as
    * separate search terms within VBIS, so there would be no way to have "camera",
    * "image: camera", "support: camera", etc. counted as the same term.</p>
    * <p>A better approach to handling this for non-trivial situations is to define
    * custom attributes in VBIS to capture the search options and/or type, then use
    * the <tt>extraAttrs</tt> parameter to convey these details, keeping the search
    * term simply as the string that was searched for.  This will allow full
    * flexibility to break down by search type as well as simply counting all searches
    * for a given term together.</p> 
    *
    * @param numResults The number of results that the search returned.  This is
    * not required, although without it no information will be available in VBIS
    * about the number of search results.  In particular, it will not be possible
    * to identify the searches that returned no results.  Even if an accurate number
    * is not possible here, sending through "0" for searches with no results and
    * "1" for searches with <i>some</i> results will allow this useful distinction.
    *
    * @param extraAttrs (optional) An object (as an associative array) that contains
    * extra parameters to send in the tracer.  This can be used to capture extra
    * information that does not fit in the standard VBIS data model, if custom
    * data sources have been set up to hold it.  Each property name should be the
    * fully-qualified name of a VBIS data detail; then the value will be automatically
    * written to that detail when the tracer is processed.
    */
   this.trackInternalSearch = function(searchTerm, numResults, extraAttrs)
   {
      // Note - originally this function was going to take a single object of type
      // SITEINTEL.InternalSearch or something like that, and work similar to how the
      // SearchOTB stuff happens in the E-Commerce javascript.  But with essentially
      // just two primitive arguments to track it didn't seem worthwhile making the
      // user jump through hoops to send a tracer.  If the data model gets more complex
      // in future then it may be a good idea to revisit this approach. 

      // Generate the tracer's query from the supplied arguments
      var sb = new SITEINTEL.StringBuilder();
      sb.append("q=").append(searchTerm);
      if (numResults !== undefined)
      {
         sb.append("&n=").append(numResults);
      }
      if (extraAttrs)
      {
         for (var attr in extraAttrs)
         {
            if (attr.indexOf(".") != -1)
            {
               sb.append("&").append(attr).append("=").append(extraAttrs[attr]);
            }
         }
      }
      var queryString = sb.toString();

      this.sendAdditionalTracer(SITEINTEL.config.searchTracerPath, queryString);
   };
   
   this.trackTracer = function(filePath, queryString)
   {
      try
      {
         internalTrackTracer(filePath, queryString, null);  
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };
   
   this.sendAdditionalTracer = function(filePath, queryString)
   {
      try
      {
         internalTrackTracer(filePath, queryString, 'trace');
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };
   
   this.trackPage = function(pageID)
   {
      try
      {
         // Bug 8112, allow multiple page tags with distinct external click ids
         // through a single SiteTracker
         if(m_pageTracerSent)
         {
            resetState();
         }

         // If a page ID is supplied use it (ensuring it starts with /) as the path
         // but keep any existing query string
         if (pageID !== undefined)
         {
            if (pageID.indexOf('://') == -1)
            {
               if(pageID.substring(0,1) != '/')
               {
                  pageID = '/' + pageID;
               }
      
               pageID = document.location.protocol + "//" + document.location.hostname + pageID;
            }
      
            m_request = pageID.indexOf('?') == -1 ? pageID + window.location.search : pageID + "&" + window.location.search.substring(1);
         }
      
         sendTracer("pcrtgyuo", "pdrtgyuo", { tagType : "page" } );

         m_pageTracerSent = true;
      }
      catch (e)
      {
         // Catch all exceptions rather than propagate to the user
         internalError(e);
      }
   };
   
   
   /**
	 * Scans the document for any forms, and attaches an event handler to any submit
	 * buttons within these forms.  The event handler is registered to the submit
	 * buttons' onclick events, and when fired will update a variable on the form
	 * tracking the last submit button pushed.  Since there is no information in the
	 * submit event itself, or in the state of the buttons, about which submit button
	 * was responsible for submitting the form, this is the only way we can strip out
	 * any inactive select buttons.
	 * 
	 * This method will be scheduled in the constructor to run when the DOM is loaded
	 * (according to {@link SITEINTEL.runWhenDOMLoaded}, see the Javadocs of that
	 * method for more details).  It is idempotent, so if there is any suspicion that
	 * the window.onload event may not fire, this method can safely be called manually
	 * once the document has loaded to ensure forms are annotated.
	 */
	this.registerForms = function()
	{
		// Only run this function once, so quit if it has already been called
		if (arguments.callee.done)
		{
			return;
		}

      // flag this function so we don't do the same thing twice
      arguments.callee.done = true;
      
	   // Define this function outside the loop(s) so we don't create a new one for each
	   // button.  Simply records on the form that this button was pressed, which we check
	   // for when looking at the elements in trackFormData().
	   var flagSubmitButton = function()
	   {
	      this.form.siActivatedSubmit = this;
	   };
	   
	   // Iterate over all the forms in the document, adding onclick handlers
	   // to the submit buttons contained within them so we know which one
	   // was clicked when the form is submitted
	   for (var i = 0; i < document.forms.length; i++)
	   {
	      var form = document.forms[i];
	      for (var j = 0; j < form.elements.length; j++)
	      {
	         // Check if the element is a submit button
            var el = form.elements[j];
            var elType = el.nodeName.toLowerCase();
	         if ((elType == "input" || elType == "button") && (el.type == "submit" || el.type == "image"))
	         {
	            // It is, so register the function on the onclick event of the
	            // button.  We do the assignment conditionally so that in the very
	            // common case of no previous onclick event, there is no additional
	            // function created thus minimising memory usage.
	            var prev = el.onclick;
	            if (prev)
	            {
	               // Need two inner functions as prev is mutated as we traverse
	               // the loop.  Extracting it here keeps fn local to the closure.
	               // (Without this the closure for *all* elements would call the
	               // existing onclick event for the *last* element, even if this
	               // was null which would not go down too well).
                  // Likewise we need to store 'el' as 'target' so we can call the
                  // function on it, in order to preserve any original "this"
                  // reference in said function.
                  (function() {
	                  var fn = prev;
                     var target = el;
                     // We cannot simply call flagSubmitButton here else the function
	                  // is not copied and thus the 'this' reference in it still points
	                  // to the Window object.  Thus we need to redeclare it here, which
	                  // is no great hardship
	                  el.onclick = function(e) { this.form.siActivatedSubmit = this; return fn.call(target,e); };
	               })();
	            }
	            else
	            {                          
	               el.onclick = flagSubmitButton;
	            }
	         }
	      }
	   }
	};


   /**
    * Process any callbacks on the specified stack
    * @param id
    */
   var processStackedCallbacks = function(id)
   {
      var stackForId = m_determineTrackingCallbackStacks[id];
      if(stackForId)
      {
         var callback;
         while( (callback = stackForId.pop()) != undefined) {
            callback();
         }
      }
   };


   /**
    * Adds a callback to the specified stack
    *
    * @param callback
    * @param context
    * @param params
    */
   var addCallbackToStack = function(id, callback)
   {
      var stackForId = m_determineTrackingCallbackStacks[id];
      if( !stackForId )
      {
         stackForId = [];
         m_determineTrackingCallbackStacks[id] = stackForId;
      }

      stackForId.push( callback );
   };

   /**
    * Creates a new <script> element and appends it as a new child of <head>,
    * optionally calling a callback when the script has loaded.
    *
    * @param srcUrl (string) is set as the src attribute of the script
    * @param id (string) is set as the id attribute of the script
    * @param callback (function) will be called once when the script is loaded
    */
   var loadScriptFromUrl = function(srcUrl, id, callback)
   {
      var created = false;
      var head = document.getElementsByTagName('head')[0];
      var script = document.getElementById( id );
      if(!script) {
         created = true;
         script = document.createElement('script');
         script.src = srcUrl;
         script.id = id;
         script.type = 'text/javascript';
      }

      if(callback) {
         addCallbackToStack( id, callback );
      }

      // We only need to load one copy of the top level js, supporting multiple calls
      // to determineTagging through the use of a stack of callbacks
      if(created) {
         if(callback) {
            var whenReadyProcessStack = function (isOnload) {
               if (script.readyState == 'loaded' || script.readyState == 'complete' || isOnload) {
                  // remove the event handles because we only want to be called once
                  // was previously using arguments.callee to set a flag to handle this
                  // but that is deprecated and seems unnecessary
                  script.onload = null;
                  script.onreadystatechange = null;
                  processStackedCallbacks(id);
               }
            };

            // add to both onload and onreadystatechange to cover various
            // (un)helpful browsers
            script.onload = function() { whenReadyProcessStack(true); };
            script.onreadystatechange = function() { whenReadyProcessStack(false); };
         }

         head.appendChild(script);
      }
      else {
         // not created here and the callback can be processed immediately
         // otherwise the callback we added above will be picked up when the
         // callback registered on creation is fired
         if (script.readyState == 'loaded' || script.readyState == 'complete') {
            processStackedCallbacks(id);
         }
      }
   };

   /**
    * Identifies the key to be used to lookup the tracking for this page from
    * determineTrackingControl which should be set by the first
    * script loaded by determineTracking().
    *
    * @param pageID (string), optional.  If not specified then this is
    * determined in the order below, after the initial tag determination
    * script has been loaded and so has an opportunity to set si:pageID
    *
    * @return The first available value from
    *  1. Explicitly specified page id
    *  2. si:pageID attribute from <body> tag
    *  3. id attribute from <body> tag
    *  4. document.URL
    */
   var identifyTrackingKey = function(pageID)
   {
      var key;
      if (pageID)
      {
         key = pageID;
      }
      else
      {
         key = determinePageID(true);
         if (!key)
         {
            key = document.URL;
         }
      }

      return key;
   };

   /**
    * Returns the full url to be used to load the specified tag determination
    * script.  Requires that SITEINTEL.config.determineTrackingBase and
    * SITEINTEL.config.determineTrackingScript are set.
    */
   var identifyTagScriptUrl = function(script)
   {
      var scriptUrl;
      // Check if source of tracking scripts is specified
      if (conf.determineTrackingBase && conf.determineTrackingScript && script)
      {
         // If what we have starts with a protocol just append the file
         if (conf.determineTrackingBase.substring(0, 4) == "http")
         {
            scriptUrl = conf.determineTrackingBase + '/' + script;
         }
         else
         {
            // If what we have starts with a / then use current location details
            if (conf.determineTrackingBase.substring(0, 1) == "/")
            {
               scriptUrl = document.location.protocol + "//" + document.location.hostname;
               var port = document.location.port;
               // port property may not provide a usable port number for default ports (bug 8119)
               if (port !== undefined && port !== '')
               {
                  scriptUrl += ":" + port;
               }
               scriptUrl += conf.determineTrackingBase + '/' + script;
            }
            else // no protocol, doesnt start with a slash - assume host + path as long as it contains a slash
            {
               var slashPos = conf.determineTrackingBase.indexOf("/");
               if (slashPos > -1)
               {
                  // so just prepend protocol
                  scriptUrl = document.location.protocol + "//" + conf.determineTrackingBase + '/' + script;
               }
            }
         }
      }

      // debug option ... TBC if we publish this!
      if(conf.determineTrackingScriptsDefeatCaching) {
         scriptUrl += "?extClickID=" + m_extClickID;
      }
      return scriptUrl;
   };

   /**
    * Adds script elememt to the head for the specified entry, recursively processing entries that are
    * functions or Arrays 
    * @param entry
    * @param key
    */
   var processDeterminedEntry = function (entry, key)
   {
      if(entry)
      {
         if (SITEINTEL.is.Function(entry))
         {
            processDeterminedEntry( entry(key), key);
         }

         if (SITEINTEL.is.Array(entry))
         {
            for (var i = entry.length-1; i >= 0; i--) {
               processDeterminedEntry( entry[i], key );
            }
         }

         if(SITEINTEL.is.String(entry))
         {
            var entryScriptUrl = identifyTagScriptUrl(entry);
            loadScriptFromUrl(entryScriptUrl, "siDetermined_" + m_extClickID + "_" + entryScriptUrl);
         }
      }
   };

   /**
    * Identifies the determined tracking entry to be processed for the specified component,
    * causing the addition of appropriate script element(s) to the head
    *
    * @param component (string), used to lookup the entry to be processed from m_tagDeterminationControl
    */
   var loadDeterminedScripts = function (component) {
      var key = identifyTrackingKey(component);
      if(key && m_determineTrackingControl) {
         var entry = m_determineTrackingControl[ key ];
         if (!entry)
         {
            entry = m_determineTrackingControl[ "si:default" ];
         }
         processDeterminedEntry(entry, key);
      }
   };

   /**
    * This is the private function that drives the behaviour exposed by
    * determineTracking.  If SITEINTEL.config is setup so tag determination is
    * used then this function will trigger the load of the tag determination
    * script and then via a callback when that script is loaded determine if
    * a tracking script exists for the current page and load that,
    *
    * Adds a script element for the tag determination script and sets up the callback
    * to determine the script to be loaded for the requested component
    *
    * @param pageID
    */
   var loadDeterminationScript = function (component) {
      var scriptUrl = identifyTagScriptUrl(conf.determineTrackingScript);
      if (scriptUrl)
      {
         var whenLoadedCallback = function() {
            loadDeterminedScripts(component);
         };
         loadScriptFromUrl(scriptUrl, "siDetermination_" + m_extClickID + "_" +scriptUrl, whenLoadedCallback);
      }
   };


   /**
    * Used to apply a tag determination script if such exists
    *
    * This is the public function that gets called
    * deferring the actual work to the private function
    * implementTracking via runWhenDOMLoaded.
    *
    * @param pageID (string), optional
    */
   this.determineTracking = function(pageID)
   {
      SITEINTEL.runWhenDOMLoaded(
            function()
            {
               try
               {
                  loadDeterminationScript(pageID);
                  return true;
               }
               catch (e)
               {
                  // Catch all exceptions rather than propagate to the user
                  return internalError(e);
               }
            }
      );
   };

   /**
    * 'callback' function to be called from "tag-determination.js"
    * to setup the associative array mapping from pageid to scripts
    *
    * @param (object) maps 'pageid' to the second level script that should be loaded
    */
   this.setDetermineTrackingControl = function( obj )
   {
      m_determineTrackingControl = obj;
   };

   
   // Start of actual 'constructor' code - old SiInitPage stuff
   try
   {
      // Check if tagging server is specified
      if (!conf.taggingServer)
      {
         var port = document.location.port;
         // port property may not provide a usable port number for default ports (bug 8119)
         if(port !== undefined && port !== '')
         {
            conf.taggingServer = document.location.protocol + "//" + document.location.hostname + ":" + port;
         }
         else
         {
            conf.taggingServer = document.location.protocol + "//" + document.location.hostname;
         }
      }
      else if (conf.taggingServer.substring(0,4) != "http")
      {
         // Assume tagging server specifies hostname but pick up protocol from document location
         // Specifically don't pick up the port here as per bug 3659 - so it is specified either
         // implicitly (as port 80) or explicitly by the taggingServer setting.
         conf.taggingServer = document.location.protocol + "//" + conf.taggingServer;
      }
   
       if(SITEINTEL.is.Null(conf.cookieValueCallback))
       {
           m_cookieValue = buildCookie();
       }
       else 
       {
           m_cookieValue = conf.cookieValueCallback();
       }
      

      // Check whether we're pending a redirect to the central cookie server
      if (m_cookieValue && typeof m_cookieValue.redirecting != "undefined!" && m_cookieValue.redirecting)
      {
         // buildCookie is redirecting to the central cookie server so don't continue any
         // further processing
         return;
      }
      
      sendDeferredTracers();
    
		// Attempt to have the RegisterForms method run on page load to annotate any
		// submit buttons present.
      SITEINTEL.runWhenDOMLoaded(this.registerForms);

      if (autoTracer)
      {
         this.trackPage();
      }
   }
   catch (e)
   {
      // Catch all exceptions rather than propagate to the user
      internalError(e);
   }
};


// Prototypal variables - like public static variables in Java

/**
 * The version of this javascript.
 * 
 * @final
 */
SITEINTEL.SiteTracker.prototype.version = "12.0.425";




/**
 * Framework to allow execution of functions when the page is 'ready'.  As far
 * as possible this is when the DOM content is rendered but since this cannot
 * be determined in a browser-independent way, this might be the standard
 * 'onload' event.  In any case, any page elements should exist at the point
 * that the event is fired, which is normally what is desired by onload.
 */
(function()
{
   // The array of functions/closures to execute on DOM load
   var m_pendingCallbacks = [];
   var isReady            = false;

   // Dean Edwards/Matthias Miller/John Resig
   var init = function()
   {
   	try
   	{
	      // do all the registered actions in the order they were received
         // removing them as we go in case we are called multiple times
         var callback;
         while( (callback = m_pendingCallbacks.shift()) != undefined)
	      {
	      	// Wrap the calling of each callback in a try block as there is
	      	// no guarantee they actually are functions.  If one fails we should
	      	// still try the rest.
	      	try
	      	{
	            callback();
	      	}
	      	catch (exception)
	      	{
	      		// Ignore - cannot call internalError from this scope
	      	}
	      }

         // flag this as done to break doScrollCheck timer and enable direct execution in runWhenDOMLoaded
         isReady = true;
   	}
   	catch (e)
   	{
   		// Catch and ignore any miscellaneous errors
   	}
   };

   /**
    * Determines the domain of the current document according to the information in the config.
    */
   SITEINTEL.getDomain = function()
   {
     var domainValue = null;
     var firstDot;
     var secondDot;
     var lastDot;
     var useHostname = document.location.hostname;
     if (useHostname)
     {
        var arIndex;
        for (arIndex = 0; (arIndex < SITEINTEL.config.domainList.length) && (domainValue === null); arIndex++)
        {
           var tldIndex = useHostname.lastIndexOf(SITEINTEL.config.domainList[arIndex]);
           if (tldIndex > 0)
           {
              var nextDot = useHostname.lastIndexOf('.',tldIndex-1);
              if (nextDot >= 0)
              {
                 domainValue = useHostname.substring(nextDot);
              }
              else
              {
                 domainValue = "." + useHostname;
              }
           }
        }
     }
     return domainValue;
   };

   /**
    * Deletes a cookie
     *
    * @param name    The name of the cookie to delete.
    * @param path    Optionally, the path that the cookie was set for.  If unspecified, this is
    * determined by the same logic that {@link #setCookie} uses.
    * @param domain  Optionally, the domain that the cookie was set for.  If unspecified, this is
    * determined by the same logic that {@link #setCookie} uses.
    */
   SITEINTEL.deleteCookie = function(name, path, domain)
   {
      // If the path and/or domain are not specified explicitly, use the
      // standard cookie values for them
      if (!path)
      {
      	path = SITEINTEL.config.cookiePath;
      }
      if (!domain)
      {
      	domain = SITEINTEL.getDomain();
      }

      // Assemble the details to set the cookie to null (the actual value is arbitrary)
      // and expire it on 1 Jan 1970 to delete it immediately
      var cookieDetails= name + "=null" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "");
      document.cookie = cookieDetails + "; expires=Thu, 1 Jan 1970 00:00:01 GMT";
   };

   /**
    * Registers a callback to be executed once the DOM has been rendered. This
    * makes a best attempt to run as early as possible, but since there is no
    * cross-browser standard to determine if the DOM is loaded or not, this is
    * not guaranteed.
    * <p>
    * Specifically, methods exist for IE, Firefox, Opera and Safari, which means
    * that in these browsers, any registered callbacks should really be run when
    * the DOM is loaded without waiting for any external resources to load.  On
    * other browsers, the window.onload event is used as a fallback.
    * <p>
    * Note that due to the nature of window.onload, the event listener may be
    * unconditionally overwritten by a later script (or by an attribute on the
    * body element).  Should this happen, and the user agent is not one of those
    * named above, then the registered callbacks will not fire.  Therefore it
    * must be stated that <b>this method makes no guarantee that registered
    * callbacks will ever fire</b>.  Any critical functions should be checked
    * and if needed manually called later.  Ideally registered callbacks will be
    * idempotent so they can be unconditionally called again should there be any
    * doubt as to whether window.onload will be overridden.
    * <p>
    * If this method is called once the DOM has already been loaded (as determined
    * by the mechanism described above, so this cannot be guaranteed to ever be
    * true), then the callback is run immediately.
    *
    * @param callback The function/closure to be executed when the DOM has
    * been rendered.
    */
   SITEINTEL.runWhenDOMLoaded = function(callback)
   {
      try
      {
	      // Check whether the page has already loaded or not
	      if (isReady)
	      {
		      	// The DOM has already been loaded execute immediately
		      	callback();
	      }
	      else
	      {
	      	// Remember this callback so it will be executed by the init function on DOM load
	         m_pendingCallbacks[m_pendingCallbacks.length] = callback;
	      }
      }
      catch (e)
      {
      	// Ignore - cannot call internalError from this scope
      }
   };

   // The following code is run when this function is invoked, i.e. when the
   // script is run, and hooks up the init() method to be actually run when
   // the DOM content is loaded

   // NOTE: The current version is sourced from the jQuery.ready implementation from version 1.8.1
   //       retaining original comments
   //       replacing jQuery.ready with our init call
   //       and jQuery.isReady with our own isReady

   // The ready event handler and self cleanup method
	var DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			init();
		} else if ( /loaded|complete/.test(document.readyState) ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			init();
		}
	};

    // Retain reference to doScrollCheck as var here to resolve problems with packed version
    var doScrollCheck = function() {
        if ( !isReady ) {

            try {
                // Use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                top.doScroll("left");
            } catch(e) {
                return setTimeout( doScrollCheck, 50 );
            }

            // and execute any waiting functions
            init();
        }
    };

    // Catch cases where $(document).ready() is called after the browser event has already occurred.
   // we once tried to use readyState "interactive" here, but it caused issues like the one
   // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
   if ( /loaded|complete/.test(document.readyState) ) {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      setTimeout( init, 1 );

   // Standards-based browsers support DOMContentLoaded
   } else if ( document.addEventListener ) {
      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", init, false );

   // If IE event model is used
   } else {
      // Ensure firing before onload, maybe late but safe also for iframes
      document.attachEvent( "onreadystatechange", DOMContentLoaded );

      // A fallback to window.onload, that will always work
      window.attachEvent( "onload", init );

      // If IE and not a frame
      // continually check to see if the document is ready
      var top = false;

      try {
         top = window.frameElement == null && document.documentElement;
      } catch(e) {}

      if ( top && top.doScroll ) {
         doScrollCheck();
      }
   }

})();
