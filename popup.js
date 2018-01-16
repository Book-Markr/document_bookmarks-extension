$(function(){

	$('#add').click(function(){
		chrome.bookmarks.getTree(function(FolderNodes){
			var i, flag= 0;
			for(i= 0; i< (FolderNodes[0].children[2].children.length); ++i){
				/*convert both strings to upper case to remove petty match conflicts*/
				if((FolderNodes[0].children[2].children[i].title.toUpperCase()) ==
					$('#folderPath').val().toUpperCase()){
						flag= 1;
						break;
				}
			}
			if(!flag)
				$('#test_eg').text('Folder not found');
			
			else{
				var ExtensionBookmarksNode= FolderNodes[0].children[2].children[i];
				var currentURL;

				$('#test_eg').text(ExtensionBookmarksNode.title);
				chrome.tabs.query({active:true, currentWindow:true}, function(currentTabs){
					currentURL= currentTabs[0].url;
					//$('#test_eg').text(currentURL);
					chrome.bookmarks.create({'parentId': ExtensionBookmarksNode.id,
											 'title': currentTabs[0].title + 
											 ' || ' +  $('#comment').val(),
											 'url': currentURL});

				});
			}
		});
	});
});
