function gameTypeInit() {
	i5rHandle = GameCenter.getInstance();
	i5rHandle.getAppTypes(getGameTypeCallback);
}


function goRank(thisform) {
    var typeId = "typeId="+thisform.id;
    window.location.href='rank.html?' + typeId;
}


function getGameTypeCallback(data) {
    if(data.code !== 0) {
        alert('No data');
    } else {
        var article = document.getElementsByTagName('article')[0];
        for(var index = 0; index < data.data.length; index++) {
           var button = document.createElement('button'); 
           button.appendChild(document.createTextNode(data.data[index].name));
           button.id  = data.data[index].typeid;
           button.setAttribute('onclick', "javascript:goRank(this);");
           article.appendChild(button);
        }    
    }   
}

addLoadEvent(gameTypeInit);
