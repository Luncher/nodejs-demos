function getAppid() {
	var url = window.location.href;
	var idx1 = url.lastIndexOf('/');
	var idx2 = url.lastIndexOf('.');
	var substr = url.substring(idx1+1, idx2);
	var id = parseInt(substr);

	return id;
}

function initButton() {
	i5rHandle = GameCenter.getInstance();
	i5rHandle.setAppID(getAppid());
	
	var addFavorite = document.getElementById('add-favorite'); 
	addFavorite.setAttribute("onclick", "javascript:addFavorite();");		

	var removeFavorite = document.getElementById('remove-favorite'); 
	removeFavorite.setAttribute("onclick", "javascript:removeFavorite();");		

	var submitComment = document.getElementById('submit-comment');
	submitComment.setAttribute("onclick", "javascript:submitComment();");

	var list= document.getElementById('get-comments');
	list.setAttribute("onclick", "javascript:listComments();");

	var begin = document.getElementById('begin');
	begin.setAttribute("onclick", "javascript:startGame();");

	var like = document.getElementById('like');
	like.setAttribute("onclick", "javascript:likeGame();");

	var cancelLike = document.getElementById('cancel-like');
	cancelLike.setAttribute("onclick", "javascript:cancelLikeGame();");

	var unLike = document.getElementById('unlike');
	unLike.setAttribute("onclick", "javascript:unLikeGame();");

	var star = document.getElementById('star');
	star.setAttribute("onclick", "javascript:starGame();");

	var save = document.getElementById('saveData');
	save.setAttribute("onclick", "javascript:saveData();");

	var getSave = document.getElementById('getData');
	getSave.setAttribute("onclick", "javascript:getSaveData();");
    
//    var getWeek = document.getElementById('weekBoard');
//	getWeek.setAttribute("onclick", "javascript:getWeekBoard();");
//
//    var getMounth = document.getElementById('mounthBoard');
//	getMounth.setAttribute("onclick", "javascript:getMounthBoard();");
//    
//    var getTotal = document.getElementById('totalBoard');
//	getTotal.setAttribute("onclick", "javascript:getTotalBoard();");

    var getScore = document.getElementById('scoreBoard');
	getScore.setAttribute("onclick", "javascript:getScoreBoard();");

//    var orderByScore = document.getElementById('Score');
//	orderByScore.setAttribute("onclick", "javascript:orderByScore();");
//    var PlayCount = document.getElementById('Count');
//	PlayCount.setAttribute("onclick", "javascript:orderByPlayCount();");
//    order = "total_score";
}

function addFavorite() {
	i5rHandle.addFavorite(callBack);	
}

function removeFavorite() {
	i5rHandle.removeFavorite(callBack);	
}

function listComments() {
	i5rHandle.listComments(callBack);	
}

function submitComment() {
	var comment = document.getElementById('comment').value;
	i5rHandle.commentApp(comment, callBack);
}

function orderByScore() {
   order = 'total_score';  
}

function orderByPlayCount() {
   order = 'playcount'; 
   
}

function getWeekBoardCallback(data) {
    if(data.errno == 0) {
        var score_board = document.getElementById('sub_board');
        var old_head = document.getElementById('head_title');
        if(old_head != null) {
           var parent = old_head.parentNode; 
           parent.removeChild(old_head);
        }

        var old_ul  = document.getElementById('list');
        if(old_ul != null) {
           var parent = old_ul.parentNode;
           parent.removeChild(old_ul);
        }

        var head = document.createElement('h3');
        head.id="head_title";
        head.appendChild(document.createTextNode("一共:"+data.info.user_count+"人获得成绩"));
        score_board.appendChild(head);
        var ul = document.createElement('ul');
        ul.id = 'list';
        score_board.appendChild(ul);
        for(var index= 0, length = data.info.list.length; index < length; index++) {

           var li = document.createElement('li');
           li.id = data.info.list[index].user_id;

           var img   = document.createElement('img');
           img.setAttribute('src', './test.jpg');
           li.appendChild(img);

           var h3  = document.createElement('h3');
           var name  = document.createTextNode("玩家"+data.info.list[index].user_id);
           h3.appendChild(name);
           li.appendChild(h3);

           var p  = document.createElement('p');
           var text = "活跃度:" + data.info.list[index].play_count;
           var hits  = document.createTextNode(text);
           p.appendChild(hits);
           li.appendChild(p);

           p2  = document.createElement('p');
           var detail = document.createTextNode("总得分:" +data.info.list[index].total_score);
           p2.appendChild(detail);
           li.appendChild(p2);

           li.setAttribute("onclick", "javascript:gotoUser(this);");
           ul.appendChild(li);
       }

    } else if(data.errno == 6) {
      alert('no data');
    }

}


