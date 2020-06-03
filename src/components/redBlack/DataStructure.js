import React from 'react'

var black = 0
var red = 1

class NullNode {
	constructor() {
		this.color = black
		this.isNull = true
		this.parent = null
		this.html = (
			<li className="null">
				<div className={`null black`}>null</div>
			</li>
		)
	}
}

class Node {
	constructor(value) {
		let newNullNode = new NullNode()
		newNullNode.parent = this
		this.value = value
		this.color = red
		this.right = newNullNode
		this.left = newNullNode
		this.parent = null
		this.isNull = false

		this.html = (
			<li key={this.value}>
				<div className={`normal red`}>{this.value}</div>
				<ul>
					{this.left.html} {this.right.html}
				</ul>
			</li>
		)
	}

	//Updating html of a node
	setHtml() {
		let color = this.color ? 'red' : 'black'
		this.html = (
			<li key={this.value}>
				<div className={`normal ${color}`}>{this.value}</div>
				<ul>
					{this.left.html} {this.right.html}
				</ul>
			</li>
		)
	}

	//Updating html of the whole tree
	updateRootHtml() {
		if (this.parent !== null) {
			if (this.parent.left === this) this.parent.insert(this, true)
			else this.parent.insert(this, false)
		}
	}

	//Inserting new node to tree
	insert() {
		this.setHtml()
		this.updateRootHtml()
	}

	//Adds Highlight to node html
	addHighlight() {
		let color = this.color ? 'red' : 'black'
		this.html = (
			<li key={this.value}>
				<div className={`normal ${color} highlight`}>
					{this.value}
				</div>
				<ul>
					{this.left.html} {this.right.html}
				</ul>
			</li>
		)

		this.updateRootHtml()
	}

	//Clears Highlight of the node html
	clearHighlight() {
		this.setHtml()

		this.updateRootHtml()
	}
}

class RBT {
	constructor(num = 0) {
		let newNullNode = new NullNode()
		this.root = newNullNode
		if (num) {
			this.generateRandomBST(num)
		}
		this.highlighted = null
		this.leafDepth = -1
	}

	//Helper functions
	//Rotate right
	rotateRight(node, toRecolor) {
		let parent = node.parent
		node.parent = parent.parent
		if (parent.parent !== null) {
			if (parent.parent.left === parent) {
				parent.parent.left = node
			} else {
				parent.parent.right = node
			}
		}
		let right = node.right
		node.right = parent
		parent.parent = node
		parent.left = right
		right.parent = parent
		if (toRecolor) {
			node.color = black
			parent.color = red
		}
	}

	//Rotate left
	rotateLeft(node, toRecolor) {
		let parent = node.parent
		node.parent = parent.parent
		if (parent.parent !== null) {
			if (parent.parent.right === parent) {
				parent.parent.right = node
			} else {
				parent.parent.left = node
			}
		}
		let left = node.left
		node.left = parent
		parent.parent = node
		parent.right = left
		left.parent = parent
		if (toRecolor) {
			node.color = black
			parent.color = red
		}
	}

	//Find sibling
	siblingOf(node) {
		if (node.parent === null) return null
		if (node.parent.left === node) {
			return node.parent.right
		} else {
			return node.parent.left
		}
	}

	//Finding min value
	findMin(node = this.root) {
		if (node.isNull) {
			return node
		} else if (node.left.isNull) {
			return node
		} else {
			return this.findMin(node.left)
		}
	}

	//Insert
	insert(value) {
		this.root = this.insertNode(null, this.root, value)
	}

