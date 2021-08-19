/*!
 * @author ...
 * @description hmall 코어 라이브러리
 */
;(function(global, $, undefined){
    "use strict";
    // 기본 해상도 분기
    var DEFAULT_SCREEN_SIZE = [
        {
            mode: 'mobile',
            min: 0,
            max: 767
        },
        {
            mode: 'tablet',
            min: 768,
            max: 1024
        },
        {
            mode: 'web',
            min: 1025,
            max: 3840
        }
    ];
    global.LIB_NAME = 'UI';
    var LIB_NAME = global.LIB_NAME || 'UI',
        doc = global.document,
        extend = $.extend,
        proxy = $.proxy,
        $win = $(window),
        arrayProto = Array.prototype,
        objectProto = Object.prototype,
        objectString = objectProto.toString,
        hasOwn = objectProto.hasOwnProperty,
        arraySlice = arrayProto.slice,
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean",
        UNDEFINED = "undefined",
        slice = [].slice,
        tmpInput = doc.createElement('input'),
        supportPlaceholder = ('placeholder' in tmpInput),
        isMobile = ('orientation' in global) || global.IS_MOBILE === true;
    if (global[LIB_NAME]) return;
	var core = global[LIB_NAME] || (global[LIB_NAME] = {});
    function Class() {}
    function isArray(it) {
        return objectString.call(it) === '[object Array]';
    }
    if(!String.prototype.replaceAll){
        String.prototype.replaceAll = function(org, dest) {
            return this.split(org).join(dest);
        }
    }
    Class.extend = function(proto) {
        var base = function() {},
            member,
            _ = this,
            subclass = proto && proto.init ? proto.init : function () {
                _.apply(this, arguments);
            },
            fn;

        base.prototype = _.prototype;
        fn = subclass.fn = subclass.prototype = new base();

        for (member in proto) {
            if (proto[member] != null && proto[member].constructor === Object) {
                // Merge object members
                fn[member] = extend(true, {}, base.prototype[member], proto[member]);
            } else {
                fn[member] = proto[member];
            }
        }

        fn.constructor = subclass;
        subclass.extend = _.extend;

        return subclass;
    };

    Date.prototype.format = function (f) {
        if (!this.valueOf()) return " ";
        var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
        var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var d = this;

        return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear(); // 년 (4자리)
                case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
                case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
                case "dd": return d.getDate().zf(2); // 일 (2자리)
                case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
                case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
                case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
                case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
                case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
                case "mm": return d.getMinutes().zf(2); // 분 (2자리)
                case "ss": return d.getSeconds().zf(2); // 초 (2자리)
                case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
                default: return $1;
            }
        });
    };
    String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
    String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
    Number.prototype.zf = function (len) { return this.toString().zf(len); };
    /**
     * core 하위에 name에 해당하는 네임스페이스를 생성하여 object를 설정해주는 함수
     *
     * @function
     * @name ui.addon
     *
     * @param {string} name .를 구분자로 해서 core을 시작으로 하위 네임스페이스를 생성. name이 없으면 core에 추가된다.
     * @param {Object|Function} obj
     *
     * @example
     * vcui.addon('urls', {
     *    store: 'Store',
     *    company: 'Company'
     * });
     */
    var addon = function (name, object, isExecFn) {
        if (typeof name !== 'string') {
            object = name;
            name = '';
        }

        var root = core,
            names = name ? name.split('.') : [],
            ln = names.length - 1,
            leaf = names[ln];

        if (isExecFn !== false && typeof object === 'function' && !hasOwn.call(object, 'superClass')) {
            object = object.call(root);
        }

        for (var i = 0; i < ln; i++) {
            root = root[names[i]] || (root[names[i]] = {});
        }

        return (leaf && (root[leaf] ? extend(root[leaf], object) : (root[leaf] = object))) || extend(root, object), object;
    },
    _bindType = function (name) {
        return function (val) {
            return isType(val, name);
        };
    },
    isType = function (value, typeName) {
        var isGet = arguments.length === 1;

        function result(name) {
            return isGet ? name : typeName === name;
        }

        if (value === null) {
            return result('null');
        }

        if (typeof value === undefined) {
            return 'undefined'
        }

        if (value && value.nodeType) {
            if (value.nodeType === 1 || value.nodeType === 9) {
                return result('element');
            } else if (value && value.nodeType === 3 && value.nodeName === '#text') {
                return result('textnode');
            }
        }

        if (typeName === 'object' || typeName === 'json') {
            return isGet ? 'object' : isPlainObject(value);
        }

        var s = toString.call(value),
            type = s.match(/\[object (.*?)\]/)[1].toLowerCase();

        if (type === 'number') {
            if (isNaN(value)) {
                return result('nan');
            }
            if (!isFinite(value)) {
                return result('infinity');
            }
            return result('number');
        }

        return isGet ? type : type === typeName;
    },
    each = function (obj, iterater, ctx) {
        if (!obj) {
            return obj;
        }
        var i = 0,
            len = 0,
            isArr = isArray(obj);

        if (isArr) {
            // 배열
            for (i = 0, len = obj.length; i < len; i++) {
                if (iterater.call(ctx || obj, obj[i], i, obj) === false) {
                    break;
                }
            }
        } else {
            // 객체체
            for (i in obj) {
                if (hasOwn.call(obj, i)) {
                    if (iterater.call(ctx || obj, obj[i], i, obj) === false) {
                        break;
                    }
                }
            }
        }
        return obj;
    },

    /**
     * @readonly
     * @name core.detect
     * @enum {*}
     * @property {boolean} mediaInfo // 현재 해상도별 구분 객체
     * @property {boolean} isTouch // 터치디바이스 여부
     * @property {boolean} isRetina // 레티나 여부
     * @property {boolean} isMobile // orientation 작동여부로 판단
     * @property {boolean} isMac // 맥OS
     * @property {boolean} isLinux // 리눅스
     * @property {boolean} isWin // 윈도우즈
     * @property {boolean} is64Bit // 64비트 플랫폼
     * @property {boolean} isIE // IE
     * @property {boolean} ieVersion // IE의 버전
     * @property {boolean} isOpera // 오페라
     * @property {boolean} isChrome // 크롬
     * @property {boolean} isSafari // 사파리
     * @property {boolean} isWebKit // 웹킷
     * @property {boolean} isGecko // 파이어폭스
     * @property {boolean} isIETri4 // IE엔진
     * @property {boolean} isAir // 어도비 에어
     * @property {boolean} isIOS // 아이폰, 아이패드
     * @property {boolean} isAndroid // 안드로이드
     * @property {number} iosVersion // ios 버전 : [8, 1, 0] -> [major, minor, revision]
     * @property {number} androidVersion // android 버전 : [4, 1, 0] -> [major, minor, revision]
     * @example
     * if(core.browser.isIE && core.browser.isVersion < 9) {
     *     alert('구버전을 사용하고 있습니다.');
     * }
     */
    detect = (function() {
        var detect = {},
            win = global,
            na = win.navigator,
            ua = na.userAgent,
            lua = ua.toLowerCase(),
            match;
        detect.mediaInfo = function(){};
        detect.mediaInfo.mode = null;
        detect.sizes = DEFAULT_SCREEN_SIZE;
        detect.placeholder = supportPlaceholder;
        detect.isStrict = (typeof global == 'undefined');

        detect.isRetina = 'devicePixelRatio' in global && global.devicePixelRatio > 1;
        detect.isAndroid = lua.indexOf('android') !== -1;
        detect.isBadAndroid = /Android /.test(na.appVersion) && !(/Chrome\/\d/.test(na.appVersion));
        detect.isOpera = !!(win.opera && win.opera.buildNumber);
        detect.isWebKit = /WebKit/.test(ua);
        detect.isTouch = !!('ontouchstart' in global);
        detect.isMobileDevice = ('ontouchstart' in win) || win.DocumentTouch && document instanceof DocumentTouch || na.msMaxTouchPoints || false;

        match = /(msie) ([\w.]+)/.exec(lua) || /(trident)(?:.*rv.?([\w.]+))?/.exec(lua) || ['', null, -1];
        detect.isIE = !detect.isWebKit && !detect.isOpera && match[1] !== null;
        detect.version = detect.ieVersion = parseInt(match[2], 10);
        detect.isOldIE = detect.isIE && detect.version < 9;

        detect.isWin = (na.appVersion.indexOf("Win") != -1);
        detect.isMac = (ua.indexOf('Mac') !== -1);
        detect.isLinux = (na.appVersion.indexOf("Linux") != -1);
        detect.is64Bit = (lua.indexOf('wow64') > -1 || (na.platform === 'Win64' && lua.indexOf('x64') > -1));

        detect.isChrome = (ua.indexOf('Chrome') !== -1);
        detect.isGecko = (ua.indexOf('Firefox') !== -1);
        detect.isAir = ((/adobeair/i).test(ua));
        detect.isIOS = /(iPad|iPhone)/.test(ua);
        detect.isSafari = !detect.isChrome && (/Safari/).test(ua);
        detect.isIETri4 = (detect.isIE && ua.indexOf('Trident/4.0') !== -1);
        detect.isGalaxy = (ua.indexOf(' SHV-') !== -1);

        detect.msPointer = !!(na.msPointerEnabled && na.msMaxTouchPoints && !win.PointerEvent);
        detect.pointer = !!((win.PointerEvent && na.pointerEnabled && na.maxTouchPoints) || detect.msPointer);

        // 앱 케이스 추가
        detect.isApp = (win.appYn !== undefined) ? win.appYn : null;
        detect.isAppType = (win.appOpsyNm !== undefined ) ? win.appOpsyNm : null;

        if (detect.isAndroid) {
            detect.androidVersion = function() {
                var v = ua.match(/[a|A]ndroid[^\d]*(\d+).?(\d+)?.?(\d+)?/);
                if (!v) {
                    return -1;
                }
                return [parseInt(v[1] | 0, 10), parseInt(v[2] | 0, 10), parseInt(v[3] | 0, 10)];
            }();
        } else if (detect.isIOS) {
            detect.iosVersion = function() {
                var v = ua.match(/OS (\d+)_?(\d+)?_?(\d+)?/);
                return [parseInt(v[1] | 0, 10), parseInt(v[2] | 0, 10), parseInt(v[3] | 0, 10)];
            }();
        }

        detect.isMobile = isMobile || detect.isIOS || detect.isAndroid;
        
        return detect;
    }()),
    transitionEnd = function() {
        var el = document.createElement('div')
    
        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }
    
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }
    
        return false
    };

    extend(core, {
        name: LIB_NAME,
        DEFAULT_SCREEN_SIZE : DEFAULT_SCREEN_SIZE,
        version: '0.7.0',
        noop: function() {},
        emptyFn: function() {},
        widgets : core.widgets || [],
        _widgetRegisteredCallbacks: [],
        ui : core.ui || {},
        Class : Class,
        addon : addon,
        detect : detect,
        prefix : '.hui',
        transitionEnd : transitionEnd,
        each : each,
        isType : isType,
        isArray: _bindType('array'),
        userScreenControl : false   // 사용자 화면 조작중 체크, 전역
    });
    extend($.fn, {
        handler: function(handler) {
            this.data("handler", handler);
            return this;
        },
        emulateTransitionEnd : function (duration) {
            var called = false
            var $el = this
            $(this).one('bsTransitionEnd', function () { called = true })
            var callback = function () { if (!called) $($el).trigger($.support.transition.end);}
            setTimeout(callback, duration);
            return this;
        },
        /**
         * 클래스 치환
         * @function
         * @name $#replaceClass
         * @param {string} old 대상클래스
         * @param {string} newCls 치환클래스
         * @return {jQuery}
         */
        replaceClass : function (old, newCls) {
            return this.each(function () {
                $(this).removeClass(old).addClass(newCls);
            });
        },
        /**
         * 같은 레벨에 있는 다른 row에서 on를 제거하고 현재 row에 on 추가
         * @function
         * @name $#activeItem
         * @param {string} className='on' 활성 클래스명
         * @return {jQuery}
         */
        activeItem : function (className, isActive) {
            className = className || 'on';
            if (typeof isActive === 'undefined') {
                isActive = true;
            }
            return this.toggleClass(className, isActive).siblings().toggleClass(className, !isActive).end();
        },
        /**
         * 해당 이미지가 로드됐을 때 콜백함수 실행
         * @function
         * @name $#onImgLoaded
         * @param {function(width:Number, height:Number)} callback width, height 인자를 갖는 콜백함수
         * @return {jQuery}
         */
        onImgLoaded : function (callback) {
            core.util.waitImageLoad(this).done(callback);
            return this;
        },

        /**
         * 비동기 방식으로 이미지 사이즈를 계산해서 콜백함수로 넘겨준다.
         * @function
         * @name $#getImgSize
         * @param {function(width:Number, height:Number)} cb width, height 인자를 갖는 콜백함수
         * @return {jQuery}
         */
        getImgSize : function (cb) {
            var $img = this.eq(0);
            $img.onImgLoaded(function () {
                cb && cb.call($img[0], $img.css('width', '').width(), $img.css('height', '').height());
            });
            return this;
        }
    });
    var Observable = Class.extend({
        init: function() {
            this._events = {};
        },

        bind: function(eventName, handlers, one) {
            var _ = this,
                idx,
                eventNames = typeof eventName === STRING ? [eventName] : eventName,
                length,
                original,
                handler,
                handlersIsFunction = typeof handlers === FUNCTION,
                events;

            if (handlers === undefined) {
                for (idx in eventName) {
                    _.bind(idx, eventName[idx]);
                }
                return _;
            }

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = handlersIsFunction ? handlers : handlers[eventName];

                if (handler) {
                    if (one) {
                        original = handler;
                        handler = function() {
                            _.unbind(eventName, handler);
                            original.apply(_, arguments);
                        };
                        handler.original = original;
                    }
                    events = _._events[eventName] = _._events[eventName] || [];
                    events.push(handler);
                }
            }

            return _;
        },

        one: function(eventNames, handlers) {
            return this.bind(eventNames, handlers, true);
        },

        first: function(eventName, handlers) {
            var _ = this,
                idx,
                eventNames = typeof eventName === STRING ? [eventName] : eventName,
                length,
                handler,
                handlersIsFunction = typeof handlers === FUNCTION,
                events;

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = handlersIsFunction ? handlers : handlers[eventName];

                if (handler) {
                    events = _._events[eventName] = _._events[eventName] || [];
                    events.unshift(handler);
                }
            }

            return _;
        },

        trigger: function(eventName, e) {
            var _ = this,
                events = _._events[eventName],
                idx,
                length;

            if (events) {
                e = e || {};

                e.sender = _;

                e._defaultPrevented = false;

                e.preventDefault = preventDefault;

                e.isDefaultPrevented = isDefaultPrevented;

                events = events.slice();

                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].call(_, e);
                }

                return e._defaultPrevented === true;
            }

            return false;
        },

        unbind: function(eventName, handler) {
            var _ = this,
                events = _._events[eventName],
                idx;

            if (eventName === undefined) {
                _._events = {};
            } else if (events) {
                if (handler) {
                    for (idx = events.length - 1; idx >= 0; idx--) {
                        if (events[idx] === handler || events[idx].original === handler) {
                            events.splice(idx, 1);
                        }
                    }
                } else {
                    _._events[eventName] = [];
                }
            }

            return _;
        }
    });

    var Widget = Observable.extend( {
        init: function(element, options) {
            var _ = this;
            _.element = $(element).handler(_);
            
            Observable.fn.init.call(_);

            var dataSource = options ? options.dataSource : null;
            var props;

            if (options) {
                props = (_.componentTypes || {})[(options || {}).componentType];
            }
            if (dataSource) {
                // avoid deep cloning the data source
                options = extend({}, options, { dataSource: {} });
            }

            options = _.options = extend(true, {}, _.options, _.defaults, props || {}, options);

            if (dataSource) {
                options.dataSource = dataSource;
            }

            _.element.data(options.name, _);

            _.bind(_.events, options);
        },

        events: [],

        options: {
            prefix: ""
        },

        _hasBindingTarget: function() {
            return !!this.element[0].bindingTarget;
        },

        _tabindex: function(target) {
            target = target || this.wrapper;

            var element = this.element,
                TABINDEX = "tabindex",
                tabindex = target.attr(TABINDEX) || element.attr(TABINDEX);

            element.removeAttr(TABINDEX);

            target.attr(TABINDEX, !isNaN(tabindex) ? tabindex : 0);
        },

        setOptions: function(options) {
            this._setEvents(options);
            $.extend(this.options, options);
        },

        _setEvents: function(options) {
            var _ = this,
                idx = 0,
                length = _.events.length,
                e;

            for (; idx < length; idx ++) {
                e = _.events[idx];
                if (_.options[e] && options[e]) {
                    _.unbind(e, _.options[e]);
                    if (_._events && _._events[e]) {
                        delete _._events[e];
                    }
                }
            }

            _.bind(_.events, options);
        },

        resize: function(force) {
            console.log(0)
            var size = this.getSize(),
                currentSize = this._size;
                
            if (force || (size.width > 0 || size.height > 0) && (!currentSize || size.width !== currentSize.width || size.height !== currentSize.height)) {
                this._size = size;
                this._resize(size, force);
                this.trigger("resize", size);
            }
        },

        getSize: function() {
            return core.dimensions(this.element);
        },

        size: function(size) {
            if (!size) {
                return this.getSize();
            } else {
                this.setSize(size);
            }
        },

        setSize: $.noop,
        _resize: $.noop,

        destroy: function() {
            var _ = this;

            _.element.removeData(_.options.prefix + _.options.name);
            _.element.removeData("handler");
            _.unbind();
        },
        _destroy: function() {
            this.destroy();
        }
    });
    extend(core.ui, {
        Widget: Widget,
        Observable : Observable,
        roles: {},
        plugin: function(widget, register, prefix) {
            var name = widget.fn.name;
            register = register || core.ui;
            prefix = prefix || "";
            register[name] = widget;

            register.roles[name.toLowerCase()] = widget;
            var widgetEntry = { name: name, widget: widget, prefix: prefix || "" };
            core.widgets.push(widgetEntry);
            for (var i = 0, len = core._widgetRegisteredCallbacks.length; i < len; i++) {
                core._widgetRegisteredCallbacks[i](widgetEntry);
            }

            $.fn[name] = function(options) {
                var value = this,
                    args;
                if (typeof options === STRING) {
                    this.each(function(){
                        var widget = $.data(this, name),
                            method,
                            result;
                        method = widget[options];
                        result = method.apply(widget, args);
                    });
                } else {
                    this.each(function() {
                        var $this = $(this)
                        var data  = $this.data(name)
                        if (!data) $this.data(name, (data = new widget(this, options)))
                    });
                }
                return value.data(name);
            };
            $.fn[name].Constructor = widget;
        },
        getNext : function(el, className){
            var checkTarget,
                loop = true,
                checkElement = el,
                checkClass = className;
            do {
                if(checkElement.localName == "body"){
                    // throw new Error(checkClass + "클래스를 찾지 못하였습니다");
                    return null;
                }
                checkTarget = checkElement.nextElementSibling;
                if(checkTarget && checkTarget.classList.contains(checkClass)){
                    loop = false;
                }else{
                    checkElement = checkElement.parentNode;
                }
            } while (loop);
            return {
                el : checkElement,
                trigger : checkTarget
            }; 
        },
        /**
         * 딤 생성
         * @param STRING
         */
        showDim : function(target){
            var root = $('body'),
                targetName = target || '',
                dim = $('<div id="bgDim" class="cm-dim">');
            if(target) dim.attr('data-call-fn', targetName)
            root.append(dim);
            setTimeout(function() {
                dim.addClass('hidden');
				root.addClass('hidden');
            }, 0)
        },
        /**
         * 딤 제거
         * @param $el
         */
		hideDim : function(){
			var root = $('body');
			root.removeClass('hidden');
            setTimeout(function() {
                $('#bgDim').remove();
            }, 0)
        },
        /**
         * 스크롤이벤트 무효화
         * @param $el
         */
        disableScroll: function ($el) {
            $el = $el || $win;

            var scrollTop = $el.scrollTop();
            $el.on("scroll.disableScroll mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function (event) {
                event.preventDefault();
                $el.scrollTop(scrollTop);
            });
        },

        /**
         * 스크롤이벤트 무효화 취소
         * @param $el
         */
        enableScroll: function ($el) {
            $el = $el || $win;

            $el.off(".disableScroll");
        },
        /**
         * 모듈 리프레쉬
         * @param $el
         */
        modulesRefresh : function(el){
            var wrap = el;
            setTimeout(function(){  
                if( wrap.find('[data-modules-moreview]').length > 0 ){
                    wrap.find('[data-modules-moreview]').moreview('create');
                }
                if(wrap.find('[data-modules-cascadingGrid]').length !== 0){
                    wrap.find('[data-modules-cascadingGrid]').cascadingGrid('mount')
                }

                if(wrap.find('[data-modules-slick]').length !== 0){
                    wrap.find('[data-modules-slick]').slick('setPosition');
                }
                if(wrap.find('[data-modules-sticky]').length !== 0){
                    wrap.find('[data-modules-sticky]').sticky('posRefresh');
                }
            }, 0)
        }

        
    });
})(window, jQuery);