function getWeekBoard() {
	window.ih5game.getRankByType('week', order, 0, 10, getWeekBoardCallback);
}


function getMounthBoard() {
	window.ih5game.getRankByType('mounth', order, 0, 10, getWeekBoardCallback);
}

function getTotalBoard() {
	window.ih5game.getRankByType(null, order, 0, 10, getWeekBoardCallback);
}


function getScoreBoardCallback(data) {
     if(data.code == 0) {
      var score_board = document.getElementById('sub_board');
      var old_head = document.getElementById('head_title');
      if(old_head != null) {
         var parent = old_head.parentNode; 
         parent.removeChild(old_head);
      }

      var old_ul  = document.getElementById('list');
      if(old_ul != null) {
         var parent = old_ul.parentNode;
         parent.removeChild(old_ul);
      }

      var head = document.createElement('h3');
      head.id="head_title";
      head.appendChild(document.createTextNode("一共:"+data.data.length+"人获得成绩"));
      score_board.appendChild(head);
      var ul = document.createElement('ul');
      ul.id = 'list';
      score_board.appendChild(ul);
      for(var index= 0, length = data.data.length; index < length; index++) {

         var li = document.createElement('li');
         li.id = data.data[index].playerID;

//         var img   = document.createElement('img');
//         img.setAttribute('src', './test.jpg');
//         li.appendChild(img);

         var h3  = document.createElement('h3');
         var name  = document.createTextNode("玩家"+data.data[index].playerID);
         h3.appendChild(name);
         li.appendChild(h3);

         var p  = document.createElement('p');
         var text = "活跃度:";
         if(data.data[index].scores) {
         	text += data.data[index].scores.length;
         }
         else {
         	text += '1';
         }
         var hits  = document.createTextNode(text);
         p.appendChild(hits);
         li.appendChild(p);

         p2  = document.createElement('p');
         var detail = document.createTextNode("最高分:" +data.data[index].highScore);
         p2.appendChild(detail);
         li.appendChild(p2);

         li.setAttribute("onclick", "javascript:gotoUser(this);");
         ul.appendChild(li);
      }
    } else if(data.errno == 6) {
      alert('no data');
    }
}

function getScoreBoard() {
    i5rHandle.getHighScore(10, getScoreBoardCallback);
}

function startGameCallbck(data) {
	console.log(data);
}

function startGame() {
	i5rHandle.startApp(startGameCallbck);
}


function likeCallback(data) {
	console.log(JSON.stringify(data));
   if(data.code != 0) {
        console.log('like fail');
   } else {
        console.log('like ok');
   }
}

function likeGame() {
	i5rHandle.likeApp(likeCallback);
}

function callBack(data) {
	console.log(JSON.stringify(data));
}

function cancelLikeGame() {
	i5rHandle.cancelLikeApp(callBack);	
}

function unLikeGame() {
	i5rHandle.unlikeApp(callBack);	
}

function starGame() {
	i5rHandle.starApp(5, callBack);	
}

function saveDataCallback(data) {
	console.log(JSON.stringify(data));
}


function saveData() {
	var myDate = new Date();

	var data = {
		"time":myDate.toLocaleTimeString(),
		"hello":"world",
	};
	var pck = JSON.stringify(data);
	i5rHandle.saveData(pck, saveDataCallback);
}

function getSaveDataCallback(data) {
  console.log(JSON.stringify(data));
}


function getSaveData() {
	i5rHandle.loadData(getSaveDataCallback);
}

addLoadEvent(initButton);
