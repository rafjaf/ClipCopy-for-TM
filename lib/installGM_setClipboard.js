var GM_setClipboard = GM_setClipboard; // if already defined by Scriptish, keep it
if (!GM_setClipboard && chrome && chrome.extension) { // Tampermonkey installed
    GM_setClipboard = function (data, type) {
        chrome.extension.sendMessage("hhfligfenijkiigaeeglbocdakbnobjd", {data: data, type: type});
    }
}
