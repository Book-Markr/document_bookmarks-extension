$(function(){
	chrome.bookmarks.getTree(function(FolderNodes){
		var allBookmarks= FolderNodes[0];
		var destination= $('#bookmarks');
		addChildren(allBookmarks, destination);
		$('details').find('summary').css('cursor', 'pointer');
	});
});

function addChildren(parentNode, destination)
/* Adds children of `parentNode` to the `destination`*/
{
	// make separate divs for folder nodes and leaf nodes
	var $folder= $('<div>').attr('class', 'folder');
	var $leaf= $('<div>').attr('class', 'leaf');

	var $folderList= $('<ul>');
	$folderList.css('list-style', 'none');
	$folder.append($folderList);

	var $leafList= $('<ul>');
	$leaf.append($leafList);

	var i;
	for(i= 0; i< parentNode.children.length; ++i){
		currentNode= parentNode.children[i];

		// if folder node, then add to folderList and recursively call its children
		if(currentNode.children){
			item= generateItemDetails(currentNode);
			$folderList.append(item);

			addChildren(currentNode, item.find('details'));
		}
		// if leaf node, then add to leafList
		else{
			item= generateItemDetails(currentNode);
			$leafList.append(item);
		}

		destination.append($folder);
		destination.append($leaf);
	}
}

function generateItemDetails(subjectNode)
/* Returns the appropriate <li> based on whether `subjectNode` is a
 * folder or a leaf
 */
{
	var $listItem= $('<li>');

	//if folder node
	if(subjectNode.children){
		var title= $('<details>');
		title.append('<summary>' + subjectNode.title + '</summary>');

		$listItem.append(title);
	}
	//else if leaf node
	else{
		var origTitle= subjectNode.title.split("||");
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

		$listItem.append(descList);
	}
	return $listItem;
}
