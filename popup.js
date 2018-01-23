/*add the current URL to the destination folder when the 'Add to Bookmarks'
button is pressed*/
$(function(){
	$('#add').click(function(){
		var input= $('#folderPath').val().toUpperCase();
		var destination= input.split("/");
		addBookmark(destination, function(respondCode){
			if(respondCode==0){  //success
				$('#result').text(destination[destination.length-1]);
			}
			else if(respondCode==1){
				$('#result').text("Folder not found");
			}
			else if(respondCode==2){
				responseMsg= destination[destination.length-1] + 
							 "/ Comment added";
				$('#result').text(responseMsg);
			}
		});
	});
});

function addBookmark(destination, respond){
/*addBookmark(): accepts a 'destination' folder name and a callback 
				 function `respond`
				 Adds the current tab URL to the `destination` folder,
				 if possible. Otherwise, calls the callback `respond()`
				 with an appropriate error code*/

	chrome.bookmarks.getTree(function(FolderNodes){
		var i, failure= 1; 
		var base= FolderNodes[0].children[2];  //'Mobile Bookmarks' folder
		var htFromDest= destination.length;

		while(htFromDest!=0){
			failure= 1;
			for(i= 0; i< (base.children.length); ++i){
			//convert both strings to upper case to remove petty match conflicts
				if((base.children[i].title.toUpperCase()) == 
					destination[destination.length-htFromDest].toUpperCase()){
					failure= 0;
					break;
				}
			}
			if(failure==1){
				respond(1);
				break;
			}
			else{
				base= base.children[i];
				--htFromDest;
			}
		}

		//the desired folder exists
		if(failure==0){
			var theFolderNode= base;
			var currentURL;
			chrome.tabs.query({active:true, currentWindow:true}, function(currentTabs){
				currentURL= currentTabs[0].url;
				var idx= alreadyExists(currentURL, theFolderNode);
				if(idx >= 0){
					var newTitle= theFolderNode.children[idx].title + " || " + $('#comment').val();
					chrome.bookmarks.update(theFolderNode.children[idx].id, {'title': newTitle});
					respond(2);
				}
				else{
					chrome.bookmarks.create({'parentId': theFolderNode.id,
						'title': currentTabs[0].title + 
						' || ' +  $('#comment').val(),
						'url': currentURL});
					respond(0);
				}
			});
		}
	});
}

function alreadyExists(URL, folder){
	var i;
	for(i=0; i< folder.children.length; ++i){
		if(folder.children[i].url == URL){
			//$('#result').text(i);
			return i;
		}
	}
	return -1;
}
