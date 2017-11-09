$(function()){
	$('#add').click(function(){
		var comment= $('#commment').val();
		var path= $('#folderPath').val();
		chrome.tabs.getCurrent(function(tab){
			chrome.bookmarks.create({'parentId': bookmarkBar.id,
									 'title': comment,
									 'url': tab.url});
		});
	};
}
