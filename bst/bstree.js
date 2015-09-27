function BSTree(compare) {
	this.root = null;
	this.compare = compare;
}

BSTree.prototype.get = function(key) {
	function travel(node) {
		if(!node) return null;	
		var ret = self.compare(key, node.key);
		if(ret == 0) return node;
		if(ret < 0) return travel(node.left);
		if(ret > 0) return travel(node.right);
	}

	var self = this;
	return travel(this.root);
}

BSTree.prototype.put = function(k, v) {
	function travel(node) {
		if(!node) return new BSTreeNode(k, v, 1);	
		var ret = self.compare(k, node.key);
		if(ret == 0) {
			node.value = v;
		}
		if(ret < 0) {
			node.left = travel(node.left);
		}
		if(ret > 0) {
			node.right = travel(node.right);
		}
		node.N = self._size(node.left) + self._size(node.right) + 1;

		return node;
	}

	var self = this;
	this.root = travel(this.root);
}

BSTree.prototype.select = function(n) {
	function travel(node, n) {
		if(!node) return null;	
		var size = self._size(node.left);
		if(size == n) {
			return node;
		}
		if(size > n) {
			return travel(node.left, n);				
		}
		if(size < n) {
			return travel(node.right, n - size - 1);
		}
	}
	
	var self = this;
	return travel(this.root, n);
}

BSTree.prototype.rank = function(k) {
	function travel(node) {
		if(!node) return 0;		
		var ret = self.compare(k, node.key);
		if(ret == 0) {
			return self._size(node.left);
		}
		if(ret > 0) {
			return self._size(node.left) + 1 + travel(node.right);	
		}
		if(ret < 0) {
			return travel(node.left);
		}
	}

	var self = this;
	return travel(this.root);
}

BSTree.prototype.size = function() {
	return this._size(this.root);
}

BSTree.prototype._size = function(node) {
	return node ? node.N : 0;
}

BSTree.prototype.floor = function(k) {
	function travel(node) {
		if(!node) return null;	
		var ret = self.compare(k, node.key);
		if(ret == 0) {
			return node;
		}
		if(ret < 0) {
			return travel(node.left);
		}
		if(ret > 0) {
			var tmp = travel(node.right);
			if(!tmp) {
				return node;
			}
			else {
				return tmp;
			}
		}
	}
	var self = this;
	return travel(this.root);
}

BSTree.prototype.ceiling = function(k) {
	function travel(node) {
		if(!node) return null;	
		var ret = self.compare(k, node.key);
		if(ret == 0) {
			return node;
		}
		if(ret > 0) {
			return travel(node.right);
		}
		if(ret < 0) {
			var tmp = travel(node.left);
			if(!tmp) {
				return node;
			}
			else {
				return tmp;
			}
		}
	}
	var self = this;
	return travel(this.root);
}

BSTree.prototype.deleteMin = function() {
	this.root = this._deleteMin(this.root);
}

BSTree.prototype._deleteMin = function(node) {
	function travel(node) {
		if(!node) return null;
		if(!node.left) {
			return node.right;
		}
		else {
			node.left = travel(node.left);
		}

		node.N = self._size(node.left) + self._size(node.right) + 1;
		return node;
	}

	var self = this;
	return travel(node);
}

BSTree.prototype.deleteMax = function() {
	this.root = this._deleteMax(this.root);
}

BSTree.prototype._deleteMax = function() {
	function travel(node) {
		if(!node) return null;
		if(!node.right) {
			return node.left;
		}
		else {
			node.right = travel(node.right);
		}

		node.N = self._size(node.left) + self._size(node.right) + 1;
		return node;
	}

	var self = this;
	return travel(this.root);
}

BSTree.prototype.min = function() {
	if(!this.root) return null;
	return this._min(this.root);
}

BSTree.prototype._min = function(node) {
	if(!node.left) return node;
	return this._min(node.left);
}

BSTree.prototype.max = function() {
	if(!this.root) return null;
	return this._max(this.root);
}

BSTree.prototype._max = function(node) {
	if(!node.right) return node;
	return this._max(node.right);
}

BSTree.prototype.delete = function(k) {
	function travel(node) {
		if(node == null) return null;
		var ret = self.compare(k, node.key);
		if(ret < 0) node.left = travel(node.left);
		if(ret > 0) node.right = travel(node.right);
		if(ret == 0) {
			if(!node.left) return node.right;
			if(!node.right) return node.left;
			var tmp = node;
			node = self.min(tmp.right);
			node.left = tmp.left;
			node.right = self.deleteMin(tmp.right);
		}
		node.N = self._size(node.left) + self._size(node.right) + 1;

		return node;
	}
	var self = this;
	this.root = travel(this.root);
}

BSTree.prototype.keys = function(l, h) {
	
	function travel(node) {
		if(node == null) return;	
		var ret1 = self.compare(l, node.key);
		var ret2 = self.compare(h, node.key);
		if(ret1 < 0) travel(node.left);
		if(ret2 > 0) travel(node.right);
		if(ret1 <= 0 && ret2 >= 0) arr.push(node.key);
	}

	var arr = [];
	var self = this;
	travel(this.root);

	return arr;
}

function BSTreeNode(k, v, n) {
	this.N = n;
	this.key = k;
	this.value = v;
	this.left = null;
	this.right = null;
}

module.exports.BSTree = BSTree;
module.exports.BSTreeNode = BSTreeNode;
