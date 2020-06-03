import React from 'react'

class MinHeap {
	constructor(num = 0) {
		this.end = 0
		this.heap = []
		this.html = null
		if (num) {
			this.generateRandomMinH(num)
		}
	}

	//Helper functions
	heapifyUp(j) {
		if (j === 0) return
		let p = j
		if (p % 2 === 0) p -= 2
		else p--
		p /= 2
		if (this.heap[p] > this.heap[j]) {
			;[this.heap[p], this.heap[j]] = [this.heap[j], this.heap[p]]
			this.heapifyUp(p)
		}
	}

	heapifyDown(p = 0) {
		let c1 = 2 * p + 1
		let c2 = c1 + 1

		if (c2 >= this.end && c1 >= this.end) return
		else if (c2 >= this.end && c1 < this.end) {
			if (this.heap[c1] < this.heap[p]) {
				;[this.heap[p], this.heap[c1]] = [this.heap[c1], this.heap[p]]
				this.heapifyDown(c1)
			}
		} else if (c2 < this.end && c1 >= this.end) {
			if (this.heap[c2] < this.heap[p]) {
				;[this.heap[p], this.heap[c2]] = [this.heap[c2], this.heap[p]]
				this.heapifyDown(c2)
			}
		} else {
			if (
				this.heap[p] > this.heap[c1] ||
				this.heap[p] > this.heap[c2]
			) {
				if (this.heap[c1] < this.heap[c2]) {
					;[this.heap[p], this.heap[c1]] = [
						this.heap[c1],
						this.heap[p],
					]
					this.heapifyDown(c1)
				} else {
					;[this.heap[p], this.heap[c2]] = [
						this.heap[c2],
						this.heap[p],
					]
					this.heapifyDown(c2)
				}
			}
		}
	}

	//Checks if heap is empty
	isEmpty() {
		return this.end === 0
	}

	//inserts a new value into the heap
	insert(value) {
		this.heap[this.end] = value
		this.heapifyUp(this.end++)
		this.html = this.updateHtml()
	}

	//Extracts the top value
	removeTop() {
		if (this.isEmpty()) return -111111
		let temp = this.heap[0]
		this.heap[0] = this.heap[--this.end]
		this.heapifyDown()
		this.heap.pop()
		this.html = this.updateHtml()

		return temp
	}

	//Deletes a specified value
	deleteEl(value) {
		let index = this.heap.indexOf(value)
		if (index === -1) return
		this.heap[index] = Number.NEGATIVE_INFINITY
		this.heapifyUp(index)
		this.removeTop()
	}

	//Updates the whole html
	updateHtml(p = 0) {
		if (!this.end) return null
		let c1 = 2 * p + 1
		let c2 = c1 + 1

		if (c2 >= this.end && c1 >= this.end) {
			return (
				<li key={p}>
					<div className="normal">{this.heap[p]}</div>
					<ul>
						<li className="null">
							<div className="null">null</div>
						</li>
						<li className="null">
							<div className="null">null</div>
						</li>
					</ul>
				</li>
			)
		} else if (c2 >= this.end && c1 < this.end) {
			let c1Html = this.updateHtml(c1)
			return (
				<li key={p}>
					<div className="normal">{this.heap[p]}</div>
					<ul>
						{c1Html}
						<li className="null">
							<div className="null">null</div>
						</li>
					</ul>
				</li>
			)
		} else if (c2 < this.end && c1 >= this.end) {
			let c2Html = this.updateHtml(c2)
			return (
				<li key={p}>
					<div className="normal">{this.heap[p]}</div>
					<ul>
						<li className="null">
							<div className="null">null</div>
						</li>
						{c2Html}
					</ul>
				</li>
			)
		} else {
			let c1Html = this.updateHtml(c1)
			let c2Html = this.updateHtml(c2)
			return (
				<li key={p}>
					<div className="normal">{this.heap[p]}</div>
					<ul>
						{c1Html}
						{c2Html}
					</ul>
				</li>
			)
		}
	}

	//inserts num random values
	generateRandomMinH(num) {
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
}

export default MinHeap
