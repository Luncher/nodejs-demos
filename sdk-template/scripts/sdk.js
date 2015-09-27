function GameSurface() {
	this.sync = null;
	this.clickid = null;
	this.gameId = 11;
    this.login  = false;
	//this.remote = "../../../server/controller/controller.php";
	this.remote = "http://geniuslc.sinaapp.com/game_server/server/controller/controller.php";
	this.clientId = null;
    //game type
    this.GAME_TYPE_DEF     = 0;
    this.GAME_TYPE_RPG     = 1;
    this.GAME_TYPE_ACTION  = 2;
    this.GAME_TYPE_DEFENSE = 3;
    this.GAME_TYPE_CASUAL  = 4;
    this.GAME_TYPE_STRAGY  = 5;
    this.GAME_TYPE_CHILD   = 6;
    
    //commu command 
    this.GAME_CLICKED             = 'game_clicked';
    this.ACK_GAME_CLICKED         = 'ack_game_clicked';
    this.GET_GAME_STATIS          = 'get_game_statis';
    this.ACK_GET_GAME_STATIS      = 'ack_get_game_statis';
    this.GET_GAME_RANK            = 'get_game_rank';
    this.ACK_GET_GAME_RANK        = 'ack_get_game_rank';
    this.GET_GAME_CACHE           = 'get_game_cache';
    this.ACK_GET_GAME_CACHE       = 'ack_get_game_cache';
    this.SAVE_GAME_CACHE          = 'save_game_cache';
    this.ACK_SAVE_GAME_CACHE      = 'ack_save_game_cache';
    this.GAME_LIKE                = 'game_like';
    this.ACK_GAME_LIKE            = 'ack_game_like';
    this.GET_USER_INFO            = 'get_user_info';    
    this.ACK_GET_USER_INFO        = 'ack_get_user_info';    
    this.GET_SCORE                = 'get_score';
    this.ACK_GET_SCORE            = 'ack_get_score';
    this.SAVE_SCORE               = 'save_score';
    this.ACK_SAVE_SCORE           = 'ack_save_score';
    this.SELECT_GAME_LIMIT        = 'select_game_limit';
    this.ACK_SELECT_GAME_LIMIT    = 'ack_select_game_limit';
    this.GET_RANK_BY_TYPE         = 'get_rank_by_type';
    this.ACK_GET_RANK_BY_TYPE     = 'ack_get_rank_by_type';
    this.GET_GAME                 = 'get_game';
    this.ACK_GET_GAME             = 'ack_get_game';
    this.ADD_GAME                 = 'add_game';
    this.ACK_ADD_GAME             = 'ack_add_game';
    this.SELECT_GAME_BY_KEYWORD   = 'select_game_by_keyword';
    this.ACK_SELECT_GAME_BY_KEYWORD='ack_select_game_by_keyword';
    this.SELECT_GAME_BY_TYPE      = 'select_game_by_type';
    this.ACK_SELECT_GAME_BY_TYPE  = 'ack_select_game_by_type';
    this.GET_GAME_TYPE            = 'get_game_type';
    this.ACK_GET_GAME_TYPE        = 'ack_get_game_type';

    //开始游戏
	this.start = function() {
		this.gameId = this.parseGameId();
		var command = {
			'cmd':this.GAME_CLICKED,
			'gameId': this.gameId};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = null;
		request.makeRequest();
	}

	this.pause = function() {

	}

	this.stop = function() {

	}

	this.restart = function() {

	}
    
    //获取游戏统计
    this.getStatis = function(callback) {
        this.gameId  = this.parseGameId();
        var command = {
			'cmd':this.GET_GAME_STATIS,
			'gameId': this.gameId};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData  = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }

    //点赞
    this.like    = function(callback) {
        this.gameId  = this.parseGameId();
        this.clientId = this.getClientId();
		var command = {
			'cmd':this.GAME_LIKE,
			'gameId': this.gameId ,
			'userId': this.clientId};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData  = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }

    //按：时间/得分获取排行榜
    this.getRankByType = function(type, order, offset, rows, callback) {
        this.gameId  = this.parseGameId();
        var command = {
            'cmd':this.GET_RANK_BY_TYPE,
            'gameId':this.gameId,
            'order':order,
            'type':type,
            'offset':offset,
            'rows':rows};
        var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }

	//排行接口
	this.getRank = function(order, callback)  {
        this.gameId  = this.parseGameId();
		var command = {
			'cmd':this.GET_GAME_RANK,
			'gameId': this.gameId,
			'order': order,
			'offset':0,
			'rows':-1};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
	}
    

	//获取进度缓存
	this.getSaveData = function(callback) {
        this.gameId    = this.parseGameId();
        if(this.login) {
            var command = {
                'cmd':this.GET_GAME_CACHE,
                'gameId': this.gameId};
            var json = JSON.stringify(command);
            var request = new Ajax();
            request.remote	  = this.remote;
            request.sendData = "json_string="+json;
            request.callback  = callback;
            request.makeRequest();
        } else {
           var data = this.fetchLocalGameCache(this.gameId); 
           var errno = 0;
           if(data == null) {
                errno = 1;
           }
           var result = {
            'data' : data,
            'errno': errno
           };
           callback(result);
        }
  	}

    this.fetchLocalGameCache = function(gameId) {
        var data = window.localStorage.getItem(gameId);
    	return data;
    }

	//保存进度
	this.saveData = function(data, callback) {
        this.gameId    = this.parseGameId();
        if(this.login) {
            var command = {
			'cmd':this.SAVE_GAME_CACHE,
			'gameId': this.gameId,
			'data': data};
    		var json = JSON.stringify(command);
	    	var request = new Ajax();
	    	request.remote	  = this.remote;
		    request.sendData = "json_string="+json;
    		request.callback  = callback;
	    	request.makeRequest();
        } else {
           window.localStorage.setItem(this.gameId, data); 
        }
	}
    
    //游戏排行
    this.selectTotalGame = function(order, offset, rows, callback) {
		var command = {
			'cmd':this.SELECT_GAME_LIMIT,
            'order':order,
            'offset':offset,
            'rows':rows};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }
    //获取游戏类别 
    this.getGameType = function(callback) {
        var command = {
			'cmd':this.GET_GAME_TYPE};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }

    //分类查找游戏
    this.selectGameByType = function(callback, gameType, order, offset, rows) {
        var command = {
		'cmd':this.SELECT_GAME_BY_TYPE,
        'game_type':gameType,
        'order':order,
        'offset':offset,
        'rows':rows};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }
   
    //游戏搜索
    this.searchGame = function(keyWord, callback) {
        var command = {
		'cmd':this.SELECT_GAME_BY_KEYWORD,
        'key_word':keyWord};
		var json = JSON.stringify(command);
		var request = new Ajax();
		request.remote	  = this.remote;
		request.sendData = "json_string="+json;
		request.callback  = callback;
		request.makeRequest();
    }

    this.getClientId = function() {
       var clientId = window.localStorage.getItem('client_id');
       if(clientId == null) {
           clientId = this.hashCode();
           window.localStorage.setItem('client_id', clientId);
       }
       return clientId;
   }
   this.hashCode = function() {
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
   }

   this.parseGameId = function() {
        var url = window.location.href;
	    var index = url.lastIndexOf('/');
	    var index2 = url.lastIndexOf('.');
	    var dest  = url.substr(index+1, index2-index-1);
	    return dest;
   }
}



