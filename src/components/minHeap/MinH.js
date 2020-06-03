import React, { useState, useEffect } from 'react'
import MinHeap from './DataStructure'
import MinHeapMenu from './MinHeapMenu'
import MinHeapPopup from './MinHeapPopup'
import useDelError from '../../hooks/useDelError'
import { Icon } from '@iconify/react'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'
import usePopup from '../../hooks/usePopup'

function MinH(props) {
	//hooks
	const [minHeap, setMinHeap] = useState(null)
	const [heapHtml, setHeapHtml] = useState(null)
	const [popup, togglePopup] = usePopup()
	const [delError, setDelError] = useDelError(heapHtml)

	//Initializing MinHeap
	useEffect(() => {
		let tempHeap = new MinHeap()
		setMinHeap(tempHeap)
		return () => {
			setMinHeap(null)
			setHeapHtml(null)
		}
	}, [])

	//Insert
	const insert = value => {
		value = parseInt(value)
		if (!value) return
		let tempHeap = minHeap
		tempHeap.insert(value)
		setMinHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	//Extract the smallest element
	const extract = () => {
		let tempHeap = minHeap
		tempHeap.removeTop()
		setMinHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	//Delete Element
	const remove = value => {
		value = parseInt(value)
		let tempHeap = minHeap

		if (tempHeap.heap.indexOf(value) === -1) {
			setDelError(true)
			return
		}

		tempHeap.deleteEl(value)
		setMinHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	//Generate Min Heap with random values
	const random = value => {
		value = parseInt(value)
		let tempHeap = new MinHeap(value)
		setMinHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	return (
		<div>
			<header>
				<h1 className="heading">
					Min Heap{' '}
					<button className="i" onClick={togglePopup}>
						<Icon
							icon={questionMarkCircleOutline}
							width="25px"
							height="25px"
						/>
					</button>
				</h1>
				<button
					onClick={() => props.selector('menu')}
					className="main-menu-button"
				>
					Home
				</button>
			</header>
			<MinHeapMenu
				insert={insert}
				extract={extract}
				remove={remove}
				random={random}
				delError={delError ? 'error' : ''}
			/>
			<div className="traversal">
				{minHeap && minHeap.heap.length ? (
					<ul>
						Heap:
						{minHeap.heap.map((element, index) => (
							<li key={index}>{element}</li>
						))}
					</ul>
				) : (
					<p>Heap is Empty</p>
				)}
			</div>
			<div className="tree">
				<ul>{heapHtml}</ul>
			</div>
			{popup ? <MinHeapPopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default MinH
