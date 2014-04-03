// Generated by CoffeeScript 1.7.1
(function() {
  (function(){if(!this.localStorage)if(this.globalStorage)try{this.localStorage=this.globalStorage}catch(e){}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if(a.addBehavior){a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function(b,d){a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function(b){a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function(b){a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length--;if(0>this.length)this.length=0},clear:function(){a.load("localStorage");for(var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function(b){a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function(a){return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}})();;
  ;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.7.1",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l={},m={},n={},o=[],p=o.slice,q,r=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=w(e[d],"function"),w(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=p.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(p.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(p.call(arguments)))};return e}),l.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a};for(var z in l)t(l,z)&&(q=z.toLowerCase(),e[q]=l[z](),o.push((e[q]?"":"no-")+q));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),h=j=null,e._version=d,e.hasEvent=r,e}(this,this.document),Modernizr.addTest("filereader",function(){return!!(window.File&&window.FileList&&window.FileReader)});;
  'use strict';
  var addEvent, addEventListener, app, cCls, controls, dataStorage, draggable, image, loadFile, opacity, pinObj, position, removeEvent, removeEventListener, shadow;

  (function() {
    var i, m;
    if (!window.console) {
      window.console = {};
    }
    m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
    i = 0;
    while (i < m.length) {
      if (!window.console[m[i]]) {
        window.console[m[i]] = function() {};
      }
      i++;
    }
  })();

  (function() {
    var ready;
    ready = function(fn) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fn);
      } else {
        document.attachEvent("onreadystatechange", function() {
          if (document.readyState === "interactive") {
            fn();
          }
        });
      }
    };
    ready(function() {
      return app.init();
    });
    return window.onload = function() {
      return app.init();
    };
  })();

  app = {
    counter: 0,
    first: false,
    power: false,
    pin: false,
    ie: /*@cc_on!@*/0,
    key: function() {
      return addEvent('keydown', document, function(e) {
        e = e || window.event;
        if (e.altKey && e.keyCode === 82) {
          app.reset();
        }
      });
    },
    reset: function() {
      controls.animPress(controls.eReset);
      dataStorage.clearAll();
      location.reload();
      return false;
    },
    init: function() {
      if (this.counter !== 0) {
        return;
      }
      this.counter++;
      this.addStyle();
      this.key();
      controls.generate();
      controls.init();
      image.layout.generate();
      if (Modernizr.filereader && Modernizr.draganddrop) {
        loadFile.layout.generate('drop');
        loadFile.init('drop');
      } else {
        loadFile.layout.generate('text');
        loadFile.init('text');
      }
      if (image.onLocalStorage()) {
        this.first = false;
        controls.show();
        image.init();
        pinObj.init();
        opacity.init();
        shadow.init();
        if (app.power) {
          return loadFile.layout.hideTextBox();
        } else {
          return loadFile.layout.hide();
        }
      } else {
        return this.first = true;
      }
    },
    addStyle: function() {
      var head, link;
      head = document.getElementsByTagName("head")[0];
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "pixtopix.css";
      link.media = "all";
      return head.appendChild(link);
    }
  };

  image = {
    layout: {
      generate: function() {
        var first, imgLay;
        imgLay = document.createElement('img');
        imgLay.id = "pix2pix";
        imgLay.style.position = 'absolute';
        imgLay.style.left = '50%';
        imgLay.style.display = 'none';
        imgLay.style.zIndex = 10000;
        imgLay.draggable = true;
        imgLay.src = "";
        first = document.body.firstChild;
        document.body.insertBefore(imgLay, first);
        return image.elem = document.getElementById('pix2pix');
      },
      show: function() {
        var e;
        console.log('show');
        app.power = true;
        try {
          controls.press(controls.ePower);
          image.elem.style.display = 'block';
        } catch (_error) {
          e = _error;
        }
        return this.save();
      },
      hide: function() {
        var e;
        app.power = false;
        try {
          controls.unPress(controls.ePower);
          image.elem.style.display = 'none';
        } catch (_error) {
          e = _error;
        }
        return this.save();
      },
      toggle: function() {
        if (image.setCounter === void 0) {
          image.set();
        }
        if (app.power === true) {
          return this.hide();
        } else {
          return this.show();
        }
      },
      get: function() {
        return app.power = dataStorage.get('power') === 'true' || dataStorage.get('power') === true ? true : false;
      },
      save: function() {
        return dataStorage.save('power', app.power);
      },
      key: function() {
        addEvent('keydown', document, function(e) {
          e = e || window.event;
          if ((e.keyCode === 192 && !e.shiftKey) || (!e.shiftKey && e.keyCode === 220 && app.ie)) {
            image.layout.toggle();
            return false;
          }
        });
        return addEvent('keydown', document, function(e) {
          e = e || window.event;
          if (e.keyCode === 73 && !app.pin) {
            image.getNewImage();
            return false;
          }
        });
      }
    },
    init: function() {
      this.layout.get();
      this.layout.key();
      this.get();
      if (app.power) {
        return this.set();
      }
    },
    getNewImage: function() {
      controls.animPress(controls.eNewImage);
      app.power = false;
      loadFile.power = true;
      this.layout.hide();
      loadFile.layout.show();
      return controls.hide();
    },
    onLocalStorage: function() {
      this.get();
      if (this.path === null || this.path === 'undefined' || this.path === '') {
        return false;
      } else {
        return true;
      }
    },
    set: function() {
      if (this.setCounter === void 0) {
        this.setCounter = 1;
      } else {
        this.setCounter++;
      }
      this.elem.onload = function() {
        image.layout.show();
        position.init();
        loadFile.layout.hide();
        return draggable('pix2pix', function() {
          position.get(true);
          return position.save();
        });
      };
      this.elem.src = this.path;
      return this.save();
    },
    get: function() {
      return this.path = dataStorage.get('path');
    },
    save: function() {
      return dataStorage.save('path', this.path);
    },
    change: function(url) {
      this.path = url;
      return this.set();
    }
  };

  loadFile = {
    dragClass: 'pp-drag',
    loadingClass: 'b-pp-loading',
    status: false,
    layout: {
      generate: function(type) {
        var controlLay, first, html, inHtml;
        inHtml = '';
        type = type || 'text';
        if (type === 'text') {
          inHtml = '<p>Enter url to image file</p><form action="#" id="b-pp-formFile"><input type="text" id="b-pp-drop__text" placeholder="../img/index.jpg"> <span class="b-pp__btn" id="b-pp-drop__submit">Send</span></form>';
        } else if (type === 'drop') {
          inHtml = '<p>Drag\'n\'drop image file</p><p>OR</p><span class="b-pp-drop__file-box b-pp__btn">BROWSE<input type="file" id="b-pp-drop__file"></span>';
        }
        html = '<div class="b-pp-drop__border"><canvas id="b-pp-drop__canvas"></canvas><div id="b-pp-drop__text-box" class="b-pp-drop__text-box">' + inHtml + '</div></div>';
        html = html.replace(/\t/g, '');
        controlLay = document.createElement('div');
        controlLay.id = 'b-pp-drop';
        controlLay.className = 'b-pp-drop b-pp-tp-black';
        controlLay.innerHTML = html;
        first = document.body.firstChild;
        document.body.insertBefore(controlLay, first);
        loadFile.eShadow = document.getElementById('b-pp-drop');
        loadFile.eTextBox = document.getElementById('b-pp-drop__text-box');
        loadFile.eFileUlpoad = document.getElementById('b-pp-drop__file');
        loadFile.eForm = document.getElementById('b-pp-formFile');
        loadFile.eSubmit = document.getElementById('b-pp-drop__submit');
        loadFile.eTextSubmit = document.getElementById('b-pp-drop__text');
        loadFile.eCanvas = document.getElementById("b-pp-drop__canvas");
        if (type === 'text') {
          return loadFile.eTextSubmit.focus();
        }
      },
      show: function() {
        var e;
        loadFile.status = true;
        app.power = false;
        try {
          image.elem.style.display = 'none';
          loadFile.eShadow.style.display = '';
          loadFile.eTextSubmit.focus();
        } catch (_error) {
          e = _error;
        }
        return this.showTextBox();
      },
      hide: function() {
        var e;
        loadFile.status = false;
        app.power = true;
        try {
          image.elem.style.display = '';
          return loadFile.eShadow.style.display = 'none';
        } catch (_error) {
          e = _error;
        }
      },
      showTextBox: function() {
        cCls.remove(loadFile.eShadow, loadFile.loadingClass);
        return loadFile.eTextBox.style.display = '';
      },
      hideTextBox: function() {
        cCls.add(loadFile.eShadow, loadFile.loadingClass);
        return loadFile.eTextBox.style.display = 'none';
      }
    },
    init: function(type) {
      if (type === 'text') {
        if (!this.status) {
          this.status = true;
          return this.inputTextLoad();
        }
      } else if (type === 'drop') {
        if (!this.status) {
          this.status = true;
          this.inputFileLoad();
          return this.dropLoad();
        }
      }
    },
    inputTextLoad: function() {
      this.eSubmit.onclick = function() {
        if (loadFile.eTextSubmit.value !== '') {
          return loadFile.endFileLoad(loadFile.eTextSubmit.value);
        }
      };
      return this.eForm.onsubmit = function() {
        if (loadFile.eTextSubmit.value !== '') {
          return loadFile.endFileLoad(loadFile.eTextSubmit.value);
        }
      };
    },
    inputFileLoad: function() {
      return this.eFileUlpoad.addEventListener("change", (function(evt) {
        return loadFile.fileUpload(evt, function(b64) {
          return loadFile.endFileLoad(b64);
        });
      }), false);
    },
    dropLoad: function() {
      var dragover;
      dragover = function(evt) {
        var root;
        root = document.getElementsByTagName("html")[0];
        cCls.add(root, loadFile.dragClass);
        evt.preventDefault();
      };
      document.documentElement.addEventListener("dragover", dragover, false);
      this.eCanvas.addEventListener("drop", (function(evt) {
        var root;
        root = document.getElementsByTagName("html")[0];
        cCls.remove(root, loadFile.dragClass);
        loadFile.fileUpload(evt, function(b64) {
          return loadFile.endFileLoad(b64);
        });
      }), false);
      return this.eCanvas.addEventListener("dragleave", (function() {
        var root;
        root = document.getElementsByTagName("html")[0];
        cCls.remove(root, loadFile.dragClass);
      }), false);
    },
    fileUpload: function(e, callback) {
      var base64, dropId, file, reader, textBoxId;
      base64 = '';
      file = null;
      if (e.dataTransfer) {
        file = e.dataTransfer.files[0] || null;
      } else {
        if (this.eFileUlpoad.files) {
          file = this.eFileUlpoad.files[0] || null;
        }
      }
      if (typeof FileReader !== "undefined" && file.type.indexOf("image") !== -1) {
        reader = new FileReader();
        textBoxId = document.getElementById('b-pp-drop__text-box');
        dropId = document.getElementById('b-pp-drop');
        textBoxId.style.display = 'none';
        cCls.add(dropId, 'b-pp-loading');
        reader.onload = function(evt) {
          base64 = evt.target.result;
          return callback && callback(base64);
        };
        reader.readAsDataURL(file);
      } else {
        this.eFileUlpoad.value = '';
        alert('Upload file is not image.');
      }
      e.preventDefault();
    },
    endFileLoad: function(b64) {
      loadFile.layout.hideTextBox();
      controls.show();
      if ((b64 != null) && b64 !== '') {
        image.change(b64);
        loadFile.layout.hide();
        image.layout.show();
      } else {
        return false;
      }
      if (app.first) {
        image.layout.key();
        pinObj.init();
        opacity.init();
        return shadow.init();
      }
    },
    key: {
      bind: function() {},
      unbind: function() {}
    }
  };

  opacity = {
    opacity: .7,
    init: function() {
      this.get();
      this.set();
      return this.key();
    },
    set: function() {
      image.elem.style.opacity = this.opacity;
      image.elem.style.filter = 'alpha(opacity=' + this.opacity * 100 + ')';
      return this.save();
    },
    get: function() {
      if (dataStorage.get('opacity') !== null) {
        return this.opacity = dataStorage.get('opacity') * 1;
      }
    },
    save: function() {
      clearTimeout(this.interVl);
      return this.interVl = setTimeout((function() {
        return dataStorage.save('opacity', opacity.opacity);
      }), 200);
    },
    change: function(dir) {
      var _op;
      _op = this.opacity * 1;
      if (dir === '+') {
        if (_op !== 1) {
          this.opacity = (this.opacity * 1 + 0.1).toFixed(1);
          controls.animPress(controls.ePlus);
        }
      } else {
        if (_op !== 0) {
          this.opacity = (this.opacity - 0.1).toFixed(1);
          controls.animPress(controls.eMinus);
        }
      }
      return this.set();
    },
    key: function() {
      return addEvent('keydown', document, function(e) {
        e = e || window.event;
        if (!app.pin) {
          if (e.keyCode === 107 || (e.shiftKey && e.keyCode === 187)) {
            opacity.change("+");
            return false;
          }
          if (e.keyCode === 109 || (e.shiftKey && e.keyCode === 189)) {
            opacity.change("-");
            return false;
          }
        }
      });
    }
  };

  shadow = {
    sPower: false,
    init: function() {
      this.key();
      this.get();
      if (this.sPower === true) {
        return this.set();
      } else {
        return this.remove();
      }
    },
    set: function() {
      var e, first, stylLay, txt;
      txt = '* {-webkit-box-shadow: 0px 0px 4px 0 #' + this.sColor + ' ;box-shadow: 0px 0px 4px 0 #' + this.sColor + ';} #b-pp, #b-pp *, #b-pp-drop, #b-pp-drop * {box-shadow: none}';
      if (document.getElementById('pix2pix__shadow') === null) {
        stylLay = document.createElement('style');
        stylLay.id = 'pix2pix__shadow';
        stylLay.textContent = txt;
        first = document.body.firstChild;
        document.body.insertBefore(stylLay, first);
      } else {
        try {
          document.getElementById('pix2pix__shadow').innerHTML = txt;
        } catch (_error) {
          e = _error;
        }
      }
      controls.press(controls.eShadow);
      return this.save();
    },
    remove: function() {
      var e;
      if (document.getElementById('pix2pix__shadow') !== null) {
        try {
          document.getElementById('pix2pix__shadow').innerHTML = '';
        } catch (_error) {
          e = _error;
        }
      }
      controls.unPress(controls.eShadow);
      return this.save();
    },
    get: function() {
      this.sPower = (dataStorage.get('shadowPower') === true || dataStorage.get('shadowPower') === 'true' ? true : false);
      return this.sColor = (dataStorage.get('shadowColor') === null ? '165563' : dataStorage.get('shadowColor'));
    },
    save: function() {
      dataStorage.save('shadowPower', this.sPower);
      return dataStorage.save('shadowColor', this.sColor);
    },
    changeColor: function() {
      this.sColor = this.randomHexColor();
      return this.set();
    },
    randomHexColor: function() {
      return "" + Math.floor(Math.random() * 16777215).toString(16);
    },
    toggle: function() {
      if (this.sPower === true) {
        this.sPower = false;
        this.remove();
      } else {
        this.sPower = true;
        this.set();
      }
      return this.save();
    },
    key: function() {
      return addEvent('keydown', document, function(e) {
        e = e || window.event;
        if (!app.pin) {
          if ((e.keyCode === 106 && e.ctrlKey) || (e.shiftKey && e.ctrlKey && e.keyCode === 56)) {
            shadow.changeColor();
            return false;
          }
          if ((e.keyCode === 106) || (e.shiftKey && e.keyCode === 56)) {
            shadow.toggle();
            return false;
          }
        }
      });
    }
  };

  pinObj = {
    state: false,
    init: function() {
      this.key();
      this.get();
      this.save();
      this.change();
      return this.change();
    },
    get: function() {
      this.state = (dataStorage.get('pin') === true || dataStorage.get('pin') === 'true' ? true : false);
      return app.pin = this.state;
    },
    save: function() {
      return dataStorage.save('pin', this.state);
    },
    change: function() {
      if (this.state === true) {
        this.state = false;
        app.pin = this.state;
        controls.unPress(controls.ePin);
      } else {
        this.state = true;
        app.pin = this.state;
        controls.press(controls.ePin);
      }
      this.toggleDisable();
      return this.save();
    },
    toggleDisable: function() {
      var dizCls;
      dizCls = 'ppDisable';
      if (this.state === true) {
        cCls.add(controls.eShadow, dizCls);
        cCls.add(controls.eNewImage, dizCls);
        cCls.add(controls.ePlus, dizCls);
        return cCls.add(controls.eMinus, dizCls);
      } else {
        cCls.remove(controls.eShadow, dizCls);
        cCls.remove(controls.eNewImage, dizCls);
        cCls.remove(controls.ePlus, dizCls);
        return cCls.remove(controls.eMinus, dizCls);
      }
    },
    key: function() {
      return addEvent('keydown', document, function(e) {
        e = e || window.event;
        if ((e.shiftKey && e.keyCode === 192) || (e.shiftKey && e.keyCode === 220 && app.ie)) {
          pinObj.change();
          return false;
        }
        return false;
      });
    }
  };

  position = {
    left: 0,
    top: 0,
    init: function() {
      var ml;
      this.key();
      if (app.first) {
        ml = image.elem.width / 2 * (-1);
        return this.change(ml, this.top);
      } else {
        this.get();
        return this.set();
      }
    },
    set: function() {
      image.elem.style.marginLeft = this.left + "px";
      image.elem.style.top = this.top + "px";
      return this.save();
    },
    get: function(inElem) {
      if (inElem) {
        this.top = parseInt(image.elem.style.top, 10);
        return this.left = parseInt(image.elem.style.marginLeft, 10);
      } else {
        this.top = dataStorage.get('top') * 1 || 0;
        return this.left = dataStorage.get('left') * 1 || 0;
      }
    },
    save: function() {
      clearTimeout(this.interV);
      return this.interV = setTimeout((function() {
        dataStorage.save('top', position.top);
        return dataStorage.save('left', position.left);
      }), 400);
    },
    change: function(x, y) {
      this.left = x * 1;
      this.top = y * 1;
      return this.set();
    },
    key: function() {
      return addEvent('keydown', document, function(e) {
        e = e || window.event;
        if (e.keyCode === 38 && e.shiftKey) {
          position.change(position.left, position.top - 10);
          return false;
        }
        if (e.keyCode === 38) {
          position.change(position.left, position.top - 1);
          return false;
        }
        if (e.keyCode === 40 && e.shiftKey) {
          position.change(position.left, position.top + 10);
          return false;
        }
        if (e.keyCode === 40) {
          position.change(position.left, position.top + 1);
          return false;
        }
        if (e.keyCode === 37 && e.shiftKey) {
          position.change(position.left - 10, position.top);
          return false;
        }
        if (e.keyCode === 37) {
          position.change(position.left - 1, position.top);
          return false;
        }
        if (e.keyCode === 39 && e.shiftKey) {
          position.change(position.left + 10, position.top);
          return false;
        }
        if (e.keyCode === 39) {
          position.change(position.left + 1, position.top);
          return false;
        }
      });
    }
  };

  controls = {
    started: false,
    power: false,
    init: function() {
      var that;
      that = this;
      this.ePower = document.getElementById('ppIdPower');
      this.ePin = document.getElementById('ppIdPin');
      this.eShadow = document.getElementById('ppIdShadow');
      this.eReset = document.getElementById('ppIdReset');
      this.eNewImage = document.getElementById('ppIdImage');
      this.ePlus = document.getElementById('ppIdOpp');
      this.eMinus = document.getElementById('ppIdOpm');
      this.ePower.onclick = function() {
        return image.layout.toggle();
      };
      this.ePin.onclick = function() {
        return pinObj.change();
      };
      this.eShadow.onclick = function() {
        if (!app.pin) {
          return shadow.toggle();
        }
      };
      this.eNewImage.onclick = function() {
        if (!app.pin) {
          return image.getNewImage();
        }
      };
      this.eReset.onclick = function() {
        return app.reset();
      };
      this.ePlus.onclick = function() {
        if (!app.pin) {
          return opacity.change('+');
        }
      };
      this.eMinus.onclick = function() {
        if (!app.pin) {
          return opacity.change('-');
        }
      };
      return controls.init = function() {};
    },
    show: function() {
      return this.el.style.display = 'block';
    },
    hide: function() {
      return this.el.style.display = 'none';
    },
    press: function(id) {
      return cCls.add(id, 'active');
    },
    unPress: function(id) {
      return cCls.remove(id, 'active');
    },
    animPress: function(id) {
      cCls.add(id, 'active');
      return setTimeout((function() {
        return cCls.remove(id, 'active');
      }), 100);
    },
    generate: function() {
      var controlsLay, first, html;
      controlsLay = document.createElement('div');
      controlsLay.id = "b-pp";
      controlsLay.className = "b-pp-tp-black";
      controlsLay.style.display = "none";
      html = '<div class="b-pp__line"> <div class="b-pp__cell"><span id="ppIdPower" class="b-pp__btn b-pp__icon checker power" title="Power on / off - [ ` ]"></span></div> <div class="b-pp__cell"><span id="ppIdPin" class="b-pp__btn b-pp__icon checker pin" title="Pin / unpin - [ Shift + ` ]"></span></div> <div class="b-pp__cell"><span id="ppIdShadow" class="b-pp__btn b-pp__icon checker shadow" title="Highlight elements yes / no - [ * ]"></span></div> <div class="b-pp__cell"><span id="ppIdImage" class="b-pp__btn b-pp__icon edit" title="Change current image - [ Ctrl + i ]"></span></div> <div class="b-pp__cell"><span id="ppIdOpp" class="b-pp__btn b-pp__icon plus" title="Increase opacity on 10% - [ + ]"></span></div> <div class="b-pp__cell"><span id="ppIdOpm" class="b-pp__btn b-pp__icon minus" title="Decrease opacity on 10% - [ - ]"></span></div> <div class="b-pp__cell"><span id="ppIdReset" class="b-pp__btn b-pp__icon delete" title="Reset settings - [ Alt + r ]"></span></div> <div class="b-pp__cell"><span id="ppIdInfo" class="b-pp__btn b-pp__icon info" title="More info about pixToPix - [ F1 ]"></span></div> </div>';
      controlsLay.innerHTML = html;
      first = document.body.firstChild;
      document.body.insertBefore(controlsLay, first);
      this.started = true;
      return this.el = document.getElementById('b-pp');
    }
  };

  addEventListener = function(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent("on" + eventName, function() {
        handler.call(el);
      });
    }
  };

  removeEventListener = function(el, eventName, handler) {
    if (el.removeEventListener) {
      el.removeEventListener(eventName, handler);
    } else {
      el.detachEvent("on" + eventName, handler);
    }
  };

  addEvent = function(eventName, element, handler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, handler);
    } else {
      element["on" + eventName] = handler;
    }
  };

  removeEvent = function(eventName, element, handler) {
    if (element.addEventListener) {
      element.removeEventListener(eventName, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + eventName, handler);
    } else {
      element["on" + eventName] = null;
    }
  };

  dataStorage = {
    save: function(name, value) {
      var e;
      name = "pix2pix_" + name;
      try {
        return localStorage.setItem(name, value);
      } catch (_error) {
        e = _error;
        return document.cookie = name + "=" + window.escape(value);
      }
    },
    get: function(name) {
      var e, results;
      name = "pix2pix_" + name;
      try {
        return localStorage.getItem(name);
      } catch (_error) {
        e = _error;
        results = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
        if (results) {
          return window.unescape(results[2]);
        } else {
          return null;
        }
      }
    },
    clearAll: function() {
      var cookie, cookies, e, eqPos, i, name, _results;
      try {
        localStorage.clear();
      } catch (_error) {
        e = _error;
      }
      cookies = document.cookie.split(";");
      i = 0;
      _results = [];
      while (i < cookies.length) {
        cookie = cookies[i];
        eqPos = cookie.indexOf("=");
        name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie);
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        _results.push(i++);
      }
      return _results;
    }
  };

  cCls = {
    add: function(e, cls) {
      try {
        if (e.className.indexOf(cls) === -1) {
          return e.className += " " + cls;
        }
      } catch (_error) {
        e = _error;
        return console.log('cCls.add', e);
      }
    },
    replace: function(e, cls, rez) {
      try {
        return e.className = e.className.replace(new RegExp(cls, 'g'), rez);
      } catch (_error) {
        e = _error;
      }
    },
    remove: function(e, cls) {
      try {
        return this.replace(e, cls, '');
      } catch (_error) {
        e = _error;
      }
    },
    has: function(e, cls) {
      try {
        if (e.className.indexOf(cls) !== -1) {
          return true;
        } else {
          return false;
        }
      } catch (_error) {
        e = _error;
      }
    }
  };

  draggable = function(id, callabck) {
    var fixPageXY;
    fixPageXY = function(e) {
      var body, html;
      if ((e.pageX == null) && (e.clientX != null)) {
        html = document.documentElement;
        body = document.body;
        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;
        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
      }
    };
    document.getElementById(id).onmousedown = function(e) {
      var ml, mt, old, oldUp, self, stX, stY;
      if (app.pin) {
        return;
      }
      mt = parseInt(this.style.top, 10);
      ml = parseInt(this.style.marginLeft, 10);
      e = e || event;
      fixPageXY(e);
      stX = e.pageX;
      stY = e.pageY;
      this.style.position = "absolute";
      self = this;
      old = document.onmousemove;
      document.onmousemove = function(e) {
        e = e || event;
        fixPageXY(e);
        self.style.marginLeft = ml - (stX - e.pageX) + "px";
        self.style.top = mt - (stY - e.pageY) + "px";
        self.style.cursor = 'move';
      };
      oldUp = document.onmouseup;
      document.onmouseup = function() {
        self.style.cursor = 'default';
        callabck && callabck();
        document.onmousemove = old;
        document.onmouseup = oldUp;
      };
    };
    return document.getElementById(id).ondragstart = function() {
      return false;
    };
  };

}).call(this);
