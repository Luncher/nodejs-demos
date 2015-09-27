
function ajax()
{
	this.content_type = 'application/x-www-form-urlencoded; charset=utf-8';
	this.request  = null;
	this.response = null;
	this.remote	  = null;
	this.send_data= null;
	this.callback = null;
	this.progress_callback = null;

	this.make_request = function(remote, callback, data, async, progress)
	{
		if(data) this.send_data = data;
		if(remote) this.remote = remote;
		if(callback) this.callback = callback;
		if(typeof(async) != 'boolean') async = true;
		if(progress)	this.progress_callback = progress;

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
		    	if(async) this.request.onreadystatechange = this.request_handler.bind(this);
		    	if(this.progress_callback) this.request.upload.addEventListener("progress", this.progress_callback, false);
			    if(this.send_data) 
			    {
				    this.request.open('POST', this.remote, async);
				    if(this.content_type){
				    	this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
				    }
				    this.request.send(this.send_data);
			    }
			    if(!async) this.get_response();
		    }
		}
	}


	this.request_handler = function() 
	{
	    if(this.request && this.request.readyState == 4) 
	    {
			switch(this.request.status) 
			{
				case 200:
					this.get_response();
					return true;
				/*
				case 12029:
				case 12030:
				case 12031:
				case 12152:
				case 12159:
					this.request.onreadystatechange = function() {};
					this.make_request();
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

	this.get_response = function() 
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
