`(function(){if(!this.localStorage)if(this.globalStorage)try{this.localStorage=this.globalStorage}catch(e){}else{var a=document.createElement("div");a.style.display="none";document.getElementsByTagName("head")[0].appendChild(a);if(a.addBehavior){a.addBehavior("#default#userdata");var d=this.localStorage={length:0,setItem:function(b,d){a.load("localStorage");b=c(b);a.getAttribute(b)||this.length++;a.setAttribute(b,d);a.save("localStorage")},getItem:function(b){a.load("localStorage");b=c(b);return a.getAttribute(b)},
removeItem:function(b){a.load("localStorage");b=c(b);a.removeAttribute(b);a.save("localStorage");this.length--;if(0>this.length)this.length=0},clear:function(){a.load("localStorage");for(var b=0;attr=a.XMLDocument.documentElement.attributes[b++];)a.removeAttribute(attr.name);a.save("localStorage");this.length=0},key:function(b){a.load("localStorage");return a.XMLDocument.documentElement.attributes[b]}},c=function(a){return a.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
"-")};a.load("localStorage");d.length=a.XMLDocument.documentElement.attributes.length}}})();`

`;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.7.1",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l={},m={},n={},o=[],p=o.slice,q,r=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=w(e[d],"function"),w(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=p.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(p.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(p.call(arguments)))};return e}),l.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a};for(var z in l)t(l,z)&&(q=z.toLowerCase(),e[q]=l[z](),o.push((e[q]?"":"no-")+q));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),h=j=null,e._version=d,e.hasEvent=r,e}(this,this.document),Modernizr.addTest("filereader",function(){return!!(window.File&&window.FileList&&window.FileReader)});`

'use strict'

(->
	window.console = {}  unless window.console

	# union of Chrome, FF, IE, and Safari console methods
	m = [
		"log"
		"info"
		"warn"
		"error"
		"debug"
		"trace"
		"dir"
		"group"
		"groupCollapsed"
		"groupEnd"
		"time"
		"timeEnd"
		"profile"
		"profileEnd"
		"dirxml"
		"assert"
		"count"
		"markTimeline"
		"timeStamp"
		"clear"
	]

	# define undefined methods as noops to prevent errors
	i = 0

	while i < m.length
		if !window.console[m[i]]
			window.console[m[i]] = ->
		i++
	return
)()

#Modernizr.filereader = false

app =
	counter: 0
	first: no
	power: no
	pin: no
	ie: `/*@cc_on!@*/0` # ie detect

	key: ->
		addEvent('keydown', document, (e) ->
			e = e or window.event

			if e.altKey and e.keyCode is 82 # alt + r
				app.reset();

			return
		)

	reset: ->
		controls.animPress(controls.eReset)
		dataStorage.clearAll()
		location.reload()
		return false

	init: ->
		return if @counter isnt 0
		@counter++;

		@addStyle()
		@key()
		controls.generate()
		controls.init()

		image.layout.generate()

		if Modernizr.filereader and Modernizr.draganddrop
			loadFile.layout.generate('drop')
			loadFile.init('drop')
		else
			loadFile.layout.generate('text')
			loadFile.init('text')

		#load or new
		if image.onLocalStorage()
			@first = no

			controls.show()
			image.init()
			pinObj.init()
			opacity.init()
			shadow.init()

			if app.power
				loadFile.layout.hideTextBox()
			else
				loadFile.layout.hide()

		else
			@first = yes

	addStyle: ->
		head = document.getElementsByTagName("head")[0]
		link = document.createElement("link")
		link.rel = "stylesheet"
		link.type = "text/css"
		link.href = "http://cdn.jsdelivr.net/pixtopix/latest/pixtopix.css"
		link.media = "all"
		head.appendChild link;

image =
	layout:
		generate: ->
			imgLay = document.createElement('img')
			imgLay.id = "pix2pix"
			imgLay.style.position = 'absolute'
			imgLay.style.left = '50%'
			imgLay.style.display = 'none';
			imgLay.style.zIndex = 10000
			imgLay.draggable = true;
			imgLay.src = ""

			first = document.body.firstChild;
			document.body.insertBefore(imgLay, first);

			image.elem = document.getElementById('pix2pix')

		show: ->
			console.log('show')
			app.power = on
