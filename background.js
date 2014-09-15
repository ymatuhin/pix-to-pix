var tabObj = JSON.parse(localStorage.getItem("obj")) || {};
console.log('tabObj', tabObj)

chrome.browserAction.setBadgeText({text:""});
chrome.browserAction.setBadgeBackgroundColor({color: '#000'});

// localStorage.clear();

// #todo always false
function initOnPage (tabId, tCallback, fCallback) {
	chrome.tabs.executeScript(tabId, {code: "try {rez = init || false} catch (e) {rez = false}"}, function (rez) {

		if ((rez && rez[0]) !== true) {
			fCallback && fCallback()
		} else {
			tCallback && tCallback()
		}

	});
}

chrome.tabs.onActiveChanged.addListener(function (tabId) {
	chrome.browserAction.setBadgeText({text:""});

	
	chrome.tabs.get(tabId, function(tab) {

		if (tabObj[tab.url] === undefined) return

		initOnPage(tab.id, function (){
			chrome.browserAction.setBadgeText({text:"ON"});
		}, function () {
			if (tabObj[tab.url].activeOnLoad !== true) return

			chrome.browserAction.setBadgeText({text:"ON"});

			chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"}, function () {
				chrome.tabs.executeScript(tab.id, {code: "app.init();"})
			});
			chrome.tabs.insertCSS(tab.id, {file: "pixtopix.css"});
			
		})

	});
	
});

chrome.browserAction.onClicked.addListener(function(tab) {

	tabObj[tab.url] = tabObj[tab.url] || {};

	initOnPage(tab.id, 
		function () {
			tabObj[tab.url] = {
				activeOnLoad: false
			};			
			chrome.tabs.executeScript(tab.id, {code: "location.reload();"})
			chrome.browserAction.setBadgeText({text:""});
		}, 
		function () {
			tabObj[tab.url] = {
				activeOnLoad: true
			};
			chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"}, function () {
				chrome.browserAction.setBadgeText({text:"ON"});
				chrome.tabs.executeScript(tab.id, {code: "app.init();"})
			});
			chrome.tabs.insertCSS(tab.id, {file: "pixtopix.css"});

		}	
	);


	localStorage.setItem("obj", JSON.stringify(tabObj));

});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {

	if (changeInfo.status === 'loading') {

		chrome.tabs.get(tabId, function (tab) {

			tabObj[tab.url] = tabObj[tab.url] || {};

			if (tabObj[tab.url] === undefined) return

			initOnPage(tab.id, function (){}, function () {
				if (tabObj[tab.url].activeOnLoad !== true) return

				chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"}, function () {
					chrome.tabs.executeScript(tab.id, {code: "app.init();"})
					chrome.browserAction.setBadgeText({text:"ON"});
				});
				chrome.tabs.insertCSS(tab.id, {file: "pixtopix.css"});

				
			})
		});

	}
});