	//Insert helper function
	insertNode(parent, node, value) {
		if (node.isNull) {
			let newNode = new Node(value)
			if (parent === null) {
				newNode.color = black
				newNode.insert()
				return newNode
			} else {
				newNode.parent = parent
				return newNode
			}
		}

		if ( node.value === value) {
			return node
		}

		let isLeft
		if (node.value > value) {
			let left = this.insertNode(node, node.left, value)
			if (left === node.parent) {
				node.insert()
				return left
			}
			node.left = left
			isLeft = true
		} else {
			let right = this.insertNode(node, node.right, value)
			if (right === node.parent) {
				node.insert()
				return right
			}
			node.right = right
			isLeft = false
		}

		if (isLeft) {
			if (node.left.color === red && node.color === red) {
				let sibling = this.siblingOf(node)
				if (sibling.color === black || sibling.isNull) {
					if (node.parent.left === node) {
						this.rotateRight(node, true)
					} else {
						this.rotateRight(node.left, false)
						node = node.parent
						this.rotateLeft(node, true)
					}
				} else {
					node.color = black
					sibling.color = black
					if (node.parent.parent !== null) {
						node.parent.color = red
					}
				}
			}
		} else {
			if (node.right.color === red && node.color === red) {
				let sibling = this.siblingOf(node)
				if (sibling.color === black || sibling.isNull) {
					if (node.parent.right === node) {
						this.rotateLeft(node, true)
					} else {
						this.rotateLeft(node.right, false)
						node = node.parent
						this.rotateRight(node, true)
					}
				} else {
					node.color = black
					sibling.color = black
					if (node.parent.parent !== null) {
						node.parent.color = red
					}
				}
			}
		}

		if (!node.left.isNull) node.left.insert()
		if (!node.right.isNull) node.right.insert()

		return node
	}

	//Delete Node
	remove(value, node = this.root) {
		this.clearHighlight()
		if (node.isNull) {
			return
		}
		if (node.value === value) {
			if (node.left.isNull || node.right.isNull) {
				let tempParent = node.parent
				this.deleteOneChild(node)
				if (tempParent) {
					if (!tempParent.left.isNull) tempParent.left.insert()
					if (!tempParent.right.isNull) tempParent.right.insert()
					tempParent.insert()
					if (tempParent.parent) tempParent.parent.insert()
				} else if (!this.root.isNull) this.root.insert()
			} else {
				let smallestRight = this.findMin(node.right)
				node.value = smallestRight.value
				node.insert()
				this.remove(smallestRight.value, node.right)
			}
		}

		if (node.value > value) {
			this.remove(value, node.left)
		} else {
			this.remove(value, node.right)
		}
	}

	//Delete helper functions
	deleteOneChild(node) {
		let child

		if (node.left.isNull) {
			child = node.right
		} else {
			child = node.left
		}
		this.replaceChild(child, node)
		if (node.color === black) {
			if (child.color === red) {
				child.color = black
				child.insert()
			} else this.deleteCase1(child)
		}
	}

	//All cases
	deleteCase1(node) {
		if (node.parent === null) {
			this.root = node
			if (!this.root.isNull) this.root.insert()
			return
		}
		this.deleteCase2(node)
	}

	deleteCase2(node) {
		let sibling = this.siblingOf(node)
		if (sibling.color === red) {
			if (sibling.parent.left === sibling)
				this.rotateRight(sibling, true)
			else this.rotateLeft(sibling, true)
			if (sibling.parent === null) this.root = sibling
		}
		this.deleteCase3(node)
	}

	deleteCase3(node) {
		let sibling = this.siblingOf(node)
		if (
			node.parent.color === black &&
			sibling.color === black &&
			sibling.left.color === black &&
			sibling.right.color === black
		) {
			sibling.color = red
			this.deleteCase1(node.parent)
		} else {
			this.deleteCase4(node)
		}
	}

	deleteCase4(node) {
		let sibling = this.siblingOf(node)
		if (
			node.parent.color === red &&
			sibling.color === black &&
			sibling.left.color === black &&
			sibling.right.color === black
		) {
			sibling.color = red
			node.parent.color = black
			return
		} else {
			this.deleteCase5(node)
		}
	}

