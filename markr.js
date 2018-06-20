/* A content script that listens for messages asking it to change the
 * formatting of the selected text on the current webpage
 * (toggle the bold/italics/highlight setting)
 */

var formatted = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

	if(request.ping){ 
		sendResponse({pong: true}); 
		return; 
	}
	
	var wrapper = document.createElement("span");
	if(request.changeParameter == 'highlight'){
		wrapper.style.background = "yellow";
	}
	else if(request.changeParameter == 'bold'){
		wrapper.style.fontWeight = "bold";
	}
	else if(request.changeParameter == 'italics'){
		wrapper.style.fontStyle = "italic";
	}

	/* Follow this to see the problems with the following approach:
	 * https://stackoverflow.com/a/29895300/7082018 (in the comments)*/
	var selectedRange = window.getSelection().getRangeAt(0);
	wrapper.appendChild(selectedRange.extractContents());
	selectedRange.insertNode(wrapper);
});