function sdkInit() {
	ih5game = new GameSurface();
	window.ih5game = ih5game;
}


function addLoadEvent(func)
{
	var oldFunc = window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function(){
			oldFunc();
			func();
		}
	}
}


addLoadEvent(sdkInit);

function Ajax()
{
	this.contentType = 'application/x-www-form-urlencoded; charset=utf-8';
	this.request  = null;
	this.response = null;
	this.remote	  = null;
	this.sendData= null;
	this.callback = null;
	this.progressCallback = null;

	this.makeRequest = function(remote, callback, data, async, progress)
	{
		if(data) this.sendData = data;
		if(remote) this.remote = remote;
		if(callback) this.callback = callback;
		if(typeof(async) != 'boolean') async = true;
		if(progress)	this.progressCallback = progress;
		if(this.remote) 
		{
			if(window.XMLHttpRequest) 
			{
		        this.request = new XMLHttpRequest();
		        if(this.request.overrideMimeType) 
		        {
		            //this.request.overrideMimeType('text/xml');
		        }
		    }
		    else if(window.ActiveXObject) 
		    {
		        try 
		        {
		            this.request = new ActiveXObject('Msxml2.XMLHTTP');
		        }
		        catch(e) 
		        {
		            try 
		            {
		                this.request = new ActiveXObject('Microsoft.XMLHTTP');
		            }
		            catch(e) {}
		        }
		    }

		    if(this.request) 
		    {
		    	if(async) this.request.onreadystatechange = this.requestHandler.bind(this);
		    	if(this.progressCallback) this.request.upload.addEventListener("progress", this.progressCallback, false);
			    if(this.sendData) 
			    {
				    this.request.open('POST', this.remote, async);
				    if(this.contentType){
				    	this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
				    }
				    this.request.send(this.sendData);
			    }
			    if(!async) this.getResponse();
		    }
		}
	}


	this.requestHandler = function() 
	{
	    if(this.request && this.request.readyState == 4) 
	    {
			switch(this.request.status) 
			{
				case 200:
					this.getResponse();
					return true;
				/*
				case 12029:
				case 12030:
				case 12031:
				case 12152:
				case 12159:
					this.request.onreadystatechange = function() {};
					this.makeRequest();
					return false;
				default:
					this.xmlDoc = null;
					if(!this.noWarning) alert('Server returned ' + this.request.status);
					if(typeof(this.callback) == 'function') this.callback();
					return false;
				*/
			}
	    }
	}

	this.getResponse = function() 
	{
		this.response = this.request.responseText;
		if(typeof(this.callback) == 'function') 
		{
			var data = this.response;
			data = JSON.parse(data);
			this.callback(data);
		}
	}
}

