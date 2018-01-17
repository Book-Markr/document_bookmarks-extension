$(function(){
	$('#add').click(function(){
		destination= $('#folderPath').val().toUpperCase();
		addBookmark(destination, function(errorCode){
			if(errorCode==0){  //success
				$('#result').text(destination);
			}
			else if(errorCode==1){
				$('#result').text("Folder not found");
			}
		});
	});
});

/*function that accepts a 'destination' folder name and a callback function `respond`*/
function addBookmark(destination, respond){
	chrome.bookmarks.getTree(function(FolderNodes){
		var i, failure= 1;
		for(i= 0; i< (FolderNodes[0].children[2].children.length); ++i){
		//convert both strings to upper case to remove petty match conflicts
			if((FolderNodes[0].children[2].children[i].title.toUpperCase()) == destination){
				failure= 0;
				break;
			}
		}
		if(failure==1){
			respond(1);
		}

		else{
			var ExtensionBookmarksNode= FolderNodes[0].children[2].children[i];
			var currentURL;
			chrome.tabs.query({active:true, currentWindow:true}, function(currentTabs){
				currentURL= currentTabs[0].url;
				chrome.bookmarks.create({'parentId': ExtensionBookmarksNode.id,
					'title': currentTabs[0].title + 
					' || ' +  $('#comment').val(),
					'url': currentURL});
			});
			respond(0);
		}
	});
}