/**
 * @util 유틸함수 모음
 */
;(function(core, $, undefined){
    "use strict";
    var ampRegExp = /&/g,
        ltRegExp = /</g,
        quoteRegExp = /"/g,
        aposRegExp = /'/g,
        gtRegExp = />/g;
    core.addon('util', /** @lends UI.util */{
        /**
         * @param  {str} 문자열을 JSON형식의 데이터로 치환
         */
        stringToObject : function (str){
            if (typeof str === "object") return str;
            var str = str.replace(/\s/g, '');
            var obj;
            obj = JSON.parse(str);
            return obj;
        },
        /**
         * @param  {value} html 인코딩
         */
        htmlEncode : function (value) {
            return ("" + value).replace(ampRegExp, "&amp;").replace(ltRegExp, "&lt;").replace(gtRegExp, "&gt;").replace(quoteRegExp, "&quot;").replace(aposRegExp, "&#39;");
        },
        /**
         * 
         * @param {object} element 면적을 구할 엘리먼트
         * @param {*} dimensions 
         */
        dimensions : function(element, dimensions) {
            var domElement = element[0];
        
            if (dimensions) {
                element.css(dimensions);
            }
        
            return { width: domElement.offsetWidth, height: domElement.offsetHeight };
        },
        /**
         * 
         * @param {string} str css 리터럴문자열
         */
        cssLiteralToObject : function(str){
            var strValue = str, arr = strValue.split(';'), i = arr.length-1, obj = {},objArr,objFirst,objLast,objName,objProp,arrFirst,arrLast,firstStr, lastStr;
            for ( ; i >= 0; i--) {
                if(arr[i] !== ""){
                    
                    if( arr[i].indexOf('{') !== -1 || arr[i].indexOf('}') !== -1 || arr[i].indexOf('[') !== -1 || arr[i].indexOf(']') !== -1 ){
                        objFirst = arr[i].indexOf('{');
                        objLast = arr[i].lastIndexOf('}');
                        arrFirst = arr[i].indexOf('[');
                        arrLast = arr[i].lastIndexOf(']');
                        firstStr = arr[i].indexOf(':');
                        if(objFirst > arrFirst && arrFirst !== -1 ){
                            lastStr = arrLast;
                        }else if(objFirst < 0 && arrFirst > 0){
                            lastStr = arrLast;
                        }else{
                            lastStr = objLast;
                        }
                        objName = arr[i].slice(0, firstStr);
                        objProp = arr[i].slice(firstStr+1, lastStr+1).replaceAll('\'', '\"');

                        console.log(objProp);


                        obj[objName] = core.util.stringToObject(objProp);
                    }else{
                        objArr = arr[i].replaceAll(" ", "").split(':');
                        if(objArr.length !== 2 || objArr[1] == "" ){
                            throw new Error('옵션값이 잘못되었습니다.\n 잘못 전달된 옵션 속성 : '+strValue);
                        }
                        if(objArr[1].indexOf('true') !== -1 || objArr[1].indexOf('false') !== -1){
                            objArr[1] = objArr[1] === 'true';
                            // console.log(objArr[1])
                        }else if($.isNumeric(objArr[1])){
                            objArr[1] = Number(objArr[1]);
                        }
                        obj[objArr[0]] = objArr[1];
                    }
                }
            }
            return obj
        },
         /**
         * 팝업을 띄우는 함수
         * @param {string} url 주소
         * @param {Number=} width 너비. 또는 옵션
         * @param {Number=} height 높이.
         * @param {opts=} 팝업 창 모양 제어 옵션.(커스텀옵션: name(팝업이름), align(=center, 부모창의 가운데에 띄울것인가),
         * @example
         * UI.openPopup('http://google.com', 500, 400, {name: 'notice', align: null, scrollbars: 'no'});
         * //or
         * UI.openPopup('http://google.com', {name: 'notice', width: 500, height: 400, scrollbars: 'no'});
         */
        openPopup: function (url, width, height, opts) {
            var opts, name, width, height;
            if (arguments.length === 2 && typeof width === 'object') {
                opts = width;
                name = opts.name || 'popupWin';
                width = opts.width || 600;
                height = opts.height || 400;
                
            }

            opts = $.extend({
                name: 'popupWin',
                width: width || 600,
                height: height || 400,
                align: 'center',
                resizable: 'no',
                scrollbars: 'no'
            }, opts);

            var target = opts.target || opts.name || 'popupWin',
                feature = 'app_, ',
                tmp = [],
                winCoords;

            if (opts.align === 'center') {
                
                winCoords = core.util.popupCoords(opts.width, opts.height);
                opts.left = winCoords.left;
                opts.top = winCoords.top;
            }
            delete opts.name;
            delete opts.target;
            delete opts.align;

            core.detect.isSafari && tmp.push('location=yes');
            core.each(opts, function (val, key) {
                tmp.push(key + '=' + val);
            });
            feature += tmp.join(', ');

            var popupWin = window.open(url, target, feature);
            /*if (!popupWin || popupWin.outerWidth === 0 || popupWin.outerHeight === 0) {
                alert("팝업 차단 기능이 설정되어 있습니다\n\n차단 기능을 해제(팝업허용) 한 후 다시 이용해 주세요.");
                return false;
                }

                if (popupWin.location.href === 'about:blank') {
                popupWin.location.href = url;
                }*/

            return popupWin;
        },

        /**
         * 팝업을 띄운 후에 주어진 콜백함수를 호출
         * @param {string} url 주소
         * @param {object} feature 팝업 모양 (커스텀옵션: name(팝업이름), align(=center: 부모창의 가운데에 띄울것인가),
         * @param {function()} (Optional) callback 띄워진 후에 실행할 콜백함수
         * @example
         * UI.util.openPopupAndExec('http://google.com', {name: 'notice', width: 500, height:400, align: 'nw'}, function(popup){
         *     alert('팝업이 정상적으로 띄워졌습니다.');
         *     popup.close(); // 열자마자 닫아버림....:-b
         * });
         */
        openPopupAndExec: function (url, feature, callback) {
            feature || (feature = {});

            var popupWin;

            if ((popupWin = this.openPopup(url, feature.width, feature.height, feature)) === false) {
                return;
            }
            if (!callback) {
                return;
            }

            var limit = 0, // 5초 이내에 팝업이 로딩안되면 콜백함수 무시해버림
                fn = function () {
                    if (limit++ > 50) {
                        return;
                    }
                    if (!popupWin.document.body) {
                        setTimeout(fn, 100);
                        return;
                    }
                    callback && callback(popupWin);
                    popupWin.focus();
                };

            if (!popupWin.document.body) {
                setTimeout(fn, 100);
            } else {
                fn();
            }
        },


        /**
         * 컨텐츠 사이즈에 맞게 창사이즈를 조절
         * @example
         * UI.util.resizeToContent(); // 팝업에서만 사용
         */
        resizeToContent: function () {
            var innerX, innerY,
                pageX, pageY,
                win = window,
                doc = win.document;

            if (win.innerHeight) {
                innerX = win.innerWidth;
                innerY = win.innerHeight;
            } else if (doc.documentElement && doc.documentElement.clientHeight) {
                innerX = doc.documentElement.clientWidth;
                innerY = doc.documentElement.clientHeight;
            } else if (doc.body) {
                innerX = doc.body.clientWidth;
                innerY = doc.body.clientHeight;
            }

            pageX = doc.body.offsetWidth;
            pageY = doc.body.offsetHeight;

            win.resizeBy(pageX - innerX, pageY - innerY);
        },

        /**
         * 팝업의 사이즈에 따른 화면상의 중앙 위치좌표를 반환
         * @param {number} w 너비.
         * @param {number} h 높이.
         * @return {{left:Number, top:Number}} {left: 값, top: 값}
         */
        popupCoords: function (w, h) {
            w = w || 400;
            h = h || 300;

            var dualScreenLeft = 'screenLeft' in window ? window.screenLeft : screen.left,
                dualScreenTop = 'screenTop' in window ? window.screenTop : screen.top,
                width = window.innerWidth || document.documentElement.clientWidth || screen.width,
                height = window.innerHeight || document.documentElement.clientHeight || screen.height,
                left = ((width / 2) - (w / 2)) + dualScreenLeft,
                top = ((height / 2) - (h / 2)) + dualScreenTop;

            return {
                left: left,
                top: top
            };
        },

        /**
         * 주어진 시간과 남은 시간의 차이를 반환\
         * @param {element} 적용될 엘리먼트
         * @param {string} '20201010125900' 형식의 남은 시간 문자열
         * @param {format} 'dd, HH, mm, ss' 일, 시, 분, 초 의 포멧
         */
        countDownTimer: function (target, end, fm) {
            var format = fm || 'dd:hh:mm:ss',
                endTime = new Date(end.replace(/([\d]{4})([\d]{2})([\d]{2})([\d]{2})([\d]{2})([\d]{2})/, '$2/$3/$1 $4:$5:$6')),
                distance="",
                _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24,
                timer;
            function showRemaining(){
                var now = new Date();
                distance = endTime - now;
                if(distance<0){
                    clearInterval(timer);
                    return;
                } 
                var days = Math.floor(distance / _day),
                    hours = Math.floor((distance % _day) / _hour),
                    minutes = Math.floor((distance % _hour) / _minute),
                    seconds = Math.floor((distance % _minute) / _second),
                    result = format.replace(/(dd|hh|mm|ss)/gi, function ($1) {
                        switch ($1) {
                            case "dd": return days.zf(2);
                            case "hh": return hours.zf(2);
                            case "mm": return minutes.zf(2);
                            case "ss": return seconds.zf(2);
                            default: return $1;
                        }
                    });
                // console.log(result);
                target.text(result)
            };
            showRemaining();
            timer = setInterval(showRemaining, 1000)
        }
    });
})(window[LIB_NAME], jQuery);

