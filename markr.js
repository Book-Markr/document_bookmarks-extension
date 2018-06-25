/* A content script that listens for messages asking it to change the
 * formatting of the selected text on the current webpage and turns on
 * the bold/italics/highlight setting
 */

var i = -1;

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

	var selectedRange = window.getSelection().getRangeAt(0);
	//var selectedRange = ++i + "th";

	/*the if-else statement present next is only to be used when debugging*/
	++i;
	if(i == 0)
		chrome.storage.sync.clear();
	else{
		var key = request.url;
		chrome.storage.sync.get([key], function(result){
			if(Object.keys(result).length === 0 && result.constructor === Object){
				console.log("No entry for " + key + " present in storage");
				addEntry(key, [selectedRange]);
			}

			else{
				console.log("Entry found!");
				updateEntry(key, selectedRange, result);
			}
		});

		/* Follow this to see the problems with the following approach:
		 * https://stackoverflow.com/a/29895300/7082018 (in the comments)*/

		wrapper.appendChild(selectedRange.extractContents());
		selectedRange.insertNode(wrapper);
	}
});

function addEntry(key, value)
{
	var entry = {};
	entry[key] = value;
	chrome.storage.sync.set(entry, function(){
		console.log(entry);
	});
}

function updateEntry(key, appendage, storedResult)
{
	var value = storedResult[key];
	console.log("Value before pushing");
	console.log(value);
	value.push(appendage);
	console.log("Value after pushing");
	console.log(value);

	chrome.storage.sync.remove(key, function(response){
		console.log("Previous value removed");
		addEntry(key, value);
	});
}
