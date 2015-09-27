function switchRankTime(thisform) {
//   i5rHandle.listAppsByTime(window.type, 0, 0, selectGameByTypeCallback);
   i5rHandle.listAppsEx('', window.type, 'time', 0, 0, selectGameByTypeCallback);
}

function switchRankHot(thisform) {
   //i5rHandle.listAppsByUsage(window.type, 0, 0, selectGameByTypeCallback);
   i5rHandle.listAppsEx('', window.type, 'usage', 0, 0, selectGameByTypeCallback);
}

function rankInit() {
	i5rHandle = GameCenter.getInstance();
    //button init
    var hot = document.getElementById('hot');    
    hot.setAttribute("onclick", "javascript:switchRankHot(this);");
    var time = document.getElementById('time');    
    time.setAttribute("onclick", "javascript:switchRankTime(this);");
        
   var url = window.location.href;
   var off   = url.indexOf('?');
   var params= url.substr(off + 1, url.length);
   var params_array = params.split("=");
   window.type = params_array[1];
   
   var head = document.getElementsByTagName('h2')[0];
   if(typeof type == "undefined") {
        head.innerHTML = "总排行榜";

   } else {
        head.innerHTML = "类别"+type+"排行榜";
   }
   i5rHandle.listAppsByUsage(type, -1, 0, selectGameByTypeCallback);
}

function gotoGame(thisform) {
    var url = window.location.href;
    var index = url.lastIndexOf('/');
    var dest  = url.substr(0, index+1) + thisform.id + ".html";
    console.log(dest);
    window.location.href = dest;
}


function selectGameByTypeCallback(data) {
    if(data.code === 0) {
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
           var name  = document.createTextNode("名称:"+data.data[index].name);
           h3.appendChild(name);
           li.appendChild(h3);

           var p  = document.createElement('p');
           var text = "点击量:" + data.data[index].usage + "  点赞数:" + data.data[index].like + " 评分: " + data.data[index].star;
           var hits  = document.createTextNode(text);
           p.appendChild(hits);
           li.appendChild(p);

           p2  = document.createElement('p');
           var detail = document.createTextNode("详情:" +data.data[index].meta.general.appdesc);
           p2.appendChild(detail);
           li.appendChild(p2);

           li.setAttribute("onclick", "javascript:gotoGame(this);");
           ul.appendChild(li);
       }

   } else {
       alert('no data');        
   }
}

addLoadEvent(rankInit);