/**
 * 
 * @events 이벤트
 */
;(function(core, $, undefined){
    "use strict";
	var r = document.querySelector('html'),
		w = $(window).width(),
		$html = $('html'),
		$event = $.event,
		$special,
        sizes = core.detect.sizes,
        lastScrollAt = Date.now(),
        timeout,
        scrollStartStop = function() {
			var $this = $(this)
			
			if (Date.now() - lastScrollAt > 100) $this.trigger('scrollstart')
				
			lastScrollAt = Date.now()
			
			clearTimeout(timeout)
			
			timeout = setTimeout(function() {
				if (Date.now() - lastScrollAt > 99) $this.trigger('scrollend')
			}, 100)
		},
		$special = $event.special.changeSize = {
			setup: function() {
				$( this ).on( "resize", $special.handler );
			},
			teardown: function() {
				$( this ).off( "resize", $special.handler );
			},
			handler: function( event, execAsap ) {
				var context = this,
					w = $(window).width(),
					mode = core.detect.mediaInfo.mode,
					dispatch = function(mode) {
						event.type = "changeSize";
						$(window).trigger('changeSize', mode);
					};
				for (var i = 0; sizes[i]; i++) {
					if (w >= sizes[i].min && w <= sizes[i].max && core.detect.mediaInfo.mode !== sizes[i].mode) {
						dispatch(sizes[i].mode);
						core.detect.mediaInfo.mode = sizes[i].mode;
						break;
					}
				}
			}
		};
	for (var i = 0; sizes[i] ; i++) {
		if (w >= sizes[i].min && w <= sizes[i].max) {
			switch (sizes[i].mode) {
				case 'mobile':
					r.classList.add('mobile')
					break;
				case 'tablet':
					r.classList.add('tablet')
					break;
				case 'web':
					r.classList.add('web')
					break;
			}
			core.detect.mediaInfo.mode = sizes[i].mode;
			break;
		}
    }
    $(document).on('scroll.startstop', scrollStartStop)
	$(window).on('changeSize', function(e, mode){
		for (var i = 0; i < sizes.length; i++) {
			$html.removeClass(sizes[i].mode);
		}
		$html.addClass(mode);
		core.detect.mediaInfo.mode = mode;
	})

	// transition end event
	$.support.transition = core.transitionEnd()
    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
		bindType: $.support.transition.end,
		delegateType: $.support.transition.end,
		handle: function (e) {
			if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
		}
    }
})(window[LIB_NAME], jQuery);


