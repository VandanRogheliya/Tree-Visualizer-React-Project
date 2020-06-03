import React from 'react'
import words from './AllWords'

class nodeTrie {
	constructor(key) {
		this.isEnd = false
		this.children = {}
		this.parent = null
		this.key = key
		this.childrenHtml = []
		this.html = (
			<li key={this.key}>
				<div className="normal">{key ? key : 'Root'}</div>
				{this.childrenHtml.length ? (
					<ul>{this.childrenHtml}</ul>
				) : null}
			</li>
		)
	}

	//Updates the whole html
	updateHtml() {
		this.childrenHtml = []
		for (let i = 0; i < Object.keys(this.children).length; i++) {
			this.childrenHtml.push(
				this.children[Object.keys(this.children)[i]].html
			)
		}

		this.html = (
			<li key={this.key}>
				<div className={this.isEnd ? 'normal end' : 'normal'}>
					{this.key ? this.key : 'Root'}
				</div>
				{this.childrenHtml.length ? (
					<ul>{this.childrenHtml}</ul>
				) : null}
			</li>
		)

		if (this.parent) this.parent.updateHtml()
	}

	//Highlights the prefix
	HighlightHtml() {
		this.childrenHtml = []
		for (let i = 0; i < Object.keys(this.children).length; i++) {
			this.childrenHtml.push(
				this.children[Object.keys(this.children)[i]].html
			)
		}

		this.html = (
			<li key={this.key}>
				<div
					className={
						this.isEnd ? 'normal highlight end' : 'normal highlight'
					}
				>
					{this.key ? this.key : 'Root'}
				</div>
				{this.childrenHtml.length ? (
					<ul>{this.childrenHtml}</ul>
				) : null}
			</li>
		)

		if (this.parent) this.parent.HighlightHtml()
	}
}

class Trie {
	constructor(num = null) {
		this.root = new nodeTrie(null)
		this.highlightStart = null
		if (num) this.randomTrie(num)
	}

	//Insert
	insert(word) {
		if (word === '') return
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) {
				node.children[word[i]] = new nodeTrie(word[i])
				node.children[word[i]].parent = node
			}
			node = node.children[word[i]]
			if (i === word.length - 1) node.isEnd = true
		}
		node.updateHtml()
	}

	//SearchWord
	searchWord(word) {
		if (word === '') return false
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) return false
			node = node.children[word[i]]
			if (i === word.length - 1) return node.isEnd
		}
		return false
	}

	//Delete word
	deleteWord(word) {
		if (!this.searchWord(word)) return
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			node = node.children[word[i]]
		}
		node.isEnd = false

		if (
			Object.keys(node.children).length === 0 &&
			node.children.constructor === Object
		) {
			node = node.parent
			for (let i = word.length - 1; i >= 0; i--) {
				if (node === this.root) {
					delete node.children[word[i]]
					break
				}
				if (node.isEnd) {
					delete node.children[word[i]]
					break
				}

				if (Object.keys(node.children).length > 1) {
					delete node.children[word[i]]
					break
				}
				node = node.parent
			}
		}

		node.updateHtml()
	}

	realTimeSearch(word) {
		if (this.highlightStart) this.highlightStart.updateHtml()
		this.findPrefix(word)
	}

	//findPrefix
	findPrefix(word) {
		if (word === '') return false
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) return false
			node = node.children[word[i]]
		}
		node.HighlightHtml()
		this.highlightStart = node
		return true
	}

	//Find all words
	findAllWords() {
		let node = this.root
		let allWords = []
		for (let i = 0; i < Object.keys(node.children).length; i++) {
			this.findAllWords2(
				node.children[Object.keys(node.children)[i]],
				allWords
			)
		}
		return allWords
	}

	findAllWords2(node, allWords, word = '') {
		word += node.key
		if (node.isEnd) allWords.push(word)
		for (let i = 0; i < Object.keys(node.children).length; i++) {
			this.findAllWords2(
				node.children[Object.keys(node.children)[i]],
				allWords,
				word
			)
		}
	}

	//Inserts num random words to the trie
	randomTrie(num) {
		if (num > 993) num = 993
		let allWords = words['words']
		let upper = 0
		let lower = num * 2 + 10
		let elements = new Set()
		for (let i = 0; i < num; i++) {
			let value =
				Math.floor(Math.random() * (upper - lower + 1)) + lower
			while (elements.has(value) || value > 993) {
				value =
					Math.floor(Math.random() * (upper - lower + 1)) + lower
			}
			elements.add(value)
			this.insert(allWords[value])
		}
	}
}

export default Trie
