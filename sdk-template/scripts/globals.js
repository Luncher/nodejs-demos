
function valide_required(field, alerttext)
{
	with(field)
	{
		if(value==null || value == "")
		{
			alert(alerttext)
			return false;
		}
		return true;
	}
}


function addLoadEvent(func)
{
	var old_func = window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function(){
			old_func();
			func();
		}
	}
}

function insertAfter(new_elem, target_elem){
	
	var parent = target_elem.parentNode;
	if(parent.lastChild == target_elem){
		parent.appendChild(new_elem);
	}else{
		parent.insertBefore(new_elem, target_elem.nextSibling);	
	}
}


function addClass(element, value){
	if(!element.className){
		element.className = value;
	}else{
		var new_classname = element.className;
		new_classname+= " ";
		new_classname+= value;
		element.className = new_classname;
	}
}




function moveElement(elemid, final_x, final_y, interval){
	
	if(!document.getElementById) return false;
	if(!document.getElementById(elemid)) return false;

	var elem = document.getElementById(elemid);
	if(elem.movement){
		clearTimeout(elem.movement);
	}

	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	
	if(xpos == final_x && ypos == final_y){
		return true;
	}

	if(xpos < final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos += dist;
	}
	if(ypos < final_y){
		var dist = Math.ceil((final_y - xpos)/10);
		ypos += dist;
	}
	if(xpos > final_x){
		var dist = Math.ceil((xpos - final_x)/10);
		xpos -= dist;
	}
	if(ypos > final_y){
		var dist = Math.ceil((ypos - final_y)/10);
		ypos -= dist;
	}
	
	
	elem.style.left = xpos + "px";
	elem.style.top  = ypos + "px";
	
	var repeat = "moveElement('"+elemid+"', '"+final_x+"', '"+final_y+"', '"+internal+"')";
	elem.movement = setTimeout(repeat, interval);

}


function prepareSlideshow(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById('intro')) return false;
	
	var intro = document.getElementById('intro');
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');
	var preview = document.createElement('img');
	preview.setAttribute('src', "images/slideshow.jpg");
	preview.setAttribute('alt', 'a glimpse of what awaits for you');
	preview.setAttribute('id', 'preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	
	var links = intro.getElementsByTagName('a');
	var destination;
	for(var index = 0; index < links.length; index++){
		links[index].onmouseover = function(){
			destination = this.getAttribute('href');

			if(destination.indexOf('index.html') != -1){
				moveElement('preview', 0, 0, 5);
			}
			if(destination.indexOf('about.html') != -1){
				moveElement('preview', -150, 0, 5);
			}
			if(destination.indexOf('photos.html') != -1){
				moveElement('preview', -300, 0, 5);
			}
			if(destination.indexOf('live.html') != -1){
				moveElement('preview', -450, 0, 5);
			}
			if(destination.indexOf('contact.html') != -1){
				moveElement('preview', -600, 0, 5);
			}
		}
	}
}


function highlightPage(){

	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	
	var header = document.getElementsByTagName('header');
	if(header.length == 0) return false;
	var navs = header[0].getElementsByTagName('nav');
	var links = navs[0].getElementsByTagName('a');
	
	for(var index = 0, linkurl; index < links.length; index++){
		linkurl = links[index].getAttribute('href');
		if(window.location.href.indexOf(linkurl) != -1){
			links[index].className = "here";
			var linktext = links[index].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id', linktext);
			break;
		}
	}
}

function showSection(id){
	
	var section = document.getElementsByTagName('section');

	for(var index = 0; index < section.length; index++){
		
		if(section[index].getAttribute('id') != id){
			section[index].style.display = "none";	
		}else{
			section[index].style.display = "block";
		}	
	}
}


function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName('article');
	if(articles.length == 0) {return false;}
	var navs = articles[0].getElementsByTagName('nav');
	if(navs.length == 0) return false;

	var nav = navs[0];
	var links = nav.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++){
		var sectionid = links[i].getAttribute('href').split('#')[1];
		document.getElementById(sectionid).style.display = "none";
		links[i].destination = sectionid;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}


function showPic(whichpic){
	if(!document.getElementById('placeholder')) return false;

	var source = whichpic.getAttribute('href');
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute('src', source);
	if(!document.getElementById('description')) return false;
	if(whichpic.getAttribute('title')){
		var text = whichpic.getAttribute('title');
	}else {
		var text = "";
	}
	var description = document.getElementById('description');
	if(description.firstChild.nodeType == 3){
		description.firstChild.nodeValue = text;
	}
	return false;
}