/**
 * 
 * UI 공통
 */
;(function(core, $, undefined){
    "use strict";

})(window[LIB_NAME], jQuery);

/* 
============================================================== UI 컴포넌트 Start
*/


/**
 * @name scrollspy
 * @selector [data-modules-scrollspy]'
 */
;(function(core, $, undefined){
    "use strict";
    var win = $(window),
    template = '<a href="javascript:;" class="btn-more"><i class="icon"></i><span class="hiding" data-hidingText></span></a>',
    wrapper = '<div class="inset"></div>',
    Default = {
        scrollWrap : $(document),
        nav : null,
        conts : null,
        conts_pos : [],
        nav_pos : {},
        maxHeight : null,
        durration : 200,
        jumpnav : false,
        margin : 0,
        padding : 0,
        openPadding : 0,
        navHeight : null,
        openText : "더보기",
        closeText : "닫기",
        btn : $(template),
        wrapper : null,
        openImportant : null,
        alSize : null
    },
    activeClass = 'fixed',
    name = "scrollspy",
    ui = core.ui,
    Widget = ui.Widget,
    Scrollspy = Widget.extend({
		name : name,
		init : function (element, config){
			var _ = this;
			var options = _.options = $.extend({}, Default, config);
            _.element = $(element);
            _.element.height(_.element.children().height())
			Widget.fn.init.call(_, element, options);
			_.options.nav = _.element.find('.ui-spynav a');
            _.options.conts = [];
            _.options.btn.find('[data-hidingText]').text(_.options.openText)
			_.options.maxHeight = $('body').prop('scrollHeight') - $(window).height();
			_._getContPos();
            if(_.options.navHeight !== null){
                _._setNavHeight();
            }
            if(_.options.alSize !== null && _.options.nav.length % _.options.alSize !== 0  ){
                _._setAlItems();
            }
            console.log()
            _._bindEvent();
        },
        _bindEvent : function(){
            var _ = this;
            var wrap = _.options.scrollWrap;
            // _.options.btn
            _.options.btn.on('click', function(){
                _.spynavToggle();
            })
			$(window).on('load scroll', function(e){
                _._scrollCheck(wrap.scrollTop());
                _.options.maxHeight = $('body').prop('scrollHeight') - $(window).height();
                _._getContPos();
            })
            
            $(window).on('load resize', function(){
				_.options.maxHeight = $('body').prop('scrollHeight') - $(window).height();
				_._getContPos();
            });
            _.options.nav.on('click', function(e){
                e.preventDefault();
                _._getContPos();
                var index = $(this).parent().index();
                _.options.jumpnav = true;
				$('html, body').stop().animate({scrollTop : _.options.conts[index] +1}, _.options.durration, function(){
                    _.options.jumpnav = false;
                    $(window).trigger('scroll');
                });
				return false;
			});
        },
        _scrollCheck : function (pos){
            const _=this;
            // console.log(pos)
			let max = _.options.conts.length,
				i;
			// 스크롤 위치 별 인덱스 반환
			for (i = 0 ; i < max ; i++){
				if (_.options.conts[i] >= pos) {
					i-=1;
					break;
				}
			};
			if(!_.options.jumpnav){
                if (i == max || (_.options.maxHeight) <= pos){
                    _._activesNav(max-1);
                }else{
                    if(i >= 0){
                        _._activesNav(i);
                    }else if(i < 0){
                        _._activesNav(0);
                    }
                }    
            }
            _._navPos(pos);
            
        },
        _navPos : function (pos){
			var _ = this;
            var navPos = _.element.offset().top - _.options.margin;
			if (pos >= navPos ) {
                _.element.addClass('fixed');
			}else{
				_.element.removeClass('fixed');
			}
        },
        _activesNav : function (n){
            var _ = this;
			var navLists = _.options.nav.parent('li'),
                activeIndex = _.options.nav.parent('li.ui-active').index(),
                pos = navLists.eq(n).position().top + navLists.eq(n).height();
                
            if( _.options.navHeight !== null &&  pos > _.options.navHeight && !_.element.hasClass('ui-active') ){
                _.spynavToggle();
                _.options.openImportant = true;
            }else{
                _.options.openImportant = false;
            }
			if (activeIndex != n && activeIndex == -1){
				navLists.eq(n).addClass('ui-active');
			}else if(activeIndex != n){
				navLists.eq(n).addClass('ui-active');
				navLists.eq(activeIndex).removeClass('ui-active');
			};
		},
        _getContPos : function () {
			var _ = this;
			_.options.conts = [];
            _.options.nav.each(function(n){
                _.options.conts.push($(this.hash))
            })
            for (var i = 0; i < _.options.conts.length; i++) {
                var pos = _.options.conts[i].offset().top - _.options.padding;
                _.options.conts[i] = pos;
			}
        },
        _setNavHeight : function(){
            var _ = this;
            var innerCont = _.element.find('.ui-spynav');
            
            if(innerCont.outerHeight() > _.options.navHeight){
                _.options.openPadding = innerCont.outerHeight() - _.options.navHeight;
                innerCont.wrap(wrapper);
                _.options.wrapper = _.element.find('.inset');
                _.options.wrapper.css({"height":_.options.navHeight+"px", "overflow":"hidden"})
                _.element.children().append(_.options.btn);
                _.element.height(_.options.navHeight)
            }
        },
        _setAlItems : function(){
            var _ = this;
            var count = _.options.alSize - (_.options.nav.length % _.options.alSize);
            console.log(count)
            var html = "";
            for (var i =0; i < count; i++) {
                html+='<li role="presentation"></li>'
            }
            var target = _.element.find('.ui-spynav')
            target.append(html)
        },
        spynavToggle : function(){
            var _ = this;
            if(_.options.openImportant) return;
            if(_.options.wrapper.height() > _.options.navHeight){
                
                _.options.wrapper.height(_.options.navHeight)
                _.element
                    .removeClass('ui-active')
                    .height(_.options.navHeight);
                _.options.btn.find('[data-hidingText]').text(_.options.openText);
                _.options.padding -= _.options.openPadding;
            }else{
                _.options.wrapper
                    .height('auto')
                    
                _.element
                    .addClass('ui-active')
                    .height(_.options.wrapper.height());
                _.options.btn.find('[data-hidingText]').text(_.options.closeText)
                _.options.padding += _.options.openPadding;
            }
            _._getContPos();
        },
        reposition : function(){
            var _ = this;
            _.element.trigger('scroll');
            _.options.openImportant = false;
            if( _.options.navHeight !== null && _.element.hasClass('ui-active') ){
                _.spynavToggle();
            }
        }
        
	})
    ui.plugin(Scrollspy);
})(window[LIB_NAME], jQuery);