#			loadFile.status = off;

			try
				controls.press(controls.ePower)
				image.elem.style.display = 'block'
#				loadFile.eShadow.style.display = 'none'
			catch e

			@save()

		hide: ->
			app.power = off
#			loadFile.status = on;

			try
				controls.unPress(controls.ePower)
				image.elem.style.display = 'none'
#				loadFile.eShadow.style.display = 'block'
			catch e

			@save()

		toggle:  ->
			if image.setCounter is undefined then image.set()

			if app.power is on
				@hide();
			else
				@show();

		get:  ->
			app.power = if (dataStorage.get('power') is 'true' || dataStorage.get('power') is on) then on else off

		save:  ->
			dataStorage.save('power', app.power);

		key: ->
			addEvent('keydown', document, (e) ->
				e = e or window.event

				if (e.keyCode is 192 and !e.shiftKey) or (!e.shiftKey and e.keyCode is 220 and app.ie)
					image.layout.toggle()
					return false
			)

			addEvent('keydown', document, (e) ->
				e = e or window.event

				if e.keyCode is 73 and !app.pin
					image.getNewImage()
					return false
			)

	init:  ->
		# debugger
		@layout.get()
		@layout.key()


		@get()
		@set() if app.power

	getNewImage: ->
		controls.animPress(controls.eNewImage)
		app.power = off;
		loadFile.power = on;
		@layout.hide()
		loadFile.layout.show()
		controls.hide()

	onLocalStorage: ->
		@get()
		if @path is null or @path is 'undefined' or @path is ''
			return false
		else
			return true

	set: ->
		if @setCounter is undefined then @setCounter = 1 else @setCounter++;

		@elem.onload = ->
			image.layout.show()
			position.init()
			loadFile.layout.hide()

			draggable('pix2pix', ->
				position.get(yes);
				position.save();
			);

		@elem.src = @path;
		@save();

	get:  ->
		@path = dataStorage.get('path')

	save:  ->
		dataStorage.save('path', @path)

	change: (url) ->
		@path = url;
		@set();

loadFile =
	dragClass: 'pp-drag'
	loadingClass: 'b-pp-loading'
	status: off

	layout:
		generate: (type) ->
