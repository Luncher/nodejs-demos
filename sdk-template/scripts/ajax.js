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
			//alert(this.response);

			var data = this.response;
			var index= data.indexOf('{');
			if (index == 1)
			{
				data = JSON.parse(data);
			};
			//var obj_info = JSON.parse(this.response);
			this.callback(data);
		}
	}
}