function preparePlaceholder(){

	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById('imagegallery')) return false;

	var placeholder = document.createElement('img');
	placeholder.setAttribute('id', 'placeholder');
	placeholder.setAttribute('src', 'images/placeholder.jpg');
	placeholder.setAttribute('alt', 'my image gallery');
	
	var description = document.createElement('p');
	description.setAttribute('id', 'description');
	var desctext = document.createTextNode('Choose an image');
	description.appendChild(desctext);

	var gallery = document.getElementById('imagegallery');

	insertAfter(description, gallery);
	insertAfter(placeholder, description);
}


function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById('imagegallery')) return false;
	
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this);
		}
	}

}


function stripeTables(){
	if(!document.getElementsByTagName) return false;

	var tables = document.getElementsByTagName("table");
	for(var i = 0; i < tables.length; i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName('tr');
		for(var j = 0; j < rows.length; j++){
			if(odd = true){			
				addClass(rows[j], 'odd');
				odd = false;
			} else {
				odd = true;
			}
		}
	}
}


function highlightRows(){

	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName('tr');
	for(var i = 0; i < rows.length; i++){
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this, "highlight");
		}
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	}
}


function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement
		|| !document.createTextNode) return false;
	
	var abbrs = document.getElementsByTagName('abbr');
	if(abbrs.length < 1) return false;
	var defs = new Array();
	for(var i = 0; i < abbrs.length; i++){
		var current_abbr = abbrs[i];
		if(current_abbr.childNodes.length < 1) continue;
		var definition = current_abbr.getAttribute('title');
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}

	var dlist = document.createElement('dl');
	for(key in defs){
		var definition = defs[key];
		var dtitle = document.createElement('dt');
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement('dd');
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);

		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length < 1) return false;
	var header = document.createElement('h3');
	var header_text = document.createTextNode('abbreviation');
	header.appendChild(header_text);

	var articles = document.getElementsByTagName('article');
	if(articles.length == 0) return false;
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

function resetFields(whichform){
	for(var i = 0; i < whichform.elements.length; i++){
		var element = whichform.elements[i];
		if(element.type=="submit"){
			continue;
		}
		var check = element.placeholder || element.getAttribute('placeholder');
		if(!check) continue;
		element.onfocus=function(){
			var text = this.placeholder || this.getAttribute('placeholder');
			if(this.value == text){
				this.className = '';
				this.value = "";
			}
		}
		element.onblur = function(){
			if(this.value == ""){
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}


function isFilled(field){
	if(field.value.replace(' ', '').length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return (field.value != placeholder);
}

function isEmail(field){
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}



function valideForm(whichform){
	for(var i = 0; i < whichform.elements.length; i++){
		var element = elements[i];
		if(element.required == "required"){
			if(!isFilled(element)){
				alert("Please fill in the "+ element.name+" field.");
				return false;
			}
		}
		if(element.type == 'email'){
			if(!isEmail(element)){
				alert("The " + element.name+ " field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}


function prepareForms(){
	for(var i = 0; i < document.forms.length; i++){
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function(){
			if(!valideForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			if(submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}


function getHTTPObject(){
	if(typeof XMLHttpRequest == 'undefined'){
		XMLHttpRequest = new function(){
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){ }
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){ }
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){ }
			return false;
		}
	}
	return new XMLHttpRequest();
}


function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement('img');
	content.setAttribute('src', "images/loading.gif");
	content.setAttribute('alt', "loading...");
	content.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget){

	var request = getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(thetarget);

	var dataParts = [];

	var element;
	for(var i = 0; i < whichform.element.length; i++){
		dataParts[i] = element.name + '=' + encodeURLComponent(element.value);
		var data = dataParts.join('&');
	
		request.open('post', whichform.getAttribute("action"), true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				if(request.status == 200 || request.status == 0){
					var matchs = request.responseText.match(/<article>([\s\S]+)<\/article>/);
					if(matchs.length > 0){
						thetarget.innerHTML = matchs[1];
					}else{
						thetarget.innerHTML = "<p> Sorry error occur.</p>"
					}
				}else {
					thetarget.innerHTML = "<p>" + request.statusText + "</p>"
				}

			}
		}
	}
	request.send(data);
	return true;
}

function logoff_callback(obj_info){
	location.href="login.html";	
}

function user_logout(){
	var command={appid:1, cmd:"8"};
	var json = JSON.stringify(command);
	var request = new ajax();
	request.remote	  = "../triggle.php";
	request.send_data = "json_string="+json;
	request.callback  = logoff_callback;
	request.make_request();
}

addLoadEvent(highlightPage);
