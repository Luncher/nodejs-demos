function Desktop() {
    this.perPage     = 5;
    this.ratePageIdx = 1;
    this.hotPageIdx  = 1;

    this.getRateCallback = function(data) {
        if(data.code === 0) {
            var score_board = document.getElementById('score_board');
            var ul = document.createElement('ul');
            score_board.appendChild(ul);
            for(var index= 0, length = data.data.length; index < length; index++) {

                var li = document.createElement('li');
                li.id = data.data[index].appid;

                var img   = document.createElement('img');
                img.setAttribute('src', './test.jpg');
                li.appendChild(img);

                var h3  = document.createElement('h3');
                var name  = document.createTextNode("名称:"+data.data[index].name);
                h3.appendChild(name);
                li.appendChild(h3);

                var p  = document.createElement('p');
                var text = "点击量:" + data.data[index].usage + "  点赞数:" + data.data[index].like + " 星级: " + data.data[index].star;
                var usage  = document.createTextNode(text);
                p.appendChild(usage);
                li.appendChild(p);

                p2  = document.createElement('p');
                var detail = document.createTextNode("详情:" +data.data[index].meta.general.appdesc);
                p2.appendChild(detail);
                li.appendChild(p2);

                li.setAttribute("onclick", "javascript:gotoGame(this);");
                ul.appendChild(li);

            }

        } else {
            
        }
    }


    this.getRateBoard = function() {
		i5rHandle.listAppsByStar('', this.perPage, this.perPage* (this.ratePageIdx - 1), this.getRateCallback);
    }

    this.getRecommandCallback = function(data) {
        if(data.code === 0) {
            var score_board = document.getElementById('recommand_board');
            var ul = document.createElement('ul');
            score_board.appendChild(ul);
            for(var index= 0, length = data.data.length; index < length; index++) {

                var li = document.createElement('li');
                li.id = data.data[index].id;

                var img   = document.createElement('img');
                img.setAttribute('src', './test.jpg');
                li.appendChild(img);

                var h3  = document.createElement('h3');
                var name  = document.createTextNode("名称:"+data.data[index].name);
                h3.appendChild(name);
                li.appendChild(h3);

                var p  = document.createElement('p');
                var text = "点击量:" + data.data[index].usage + "  点赞数:" + data.data[index].like + " 星级: " + data.data[index].star;
                var usage  = document.createTextNode(text);
                p.appendChild(usage);
                li.appendChild(p);

                p2  = document.createElement('p');
                var detail = document.createTextNode("详情:" +data.data[index].meta.general.appdesc);
                p2.appendChild(detail);
                li.appendChild(p2);

                li.setAttribute("onclick", "javascript:gotoGame(this);");
                ul.appendChild(li);
            }

        }
    }

    this.getRecommandBoard = function() {
		i5rHandle.listAppsByRecommend('', this.perPage, this.perPage* (this.ratePageIdx - 1), this.getRecommandCallback);
    }

    this.getHotCallback = function(data) {
         if(data.code === 0) {
            var score_board = document.getElementById('hot_board');
            var ul = document.createElement('ul');
            score_board.appendChild(ul);
            for(var index= 0, length = data.data.length; index < length; index++) {

                var li = document.createElement('li');
                li.id = data.data[index].id;

                var img   = document.createElement('img');
                img.setAttribute('src', './test.jpg');
                li.appendChild(img);

                var h3  = document.createElement('h3');
                var name  = document.createTextNode("名称:"+data.data[index].name);
                h3.appendChild(name);
                li.appendChild(h3);

                var p  = document.createElement('p');
                var text = "点击量:" + data.data[index].usage + "  点赞数:" + data.data[index].like + " 星级: " + data.data[index].star;
                var usage  = document.createTextNode(text);
                p.appendChild(usage);
                li.appendChild(p);

                p2  = document.createElement('p');
                var detail = document.createTextNode("详情:" +data.data[index].meta.general.appdesc);
                p2.appendChild(detail);
                li.appendChild(p2);

                li.setAttribute("onclick", "javascript:gotoGame(this);");
                ul.appendChild(li);
            }

        } else {
            
        }
    }

    this.getHotBoard = function() {
		i5rHandle.listAppsByUsage('', this.perPage, this.perPage* (this.ratePageIdx - 1), this.getHotCallback);
    }
}

function onDonex(data) {

}

function shareQzone() {
	i5rHandle.shareQzone('i5r-sum', 'i5r-title', '', onDonex);
}

function shareWeibo() {
	var data = 'hello+1 你 好 '; 
	i5rHandle.shareWeibo(data, 'http://tangide.duapp.com/cantk-game/assets/images/ball.png', onDonex);
}

function addRecommend() {
	i5rHandle.addRecommend('10014', function(ret) {
		console.log(ret);	
	});
}

function delRecommend() {
	i5rHandle.deleteRecommend('10014', function(ret) {
		console.log(ret);	
	});
}

function listRecommend() {
	i5rHandle.listAppsByRecommend('', 10, function(ret) {
		console.log(ret);	
	});
}

function setAppState() {
	i5rHandle.setAppState('10014', 'normal', function(ret) {
		console.log(ret);
	});
}

function listAppsByState() {
	i5rHandle.listAppsByState('normal', '', 100, function(ret) {
		console.log(ret);
	});
}

function checkJsApi() {
	wx.checkJsApi({
		jsApiList: ['chooseImage', 'onMenuShareTimeline', 'onMenuShareAppMessage'],
		success: function(res) {
			console.log(JSON.stringify(res));	
		}
	});
}

function getConfig(config) {
	config.debug = true;
	wx.config(config);
}

function getWeixinConfig() {
	wx.ready(weixinReady);
	wx.ready(weixinError);
	i5rHandle.getWeixinConfig(function(ret) {
		console.log(ret);	
		getConfig(ret);
	});
}

function weixinReady() {

}

function weixinError(res) {
	console.log(JSON.stringify(res));
}

function successShareMessage() {

}

function shareMessage() {

}

function initDesktop() {
	i5rHandle = GameCenter.getInstance();
    desktop = new Desktop();
    desktop.getRateBoard();
    desktop.getHotBoard();
    desktop.getRecommandBoard();
    window.desktop = desktop;
	
	var button = document.getElementById('shareQzone');
	button.setAttribute('onclick', "javascript:shareQzone();");

	var button2 = document.getElementById('shareWeibo');
	button2.setAttribute('onclick', "javascript:shareWeibo();");

	var button3 = document.getElementById('add_Recommend');
	button3.setAttribute('onclick', "javascript:addRecommend();");

	var button4 = document.getElementById('del_Recommend');
	button4.setAttribute('onclick', "javascript:delRecommend();");

	var button5 = document.getElementById('list_Recommend');
	button5.setAttribute('onclick', "javascript:listRecommend();");

	var button6 = document.getElementById('set_appState');
	button6.setAttribute('onclick', "javascript:setAppState();");

	var button7 = document.getElementById('listby_state');
	button7.setAttribute('onclick', "javascript:listAppsByState();");

	var button8 = document.getElementById('get_weixinState');
	button8.setAttribute('onclick', "javascript:getWeixinConfig();");

	var button9 = document.getElementById('check_jsapi');
	button9.setAttribute('onclick', "javascript:checkJsApi();");

	var button10 = document.getElementById('share_message');
	button10.setAttribute('onclick', "javascript:shareMessage();");

}

function gotoGame(thisform) {
    var url = window.location.href;
    var index = url.lastIndexOf('/');
    var dest  = url.substr(0, index+1) + thisform.id + ".html";
    console.log(dest);
    window.location.href = dest;
}


addLoadEvent(initDesktop);
