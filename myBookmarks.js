$(function(){
	chrome.bookmarks.getTree(function(FolderNodes){
		var MobileBookmarks= FolderNodes[0].children[2];
		var destination= $('#folderL1');
		showChildren(MobileBookmarks, destination);
	});
});

function showChildren(parentNode, destination)
{
	var folder= $('<div>');
	folder.attr('id', "folder");
	var folderList= $('<ul>');
	var leaf= $('<div>');
	leaf.attr('id', "last");
	var leafList= $('<ul>');

	var i;
	for(i= 0; i< parentNode.children.length; ++i){
		currentNode= parentNode.children[i];

		if(currentNode.children){
			//create an anchor tag with the required link
			var anchor= $('<a>');
			anchor.attr('href', currentNode.url);
			anchor.text(currentNode.title);
			//create a list item and add the `anchor` to it
			var item= $('<li>');
			item.append(anchor);
			//add the list item to the `<ul>` defined above
			folderList.append(item);

			showChildren(currentNode, folderList);
		}
		else{
			//create an anchor tag with the required link
			var anchor= $('<a>');
			anchor.attr('href', currentNode.url);
			anchor.text(currentNode.title);
			//create a list item and add the `anchor` to it
			var item= $('<li>');
			item.append(anchor);
			//add the list item to the `<ul>` defined above
			leafList.append(item);
		}

		folder.append(folderList);
		leaf.append(leafList);
		destination.append(folder);
		destination.append(leaf);
	}
}
