import React from 'react'
export class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
		this.parent = null
		this.htmlLeft = (
			<li className="null">
				<div>null</div>
			</li>
		)

		this.htmlRight = (
			<li className="null">
				<div className="null">null</div>
			</li>
		)

		this.html = (
			<li key={this.value}>
				<div className="normal">{this.value}</div>
				<ul>
					{this.htmlLeft} {this.htmlRight}
				</ul>
			</li>
		)
	}

	//Inserts a node in HTML
	insert(node, isLeft) {
		const newHtml = node.html

		if (isLeft) {
			this.htmlLeft = newHtml
		} else {
			this.htmlRight = newHtml
		}
		this.setHtml()
		this.updateRootHtml()
	}

	//Updates HTML for the node
	setHtml() {
		this.html = (
			<li>
				<div className="normal">{this.value}</div>
				<ul>
					{this.htmlLeft} {this.htmlRight}
				</ul>
			</li>
		)
	}


	//Updates the whole HTML
	updateRootHtml() {
		if (this.parent !== null) {
			if (this.parent.left === this) this.parent.insert(this, true)
			else this.parent.insert(this, false)
		}
	}

	//Sets one child to null
	setChildToNull(isLeft) {
		if (isLeft) {
			this.htmlLeft = (
				<li className="null">
					<div>null</div>
				</li>
			)
		} else {
			this.htmlRight = (
				<li className="null">
					<div>null</div>
				</li>
			)
		}
		this.setHtml()
		this.updateRootHtml()
	}

	//Sets grandchild to child
	setChildToChildsChild(isLeftChild, isLeft) {
		if (isLeftChild) {
			if (isLeft) {
				this.htmlLeft = this.left.left.html
				this.setHtml()
			} else {
				this.htmlLeft = this.left.right.html
				this.setHtml()
			}
		} else {
			if (isLeft) {
				this.htmlRight = this.right.left.html
				this.setHtml()
			} else {
				this.htmlRight = this.right.right.html

				this.setHtml()
			}
		}
		this.updateRootHtml()
	}

	//Removes a node from HTML
	remove(childrenCondtion) {
		if (!this.parent) return
		if (!childrenCondtion) {
			if (this.parent.left === this) {
				this.parent.setChildToNull(true)
			} else {
				this.parent.setChildToNull(false)
			}
		} else if (childrenCondtion === 'left') {
			if (this.parent.left === this) {
				this.parent.setChildToChildsChild(true, true)
			} else {
				this.parent.setChildToChildsChild(false, true)
			}
		} else {
			if (this.parent.left === this) {
				this.parent.setChildToChildsChild(true, false)
			} else {
				this.parent.setChildToChildsChild(false, false)
			}
		}
	}

	//Updates the value of a node
	updateValue(value) {
		this.value = value
		this.setHtml()
		this.updateRootHtml()
	}

	//Adds highlight to a node when searched
	addHighlight() {
		this.html = (
			<li key={this.value}>
				<div className="normal highlight">{this.value}</div>
				<ul>
					{this.htmlLeft} {this.htmlRight}
				</ul>
			</li>
		)

		this.updateRootHtml()
	}

	//Removes the highlight
	clearHighlight() {
		this.setHtml()

		this.updateRootHtml()
	}

	//Changes the html when tree is balanced
	balanceHtml() {
		if (!this.left && this.right) {
			this.htmlRight = this.right.html
			this.setChildToNull(true)
		} else if (!this.right && this.left) {
			this.htmlLeft = this.left.html
			this.setChildToNull(false)
		} else if (this.right && this.left) {
			this.htmlLeft = this.left.html
			this.htmlRight = this.right.html
			this.setHtml()
			this.updateRootHtml()
		} else {
			this.htmlLeft = (
				<li className="null">
					<div>null</div>
				</li>
			)

			this.htmlRight = (
				<li className="null">
					<div className="null">null</div>
				</li>
			)
			this.setHtml()
			this.updateRootHtml()
		}
	}
}

class BST {
	constructor(num = 0) {
		this.root = null
		if (num) {
			this.generateRandomBST(num)
		}
		this.highlighted = null
		this.leafDepth = -1
	}

	//inserting a new node
	insert(value) {
		this.clearHighlight()
		var newNode = new Node(value)
		if (this.root === null) {
			this.root = newNode
		} else this.insertNode(this.root, newNode)
	}

	insertNode(node, newNode) {
		if (newNode.value < node.value) {
			if (node.left === null) {
				node.left = newNode
				newNode.parent = node
				node.insert(newNode, true)
			} else this.insertNode(node.left, newNode)
		} else {
			if (node.right === null) {
				node.right = newNode
				newNode.parent = node
				node.insert(newNode, false)
			} else this.insertNode(node.right, newNode)
		}
	}

	//Finding max value
	findMax(node = this.root) {
		if (node == null) return node
		else if (node.right == null) {
			return node
		} else {
			return this.findMax(node.right)
		}
	}

	//Finding min value
	findMin(node = this.root) {
		if (node == null) return node
		else if (node.left == null) {
			return node
		} else {
			return this.findMin(node.left)
		}
	}

	//Deleting node
	remove(value) {
		this.clearHighlight()
		this.root = this.removeNode(this.root, value)
	}