/**
 * @name scrollItems
 * @selector [data-modules-scrollItems]'
 */

;(function(core, $, undefined){
    "use strict";
    var win = $(window),
    forEach = Array.prototype.forEach,
    Default = {
        align: 0,
        activeClass : 'ui-active',
        scrollToShow : 1,
        btnControl : false
    },
    template = '<div class="scrollitems-btns">\
        <button type="button" class="ui-item-control prev-tab"><span>이전</span></button>\
        <button type="button" class="ui-item-control next-tab"><span>다음</span></button>\
    </div>',
    name = "scrollItems",
    namespace = ".scrollItems",
    activeClass = 'ui-active',
    isApp = core.detect.isApp,
    ui = core.ui,
    Widget = ui.Widget,
    ScrollItems = Widget.extend({
		name : name,
		init : function(element, config){
			var _ = this;
			var options = _.options = $.extend({}, Default, config);
			Widget.fn.init.call(_, element, options);
            _.element = $(element);
            _.wrap;
            _.btns = null;
            _.index = null;
            _.activeIndex = 0;
            _.options.activeClass = (_.options.activeClass !== undefined) ?_.options.activeClass:activeClass
            if(_.options.btnControl){
                _.element.wrap("<div class='ui-scitems-wrap' />");
                _.wrap = _.element.closest('.ui-scitems-wrap');
                _.wrap.append(template);
                _.btns = _.wrap.find('.scrollitems-btns');
                _.index = 0;
            }
            // console.log(_.options.activeClass);
            _._bindEvents();
		},
		_bindEvents : function(){
            var _ = this;
            
            !_.btns || _.btns.on('click dbclick', '.ui-item-control', function(){
                var $this = $(this);
                var prevBtn = $this.hasClass('prev-tab');
                if(prevBtn && _.wrap.hasClass('prev-disabled')){
                    // console.log('first');
                    return;
                }else if(!prevBtn && _.wrap.hasClass('next-disabled')){
                    // console.log('last');
                    return;
                }
                if(prevBtn){
                    _.index--
                }else{
                    _.index++
                }
                _.goActive(_.index * _.options.scrollToShow)
            })
            _.element.on('click', '.ui-nav', _.activeItem.bind(_))
            .on('scroll', function(){
                
                var $this = $(this);
                var scrollLeft = $this.scrollLeft();
                // console.log('ddd'+scrollLeft);
                var wrap = _.wrap || $this; 
                if(scrollLeft === 0){
                    console.log('set');
                    wrap.addClass('prev-disabled');
                }else if(Math.round(scrollLeft + $this[0].offsetWidth) >= $this[0].scrollWidth){
                    console.log('end');
                    wrap.addClass('next-disabled');
                }else{
                    wrap.removeClass('prev-disabled');
                    wrap.removeClass('next-disabled')
                }
            })
            .on('touchstart', function(){
                if(isApp && window.AndroidJS !== undefined) window.AndroidJS.setPagingDrag("false");
            })
            .on('touchend', function(){
                if(isApp && window.AndroidJS !== undefined) window.AndroidJS.setPagingDrag("true");
            })
            .trigger('scroll')

            setTimeout(function(){
                var initEvent = $.Event('init'+namespace, {
                    relatedTarget: _.element.find('.ui-nav'+'.'+activeClass)
                })
                _.element.trigger(initEvent);
                _.initActiveItem();
            },0)
        },
        activeItem : function(e){
            var _ = this,
                $this = $(e.currentTarget),
                eType = e.type,
                activeEvent = $.Event('active'+namespace, {
                    relatedTarget: $this
                });
            $this.activeItem(_.options.activeClass);
            _.element.trigger(activeEvent);
            if(!_.options.btnControl) _.goActive($this.index(), eType);
        },
        initActiveItem : function(){
            var _ = this;
            var index = _.element.find('.ui-nav'+'.'+activeClass).index();
            if(index < 0) return;
            if(_.options.btnControl){
                index = parseInt(index / _.options.scrollToShow);
                _.goActive(index * _.options.scrollToShow );
                _.index = index;
            }else{
                _.goActive(index);
                _.activeIndex = index;
            }

            
            
        },
        goActive : function(n, eType){
            
            var _ = this;
            var $this = _.element.find('.ui-nav').eq(n);
            var duration = 300,
                scrollEvent = $.Event('scrollEnd'+namespace, {
                    relatedTarget: $this
                });
            if(_.activeIndex != $this.index() && !_.btns){   
                // $this.activeItem(_.options.activeClass);
                _.activeIndex = n;
            }else if(!_.btns && eType === undefined){
                return;
            }
            if(typeof _.options.align === 'number'){
                _.options.padding = $this.outerWidth() * _.options.align
            }else if(typeof _.options.align === 'string'){
                if(_.options.align === 'center'){
                    _.options.padding = (_.element.outerWidth()/2) - ($this.outerWidth()/2);
                }else if(_.options.align === 'left'){
                    // _.options.padding = 0
                }
            }
            var left = $this.position().left+_.element.scrollLeft()-_.options.padding;
            _.element.stop().animate({scrollLeft:left},duration, function(){
                _.element.trigger(scrollEvent);
            })
        }
    })
    ui.plugin(ScrollItems);
})(window[LIB_NAME], jQuery);


