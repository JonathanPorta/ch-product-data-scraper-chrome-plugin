$(function(){
	console.log("scraper.js");

	var urls = {};
	urls[location.href]=[];
	var inputs = $("input[name='PartNo']");
	for(i=0; i<inputs.length; i++)
	{
		urls[location.href].push($(inputs[i]).val().trim());
	}
	if(urls[location.href].length > 0)
	{

		var cat = prompt("What is the main category of products on this page?", document.title);
		var subCat = prompt("What is the sub category of products on this page?", document.title);
		if(cat != null && subCat != null)
		{
			console.log("We have products and categories, sending!", urls);
			var payload = {
				"url" : urls,
				"cat" : cat,
				"subCat":subCat
			};

			chrome.runtime.sendMessage(payload, function(response){
				console.log("Response received from mission control.", response);
			});
		}
	}
	else
	{
		console.log("No products found on this page.");
	}

});
