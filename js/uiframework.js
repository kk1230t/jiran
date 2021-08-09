"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e,a,c){var t=[{mode:"mobile",min:0,max:767},{mode:"tablet",min:768,max:1024},{mode:"web",min:1025,max:3840}];e.LIB_NAME="UI";var n=e.LIB_NAME||"UI",i=e.document,l=a.extend,o=(a.proxy,a(window)),s=Array.prototype,r=Object.prototype,d=r.toString,u=r.hasOwnProperty,p=(s.slice,"function"),f="string",m="placeholder"in i.createElement("input"),g="orientation"in e||!0===e.IS_MOBILE;if(!e[n]){var v=e[n]||(e[n]={});String.prototype.replaceAll||(String.prototype.replaceAll=function(e,t){return this.split(e).join(t)}),L.extend=function(e){function t(){}var n,i,o=this,s=e&&e.init?e.init:function(){o.apply(this,arguments)};for(n in t.prototype=o.prototype,i=s.fn=s.prototype=new t,e)null!=e[n]&&e[n].constructor===Object?i[n]=l(!0,{},t.prototype[n],e[n]):i[n]=e[n];return(i.constructor=s).extend=o.extend,s},Date.prototype.format=function(e){if(!this.valueOf())return" ";var t=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],n=["일","월","화","수","목","금","토"],i=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],s=this;return e.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi,function(e){switch(e){case"yyyy":return s.getFullYear();case"yy":return(s.getFullYear()%1e3).zf(2);case"MM":return(s.getMonth()+1).zf(2);case"dd":return s.getDate().zf(2);case"KS":return n[s.getDay()];case"KL":return t[s.getDay()];case"ES":return o[s.getDay()];case"EL":return i[s.getDay()];case"HH":return s.getHours().zf(2);case"hh":return((h=s.getHours()%12)?h:12).zf(2);case"mm":return s.getMinutes().zf(2);case"ss":return s.getSeconds().zf(2);case"a/p":return s.getHours()<12?"오전":"오후";default:return e}})},String.prototype.string=function(e){for(var t="",n=0;n++<e;)t+=this;return t},String.prototype.zf=function(e){return"0".string(e-this.length)+this},Number.prototype.zf=function(e){return this.toString().zf(e)};var b,y,w,x,T,_,S,I,C,E=function(e,t){var n=1===arguments.length;function i(e){return n?e:t===e}if(null===e)return i("null");if(_typeof(e)===c)return"undefined";if(e&&e.nodeType){if(1===e.nodeType||9===e.nodeType)return i("element");if(e&&3===e.nodeType&&"#text"===e.nodeName)return i("textnode")}if("object"===t||"json"===t)return n?"object":isPlainObject(e);var o=toString.call(e).match(/\[object (.*?)\]/)[1].toLowerCase();return"number"===o?isNaN(e)?i("nan"):isFinite(e)?i("number"):i("infinity"):n?o:o===t},O=(x={},_=(T=e).navigator,S=_.userAgent,I=S.toLowerCase(),x.mediaInfo=function(){},x.mediaInfo.mode=null,x.sizes=t,x.placeholder=m,x.isStrict=void 0===e,x.isRetina="devicePixelRatio"in e&&1<e.devicePixelRatio,x.isAndroid=-1!==I.indexOf("android"),x.isBadAndroid=/Android /.test(_.appVersion)&&!/Chrome\/\d/.test(_.appVersion),x.isOpera=!(!T.opera||!T.opera.buildNumber),x.isWebKit=/WebKit/.test(S),x.isTouch=!!("ontouchstart"in e),x.isMobileDevice="ontouchstart"in T||T.DocumentTouch&&document instanceof DocumentTouch||_.msMaxTouchPoints||!1,b=/(msie) ([\w.]+)/.exec(I)||/(trident)(?:.*rv.?([\w.]+))?/.exec(I)||["",null,-1],x.isIE=!x.isWebKit&&!x.isOpera&&null!==b[1],x.version=x.ieVersion=parseInt(b[2],10),x.isOldIE=x.isIE&&x.version<9,x.isWin=-1!=_.appVersion.indexOf("Win"),x.isMac=-1!==S.indexOf("Mac"),x.isLinux=-1!=_.appVersion.indexOf("Linux"),x.is64Bit=-1<I.indexOf("wow64")||"Win64"===_.platform&&-1<I.indexOf("x64"),x.isChrome=-1!==S.indexOf("Chrome"),x.isGecko=-1!==S.indexOf("Firefox"),x.isAir=/adobeair/i.test(S),x.isIOS=/(iPad|iPhone)/.test(S),x.isSafari=!x.isChrome&&/Safari/.test(S),x.isIETri4=x.isIE&&-1!==S.indexOf("Trident/4.0"),x.isGalaxy=-1!==S.indexOf(" SHV-"),x.msPointer=!(!_.msPointerEnabled||!_.msMaxTouchPoints||T.PointerEvent),x.pointer=!!(T.PointerEvent&&_.pointerEnabled&&_.maxTouchPoints||x.msPointer),x.isApp=T.appYn!==c?T.appYn:null,x.isAppType=T.appOpsyNm!==c?T.appOpsyNm:null,x.isAndroid?x.androidVersion=(w=S.match(/[a|A]ndroid[^\d]*(\d+).?(\d+)?.?(\d+)?/))?[parseInt(0|w[1],10),parseInt(0|w[2],10),parseInt(0|w[3],10)]:-1:x.isIOS&&(x.iosVersion=(y=S.match(/OS (\d+)_?(\d+)?_?(\d+)?/),[parseInt(0|y[1],10),parseInt(0|y[2],10),parseInt(0|y[3],10)])),x.isMobile=g||x.isIOS||x.isAndroid,x);l(v,{name:n,DEFAULT_SCREEN_SIZE:t,version:"0.7.0",noop:function(){},emptyFn:function(){},widgets:v.widgets||[],_widgetRegisteredCallbacks:[],ui:v.ui||{},Class:L,addon:function(e,t,n){"string"!=typeof e&&(t=e,e="");var i=v,o=e?e.split("."):[],s=o.length-1,r=o[s];!1===n||"function"!=typeof t||u.call(t,"superClass")||(t=t.call(i));for(var a=0;a<s;a++)i=i[o[a]]||(i[o[a]]={});return r&&(i[r]?l(i[r],t):i[r]=t)||l(i,t),t},detect:O,prefix:".hui",transitionEnd:function(){var e=document.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t)if(e.style[n]!==c)return{end:t[n]};return!1},each:function(e,t,n){if(!e)return e;var i=0,o=0;if(function(e){return"[object Array]"===d.call(e)}(e))for(i=0,o=e.length;i<o&&!1!==t.call(n||e,e[i],i,e);i++);else for(i in e)if(u.call(e,i)&&!1===t.call(n||e,e[i],i,e))break;return e},isType:E,isArray:(C="array",function(e){return E(e,C)}),userScreenControl:!1}),l(a.fn,{handler:function(e){return this.data("handler",e),this},emulateTransitionEnd:function(e){var t=!1,n=this;a(this).one("bsTransitionEnd",function(){t=!0});return setTimeout(function(){t||a(n).trigger(a.support.transition.end)},e),this},replaceClass:function(e,t){return this.each(function(){a(this).removeClass(e).addClass(t)})},activeItem:function(e,t){return e=e||"on",void 0===t&&(t=!0),this.toggleClass(e,t).siblings().toggleClass(e,!t).end()},onImgLoaded:function(e){return v.util.waitImageLoad(this).done(e),this},getImgSize:function(e){var t=this.eq(0);return t.onImgLoaded(function(){e&&e.call(t[0],t.css("width","").width(),t.css("height","").height())}),this}});var A=L.extend({init:function(){this._events={}},bind:function(e,t,n){var i,o,s,r,a=this,l=_typeof(e)===f?[e]:e,d=_typeof(t)===p;if(t===c){for(i in e)a.bind(i,e[i]);return a}for(i=0,o=l.length;i<o;i++)e=l[i],(r=d?t:t[e])&&(n&&(s=r,(r=function(){a.unbind(e,r),s.apply(a,arguments)}).original=s),(a._events[e]=a._events[e]||[]).push(r));return a},one:function(e,t){return this.bind(e,t,!0)},first:function(e,t){var n,i,o,s=_typeof(e)===f?[e]:e,r=_typeof(t)===p;for(n=0,i=s.length;n<i;n++)e=s[n],(o=r?t:t[e])&&(this._events[e]=this._events[e]||[]).unshift(o);return this},trigger:function(e,t){var n,i,o=this._events[e];if(o){for((t=t||{}).sender=this,t._defaultPrevented=!1,t.preventDefault=preventDefault,t.isDefaultPrevented=isDefaultPrevented,n=0,i=(o=o.slice()).length;n<i;n++)o[n].call(this,t);return!0===t._defaultPrevented}return!1},unbind:function(e,t){var n,i=this._events[e];if(e===c)this._events={};else if(i)if(t)for(n=i.length-1;0<=n;n--)i[n]!==t&&i[n].original!==t||i.splice(n,1);else this._events[e]=[];return this}}),z=A.extend({init:function(e,t){var n=this;n.element=a(e).handler(n),A.fn.init.call(n);var i,o=t?t.dataSource:null;t&&(i=(n.componentTypes||{})[(t||{}).componentType]),o&&(t=l({},t,{dataSource:{}})),t=n.options=l(!0,{},n.options,n.defaults,i||{},t),o&&(t.dataSource=o),n.element.data(t.name,n),n.bind(n.events,t)},events:[],options:{prefix:""},_hasBindingTarget:function(){return!!this.element[0].bindingTarget},_tabindex:function(e){e=e||this.wrapper;var t=this.element,n="tabindex",i=e.attr(n)||t.attr(n);t.removeAttr(n),e.attr(n,isNaN(i)?0:i)},setOptions:function(e){this._setEvents(e),a.extend(this.options,e)},_setEvents:function(e){for(var t,n=this,i=0,o=n.events.length;i<o;i++)t=n.events[i],n.options[t]&&e[t]&&(n.unbind(t,n.options[t]),n._events&&n._events[t]&&delete n._events[t]);n.bind(n.events,e)},resize:function(e){console.log(0);var t=this.getSize(),n=this._size;!e&&(!(0<t.width||0<t.height)||n&&t.width===n.width&&t.height===n.height)||(this._size=t,this._resize(t,e),this.trigger("resize",t))},getSize:function(){return v.dimensions(this.element)},size:function(e){if(!e)return this.getSize();this.setSize(e)},setSize:a.noop,_resize:a.noop,destroy:function(){var e=this;e.element.removeData(e.options.prefix+e.options.name),e.element.removeData("handler"),e.unbind()},_destroy:function(){this.destroy()}});l(v.ui,{Widget:z,Observable:A,roles:{},plugin:function(i,e,t){var o=i.fn.name;t=t||"",(e=e||v.ui)[o]=i,e.roles[o.toLowerCase()]=i;var n={name:o,widget:i,prefix:t||""};v.widgets.push(n);for(var s=0,r=v._widgetRegisteredCallbacks.length;s<r;s++)v._widgetRegisteredCallbacks[s](n);a.fn[o]=function(n){return _typeof(n)===f?this.each(function(){var e=a.data(this,o);e[n].apply(e,void 0)}):this.each(function(){var e=a(this),t=e.data(o);t||e.data(o,t=new i(this,n))}),this.data(o)},a.fn[o].Constructor=i},getNext:function(e,t){var n,i=!0,o=e,s=t;do{if("body"==o.localName)return null;(n=o.nextElementSibling)&&n.classList.contains(s)?i=!1:o=o.parentNode}while(i);return{el:o,trigger:n}},showDim:function(e){var t=a("body"),n=e||"",i=a('<div id="bgDim" class="cm-dim">');e&&i.attr("data-call-fn",n),t.append(i),setTimeout(function(){i.addClass("hidden"),t.addClass("hidden")},0)},hideDim:function(){a("body").removeClass("hidden"),setTimeout(function(){a("#bgDim").remove()},0)},disableScroll:function(t){var n=(t=t||o).scrollTop();t.on("scroll.disableScroll mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll",function(e){e.preventDefault(),t.scrollTop(n)})},enableScroll:function(e){(e=e||o).off(".disableScroll")},modulesRefresh:function(e){var t=e;setTimeout(function(){0<t.find("[data-modules-moreview]").length&&t.find("[data-modules-moreview]").moreview("create"),0!==t.find("[data-modules-cascadingGrid]").length&&t.find("[data-modules-cascadingGrid]").cascadingGrid("mount"),0!==t.find("[data-modules-slick]").length&&t.find("[data-modules-slick]").slick("setPosition"),0!==t.find("[data-modules-sticky]").length&&t.find("[data-modules-sticky]").sticky("posRefresh")},0)}})}function L(){}}(window,jQuery),function(h,m){var t=/&/g,n=/</g,i=/"/g,o=/'/g,s=/>/g;h.addon("util",{stringToObject:function(e){if("object"===_typeof(e))return e;e=e.replace(/\s/g,"");return JSON.parse(e)},htmlEncode:function(e){return(""+e).replace(t,"&amp;").replace(n,"&lt;").replace(s,"&gt;").replace(i,"&quot;").replace(o,"&#39;")},dimensions:function(e,t){var n=e[0];return t&&e.css(t),{width:n.offsetWidth,height:n.offsetHeight}},cssLiteralToObject:function(e){for(var t,n,i,o,s,r,a,l,d,c=e,u=c.split(";"),p=u.length-1,f={};0<=p;p--)if(""!==u[p])if(-1!==u[p].indexOf("{")||-1!==u[p].indexOf("}")||-1!==u[p].indexOf("[")||-1!==u[p].indexOf("]"))n=u[p].indexOf("{"),i=u[p].lastIndexOf("}"),r=u[p].indexOf("["),a=u[p].lastIndexOf("]"),l=u[p].indexOf(":"),d=r<n&&-1!==r?a:n<0&&0<r?a:i,o=u[p].slice(0,l),s=u[p].slice(l+1,d+1).replaceAll("'",'"'),console.log(s),f[o]=h.util.stringToObject(s);else{if(2!==(t=u[p].replaceAll(" ","").split(":")).length||""==t[1])throw new Error("옵션값이 잘못되었습니다.\n 잘못 전달된 옵션 속성 : "+c);-1!==t[1].indexOf("true")||-1!==t[1].indexOf("false")?t[1]="true"===t[1]:m.isNumeric(t[1])&&(t[1]=Number(t[1])),f[t[0]]=t[1]}return f},openPopup:function(e,t,n,i){2===arguments.length&&"object"===_typeof(t)&&((i=t).name,t=i.width||600,n=i.height||400);var o,s=(i=m.extend({name:"popupWin",width:t||600,height:n||400,align:"center",resizable:"no",scrollbars:"no"},i)).target||i.name||"popupWin",r="app_, ",a=[];return"center"===i.align&&(o=h.util.popupCoords(i.width,i.height),i.left=o.left,i.top=o.top),delete i.name,delete i.target,delete i.align,h.detect.isSafari&&a.push("location=yes"),h.each(i,function(e,t){a.push(t+"="+e)}),r+=a.join(", "),window.open(e,s,r)},openPopupAndExec:function(e,t,n){var i;if(t=t||{},!1!==(i=this.openPopup(e,t.width,t.height,t))&&n){var o=0,s=function e(){50<o++||(i.document.body?(n&&n(i),i.focus()):setTimeout(e,100))};i.document.body?s():setTimeout(s,100)}},resizeToContent:function(){var e,t,n,i,o=window,s=o.document;o.innerHeight?(e=o.innerWidth,t=o.innerHeight):s.documentElement&&s.documentElement.clientHeight?(e=s.documentElement.clientWidth,t=s.documentElement.clientHeight):s.body&&(e=s.body.clientWidth,t=s.body.clientHeight),n=s.body.offsetWidth,i=s.body.offsetHeight,o.resizeBy(n-e,i-t)},popupCoords:function(e,t){e=e||400,t=t||300;var n="screenLeft"in window?window.screenLeft:screen.left,i="screenTop"in window?window.screenTop:screen.top;return{left:(window.innerWidth||document.documentElement.clientWidth||screen.width)/2-e/2+n,top:(window.innerHeight||document.documentElement.clientHeight||screen.height)/2-t/2+i}},countDownTimer:function(r,e,t){var a,l=t||"dd:hh:mm:ss",d=new Date(e.replace(/([\d]{4})([\d]{2})([\d]{2})([\d]{2})([\d]{2})([\d]{2})/,"$2/$3/$1 $4:$5:$6")),c="";function n(){var e=new Date;if((c=d-e)<0)clearInterval(a);else{var t=Math.floor(c/864e5),n=Math.floor(c%864e5/36e5),i=Math.floor(c%36e5/6e4),o=Math.floor(c%6e4/1e3),s=l.replace(/(dd|hh|mm|ss)/gi,function(e){switch(e){case"dd":return t.zf(2);case"hh":return n.zf(2);case"mm":return i.zf(2);case"ss":return o.zf(2);default:return e}});r.text(s)}}n(),a=setInterval(n,1e3)}})}(window[LIB_NAME],jQuery),function(s,r){for(var t,e=document.querySelector("html"),n=r(window).width(),i=r("html"),o=r.event,a=s.detect.sizes,l=Date.now(),d=o.special.changeSize={setup:function(){r(this).on("resize",d.handler)},teardown:function(){r(this).off("resize",d.handler)},handler:function(e,t){for(var n,i=r(window).width(),o=(s.detect.mediaInfo.mode,0);a[o];o++)if(i>=a[o].min&&i<=a[o].max&&s.detect.mediaInfo.mode!==a[o].mode){n=a[o].mode,e.type="changeSize",r(window).trigger("changeSize",n),s.detect.mediaInfo.mode=a[o].mode;break}}},c=0;a[c];c++)if(n>=a[c].min&&n<=a[c].max){switch(a[c].mode){case"mobile":e.classList.add("mobile");break;case"tablet":e.classList.add("tablet");break;case"web":e.classList.add("web")}s.detect.mediaInfo.mode=a[c].mode;break}r(document).on("scroll.startstop",function(){var e=r(this);100<Date.now()-l&&e.trigger("scrollstart"),l=Date.now(),clearTimeout(t),t=setTimeout(function(){99<Date.now()-l&&e.trigger("scrollend")},100)}),r(window).on("changeSize",function(e,t){for(var n=0;n<a.length;n++)i.removeClass(a[n].mode);i.addClass(t),s.detect.mediaInfo.mode=t}),r.support.transition=s.transitionEnd(),r.support.transition&&(r.event.special.bsTransitionEnd={bindType:r.support.transition.end,delegateType:r.support.transition.end,handle:function(e){if(r(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})}(window[LIB_NAME],jQuery),window[LIB_NAME],jQuery,function(e,o){o(window);var s={scrollWrap:o(document),nav:null,conts:null,conts_pos:[],nav_pos:{},maxHeight:null,durration:200,jumpnav:!1,margin:0,padding:0,openPadding:0,navHeight:null,openText:"더보기",closeText:"닫기",btn:o('<a href="javascript:;" class="btn-more"><i class="icon"></i><span class="hiding" data-hidingText></span></a>'),wrapper:null,openImportant:null,alSize:null},t=e.ui,r=t.Widget,n=r.extend({name:"scrollspy",init:function(e,t){var n=this,i=n.options=o.extend({},s,t);n.element=o(e),n.element.height(n.element.children().height()),r.fn.init.call(n,e,i),n.options.nav=n.element.find(".ui-spynav a"),n.options.conts=[],n.options.btn.find("[data-hidingText]").text(n.options.openText),n.options.maxHeight=o("body").prop("scrollHeight")-o(window).height(),n._getContPos(),null!==n.options.navHeight&&n._setNavHeight(),null!==n.options.alSize&&n.options.nav.length%n.options.alSize!=0&&n._setAlItems(),console.log(),n._bindEvent()},_bindEvent:function(){var n=this,t=n.options.scrollWrap;n.options.btn.on("click",function(){n.spynavToggle()}),o(window).on("load scroll",function(e){n._scrollCheck(t.scrollTop()),n.options.maxHeight=o("body").prop("scrollHeight")-o(window).height(),n._getContPos()}),o(window).on("load resize",function(){n.options.maxHeight=o("body").prop("scrollHeight")-o(window).height(),n._getContPos()}),n.options.nav.on("click",function(e){e.preventDefault(),n._getContPos();var t=o(this).parent().index();return n.options.jumpnav=!0,o("html, body").stop().animate({scrollTop:n.options.conts[t]+1},n.options.durration,function(){n.options.jumpnav=!1,o(window).trigger("scroll")}),!1})},_scrollCheck:function(e){var t,n=this,i=n.options.conts.length;for(t=0;t<i;t++)if(n.options.conts[t]>=e){t-=1;break}n.options.jumpnav||(t==i||n.options.maxHeight<=e?n._activesNav(i-1):0<=t?n._activesNav(t):t<0&&n._activesNav(0)),n._navPos(e)},_navPos:function(e){this.element.offset().top-this.options.margin<=e?this.element.addClass("fixed"):this.element.removeClass("fixed")},_activesNav:function(e){var t=this,n=t.options.nav.parent("li"),i=t.options.nav.parent("li.ui-active").index(),o=n.eq(e).position().top+n.eq(e).height();null!==t.options.navHeight&&o>t.options.navHeight&&!t.element.hasClass("ui-active")?(t.spynavToggle(),t.options.openImportant=!0):t.options.openImportant=!1,i!=e&&-1==i?n.eq(e).addClass("ui-active"):i!=e&&(n.eq(e).addClass("ui-active"),n.eq(i).removeClass("ui-active"))},_getContPos:function(){var t=this;t.options.conts=[],t.options.nav.each(function(e){t.options.conts.push(o(this.hash))});for(var e=0;e<t.options.conts.length;e++){var n=t.options.conts[e].offset().top-t.options.padding;t.options.conts[e]=n}},_setNavHeight:function(){var e=this,t=e.element.find(".ui-spynav");t.outerHeight()>e.options.navHeight&&(e.options.openPadding=t.outerHeight()-e.options.navHeight,t.wrap('<div class="inset"></div>'),e.options.wrapper=e.element.find(".inset"),e.options.wrapper.css({height:e.options.navHeight+"px",overflow:"hidden"}),e.element.children().append(e.options.btn),e.element.height(e.options.navHeight))},_setAlItems:function(){var e=this.options.alSize-this.options.nav.length%this.options.alSize;console.log(e);for(var t="",n=0;n<e;n++)t+='<li role="presentation"></li>';this.element.find(".ui-spynav").append(t)},spynavToggle:function(){var e=this;e.options.openImportant||(e.options.wrapper.height()>e.options.navHeight?(e.options.wrapper.height(e.options.navHeight),e.element.removeClass("ui-active").height(e.options.navHeight),e.options.btn.find("[data-hidingText]").text(e.options.openText),e.options.padding-=e.options.openPadding):(e.options.wrapper.height("auto"),e.element.addClass("ui-active").height(e.options.wrapper.height()),e.options.btn.find("[data-hidingText]").text(e.options.closeText),e.options.padding+=e.options.openPadding),e._getContPos())},reposition:function(){var e=this;e.element.trigger("scroll"),e.options.openImportant=!1,null!==e.options.navHeight&&e.element.hasClass("ui-active")&&e.spynavToggle()}});t.plugin(n)}(window[LIB_NAME],jQuery),function(e,r,a){r(window),Array.prototype.forEach;var o={align:0,activeClass:"ui-active",scrollToShow:1,btnControl:!1},l=".scrollItems",s="ui-active",t=e.detect.isApp,n=e.ui,d=n.Widget,i=d.extend({name:"scrollItems",init:function(e,t){var n=this,i=n.options=r.extend({},o,t);d.fn.init.call(n,e,i),n.element=r(e),n.wrap,n.btns=null,n.index=null,n.activeIndex=0,n.options.activeClass=n.options.activeClass!==a?n.options.activeClass:s,n.options.btnControl&&(n.element.wrap("<div class='ui-scitems-wrap' />"),n.wrap=n.element.closest(".ui-scitems-wrap"),n.wrap.append('<div class="scrollitems-btns">        <button type="button" class="ui-item-control prev-tab"><span>이전</span></button>        <button type="button" class="ui-item-control next-tab"><span>다음</span></button>    </div>'),n.btns=n.wrap.find(".scrollitems-btns"),n.index=0),n._bindEvents()},_bindEvents:function(){var i=this;i.btns&&i.btns.on("click dbclick",".ui-item-control",function(){var e=r(this).hasClass("prev-tab");e&&i.wrap.hasClass("prev-disabled")||!e&&i.wrap.hasClass("next-disabled")||(e?i.index--:i.index++,i.goActive(i.index*i.options.scrollToShow))}),i.element.on("click",".ui-nav",i.activeItem.bind(i)).on("scroll",function(){var e=r(this),t=e.scrollLeft(),n=i.wrap||e;0===t?(console.log("set"),n.addClass("prev-disabled")):Math.round(t+e[0].offsetWidth)>=e[0].scrollWidth?(console.log("end"),n.addClass("next-disabled")):(n.removeClass("prev-disabled"),n.removeClass("next-disabled"))}).on("touchstart",function(){t&&window.AndroidJS!==a&&window.AndroidJS.setPagingDrag("false")}).on("touchend",function(){t&&window.AndroidJS!==a&&window.AndroidJS.setPagingDrag("true")}).trigger("scroll"),setTimeout(function(){var e=r.Event("init"+l,{relatedTarget:i.element.find(".ui-nav."+s)});i.element.trigger(e),i.initActiveItem()},0)},activeItem:function(e){var t=r(e.currentTarget),n=e.type,i=r.Event("active"+l,{relatedTarget:t});t.activeItem(this.options.activeClass),this.element.trigger(i),this.options.btnControl||this.goActive(t.index(),n)},initActiveItem:function(){var e=this,t=e.element.find(".ui-nav."+s).index();t<0||(e.options.btnControl?(t=parseInt(t/e.options.scrollToShow),e.goActive(t*e.options.scrollToShow),e.index=t):(e.goActive(t),e.activeIndex=t))},goActive:function(e,t){var n=this,i=n.element.find(".ui-nav").eq(e),o=r.Event("scrollEnd"+l,{relatedTarget:i});if(n.activeIndex==i.index()||n.btns){if(!n.btns&&t===a)return}else n.activeIndex=e;"number"==typeof n.options.align?n.options.padding=i.outerWidth()*n.options.align:"string"==typeof n.options.align&&("center"===n.options.align?n.options.padding=n.element.outerWidth()/2-i.outerWidth()/2:n.options.align);var s=i.position().left+n.element.scrollLeft()-n.options.padding;n.element.stop().animate({scrollLeft:s},300,function(){n.element.trigger(o)})}});n.plugin(i)}(window[LIB_NAME],jQuery),function(u,p){var o={activeClass:"ui-active",subMenuCheckClass:"hasSub",activeGnb:null,DURATIONS:500},e=p(document),t=(Array.prototype.forEach,p(window)),n=(Object.prototype.hasOwnProperty,u.ui),s=n.Widget,i={slick:{el:"[data-modules-slick]",name:"slick",default:{arrows:!0,dots:!0,infinite:!1}},scrollspy:{el:"[data-modules-scrollspy]",name:"scrollspy"}},r=s.extend({name:"commonUi",init:function(e,t){var n=this,i=n.options=p.extend({},o,t);n.element=p(e),s.fn.init.call(n,e,i),n.options.progressBar=p("#progressBar"),n.mediaInfo=u.detect.mediaInfo.mode,n._bindEvents(),n.currentImgLoaded(n.mediaInfo),n.initLibray(),n.fullScreenEl={}},_bindEvents:function(){var i=this;t.on("changeSize",function(e,t){i.mediaInfo=t,i.currentImgLoaded(t)}),t.on("load",function(e){i.initLibray()}),i.element.on("click","#bgDim",function(e){var t=p(this).data("callFn"),n=p("[data-fn-layer]."+i.options.activeClass);if(!t)return u.ui.hideDim(),!1;i["hide"+t](e,n)}),p("[data-alink-inner]").on("click",function(e){var t=p(this).data("alinkInner");if(0!==p(e.target).closest("."+t).length)return alert("자세히 보기"),!1}),p(document).on("click","[data-btn-top]",function(e){e.preventDefault(),p(document).scrollTop(0)}),e.on("click","[data-fn-layer]",function(e){e.preventDefault();var t=p(this),n=t.data("fnLayer");i[n](e,t)}),p(window).on("mousewheel.banner",function(e){var t=e.wheelDelta?evt.wheelDelta/10:e.originalEvent.detail||e.originalEvent.deltaY,n=p(this).scrollTop(),i=p("[data-modules-scrollspy]").offset().top,o=!1;0<t&&n<i-10&&!o&&p("html, body").stop().animate({scrollTop:i},500,function(){o=!1})})},initLibray:function(){var e=i;p("#stickyTab");for(var t in e)e.hasOwnProperty(t)&&this.setOptions(e[t]);return this},initLibrary:function(){this.initLibray()},setOptions:function(l){var e=p(l.el),d=l.default,c=l.name;e.each(function(){var e,t,n=p(this),i=(n=p(this),p.extend({},d)),o=n.attr("data-modules-"+l.name),s=""!==o?p.extend(i,u.util.cssLiteralToObject(o)):i,r=u.detect.mediaInfo.mode,a=!s.hasOwnProperty("enableMode")||(e=r,t=null===(t=s.enableMode)||-1!==t.indexOf(e));n.parents("pre").length||!a||n.data("active")||(n[c](s),n.data("active",!0))})},currentImgLoaded:function(n){[].slice.call(document.querySelectorAll(".current_img")).forEach(function(e){var t=e.dataset[n]||e.dataset.src;e.setAttribute("src",t)})}});n.plugin(r),document.addEventListener("DOMContentLoaded",function(){p("body").commonUi(),console.log("commonUi")})}(window[LIB_NAME],jQuery);
//# sourceMappingURL=uiframework.js.map
