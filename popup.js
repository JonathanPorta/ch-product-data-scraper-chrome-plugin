function listview(station) {
console.log("listview");
	chrome.runtime.getBackgroundPage(function(bg){
		//alert("ggghjjgkhjkhggjhkjhgjhgkjkgjkgh");
		//var items = bg._data;
		bg.getPosts(station, function(items){
			if (items.length > 0)
			{
				var output = Mustache.render(templates.listview, {items:items});
				//alert("addding");
				var ul = $("<ul />");
				$.each(items, function(i){
					var item = $("<li> \
						<a target='_blank' title='"+items[i]['viewDate']+" - "+items[i]['title']+"' href='"+items[i]['link']+"'>"+items[i]['title']+"</a> \
					</li>");
					$("a", item).click(function(){
						//alert("click!");
						bg.insertPost(items[i]);
						return false;
					});
					ul.append(item);
					
				});
				$("#listview").html(ul);
			}
			//alert("no add");
		});
	});
}

window.onload = function(){
	$("#station_selector").change(function(e){
		var station = $(this).find('option:selected').val();
		if(station != "")
			listview(station);
	});

};

//alert("popup.js");