#			debugger
			inHtml = ''
			type = type || 'text'

			if type is 'text'
				inHtml = '<p>Enter url to image file</p><form action="#" id="b-pp-formFile"><input type="text" id="b-pp-drop__text" placeholder="../img/index.jpg"> <span class="b-pp__btn" id="b-pp-drop__submit">Send</span></form>'
			else if type is 'drop'
				inHtml = '<p>Drag\'n\'drop image file</p><p>OR</p><span class="b-pp-drop__file-box b-pp__btn">BROWSE<input type="file" id="b-pp-drop__file"></span>'

			html = '<div class="b-pp-drop__border"><div id="b-pp-drop__text-box" class="b-pp-drop__text-box">'+ inHtml + '</div></div>'
			html = html.replace(/\t/g, '');

			controlLay = document.createElement('div')
			controlLay.id = 'b-pp-drop';
			controlLay.className = 'b-pp-drop b-pp-tp-black';
			controlLay.innerHTML = html;

			first = document.body.firstChild;
			document.body.insertBefore(controlLay, first);

			loadFile.eShadow = document.getElementById 'b-pp-drop'
			loadFile.eTextBox = document.getElementById 'b-pp-drop__text-box'
			loadFile.eFileUlpoad = document.getElementById 'b-pp-drop__file'
			loadFile.eForm = document.getElementById 'b-pp-formFile'
			loadFile.eSubmit = document.getElementById 'b-pp-drop__submit'
			loadFile.eTextSubmit = document.getElementById 'b-pp-drop__text'

			loadFile.eTextSubmit.focus() if type is 'text'

		show:  ->
			loadFile.status = on
			app.power = off

			try
				image.elem.style.display = 'none'
				loadFile.eShadow.style.display = ''
				loadFile.eTextSubmit.focus()
			catch e

			@showTextBox()

		hide:  ->
			loadFile.status = off
			app.power = on

			try
				image.elem.style.display = ''
				loadFile.eShadow.style.display = 'none'
			catch e


		showTextBox: ->
			cCls.remove(loadFile.eShadow, loadFile.loadingClass)
			loadFile.eTextBox.style.display = ''

		hideTextBox: ->
			cCls.add(loadFile.eShadow, loadFile.loadingClass)
			loadFile.eTextBox.style.display = 'none'

	init: (type) ->
		if type is 'text'
			if !@status
				@status = on;
				@inputTextLoad()

		else if type is 'drop'
			if !@status
				@status = on;
				@inputFileLoad()
				@dropLoad()

	inputTextLoad:  ->
		@eSubmit.onclick = ->
			loadFile.endFileLoad(loadFile.eTextSubmit.value) if loadFile.eTextSubmit.value isnt ''

		@eForm.onsubmit = ->
			loadFile.endFileLoad(loadFile.eTextSubmit.value) if loadFile.eTextSubmit.value isnt ''

	inputFileLoad:  ->
		@eFileUlpoad.addEventListener "change", ((evt) ->

			loadFile.fileUpload evt, (b64) ->
				loadFile.endFileLoad(b64)

		), false

	dropLoad: ->
		docEl = document.documentElement;

		dragover = (evt) ->
			root = document.getElementsByTagName("html")[0]
			cCls.add(root, loadFile.dragClass)

			evt.preventDefault()
			return

		# To enable drag and drop
		docEl.addEventListener "dragover", (dragover), false

		# Handle dropped image file - only Firefox and Google Chrome
		docEl.addEventListener "drop", ((evt) ->
			console.log('drop')
			root = document.getElementsByTagName("html")[0]
			cCls.remove(root, loadFile.dragClass)

			loadFile.fileUpload evt, (b64) ->
				loadFile.endFileLoad(b64)
			return
		), false

		docEl.addEventListener "dragleave", ( ->
			console.log('leave')
			root = document.getElementsByTagName("html")[0]
			cCls.remove(root, loadFile.dragClass)
			return
		), false

	fileUpload: (e, callback) ->
		base64 = ''

		file = null
		if e.dataTransfer
			file = e.dataTransfer.files[0] or null
		else
			file = @eFileUlpoad.files[0] or null  if @eFileUlpoad.files

		if typeof FileReader isnt "undefined" and file.type.indexOf("image") isnt -1
			reader = new FileReader()

			textBoxId = document.getElementById('b-pp-drop__text-box')
			dropId = document.getElementById('b-pp-drop')

			textBoxId.style.display = 'none'
			cCls.add(dropId, 'b-pp-loading')


			# Note: addEventListener doesn't work in Google Chrome for this event
			reader.onload = (evt) ->
				base64 = evt.target.result
				callback && callback(base64);

			reader.readAsDataURL file
		else
			@eFileUlpoad.value = ''
			alert 'Upload file is not image.'

		e.preventDefault()
		return

	endFileLoad: (b64) ->
		loadFile.layout.hideTextBox()
		controls.show()

		if b64? and b64 isnt ''
			image.change(b64);

			loadFile.layout.hide()
			image.layout.show()
		else
			# layout.destroy();
			return false;

		if app.first
			image.layout.key()
			pinObj.init()
			opacity.init()
			shadow.init()


	key:
		bind: ->
		unbind: ->

