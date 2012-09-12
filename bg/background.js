var VERSION = "0.1";

function checkFirstInstall() {
	chrome.storage.local.get("installedVersion", function(item){
		if ( (typeof item.installedVersion === "undefined") || (VERSION > item.installedVersion) ) {
			chrome.tabs.create({url: "/about/about.html"});
			chrome.storage.local.set({"installedVersion": VERSION});
		}
	});
}

function messageParser (request, sender, sendResponse) {
	// For security reasons, only accept messages from Tampermonkey
	if (sender.id == "dhdgffkkebhmkfjojejmpbldmpobfkfo") {
		var clipboard = document.getElementById("clip");
		if (request.type == "html") {
			clipboard.innerHTML = request.data;
		}
		else {
			clipboard.textContent = request.data;	
		}
		var selection = window.getSelection();
	    selection.removeAllRanges();
	    var range = document.createRange();
    	range.setStartBefore(clipboard);
	    range.setEndAfter(clipboard);  
    	range.selectNode(clipboard);
	    selection.addRange(range);
		document.execCommand("copy");
	}
}

// MAIN
checkFirstInstall();
chrome.extension.onMessageExternal.addListener(messageParser);
