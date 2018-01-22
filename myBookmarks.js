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

		//node has children
		if(currentNode.children){
			
			item= getItemDetails(currentNode);
			folderList.append(item);

			showChildren(currentNode, folderList);
		}
		//node is leaf node
		else{
			
			item= getItemDetails(currentNode);
			leafList.append(item);
		}

		folder.append(folderList);
		leaf.append(leafList);
		destination.append(folder);
		destination.append(leaf);
	}
}

function getItemDetails(subjectNode)
/* Returns item in the following format-
 * >Subject- 
 * >URL-
 * >Comment-
 */
{
	if(subjectNode.children){
		var item= $('<ul>');
		var title= $('<li>');
		title.append('<strong>' + subjectNode.title + '</strong>');

		item.append(title);
	}
	else{
		var origTitle= subjectNode.title.split("||");
		var item= $('<dl>');

		var title= $('<dt>');
		title.text(origTitle[0]);

		var urlData= $('<a>');
		urlData.attr('href', subjectNode.url);
		urlData.text(subjectNode.url);
		var url= $('<dd>');
		url.append(urlData);

		if(origTitle[1]){
			var comment= $('<dd>');
			var i;
			for(i= 1; i< origTitle.length; ++i){
				comment.append('<i>' + origTitle[i] + '<i>' + '<br>');
			}
		}

		item.append(title);
		item.append(url);
		item.append(comment);
	}

	return item;
}
