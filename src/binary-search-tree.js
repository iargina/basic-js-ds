const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
    } else {
      this._addNode(newNode, this._root);
    }
  }

  _addNode(newNode, currentNode) {
    if (newNode.data < currentNode.data) {
      if (!currentNode.left) {
        currentNode.left = newNode;
      } else {
        this._addNode(newNode, currentNode.left);
      }
    } else if (newNode.data > currentNode.data) {
      if (!currentNode.right) {
        currentNode.right = newNode;
      } else {
        this._addNode(newNode, currentNode.right);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this._root;

    while (currentNode !== null) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  remove(data) {
    this._root = this._removeNode(data, this._root);
  }

  _removeNode(data, currentNode) {
    if (currentNode === null) {
      return null;
    }

    if (data === currentNode.data) {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }

      if (currentNode.left === null) {
        return currentNode.right;
      }

      if (currentNode.right === null) {
        return currentNode.left;
      }

      let tempNode = currentNode.right;

      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }

      currentNode.data = tempNode.data;
      currentNode.right = this._removeNode(tempNode.data, currentNode.right);

      return currentNode;
    } else if (data < currentNode.data) {
      currentNode.left = this._removeNode(data, currentNode.left);

      return currentNode;
    } else {
      currentNode.right = this._removeNode(data, currentNode.right);

      return currentNode;
    }
  }

  min() {
    if (!this._root) {
      return null;
    }

    let currentNode = this._root;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let currentNode = this._root;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