opacity =
	opacity: .7

	init:  ->
		@get()
		@set()
		@key()

	set:  ->
		image.elem.style.opacity = @opacity;
		image.elem.style.filter = 'alpha(opacity=' + @opacity*100 + ')';
		@save();

	get:  ->
		unless dataStorage.get('opacity') is null
			@opacity = dataStorage.get('opacity')*1;

	save:  ->
		clearTimeout @interVl
		@interVl = setTimeout (->
			dataStorage.save('opacity', opacity.opacity);
		), 200

	change: (dir) ->
		_op = @opacity * 1

		if dir is '+'
			if _op isnt 1
				@opacity = (@opacity*1 + 0.1).toFixed(1)
				controls.animPress(controls.ePlus)
		else
			if _op isnt 0
				@opacity = (@opacity - 0.1).toFixed(1)
				controls.animPress(controls.eMinus)

		@set()

	key: ->
		addEvent('keydown', document, (e) ->
			e = e or window.event

			if !app.pin
				# plus
				if e.keyCode is 107 or (e.shiftKey and e.keyCode is 187)
					opacity.change "+"
					return false

				# minus
				if e.keyCode is 109 or (e.shiftKey and e.keyCode is 189)
					opacity.change "-"
					return false
		)

shadow =
	sPower: off
	init:  ->
		@key()
		@get()

		if @sPower is on
			@set()
		else
			@remove()

	set:  ->
		txt = '* {-webkit-box-shadow: 0px 0px 4px 0 #' + @sColor + ' ;box-shadow: 0px 0px 4px 0 #' + @sColor + ';} #b-pp, #b-pp *, #b-pp-drop, #b-pp-drop * {box-shadow: none}';

		if document.getElementById('pix2pix__shadow') is null
			stylLay = document.createElement('style')
			stylLay.id = 'pix2pix__shadow'
			stylLay.textContent = txt

			first = document.body.firstChild;
			document.body.insertBefore(stylLay, first);
		else
			try
				document.getElementById('pix2pix__shadow').innerHTML = txt
			catch e

		controls.press(controls.eShadow)

		@save()

	remove:  ->
		unless document.getElementById('pix2pix__shadow') is null
			try
				document.getElementById('pix2pix__shadow').innerHTML  = ''
			catch e

		controls.unPress(controls.eShadow)
		@save()

	get:  ->
		@sPower = (if (dataStorage.get('shadowPower') is true or dataStorage.get('shadowPower') is 'true') then on else off)
		@sColor = (if dataStorage.get('shadowColor') is null then '165563' else dataStorage.get('shadowColor'))

	save:  ->
		dataStorage.save('shadowPower', @sPower);
		dataStorage.save('shadowColor', @sColor);

	changeColor:  ->
		@sColor = @randomHexColor()
		@set()

	randomHexColor:  ->
		"" + Math.floor(Math.random() * 16777215).toString(16)

	toggle:  ->
		if @sPower is on
			@sPower = off
			@remove()
		else
			@sPower = on
			@set()

		@save()

	key: ->
		addEvent('keydown', document, (e) ->
			e = e or window.event

			if !app.pin

				# Ctrl + *
				if (e.keyCode is 106 and e.ctrlKey) or (e.shiftKey and e.ctrlKey and e.keyCode is 56)
					shadow.changeColor()
					return false

				# *
				if (e.keyCode is 106) or (e.shiftKey and e.keyCode is 56)
					shadow.toggle()
					return false
		)

pinObj =
	state: no
	init:  ->
		@key()
		@get()
		@save()

		@change()
		@change()

	get:  ->
		@state = (if (dataStorage.get('pin') is true or dataStorage.get('pin') is 'true') then yes else no)
		app.pin = @state
		# @state = dataStorage.get('pin') or no;

	save:  ->
		dataStorage.save('pin', @state);

	change:  ->
		if @state is yes
			@state = no
			app.pin = @state
			controls.unPress(controls.ePin)
		else
			@state = yes
			app.pin = @state
			controls.press(controls.ePin)

		@toggleDisable();
		@save()

	toggleDisable: ->
		dizCls = 'ppDisable'

		if @state is yes
			cCls.add(controls.eShadow, dizCls)
			cCls.add(controls.eNewImage, dizCls)
			cCls.add(controls.ePlus, dizCls)
			cCls.add(controls.eMinus, dizCls)
		else
			cCls.remove(controls.eShadow, dizCls)
			cCls.remove(controls.eNewImage, dizCls)
			cCls.remove(controls.ePlus, dizCls)
			cCls.remove(controls.eMinus, dizCls)


	key: ->
		addEvent('keydown', document, (e) ->
			e = e or window.event

			# shift+`
			if (e.shiftKey and e.keyCode is 192) or (e.shiftKey and e.keyCode is 220 and app.ie)
				pinObj.change()
				return false
			return false
		)

