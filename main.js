(function () {
    var device = {};

    window.device = device;

    // Lowercase, so we can use the more efficient indexOf(), instead of Regex
    var userAgent = window.navigator.userAgent.toLowerCase();

    // Apple products
    device.macos = function () {
        return find('mac');
    };

    device.ios = function () {
        return device.iphone() || device.ipod() || device.ipad();
    };

    device.iphone = function () {
        return !device.windows() && find('iphone');
    };

    device.ipod = function () {
        return find('ipod');
    };

    device.ipad = function () {
        return find('ipad');
    };

    // Android Devices
    device.android = function () {
        return !device.windows() && find('android');
    };

    device.androidPhone = function () {
        return device.android() && find('mobile');
    };

    device.androidTablet = function () {
        return device.android() && !find('mobile');
    };

    // Blackberry Devices
    device.blackberry = function () {
        return find('blackberry') || find('bb10') || find('rim');
    };

    device.blackberryPhone = function () {
        return device.blackberry() && !find('tablet');
    };

    device.blackberryTablet = function () {
        return device.blackberry() && find('tablet');
    };

    // Window Devices
    device.windows = function () {
        return find('windows');
    };

    device.windowsPhone = function () {
        return device.windows() && find('phone');
    };

    device.windowsTablet = function () {
        return device.windows() && find('touch') && !device.windowsPhone();
    };

    // Mobile
    device.mobile = function () {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone();
    };

    // Tablet

    device.tablet = function () {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet();
    };

    // Desktop

    device.desktop = function () {
        return !device.tablet() && !device.mobile();
    };

    // Browser Detection

    device.browser = function () {
        return {
            isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
            isFirefox: typeof InstallTrigger !== 'undefined',
            isSafari: /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
            isIE: false || !!document.documentMode,
            isEdge: !(false || !!document.documentMode) && !!window.StyleMedia,
            isChrome: !!window.chrome
        }
    }

    // Simple UA string search
    function find(needle) {
        return userAgent.indexOf(needle) !== -1;
    }

    if (device.ios()) {
        if (device.ipad()) {

        } else if (device.iphone()) {
        } else if (device.ipod()) {
        }
    } else if (device.macos()) {
        addClass('macos desktop');
    } else if (device.android()) {
        if (device.androidTablet()) {
            addClass('android tablet');
        } else {
            addClass('android mobile');
        }
    } else if (device.blackberry()) {
        if (device.blackberryTablet()) {
            addClass('blackberry tablet');
        } else {
            addClass('blackberry mobile');
        }
    } else if (device.windows()) {
        if (device.windowsTablet()) {
            addClass('windows tablet');
        } else if (device.windowsPhone()) {
            addClass('windows mobile');
        } else {
            addClass('windows desktop');
        }
    } else if (device.desktop()) {
        addClass('desktop');
    }

    // Public functions to get the current value of type, os, or orientation
    // ---------------------------------------------------------------------

    function findMatch(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (device[arr[i]]()) {
                return arr[i];
            }
        }
        return 'unknown';
    }

    device.type = findMatch(['mobile', 'tablet', 'desktop']);
    device.os = findMatch(['ios', 'iphone', 'ipad', 'ipod', 'android', 'blackberry', 'windows']);
})();