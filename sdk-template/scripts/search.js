function searchInit() {
	var button = document.getElementById('search'); 
	button.setAttribute('onclick', "javascript:searchGame();");
	var button2 = document.getElementById('searchByDev'); 
	button2.setAttribute('onclick', "javascript:searchGameByDev();");

	var button3 = document.getElementById('expireWeek');
	button3.setAttribute('onclick', "javascript:expireWeek();");

	var button4 = document.getElementById('hotKeyword');
	button4.setAttribute('onclick', "javascript:hotKeyword();");

	var button5 = document.getElementById('player-Statis');
	button5.setAttribute('onclick', "javascript:getPlayerStatis();");

	var button6 = document.getElementById('listRandom');
	button6.setAttribute('onclick', "javascript:listRandom();");

	i5rHandle = GameCenter.getInstance();
}

function listRandomCallback(result) {

}

function listRandom() {
	i5rHandle.listAppsRelative(listRandomCallback);
}

function getPlayerStatisCallback(result) {

}

function getPlayerStatis() {
	i5rHandle.setAppID(10014);
	i5rHandle.getPlayerStatis(getPlayerStatisCallback);
}

function hotKeywordCallback(result) {

}

function hotKeyword() {
	i5rHandle.listPopularKeywords(hotKeywordCallback);
}

function onDoneExpireWeek(result) {
	
}

function expireWeek() {
	i5rHandle.listAppsEx('week', 0, 'usage', 0, 0, onDoneExpireWeek);
}

function searchGame() {
    var keyWord = document.getElementById('keyWord').value;
    i5rHandle.listAppsByName(keyWord, 0, 0, searchGameCallback);
}

function searchGameByDev() {
    var keyWord = document.getElementById('keyWord-dev').value;
    i5rHandle.listAppsByDev(keyWord, 0, 0, searchGameCallback);
}

function gotoGame(thisform) {
    var url = window.location.href;
    var index = url.lastIndexOf('/');
    var dest  = url.substr(0, index+1) + thisform.id + ".html";
//    console.log(dest);
//    window.location.href = dest;
	i5rHandle.setAppID(thisform.id);
	i5rHandle.startApp(function(result) {
		console.log(result);	
	});
}

function searchGameCallback(data) {
   if(data.code !== 0 || data.data.length === 0) {
        alert('no data');
   } else {
       var score_board = document.getElementById('score_board');
        var old_ul = document.getElementById('list');
        if(old_ul != null) {
            old_ul.parentNode.removeChild(old_ul);
        }          
        var ul = document.createElement('ul');
       ul.id ="list";
       score_board.appendChild(ul);
       for(var index= 0, length = data.data.length; index < length; index++) {
           var li = document.createElement('li');
           li.id = data.data[index].appid;

           var img   = document.createElement('img');
           img.setAttribute('src', './test.jpg');
           li.appendChild(img);

           var h3  = document.createElement('h3');
           var name  = document.createTextNode("名称:"+data.data[index].meta.general.appname);
           h3.appendChild(name);
           li.appendChild(h3);

       //    var p  = document.createElement('p');
       //    var text = "点击量:" + data.info[index].game_hits + "  点赞数:" + data.info[index].game_likes + " 评分: " + data.info[index].game_rate;
       //    var hits  = document.createTextNode(text);
       //    p.appendChild(hits);
       //    li.appendChild(p);

           p2  = document.createElement('p');
           var detail = document.createTextNode("详情:" +data.data[index].meta.general.appdesc);
           p2.appendChild(detail);
           li.appendChild(p2);

           li.setAttribute("onclick", "javascript:gotoGame(this);");
           ul.appendChild(li);
       }
   } 
}


addLoadEvent(searchInit);
