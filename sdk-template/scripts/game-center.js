function GameCenterAJAX() {

}

GameCenterAJAX.prototype.makeQuerystring = function(obj) {
	var string = '';
	for (var key in obj) {
		string = string + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
	}
	
	return string.substr(0, string.length - 1);
};

GameCenterAJAX.prototype.parseQuerystring = function() {
	var url = window.location.href;
	var idx = url.indexOf('?');
	var query = {};

	if(idx > 0) {
		var raw = url.substring(idx+1);
		var params = raw.split('&');
		for(var i = 0, len = params.length; i < len; i++) {
			var pair = params[i].split('=');
			if(pair.length !== 2) {
				break;
			}
			else {
				var key = decodeURIComponent(pair[0]);
				var value = decodeURIComponent(pair[1]);

				query[key] = value;
			}
		}
	}

	return query;
};

GameCenterAJAX.prototype.appendURI = function(url, key, value) {
	url += (url.indexOf('?') > 0 ? '&' : '?');
	url = url + encodeURIComponent(key) + '=' + encodeURIComponent(value);

	return url;
};

GameCenterAJAX.prototype.getURL = function(action, params) {
	params = params || '';
	if(typeof params == 'object') {
		params = this.makeQuerystring(params);
	}
	
	var url = location.protocol + '//' + 'www.i5r.com.cn' + action;
	if(params) {
		url = url + '?' + params;
	}

	var magic = this.getMagic();
	if(magic) {
		url = this.appendURI(url, 'magic', magic);
	}

	return url;
};

GameCenterAJAX.prototype.shareQzone = function(summary, title, pics, onDone) {
	var dstUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
	var config = {url: location.href, showcount: 1, desc: '', 
			summary: summary, title: title, pics: pics, site: 'Tangram',
			style: '203', width: 98, height: 22};	
	var params = [];
	for(var i in config) {
		params.push(i + '=' + encodeURIComponent(config[i] || ''));
	}
	var url = dstUrl + params.join('&');
	var shareBtn = document.getElementById('shareLink');
	shareBtn.setAttribute('href', url);
	shareBtn.click();
	onDone({code: 0, message: "success"});
};

GameCenterAJAX.prototype.shareWeibo = function(data, pic, onDone) {
	var packet = {};
	
	packet.pic = pic;
	packet.message= (data);
	packet.action = 'send-message';

	if(!this.userType) {
		this.userType = 'weibo';
	}
	var url = this.getURL("/users/" + this.userType + '.php');
	httpApiRequest(url, "POST", JSON.stringify(packet), onDone);
};

GameCenterAJAX.prototype.shareWeChat = function(onDone) {
	//TODO
};

GameCenterAJAX.prototype.isLogined = function(onDone) {
	if(!this.userType) {
		return onDone({code: -1, message: 'not login'});
	}
	else {
		var url = this.getURL("/users/" + this.userType + ".php", {action: 'islogined'});
		httpApiRequest(url, "POST", null, onDone);
	}
};

GameCenterAJAX.prototype.login = function(onDone) {
	if(!this.userType || (this.userType != 'qq' && this.userType != 'weibo' && this.userType != 'wechat')) {
		return onDone({code: -1, message: 'invalid user type'});
	}
	else {
		var src = window.location.href;
		var url = this.getURL("/users/" + this.userType + ".php", {action: 'init', from: src});
		window.location.href = url;
		onDone({code:0, message: 'success'});
	}
};

GameCenterAJAX.prototype.qqLogin = function(onDone) {
	this.userType = 'qq';
	return this.login(onDone);
};

GameCenterAJAX.prototype.weiboLogin = function(onDone) {
	this.userType = 'weibo';
	return this.login(onDone);
}; 

GameCenterAJAX.prototype.wechatLogin = function(onDone) {
	this.userType = 'wechat';
	return this.login(onDone);
}; 

GameCenterAJAX.prototype.logout = function(onDone) {
	if(!this.userType) {
		onDone({code: 0, message: 'success'});
	}
	else {
		var url = this.getURL('/users/' + this.userType + ".php", {action: 'logout'});
		this.userType = '';
		var done = onDone;
		return httpApiRequest(url, "POST", null, function(result) {
			done(result);
			if(result && result.code === 0) {
				location = location;
			}
		});	
	}
};

