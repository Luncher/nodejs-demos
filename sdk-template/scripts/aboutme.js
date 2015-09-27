function bindButton() {
	var history = document.getElementById('history');
	history.setAttribute("onclick", "javascript:listPlayHistory();");

	var favorite = document.getElementById('favorite');
	favorite.setAttribute("onclick", "javascript:listFavorite();");
	i5rHandle = GameCenter.getInstance();

	var mylikeit = document.getElementById('mylikeit');
	mylikeit.setAttribute("onclick", "javascript:listMyAlsoLike();");
	i5rHandle = GameCenter.getInstance();

	var statis = document.getElementById('get-statis');
	statis.setAttribute("onclick", "javascript:listStatis();");
	i5rHandle = GameCenter.getInstance();

	var like = document.getElementById('get-likeapp');
	like.setAttribute("onclick", "javascript:likeApp();");
	i5rHandle = GameCenter.getInstance();
}

function likeApp() {
	i5rHandle.setAppID('10016');
	i5rHandle.likeApp(function(result) {
		
	});
}

function listStatis() {
	i5rHandle.setAppID('10016');
	i5rHandle.getPlayerStatis(function (result) {
	
	});	
}

function listCallbck(data) {
	console.log(JSON.stringify(data));
}

function listPlayHistory() {
	i5rHandle.listPlayHistory(listCallbck);
}

function listFavorite() {
	i5rHandle.listFavorite(listCallbck);
}

function listMyAlsoLike() {
	i5rHandle.getMyAlsoLikes(listCallbck);
}

addLoadEvent(bindButton);

