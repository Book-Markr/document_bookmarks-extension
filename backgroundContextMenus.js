function ensureSendMessage(tabId, message, callback){
  chrome.tabs.sendMessage(tabId, {ping: true}, function(response){
    if(response && response.pong) { // Content script ready
      chrome.tabs.sendMessage(tabId, message, callback);
    } else { // No listener on the other end
	  console.log("Injecting script programmatically");
      chrome.tabs.executeScript(tabId, {file: "markr.js"}, function(){
        if(chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          throw Error("Unable to inject script into tab " + tabId);
        }
        // OK, now it's injected and ready
		console.log("Sending msg now");
        chrome.tabs.sendMessage(tabId, message, callback);
      });
    }
  });
}

function onClickHandler(info, tab) 
{
	ensureSendMessage(tab.id, {changeParameter: info.menuItemId, 
							   currentState: info.checked});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

var parentMarkr = {"title": "Markr", 
				   "contexts": ["selection"], 
				   "id": "Markr"};

var childBold = {"title": "Bold", 
				 "contexts": ["selection"], 
				 "type": "checkbox",
				 "parentId": "Markr", 
				 "id": "bold"};

var childItalics = {"title": "Italics", 
					"contexts": ["selection"], 
				 	"type": "checkbox",
					"parentId": "Markr", 
					"id": "italics"};

var childHighlight = {"title": "Highlight", 
					  "contexts": ["selection"], 
				 	  "type": "checkbox",
					  "parentId": "Markr", 
					  "id": "highlight"};

chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create(parentMarkr);
	chrome.contextMenus.create(childBold);
	chrome.contextMenus.create(childItalics);
	chrome.contextMenus.create(childHighlight);
});