/**
 * @name sticky
 * @selector [data-modules-sticky]'
 * @options breakPoint : $(element) 	// 전달된 셀렉터 의 포지션 하단에서 브레이크
 */
 ;(function(core, $, undefined){
    "use strict";
    var win = $(window),
    Default = {
        padding : 0,
        breakPoint : null,
        relativeLists : null,
        relativeTarget : null,
        activeSticky : false,
        className : null,
        align : 'top',
        name : "sticky"
    },
    activeClass = 'fixed',
    forEach = Array.prototype.forEach,
    name = "sticky",
    ui = core.ui,
    Widget = ui.Widget,
    Sticky = Widget.extend({
		name : name,
		init: function (element, config){
			var _ = this;
			var options = _.options = $.extend({}, Default, config);
			Widget.fn.init.call(_, element, options);
            _.options.padding = Number(_.options.padding);
            _.element.wrap('<div class="sticky-ui-wrapper">')
            _.element.before('<div class="sticky-placeholder">')    
            _.placehiolder = _.element.parent().find('.sticky-placeholder');
            _.wrapper = _.element.closest('.sticky-ui-wrapper');
            if(_.options.className !== null ) _.wrapper.addClass(_.options.className);
            _._setBreakPoint();
            _._isResize = false;
            _.posRefresh();
            _.activeSticky();
            // console.log(_.placehiolder.offset().top);
            $(this).trigger('scroll');
			_._bindEvent();
		},
		_bindEvent : function() {
            var _ = this;
            
            win.on('load', function(e){
                _._setBreakPoint();
                _.posRefresh();
                $(this).trigger('scroll');
            })
            .on('scroll', function(e){
                e.preventDefault();
                if(!_.element.is(':visible') || _._isResize ) return;
				var $this = $(this);
                var scrollPos = $this.scrollTop();
                _.options.pos = _.placehiolder.offset().top + _.options.padding;
				if(scrollPos > _.options.pos){
                    _.element.addClass(activeClass);
                    _.element.css(_.options.align, (Math.abs(_.options.padding)));
                    _.options.activeSticky = true;
					if(_.options.breakPoint !== null){
                        _._breakAction(scrollPos);                        
					}
				}else{
                    _.element.removeClass(activeClass);
                    _.element.css(_.options.align, '')
                    _.options.activeSticky = false;
				}
            })
            .on('resize', function(e){
                e.preventDefault();
                _._isResize = true;
                setTimeout(function(){
                    _.posRefresh(); 
                },0)
                
            })
		},
		posRefresh : function(pos){
            var _ = this;
            if(!_.element.is(':visible')) return;
            _.element.removeClass('fixed');
            _.element.css('top', '');
            _._setRelativeTarget();
            if(pos) _.options.padding = pos;
            
            _._isResize = false;
            win.trigger('scroll');
            
        },
        activeSticky : function(){
            var _ = this;
            if(_.options.activeSticky){
                $('html,body').stop().animate({ scrollTop: _.options.pos}, 300);
            }
        },
		_breakAction : function(pos) {
            var _ = this;
			var breakPointPos = _.breakPoint.offset().top + _.breakPoint.outerHeight() + pos;
            var elPos = _.element.offset().top + _.element.outerHeight() + pos;
			if(breakPointPos < elPos){
                _.element.find(".sticky-inner").css({"transform":"translate(0, "+(breakPointPos - elPos)+"px)"});
                _.element.addClass('ui-break');
			}else{
                _.element.find(".sticky-inner").css('transform','');
                _.element.removeClass('ui-break');
			}
        },
        _setRelativeTarget : function(){
            var _ = this;
            if(_.options.relativeLists !== null){
                var elTop = 0;
                forEach.call(_.options.relativeLists, function (item, i) {
                    var el = $(item);
                    var padding = 0;
                    if(el.length > 0){
                        padding = el.outerHeight();
                    }
                    console.log(el.outerHeight());
                    elTop += padding;
                });
                _.options.padding = (elTop*-1);
            }
            if(_.options.relativeTarget !== null){
                var el = $(_.options.relativeTarget);
                if(el.data(name)){
                    _.options.padding = (el.outerHeight() - el.data(name).options.padding) * -1;
                }else if(el.length !== 0){
                    _.options.padding = el.outerHeight() * -1;
                }else{
                    _.options.padding = 0;
                }
                
            }
        },
        _setBreakPoint : function(){
            var _ = this;
            if(_.options.breakPoint !== null && _.element.closest(_.options.breakPoint).length > 0){
                _.breakPoint = _.element.closest(_.options.breakPoint);
                // console.log(_.options.breakPoint);
            }else{
                _.breakPoint = $(_.options.breakPoint)
            }
        }
	})
    ui.plugin(Sticky);
})(window[LIB_NAME], jQuery);