GameCenterAJAX.prototype.setAppID = function(appid) {
	this.appid = appid || '';
	this.like = {};

	return this;
};

GameCenterAJAX.prototype.weekAgo = function() {
	return Date.now() - 7*24*60*60 * 1000;
};

GameCenterAJAX.prototype.getMyAlsoLikes = function(onDone) {
	var uuid = this.getClientID();
	var url = this.getURL('/apps/get-alsolike.php', {uuid: uuid});
	httpApiRequest(url, "POST", null, onDone);
};

GameCenterAJAX.prototype.listApps = function(query, options, typeid, limit, skip, onDone) {
	if(typeof skip === 'number') {
		if(skip <= 0) {
			skip= 0;
		}
		options.skip = skip;
	}
	if(typeof limit === 'number') {
		if(limit <= 0) {
			limit = 0;
		}
		options.limit = limit;
	}
	if(typeid) {
		query.typeid = parseInt(typeid);
	}

	var data = {query: query, options: options};
	var url = this.getURL('/apps/list.php');

	httpApiRequest(url, "POST", JSON.stringify(data), onDone);

	return;
};

GameCenterAJAX.prototype.listPopularKeywords = function(limits, onDone) {
	var url = this.getURL('/apps/list-popularkeyword.php', {limits: limits});

	httpApiRequest(url, "POST", null, onDone);	
};

GameCenterAJAX.prototype.getPlayerStatis = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	console.log('appid: ' + this.appid);
	var uuid = this.getClientID();
	console.log('uuid : ' + uuid);
	var url = this.getURL('/apps/getplayer-statis.php', {uuid: uuid, appid: this.appid});
	httpApiRequest(url, "POST", null, onDone);	
};

GameCenterAJAX.prototype.listAppsByState = function(state, type, skip, limit, onDone) {
	if(!state) {
		onDone({code: -1, message: "invalid params"});
	}
	else {
		var url = this.getURL('/apps/list-bystate.php', {typeid: type||'', state: state, limit: limit, skip: skip});
		httpApiRequest(url, "POST", null, onDone);
	}
};

GameCenterAJAX.prototype.setAppState = function(appid, state, onDone) {
	if(!appid || !state) {
		onDone({code: -1, message: 'invalid params'});
	}
	else {
		var url = this.getURL('/apps/set-appstate.php', {appid: appid, state: state});
		httpApiRequest(url, "POST", null, onDone);
	}
};

GameCenterAJAX.prototype.addRecommend = function(appids, onDone) {
	var dstAppIds = [];
	var url = this.getURL('/apps/update-recommend.php');

	if(!appids) {
		return onDone({code: -1, message: 'invalid params'});	
	}

	if(Array.isArray(appids)) {
		appids.forEach(function(appid) {
			dstAppIds.push({appid: appid});	
		});
	}
	else {
		dstAppIds.push({appid: appids});	
	}
	
	var options = {};
	options.action = 'add';
	options.appids = dstAppIds;
	httpApiRequest(url, "POST", JSON.stringify(options), onDone);
};

GameCenterAJAX.prototype.deleteRecommend = function(appids, onDone) {
	var dstAppIds = [];
	var url = this.getURL('/apps/update-recommend.php');

	if(!appids) {
		return onDone({code: -1, message: 'invalid params'});	
	}

	if(Array.isArray(appids)) {
		dstAppIds = appids.slice();	
	}
	else {
		dstAppIds.push(appids);	
	}
	
	var options = {};
	options.action = 'remove';
	options.appids = dstAppIds;
	httpApiRequest(url, "POST", JSON.stringify(options), onDone);
};

