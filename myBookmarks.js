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
	folder.attr('class', "folder");
	var folderList= $('<ul>');

	var leaf= $('<div>');
	leaf.attr('class', "leaf");
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
	//if node has children
	if(subjectNode.children){
		var title= $('<li>');
		title.append('<h2>' + subjectNode.title + '</h2>');

		return title;
	}
	//else if leaf node
	else{
		var origTitle= subjectNode.title.split("||");
		var item= $('<li>');
		var descList= $('<dl>');

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

		descList.append(title);
		descList.append(url);
		descList.append(comment);

		item.append(descList);

		return item;
	}
}
