/* A content script that listens for messages asking it to change the
 * formatting of the selected text on the current webpage
 * (toggle the bold/italics/highlight setting)
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.ping){ 
		sendResponse({pong: true}); 
		return; 
	}
	console.log("Text " + (request.currentState ? "" : "un") + request.changeParameter + " working");
});
