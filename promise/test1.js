function getURL(url) {
	return new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.onload = function() {
			if(req.status === 200) {
				resolve(req.responseText);
			}
			else {
				reject(new Error(req.statusText));
			}
		}
		req.onerror = function() {
			reject(new Error(req.statusText));
		}
		req.send();
	})
}