GameCenterAJAX.prototype.listAppsByName = function(keyword, limit, skip, onDone) {
	var url = this.getURL('/apps/search.php', {type: 'appname', keyword: keyword});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.listAppsByDev = function(keyword, limit, skip, onDone) {
	var url = this.getURL('/apps/search.php', {type: 'devname', keyword: keyword});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.listAppsRelative = function(onDone) {
	return this.listApps({}, {}, 0, 20, 
		(Math.floor(Math.random()*(1000 - 10)) + 10), onDone);	
};

GameCenterAJAX.prototype.listByType = function(typeid, limit, skip, onDone) {
	return this.listApps({}, {}, typeid, limit, skip, onDone);
};

GameCenterAJAX.prototype.listAppsByLike = function(typeid, limit, skip, onDone) {
	var options = {sort: {like: -1}};		
	return this.listApps({}, options, typeid, limit, skip, onDone);
};

GameCenterAJAX.prototype.listAppsByStar = function(typeid, limit, skip, onDone) {
	var options = {sort: {star: -1}};		
	return this.listApps({}, options, typeid, limit, skip, onDone);
};

GameCenterAJAX.prototype.listAppsByTime = function(typeid, limit, skip, onDone) {
	var options = {sort: {mtime: -1}};		
	return this.listApps({}, options, typeid, limit, skip, onDone);
};

GameCenterAJAX.prototype.listAppsByUsage = function(typeid, limit, skip, onDone) {
	var options = {sort: {usage: -1}};		
	return this.listApps({}, options, typeid, limit, skip, onDone);
};

GameCenterAJAX.prototype.listAppsByRecommend = function(typeid, limit, onDone) {
	var url = this.getURL('/apps/list-recommend.php', {limit: limit, typeid: typeid});
	httpApiRequest(url, "POST", null, onDone);
	return;
};

//expire: week/month/''
GameCenterAJAX.prototype.listAppsEx = function(expire, typeid, field, limit, skip, onDone) {
	var query   = {ctime: {$gte: 0}};
	var options = {sort:{}};
	
	if(field !== 'like' && field !== 'usage' && field !== 'time' 
		&& field !== 'favorite' && field !== 'star' && field !== 'unlike') {
		return onDone({code: -1, message: 'invalid params'});	
	}
	if(expire !== 'week' && expire !== 'month' && expire !== '') {
		return onDone({code: -1, message: 'invalid params'});	
	}

	if(field === 'time') {
		field = 'ctime';
	}
	if(expire) {
		query.key = field;
		query.expire = expire;
	}
	else {
		options.sort[field] = -1; 
	}

	return this.listApps(query, options, typeid, limit, skip, onDone);
};

GameCenterAJAX.prototype.addFavorite = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var url = this.getURL('/apps/add-favorite.php', {appid: this.appid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.removeFavorite = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var url = this.getURL('/apps/remove-favorite.php', {appid: this.appid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.listUserApps = function(onDone, args) {
	args.uuid = this.getClientID()
	var url = this.getURL('/apps/userapps.php', args);
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.listFavorite = function(onDone) {
	return this.listUserApps(onDone, {type: 'favorite'});	
};

GameCenterAJAX.prototype.listPlayHistory = function(onDone) {
	return this.listUserApps(onDone, {type: 'history'});	
};

GameCenterAJAX.prototype.listComments = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}

	var url = this.getURL('/apps/list-comments.php', {appid: this.appid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.getApp = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}	
	var query = {appid: this.appid};

	return this.listApps(query, {}, '', null, null, onDone);
};

GameCenterAJAX.prototype.starApp = function(star, onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var uuid = this.getClientID();
	var url = this.getURL('/apps/star.php', {appid: this.appid, star: star, uuid: uuid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.startApp = function(onDone) {
	if(!this.appid && onDone) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var appid = this.appid;
	var uuid = this.getClientID();
	var url = this.getURL('/apps/use.php', {appid: this.appid, uuid: uuid});

	httpApiRequest(url, "POST", null, function(result) {
		onDone(result);
		if(result.code === 0) {
			window.location.href = result.data; 	
		}
	});

	return;
};

GameCenterAJAX.prototype.storageSet = function(key, value) {
	localStorage.setItem(key, value);
};

GameCenterAJAX.prototype.storageGet = function(key) {
	return localStorage.getItem(key);	
};

GameCenterAJAX.prototype.getClientID = function() {
	var clientID = this.storageGet('clientID');
	if(clientID == null) {
		clientID = this.getUUID();
		this.storageSet('clientID', clientID);
	}

	return clientID;
};

GameCenterAJAX.prototype.getMagic = function() {
	return magic = this.storageGet('magic');
};

GameCenterAJAX.prototype.setMagic = function(magic) {
	this.storageSet('magic', magic);
};

GameCenterAJAX.prototype.getUUID = function () {
	var hash = 0;
	var chars = ['0', '1', '2', '3', '4', '5',
			'6','7', '8','9'];
	var res = "";
	var max = Math.floor(chars.length);
	for(var i = 0; i < max; i++) {
		var id = Math.ceil(Math.random()*9); 
		res += chars[id];
	}
	var date = new Date();
	var src  = date.getTime() + res;
	 
	for(var j = 0; j < src.length; j++) {
		 var charx = src.charCodeAt(j);
		 hash = (hash<<5) - hash + charx;
		 hash = hash & hash;
	}
	return hash;
};

GameCenterAJAX.prototype.likeApp = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var uuid = this.getClientID();
	var url = this.getURL('/apps/like.php', {appid: this.appid, uuid: uuid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.cancelLikeApp = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var uuid = this.getClientID();
	var url = this.getURL('/apps/cancel-like.php', {appid: this.appid, uuid: uuid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.unlikeApp = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var uuid = this.getClientID();
	var url = this.getURL('/apps/unlike.php', {appid: this.appid, uuid: uuid});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.forkApp = function(appidFork, onDone) {
	if(!this.appid || !appidFork) {
		return onDone({code: -1, message: 'invalid params'});
	}	
	var url = this.getURL('/apps/fork.php', {appid: this.appid, appidFork: appidFork});
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.listForks = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var url = this.getURL('/apps/list-forks.php', {appid: this.appid});
	httpApiRequest(url, "POST", null, onDone);
	
	return;
};

GameCenterAJAX.prototype.commentApp = function(comment, onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var uuid = this.getClientID();
	var url = this.getURL('/apps/comment.php', {appid: this.appid, uuid:uuid, comment: comment});	
	httpApiRequest(url, "POST", null, onDone);
	
	return;
};

GameCenterAJAX.prototype.saveData = function(data, onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var url = this.getURL('/apps/save-data.php', {appid: this.appid});	

	httpApiRequest(url, "POST", data, onDone);

	return;
};

GameCenterAJAX.prototype.loadData = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var url = this.getURL('/apps/load-data.php', {appid: this.appid});	
	httpApiRequest(url, "POST", null, function(result) {
		//FIXME
		console.log(result);
	});

	return;
};

GameCenterAJAX.prototype.saveScore = function(score, onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	if(typeof score !== 'number') {
		return onDone({code: -1, message: 'invalid params'});
	}
	var url = this.getURL('/apps/save-score.php', {appid: this.appid, score: score});	
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.loadScore = function(onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	var url = this.getURL('/apps/load-score.php', {appid: this.appid});	
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.getHighScore = function(limits, onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'no set appid'});
	}
	if(typeof limits !== 'number') {
		return onDone({code: -1, message: 'invalid params'});
	}
	var url = this.getURL('/apps/get-high-score.php', {appid: this.appid, limits: limits});	
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.getPlayersScore = function(players, onDone) {
	if(typeof players !== 'object' || !players.length) {
		return onDone({code: -1, message: 'invalid params'});
	}

	var url = this.getURL('/apps/get-players-score.php', {appid: this.appid, players: JSON.stringify(players)});	
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.loadScoreByTime = function(time, limits, onDone) {
	if(!this.appid) {
		return onDone({code: -1, message: 'invalid params'});
	}
	
	limits = limits || '';
	if(time === 'week') {
		time = this.weekAgo();
	}
	else {
		time = 0;	
	}

	var url = this.getURL('/apps/loadscore-bytime.php', {appid: this.appid, time: time, limits: limits});	
	httpApiRequest(url, "POST", null, onDone);

	return;
};

GameCenterAJAX.prototype.getAppTypes = function(onDone) {
	var url = this.getURL('/apps/get-type.php');
	httpApiRequest(url, "POST", null, onDone);

	return;	
};

GameCenterAJAX.prototype.getWeixinConfig = function(onDone) {
	var url = this.getURL('/weixin/php/json_config.php');
	httpApiRequest(url, "POST", null, onDone);

	return;	
};

GameCenterAJAX.prototype.prepare = function() {
	var me = this;
	var magic = this.getMagic();

	if(!magic) {
		var url = this.getURL('/apps/prepare.php');
		httpApiRequest(url, "POST", null, function(result) {
			me.setMagic(result.data);
		});
	}
};

////////////////////////////////util////////////////////////////////
var XHRHttp = (function() {
	if(typeof window === 'undefined') {
		throw new Error('no window object persent');
	}
	else if(window.XMLHttpRequest) {
		return window.XMLHttpRequest;
	}
	else if(window.ActiveXObject) {
		var axs = [
			'Msxml2.XMLHTTP.6.0',
			'Msxml2.XMLHTTP.3.0',
			'Microsoft.XMLHTTP'
		];
		for (var i = 0; i < axs.length; i++) {
			try {
				var ax = new(window.ActiveXObject)(axs[i]);
				return function() {
					if(ax) {
						var ax_ = ax;
						ax = null;
						return ax_;
					}
					else {
						return new(window.ActiveXObject)(axs[i]);
					}
				};
			}	
			catch(e) {}
		}
		throw new Error('ajax not supported in this browser');
	}
	else {
		throw new Error('ajax not supported in this browser');
	}
}());

function creatXMLHTTPRequest() {
	var xhr = new XHRHttp();

	return xhr;
}

function httpDoRequest(info) {
	var xhr = creatXMLHTTPRequest();

	if(!info || !info.url) {
		return false;
	}

	var url = info.url;
	var data= info.data;
	var method = info.method ? info.method : "GET";

	xhr.open(method, url, true);

	if(info.noCache) {
		xhr.setRequestHeader('If-Modified-Since', 0);
	}

	if(info.headers) {
		for(var key in info.headers) {
			var value = info.headers[key];
			xhr.setRequestHeader(key, value);
		}
	}

	if(xhr) {
		xhr.send(info.data ? info.data : null);

		if(!xhr.onprogress) {
			xhr.onreadystatechange = function() {
				if(info.onProgress) {
					info.onProgress(xhr);	
				}	
				if(xhr.readyState === 4) {
					if(info.onDone) {
						info.onDone(true, xhr, xhr.responseText);
						console.log("response:" + xhr.responseText);
					}
				}
				console.log("onreadystatechange:" + xhr.readyState);
				return;
			};
		}
		else {
			xhr.onprogress = function(e) {
				var total = e.total;
				if(info.onProgress) {
					info.onProgress(xhr);
				}
				console.log("get:" + total);
			};

			xhr.onload = function(e) {
				if(info.onDone) {
					info.onDone(true, xhr, e.target.responseText);
				}	
			};

			xhr.onerror = function(e) {
				if(info.onDone) {
					info.onDone(false, xhr, xhr.responseText);
				}
			};
		}
	}

	return true;
}

function httpApiRequest(url, method, data, onDone, raw) {
	var rInfo = {};

	rInfo.url = url;
	rInfo.data= data;
	rInfo.noCache = true;
	rInfo.noProxy = false;
	rInfo.method  = method ? method : "GET";

	rInfo.onDone = function(result, xhr, respContent) {
		try {
			var data = raw ? respContent : JSON.parse(respContent);	
		}	
		catch(e) {
			var data = {};
			data.code = -1;
			data.message = e.message;

			onDone(data);
			console.log(e.message);

			return;
		}

		try {
			onDone(data);
		}
		catch(e) {
			console.log(e.message);
			return;
		}
	};

	httpDoRequest(rInfo);

	return;
}

///////////////////////////////////////////////////////////////////

function GameCenter() {

};

GameCenter.createShareLink = function() {
	if(document.getElementById('shareLink')) {
		return;
	} else {
		var shareLink = document.createElement('a');
		shareLink.setAttribute('target', '_blank');
		shareLink.setAttribute('id', 'shareLink');
		var body = document.getElementsByTagName('body');
		if(body && body.length) {
			document.getElementsByTagName('body')[0].appendChild(shareLink);
		}
	}
};

GameCenter.addLoadEvent = function(func) {
	var oldFunc = window.onload;

	if(typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldFunc();
			func();
		};
	}
};

GameCenter.begin = function() {
	var i5rhandle = GameCenter.getInstance();		

	i5rhandle.prepare();
	GameCenter.createShareLink();
	//GameCenter.addLoadEvent(GameCenter.createShareLink);
};

GameCenter.getInstance = function() {
	if(GameCenter.instance) {
		return GameCenter.instance;
	}
	if(location.href.indexOf("www.i5r.com.cn") > 0 
		|| location.href.indexOf("www.tangide.com") > 0) {

		GameCenter.instance = new GameCenterAJAX();
		var params = GameCenter.instance.parseQuerystring();
		GameCenter.instance.setAppID(params.appid);
	}

	return GameCenter.instance;
}

GameCenter.begin();