	deleteCase5(node) {
		let sibling = this.siblingOf(node)
		if (sibling.color === black) {
			if (
				node.parent.left === node &&
				sibling.right.color === black &&
				sibling.left.color === red
			) {
				this.rotateRight(sibling.left, true)
				sibling.insert()
			} else if (
				node.parent.right === node &&
				sibling.left.color === black &&
				sibling.right.color === red
			) {
				this.rotateLeft(sibling.right, true)
				sibling.insert()
			}
		}
		this.deleteCase6(node)
	}

	deleteCase6(node) {
		let sibling = this.siblingOf(node)
		sibling.color = sibling.parent.color
		sibling.parent.color = black
		if (node.parent.left === node) {
			sibling.right.color = black
			this.rotateLeft(sibling, false)
			if (!sibling.right.isNull) sibling.right.insert()
			if (!sibling.left.isNull) sibling.left.insert()
		} else {
			sibling.left.color = black
			this.rotateRight(sibling, false)
			if (!sibling.right.isNull) sibling.right.insert()
			if (!sibling.left.isNull) sibling.left.insert()
		}
		if (sibling.parent === null) {
			this.root = sibling
		}
	}

	replaceChild(child, node) {
		child.parent = node.parent
		if (node.parent === null) this.root = child
		else {
			if (node.parent.left === node) {
				node.parent.left = child
			} else {
				node.parent.right = child
			}
		}
	}

	//Tree Traversal
	preorder(list, node = this.root) {
		if (!node.isNull) {
			list.push(node.value)
			this.preorder(list, node.left)
			this.preorder(list, node.right)
		}
	}

	inorder(list, node = this.root) {
		if (!node.isNull) {
			this.inorder(list, node.left)
			list.push(node.value)
			this.inorder(list, node.right)
		}
	}

	postorder(list, node = this.root) {
		if (!node.isNull) {
			this.postorder(list, node.left)
			this.postorder(list, node.right)
			list.push(node.value)
		}
	}

	//Search
	search(value, node = this.root) {
		this.clearHighlight()

		if (node.isNull) return false
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
		if (node.isNull) return true
		let leftH = this.height(node.left)
		let rightH = this.height(node.right)
		if (Math.abs(leftH - rightH) <= 1) {
			return this.isBalanced(node.left) && this.isBalanced(node.right)
		} else {
			return false
		}
	}

	//Find height
	height(node = this.root) {
		if (node.isNull) return -1
		let ans
		ans = this.height(node.left)
		ans = Math.max(this.height(node.right), ans)
		return ans + 1
	}

	//complete
	isComplete() {
		let totalNodes = this.countNodes()
		return this.isComplete2(0, totalNodes)
	}
	isComplete2(index, totalNodes, node = this.root) {
		if (node.isNull) return true
		else if (index >= totalNodes) return false
		else {
			let ans = this.isComplete2(index * 2 + 1, totalNodes, node.left)
			ans &= this.isComplete2(index * 2 + 2, totalNodes, node.right)
			return ans
		}
	}

	//perfect EDITED
	isPerfect() {
		if (!this.isFull() || !this.isComplete()) return false
		return this.isPerfect2()
	}

	isPerfect2(node = this.root, depth = 0) {
		if (node.isNull) return true
		depth++
		if (node.right.isNull && node.left.isNull) {
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
		if (node.isNull) return true
		else if (node.left.isNull && node.right.isNull) return true
		else if (!node.left.isNull && !node.right.isNull) {
			let ans
			ans = this.isFull(node.left)
			ans &= this.isFull(node.right)
			return ans
		} else return false
	}

	countNodes(node = this.root) {
		if (node.isNull) return 0
		return (
			this.countNodes(node.left) + 1 + this.countNodes(node.right)
		)
	}

	//Clears highlight of previously searched nodes
	clearHighlight() {
		if (this.highlighted) {
			this.highlighted.clearHighlight()
			this.highlighted = null
		}
	}
}

export default RBT