/**
 * @name commonUi
 * @selector $('body')
 */
;(function(core, $, undefined){
    "use strict";
    var Default = {
        activeClass : "ui-active",
        subMenuCheckClass : "hasSub",
        activeGnb : null,
        DURATIONS : 500
    },
    doc = $(document),
    forEach = Array.prototype.forEach,
    win = $(window),
    NAME = "commonUi",
    objectProto = Object.prototype,
    hasOwn = objectProto.hasOwnProperty,
    ui = core.ui,
    Widget = ui.Widget,
    LIBRAYLISTS = {
        slick : {
            el : '[data-modules-slick]',
            name : "slick",
            default : {
                arrows:true,
                dots: true,
                infinite: false
            }
        },
        scrollspy : {
            el : '[data-modules-scrollspy]',
            name : "scrollspy"
        },
        sticky : {
            el : '[data-modules-sticky]',
            name : "sticky"
        }
    },
    commonUi = Widget.extend({
		name : NAME,
		init : function (element, config){
			var _ = this;
			var options = _.options = $.extend({}, Default, config);
			_.element = $(element);
			Widget.fn.init.call(_, element, options);
			_.options.progressBar = $('#progressBar');
			_.mediaInfo = core.detect.mediaInfo.mode
			_._bindEvents();
            _.currentImgLoaded(_.mediaInfo);
            _.initLibray();
            _.fullScreenEl = {};
            
			




            // // 대상 node 선택
            // var target = document.getElementById('wrap');
            
            // // 감시자 인스턴스 만들기
            // var observer = new MutationObserver(function(mutations) {
            //     mutations.forEach(function(mutation) {
            //         console.log(mutation);
            //         console.log($(mutation.addedNodes[0]));
            //         $('body').commonUi('initLibray')
            //     });    
            // });
            
            // // 감시자의 설정:
            // // characterData: true,
            // var config = { attributes: true, characterData: true, childList: true, subtree: true };
            
            // // 감시자 옵션 포함, 대상 노드에 전달
            // observer.observe(target, config);



		},
		// hideQuickMenu
		_bindEvents : function (){
			var _ = this,
                scrollAnimate = false;
			win.on('changeSize', function(e, mode){
				_.mediaInfo = mode;
				_.currentImgLoaded(mode);
                console.log(_.mediaInfo)
                _.initSlider()
			})
            .on('load', function(e){
				_.initLibray();
                _.initSlider();
                if($('#wrap').hasClass('.products')) _.initHeight();
                
            })
            .on('load resize', function(e){
                if($('#wrap').hasClass('.products')) _.initHeight();
            })



			_.element.on('click', '#bgDim', function(e){
				var $this = $(this);
                var target = $this.data('callFn');
                var selector = $('[data-fn-layer].'+_.options.activeClass);
				if(!target) {
					core.ui.hideDim();
					return false;
                };
                

                var method = "hide"+target;
				// if (!hasOwn.call(method, _)) throw new Error("메서드가 존재하지 않습니다.");
				_[method](e, selector);
            });

            // a 링크 안에 있는 버튼 캡쳐
            $('[data-alink-inner]').on('click', function(e){
                var $this = $(this),
                    target = $this.data('alinkInner'),
                    clicker = $(e.target);
                if(clicker.closest('.'+target).length !== 0){
                    alert('자세히 보기')
                    return false;
                }
            })


            // 상품상세 동영상 플로팅 
            $(document)
            .on('click', '[data-btn-top]', function(e){
                e.preventDefault();
                $(document).scrollTop(0);
            })

            // 커스텀 데이터 레이어팝업 호출
            doc.on('click', '[data-fn-layer]', function(e){
                e.preventDefault();
                var $this = $(this);
                var fn = $this.data('fnLayer');
                _[fn](e, $this);
            })

            // $(window).on('mousewheel.banner', function(e){
            //     console.log('ddd')
                // return false;
				// var wheelPos = e.wheelDelta ? evt.wheelDelta / 10 : (e.originalEvent.detail || e.originalEvent.deltaY);
				// var scrollTop = $(this).scrollTop();
                // var scrollNav = $('[data-modules-scrollspy]').offset().top;
                // var animate = false;
                // if(wheelPos > 0 && scrollTop < scrollNav-10 && !animate ){
                //     setTimeout(function(){
                //         $('html, body').stop().animate({scrollTop: scrollNav}, 500, function(){
                //             animate = false;
                //         });
                //     }, 100)
                    
                // }

			// },{ passive:false });
            window.addEventListener("wheel", function(e){
                var scrollTop = $(this).scrollTop();
                var wheelPos = e.wheelDelta ? e.wheelDelta / 10 : (e.originalEvent.detail || e.originalEvent.deltaY);
                var index = 0;
                if($('#wrap').hasClass('products')){   
                    e.preventDefault();
                    
                    
                    var scrollNav = $('[data-modules-scrollspy]').offset().top;
                    
                    if(wheelPos < 0 && scrollTop < scrollNav-10 && !scrollAnimate ){
                        scrollAnimate = true;
                        setTimeout(function(){
                            $('html, body').stop().animate({scrollTop: scrollNav}, 500, function(){
                                scrollAnimate = false;
                            });
                        }, 100)
                        return false;
                    }else{
                        if(wheelPos > 0){
                            $(window).scrollTop(scrollTop-80)
                        }else{
                            $(window).scrollTop(scrollTop+80)
                        }
                    }
                }
                if($('#wrap').hasClass('main')){
                    e.preventDefault();
                    var lists = $('.main_sec');
                    var pos = [];
                    lists.each(function(i, el){
                        pos.push([$(el).offset().top, $(el).outerHeight()])
                    })
                    if(scrollTop >= pos[0][0] && scrollTop < (pos[1][0])-30){
                        if(!scrollAnimate){
                            scrollAnimate = true;
                            for (var i = 0; i < 1; i++) {
                                if(pos[i][0] <= scrollTop && pos[i+1][0] > scrollTop ){
                                    index = i;
                                    break;
                                }
                                
                            }
                            if(pos[index][0] == scrollTop){
                                if(wheelPos < 0){
                                    index+=1
                                }else{
                                    index-=1
                                }
                            }else{
                                if(wheelPos < 0){
                                    index+=1
                                }
                            }
                            if(index < 0) index = 0;
                            $('html, body').stop().animate({scrollTop: pos[index][0]}, 500, function(){
                                scrollAnimate = false;
                            });
                        }

                    }else{
                        if(wheelPos > 0){
                            $(window).scrollTop(scrollTop-80)
                        }else{
                            $(window).scrollTop(scrollTop+80)
                        }
                    }
                }
                    

            }, { passive:false })

        },

		initLibray : function(){
			var _ = this;
            var LibrayLists = LIBRAYLISTS;
            var stickyTab = $('#stickyTab');



            for (var i in LibrayLists) {
                if (LibrayLists.hasOwnProperty(i)) {
                    _.setOptions(LibrayLists[i]);
                }
            }
            

            
            return _;
        },
        initSlider : function(mode){
            var _ = this;
            var swiper;
            if(_.mediaInfo == 'mobile'){
                swiper = new Swiper("#box_slider", {
                    slidesPerView: "auto",
                    spaceBetween: 10
                });
                $("#box_slider").data('swiper', swiper)
            }else{   
                if($("#box_slider").data('swiper')){
                    $("#box_slider").data('swiper').destroy()
                }
            }
        },
        initHeight : function(){
            var _ = this;
            var minHeight = {
                mobile : 640,
                tablet :600,
                pc : 700
            }
            var height;
            if(_.mediaInfo == 'pc'){
                height = $(window).height() >= minHeight.pc ? $(window).height() : minHeight.pc
            }else if(_.mediaInfo == 'tablet'){
                height = $(window).height() >= minHeight.tablet ? $(window).height() : minHeight.tablet
            }else if(_.mediaInfo == 'mobile'){
                height = $(window).height() >= minHeight.mobile ? $(window).height() : minHeight.mobile
            }
            $('#visualSec').height(height);
            $('#container').css('padding-top', height+'px')
        },
        initLibrary : function(){
			var _ = this;
			_.initLibray();
		},
		setOptions : function(obj){
			/**
			 * @options : enableMode ["web", "tablet", "mobile"];
			 */
			var el = $(obj.el),
				defaultOption = obj.default,
				name = obj.name;
			el.each(function(){
                var $this = $(this);
				var $this = $(this),
                    option = $.extend({}, defaultOption),
                    elOpt = $this.attr('data-modules-'+obj.name),
					options = elOpt !== "" ? $.extend(option, core.util.cssLiteralToObject(elOpt)): option,
					mode = core.detect.mediaInfo.mode,
					setMode = (!options.hasOwnProperty('enableMode')) || (function(options, mode){
						var checkMode = options['enableMode'];
						if (checkMode !== null) {
							checkMode = (checkMode.indexOf(mode) !== -1)? true : false;
							
						}else{
							checkMode = true;
						}
						return checkMode;
                    })(options, mode);
                
				if(!$this.parents('pre').length /* 진행표 소스 보기 용. */ && setMode && !$this.data('active')) {
					$this[name](options);
					$this.data('active', true);	//플러그인 적용 활성화 체크
				}
			});
		},
		currentImgLoaded : function(mode){
			var d = mode,
				lists = [].slice.call(document.querySelectorAll('.current_img'));
            lists.forEach(function(el){
				var src = el.dataset[mode] || el.dataset['src'];
				el.setAttribute('src', src)
			});
		},
    })
    ui.plugin(commonUi);
	document.addEventListener('DOMContentLoaded', function(){
        $('body').commonUi();
        console.log('commonUi')
    });
})(window[LIB_NAME], jQuery);
/* 
============================================================== UI 컴포넌트 End
*/
