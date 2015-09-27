var assert = require('assert');
var BSTree = require('./bstree').BSTree;
var BSTreeNode = require('./bstree').BSTreeNode;

function compare(k1, k2) {
	return parseInt(k1 - k2);
}

var tree = new BSTree(compare);

tree.put(5, 'value-5');
tree.put(1, 'value-1');
tree.put(2, 'value-2');
tree.put(4, 'value-4');
tree.put(3, 'value-3');

var node = tree.get(3);
assert(node.value == 'value-3');

node = tree.select(0);
assert(node.value == 'value-1');

node = tree.select(2);
assert(node.value == 'value-3');

var rk = tree.rank(3);
assert(rk == 2);

var ret = tree.floor(3); 
assert(ret.value == 'value-3');

ret = tree.ceiling(3);
assert(ret.value == 'value-3');

var min = tree.min();
assert(min.value == 'value-1');

var max = tree.max();
assert(max.value == 'value-5');

tree.deleteMin();
var min = tree.min();
assert(min.value == 'value-2');

tree.deleteMax();
var max = tree.max();
assert(max.value == 'value-4');

tree.delete(4);
var max = tree.max();
assert(max.value == 'value-3');

var keys = tree.keys(1, 3);
assert(keys.length == 2);