position =
	left: 0
	top: 0
	init:  ->
		@key()
		if app.first
			ml = image.elem.width / 2 * (-1)
			@change(ml, @top);
		else
			@get()
			@set()

	set:  ->
		image.elem.style.marginLeft = @left + "px";
		image.elem.style.top = @top + "px";

		@save()

	get: (inElem) ->
		if (inElem)
			@top = parseInt(image.elem.style.top, 10)
			@left = parseInt(image.elem.style.marginLeft, 10)
		else
			@top = dataStorage.get('top')*1 or 0;
			@left = dataStorage.get('left')*1 or 0;

	save:  ->
		clearTimeout @interV
		@interV = setTimeout (->
			dataStorage.save('top', position.top);
			dataStorage.save('left', position.left);
		), 400

	change: (x, y) ->
		@left = x*1;
		@top = y*1;
		@set()

	key: ->
		addEvent('keydown', document, (e) ->
			e = e or window.event

			# shift+up
			if e.keyCode is 38 and e.shiftKey
				position.change(position.left, position.top - 10)
				return false

			# up
			if e.keyCode is 38
				position.change(position.left, position.top - 1)
				return false

			# shift+down
			if e.keyCode is 40 and e.shiftKey
				position.change(position.left, position.top + 10)
				return false

			# down
			if e.keyCode is 40
				position.change(position.left, position.top + 1)
				return false

			# shift+left
			if e.keyCode is 37 and e.shiftKey
				position.change(position.left - 10, position.top)
				return false

			# left
			if e.keyCode is 37
				position.change(position.left - 1, position.top)
				return false

			# shift+right
			if e.keyCode is 39 and e.shiftKey
				position.change(position.left + 10, position.top)
				return false

			# right
			if e.keyCode is 39
				position.change(position.left + 1, position.top)
				return false
		)


controls =
	started: false
	power: off
	init: ->
		that = this

		@ePower = document.getElementById('ppIdPower')
		@ePin = document.getElementById('ppIdPin')
		@eShadow = document.getElementById('ppIdShadow')
		@eReset = document.getElementById('ppIdReset')
		@eNewImage = document.getElementById('ppIdImage')
		@ePlus = document.getElementById('ppIdOpp')
		@eMinus = document.getElementById('ppIdOpm')

		@ePower.onclick = ->
			image.layout.toggle()

		@ePin.onclick = ->
			pinObj.change()

		@eShadow.onclick = ->
			if !app.pin
				shadow.toggle()

		@eNewImage.onclick = ->
			if !app.pin
				image.getNewImage()

		@eReset.onclick = ->
			app.reset()

		@ePlus.onclick = ->
			if !app.pin
				opacity.change '+'

		@eMinus.onclick = ->
			if !app.pin
				opacity.change '-'

		controls.init = ->

	show: ->
		@el.style.display = 'block'

	hide: ->
		@el.style.display = 'none'

	press: (id) ->
		cCls.add(id, 'active')

	unPress: (id) ->
		cCls.remove(id, 'active')

	animPress: (id) ->
		cCls.add(id, 'active')

		setTimeout (->
			cCls.remove(id, 'active')
		), 100

	generate: ->
		controlsLay = document.createElement('div')
		controlsLay.id = "b-pp"
		controlsLay.className = "b-pp-tp-black"
		controlsLay.style.display = "none"

		html = '
				<div class="b-pp__line">
					<div class="b-pp__cell"><span id="ppIdPower" class="b-pp__btn b-pp__icon checker power" title="Power on / off - [ ` ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdPin" class="b-pp__btn b-pp__icon checker pin" title="Pin / unpin - [ Shift + ` ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdShadow" class="b-pp__btn b-pp__icon checker shadow" title="Highlight elements yes / no - [ * ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdImage" class="b-pp__btn b-pp__icon edit" title="Change current image - [ Ctrl + i ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdOpp" class="b-pp__btn b-pp__icon plus" title="Increase opacity on 10% - [ + ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdOpm" class="b-pp__btn b-pp__icon minus" title="Decrease opacity on 10% - [ - ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdReset" class="b-pp__btn b-pp__icon delete" title="Reset settings - [ Alt + r ]"></span></div>
					<div class="b-pp__cell"><span id="ppIdInfo" class="b-pp__btn b-pp__icon info" title="More info about pixToPix - [ F1 ]"></span></div>
				</div>
				'

		controlsLay.innerHTML = html
		first = document.body.firstChild
		document.body.insertBefore(controlsLay, first)

		@started = true;
		@el = document.getElementById('b-pp');

