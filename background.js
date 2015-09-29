console.log("background.js");

var _data = [];

var save = function(data, cb){
	//alert("hello");
	$.ajax({
		url      : "http://172.16.2.1:3000/chrome",
		type     : "POST",
		data     : data,
		dataType : 'json',
		success  : function(data) {
			//called when successful
			//alert("REEEEEESPONCE!");
			console.log(data);
			cb(data);
		},
		error : function(e) {
			//called when there is an error
			console.log(e.message);
			alert("errror! " + e);
		}
	});
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log("received: ", request);

	save(request, function(response){
		sendResponse({"response":response});
		doNotify(response);
	});
});

var doNotify = function(response){
	var opt = {
		type: "basic",
		title: "Scrape Results",
		message: response.msg,
		iconUrl: ""
	};
	chrome.notifications.create("", opt, function(){});

};
