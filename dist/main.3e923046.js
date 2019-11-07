// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $sitList = $('.siteList');
var $lastLi = $sitList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashList = xObject || [{
  log: 'https://i.ibb.co/0nz0DZ2/afcun.jpg',
  url: 'https://www.acfun.cn',
  type: 'img'
}, {
  log: 'https://i.ibb.co/M9k3vB2/bilibli.jpg',
  url: 'https://bilibili.com',
  type: 'img'
}, {
  log: 'https://i.ibb.co/c1nQQbW/github.png',
  url: 'https://github.com',
  type: 'img'
}, {
  log: 'https://i.ibb.co/SPZNQdm/youtube-logo.png',
  url: 'https://www.youtube.com',
  type: 'img'
}];

var removeUrlPart = function removeUrlPart(string) {
  var newString = string.replace('http://', '').replace('https://', '').replace('www.', '').replace('http:', '').replace('https:', '').replace('://');
  return newString;
};

var render = function render() {
  hashList.forEach(function (node, index) {
    var urlShort = removeUrlPart(node.url);

    if (node.type === 'text') {
      var $li = $("\n            <li>\n                <div class=\"site\">\n                    <div class=\"log\">\n                        ".concat(urlShort.slice(0, 1).toLocaleUpperCase(), "\n                    </div>\n                    <div class=\"link\">").concat(urlShort, "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-close\"></use>\n                        </svg>\n                    </div>\n                </div> \n            </li>\n            ")).insertBefore($lastLi);
      $li.on('click', '.close', function (e) {
        e.stopPropagation();
        hashList.splice(index, 1);
        $sitList.find('li:not(.last)').remove();
        render();
      });
      $li.on('click', function () {
        window.open(node.url, '_self');
      });
      $li.on({
        touchstart: function touchstart(e) {
          // 长按事件触发  
          timeOutEvent = setTimeout(function () {
            timeOutEvent = 0;
            var user = confirm("请按按钮");

            if (user) {
              hashList.splice(index, 1);
              $sitList.find('li:not(.last)').remove();
              render();
            }
          }, 400); //长按400毫秒   
          // e.preventDefault();    
        },
        touchmove: function touchmove() {
          clearTimeout(timeOutEvent);
          timeOutEvent = 0;
        },
        touchend: function touchend() {
          clearTimeout(timeOutEvent);

          if (timeOutEvent != 0) {
            // 点击事件  
            // location.href = '/a/live-rooms.html';  
            window.open(node.url, '_self');
          }

          return false;
        }
      });
    } else {
      var _$li = $("\n            <li>\n                <div class=\"site\">\n                    <div class=\"log\">\n                        <img src=\"".concat(node.log, "\" alt=\"\u7F51\u7AD9\u56FE\u6807\">\n                    </div>\n                    <div class=\"link\">").concat(urlShort, "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-close\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>\n                    ")).insertBefore($lastLi);

      _$li.on('click', '.close', function (e) {
        e.stopPropagation();
        hashList.splice(index, 1);
        $sitList.find('li:not(.last)').remove();
        render();
      });

      _$li.on('click', function () {
        window.open(node.url, '_self');
      });

      _$li.on({
        touchstart: function touchstart(e) {
          // 长按事件触发  
          timeOutEvent = setTimeout(function () {
            timeOutEvent = 0;
            var user = confirm("请按按钮");

            if (user) {
              hashList.splice(index, 1);
              $sitList.find('li:not(.last)').remove();
              render();
            }
          }, 400); //长按400毫秒   
          // e.preventDefault();    
        },
        touchmove: function touchmove() {
          clearTimeout(timeOutEvent);
          timeOutEvent = 0;
        },
        touchend: function touchend() {
          clearTimeout(timeOutEvent);

          if (timeOutEvent != 0) {
            // 点击事件  
            // location.href = '/a/live-rooms.html';  
            window.open(node.url, '_self');
          }

          return false;
        }
      });
    }
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入你要添加的网址');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashList.push({
    log: url,
    url: url,
    type: 'text'
  });
  $sitList.find('li:not(.last)').remove();
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashList);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  console.log(e.key);
  var key = e.key;

  for (var i = 0; i < hashList.length; i++) {
    console.log(hashList[i].url);

    if (hashList[i].type === 'text' && removeUrlPart(hashList[i].log).slice(0, 1) === key) {
      window.open(hashList[i].url, '_self');
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.3e923046.js.map