# additional

addEvent = (eventName, element, handler) ->
	if element.addEventListener
		element.addEventListener eventName, handler, false
	else if element.attachEvent
		element.attachEvent "on" + eventName, handler
	else
		element["on" + eventName] = handler
	return

removeEvent = (eventName, element, handler) ->
	if element.addEventListener
		element.removeEventListener eventName, handler, false
	else if element.detachEvent
		element.detachEvent "on" + eventName, handler
	else
		element["on" + eventName] = null
	return

dataStorage =
	save: (name, value) ->
		name = "pix2pix_#{name}"
		try
			localStorage.setItem(name, value)
		catch e
			document.cookie = name + "=" + window.escape(value)

	get: (name) ->
		name = "pix2pix_#{name}"
		try
			localStorage.getItem(name)
		catch e
			results = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)")
			if results
				return (window.unescape(results[2]))
			else
				return null

	clearAll:  ->
		try
			localStorage.clear();
		catch e

		cookies = document.cookie.split(";")
		i = 0

		while i < cookies.length
			cookie = cookies[i]
			eqPos = cookie.indexOf("=")
			name = (if eqPos > -1 then cookie.substr(0, eqPos) else cookie)
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
			i++


cCls =
	add: (e, cls) ->
		try
			if e.className.indexOf(cls) is -1
				e.className += " " + cls
		catch e
			console.log 'cCls.add', e

	replace: (e, cls, rez) ->
		try
			e.className = e.className.replace(new RegExp(cls, 'g'),rez);
		catch e

	remove: (e, cls) ->
		try
			@replace(e, cls, '')
		catch e

	has: (e, cls) ->
		try
			return if e.className.indexOf(cls) isnt -1 then yes else no
		catch e

draggable = (id, callabck) ->

	fixPageXY = (e) ->
		if not e.pageX? and e.clientX?
			html = document.documentElement
			body = document.body
			e.pageX = e.clientX + (html.scrollLeft or body and body.scrollLeft or 0)
			e.pageX -= html.clientLeft or 0
			e.pageY = e.clientY + (html.scrollTop or body and body.scrollTop or 0)
			e.pageY -= html.clientTop or 0
		return

	document.getElementById(id).onmousedown = (e) ->

		return if app.pin

		mt = parseInt(@.style.top, 10);
		ml = parseInt(@.style.marginLeft, 10);

		e = e or event
		fixPageXY e

		stX = e.pageX
		stY = e.pageY

		@style.position = "absolute"
		self = this

		old = document.onmousemove

		document.onmousemove = (e) ->
			e = e or event
			fixPageXY e

			self.style.marginLeft = ml - (stX - e.pageX) + "px"
			self.style.top = mt - (stY - e.pageY) + "px"
			self.style.cursor = 'move'

			return

		oldUp = document.onmouseup

		document.onmouseup = ->
			self.style.cursor = 'default'
			callabck && callabck()

			document.onmousemove = old
			document.onmouseup = oldUp
			return
		return

	document.getElementById(id).ondragstart = ->
		false

try app.init() catch e
window.onload = ->
	app.init()