	removeNode(node, value) {
		if (node === null) return null
		else if (value < node.value) {
			node.left = this.removeNode(node.left, value)
			return node
		} else if (value > node.value) {
			node.right = this.removeNode(node.right, value)
			return node
		} else {
			if (node.left === null && node.right === null) {
				node.remove(null)
				node = null
				return node
			}
			if (node.left === null) {
				node.remove('right')
				node.right.parent = node.parent
				node = node.right
				return node
			} else if (node.right === null) {
				node.remove('left')
				node.left.parent = node.parent
				node = node.left
				return node
			}
			var minNodeOfRight = this.findMin(node.right)
			node.updateValue(minNodeOfRight.value)

			node.right = this.removeNode(node.right, minNodeOfRight.value)
			return node
		}
	}

	//Find height
	height(node = this.root) {
		if (node === null) return -1
		let ans
		ans = this.height(node.left)
		ans = Math.max(this.height(node.right), ans)
		return ans + 1
	}

	//Count number of nodes
	countNodes(node = this.root) {
		if (node === null) return 0
		return (
			this.countNodes(node.left) + 1 + this.countNodes(node.right)
		)
	}

	//BST traversal
	preorder(list, node = this.root) {
		if (node !== null) {
			list.push(node.value)
			this.preorder(list, node.left)
			this.preorder(list, node.right)
		}
	}

	inorder(list, node = this.root) {
		if (node !== null) {
			this.inorder(list, node.left)
			list.push(node.value)
			this.inorder(list, node.right)
		}
	}

	postorder(list, node = this.root) {
		if (node !== null) {
			this.postorder(list, node.left)
			this.postorder(list, node.right)
			list.push(node.value)
		}
	}

	//Search
	search(value, node = this.root) {
		this.clearHighlight()

		if (node === null) return false
		else if (node.value === value) {
			node.addHighlight()
			this.highlighted = node
			return true
		} else if (node.value > value)
			return this.search(value, node.left)
		else return this.search(value, node.right)
	}

	//Random Tree generator
	generateRandomBST(num) {
		let upper = 0
		let lower = num * 2 + 10
		let elements = new Set()
		for (let i = 0; i < num; i++) {
			let value =
				Math.floor(Math.random() * (upper - lower + 1)) + lower
			while (elements.has(value)) {
				value =
					Math.floor(Math.random() * (upper - lower + 1)) + lower
			}
			elements.add(value)
			this.insert(value)
		}
	}

	//BST Checker
	//Main Checker function
	checkBST() {
		let BSTTypeList = []
		if (this.isBalanced()) {
			BSTTypeList.push('Balanced')
		}
		if (this.isComplete()) {
			BSTTypeList.push('Complete')
		}
		if (this.isPerfect()) {
			BSTTypeList.push('Perfect')
		}
		if (this.isFull()) {
			BSTTypeList.push('Full')
		}
		return BSTTypeList
	}

	//Subfunctions
	//balance
	isBalanced(node = this.root) {
		if (node === null) return true
		let leftH = this.height(node.left)
		let rightH = this.height(node.right)
		if (Math.abs(leftH - rightH) <= 1) {
			return this.isBalanced(node.left) && this.isBalanced(node.right)
		} else {
			return false
		}
	}

	//complete
	isComplete() {
		let totalNodes = this.countNodes()
		return this.isComplete2(0, totalNodes)
	}
	isComplete2(index, totalNodes, node = this.root) {
		if (node === null) return true
		else if (index >= totalNodes) return false
		else {
			let ans = this.isComplete2(index * 2 + 1, totalNodes, node.left)
			ans &= this.isComplete2(index * 2 + 2, totalNodes, node.right)
			return ans
		}
	}

	//perfect
	isPerfect() {
		if (!this.isFull() || !this.isComplete()) return false
		return this.isPerfect2()
	}

	isPerfect2(node = this.root, depth = 0) {
		if (!node) return true
		depth++
		if (!node.right && !node.left) {
			if (this.leafDepth !== -1 && this.leafDepth !== depth)
				return false
			this.leafDepth = depth
		}
		return (
			this.isPerfect2(node.left, depth) &&
			this.isPerfect2(node.right, depth)
		)
	}

	//full
	isFull(node = this.root) {
		if (node === null) return true
		else if (node.left === null && node.right === null) return true
		else if (node.left !== null && node.right !== null) {
			let ans
			ans = this.isFull(node.left)
			ans &= this.isFull(node.right)
			return ans
		} else return false
	}

	//Balancing BST
	balance(node = this.root) {
		this.clearHighlight()
		let nodes = []
		this.BSTToArr(node, nodes)
		let l = nodes.length
		this.root = null
		this.makeBST(nodes, 0, l - 1)
	}

	//Balancing sub functions
	BSTToArr(node, nodes) {
		if (node !== null) {
			this.BSTToArr(node.left, nodes)
			nodes.push(node)
			this.BSTToArr(node.right, nodes)
		}
	}

	//making BST from array
	makeBST(nodes, start, end) {
		if (start > end) {
			return
		}
		let mid = Math.floor((start + end) / 2)
		this.insert(nodes[mid].value)
		this.makeBST(nodes, start, mid - 1)
		this.makeBST(nodes, mid + 1, end)
	}

	clearHighlight() {
		if (this.highlighted) {
			this.highlighted.clearHighlight()
			this.highlighted = null
		}
	}
}

export default BST
