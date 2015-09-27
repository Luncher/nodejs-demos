var utils = require('../util/utils');
var redis = require('redis');

var USER_PREFIX		 = 'POMELO:USER';
var CHANNEL_PREFIX   = 'POMELO:CHANNEL';
var DEFAULT_PREFIX	 = 'POMELO:CHANNELUSERID';

var GlobalChannelManager = function(app, opts) {
  this.app = app;
  this.opts = opts || {};
  this.prefix = opts.prefix || DEFAULT_PREFIX;
  this.userPrefix = USER_PREFIX;
  this.channelPrefix = CHANNEL_PREFIX;
  this.host = opts.host;
  this.port = opts.port;
  this.db = opts.db || '0';
  this.redis = null;
};

module.exports = GlobalChannelManager;

GlobalChannelManager.prototype.start = function(cb) {
  this.redis = redis.createClient(this.port, this.host, this.opts);
  if (this.opts.auth_pass) {
    this.redis.auth(this.opts.auth_pass);
  }
  var self = this;
  this.redis.on("error", function (err) {
      console.error("[globalchannel-plugin][redis]" + err.stack);
  });
  this.redis.once('ready', function(err) {
    if (!!err) {
      cb(err);
    } else {
      self.redis.select(self.db, cb);
    }
  });
};

GlobalChannelManager.prototype.stop = function(force, cb) {
  if(this.redis) {
    this.redis.end();
    this.redis = null;
  }
  utils.invokeCallback(cb);
};

GlobalChannelManager.prototype.clean = function(cb) {
  var cmds = [];
  var self = this;
  this.redis.keys(genCleanKey(this), function(err, list) {
    if(!!err) {
      utils.invokeCallback(cb, err);
      return;
    }
    for(var i=0; i<list.length; i++) {
      cmds.push(['del', list[i]]);
    }
    execMultiCommands(self.redis, cmds, cb);
  });
};

GlobalChannelManager.prototype.destroyChannel = function(name, cb) {
  var servers = this.app.getServers();
  var server, cmds = [];
  for(var sid in servers) {
    server = servers[sid];
    if(this.app.isFrontend(server)) {
      cmds.push(['del', genKey(this, name, sid)]);
    }
  }
  execMultiCommands(this.redis, cmds, cb);
};

GlobalChannelManager.prototype.getChannelInfo = function(name, cb) {
	var key = genChannelKey(name); 
	this.redis.hgetall(key, cb);
};

GlobalChannelManager.prototype.createChannel = function(channelInfo, cb) {
	var key = genChannelKey(channelInfo.name); 
	this.redis.HMSET(key, channelInfo, cb);	
};

GlobalChannelManager.prototype.listChannels = function(prefix, cb) {
	var preg = this.channelPrefix + '*'; 
	if(typeof prefix === 'function') {
		cb = prefix;
	}
	else {
		preg = prefix;
	}
	this.redis.keys(preg, function(err, list) {
		if(!!err) {
      		utils.invokeCallback(cb, err);
			return; 
		}
		var cmds = [];
		for(var i=0; i<list.length; i++) {
		  cmds.push(['hgetall', list[i]]);
		}
		execMultiCommands(self.redis, cmds, cb);
	});
};

GlobalChannelManager.prototype.addUser = function(key, userInfo, cb) {
	this.redis.HMSET(key, userInfo, cb);
};

GlobalChannelManager.prototype.setUserStatus = function(userId, state, cb) {
	var key = genUserKey(userId); 
	this.redis.hset(key, state, state, cb);
};

GlobalChannelManager.prototype.listUsers = function(keys, cb) {
	if(!Array.isArray(keys) || keys.length === 0) {
		utils.invokeCallback(cb, 'invalid params');
		return;
	}
	var cmds = [];
	for(var index = 0; index < keys.length; index++) {
		cmds.push(['hgetall', genUserKey(list[i]]));
	}
	execMultiCommands(self.redis, cmds, cb);
};

GlobalChannelManager.prototype.addUser = function(key, userInfo, cb) {
	this.redis.HMSET(key, userInfo, cb);
};

GlobalChannelManager.prototype.setUserStatus = function(userId, state, cb) {
	var key = genUserKey(userId); 
	this.redis.hset(key, state, state, cb);
};

GlobalChannelManager.prototype.listUsers = function(keys, cb) {
	if(!Array.isArray(keys) || keys.length === 0) {
		utils.invokeCallback(cb, 'invalid params');
		return;
	}		
	var cmds = [];
	for(var index = 0; index < keys.length; index++) {
		cmds.ush([]);
	}
};

GlobalChannelManager.prototype.add = function(name, userInfo, sid, cb) {
	var uid = genUserKey(userInfo.id); 
	this.addUser(uid, userInfo, function(err) {
		if(!!err) {
			utils.invokeCallback(cb, err);
			return;
		}
		this.redis.sadd(genKey(this, name, sid), userInfo.id, function(err) {
			utils.invokeCallback(cb, err);
		});	
	});	
};

GlobalChannelManager.prototype.leave = function(name, uid, sid, cb) {
  this.redis.srem(genKey(this, name, sid), uid, function(err) {
    utils.invokeCallback(cb, err);
  });
};

GlobalChannelManager.prototype.getMembersBySid = function(name, sid, cb) {
  this.redis.smembers(genKey(this, name, sid), function(err, list) {
    utils.invokeCallback(cb, err, list);
  });
};

var execMultiCommands = function(redis, cmds, cb) {
  if(!cmds.length) {
    utils.invokeCallback(cb);
    return;
  }
  redis.multi(cmds).exec(function(err, reply) {
    utils.invokeCallback(cb, err);
  });
};

var genUserKey = function(id) {
  return self.userPrefix + ':' + sid;
};

var genChannelKey = function(name) {
  return self.channelPrefix + ':' + name;
};

var genKey = function(self, name, sid) {
  return self.prefix + ':' + name + ':' + sid;
};

var genCleanKey = function(self) {
  return self.prefix + '*';
};
