import React, { useState, useEffect } from 'react'
import MaxHeap from './DataStructure'
import MaxHeapMenu from './MaxHeapMenu'
import MaxHeapPopup from './MaxHeapPopup'
import useDelError from '../../hooks/useDelError'
import { Icon } from '@iconify/react'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'
import usePopup from '../../hooks/usePopup'

function MaxH(props) {
	//hooks
	const [maxHeap, setMaxHeap] = useState(null)
	const [heapHtml, setHeapHtml] = useState(null)
	const [popup, togglePopup] = usePopup()
	const [delError, setDelError] = useDelError(heapHtml)

	//Initializing MaxHeap
	useEffect(() => {
		let tempHeap = new MaxHeap()
		setMaxHeap(tempHeap)
		return () => {
			setMaxHeap(null)
			setHeapHtml(null)
		}
	}, [])

	//Insert
	const insert = value => {
		value = parseInt(value)
		if (!value) return
		let tempHeap = maxHeap
		tempHeap.insert(value)
		setMaxHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	//Extract the smallest element
	const extract = () => {
		let tempHeap = maxHeap
		tempHeap.removeTop()
		setMaxHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	//Delete Element
	const remove = value => {
		value = parseInt(value)
		let tempHeap = maxHeap

		if (tempHeap.heap.indexOf(value) === -1) {
			setDelError(true)
			return
		}

		tempHeap.deleteEl(value)
		setMaxHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	//Generate Max Heap with random values
	const random = value => {
		value = parseInt(value)
		let tempHeap = new MaxHeap(value)
		setMaxHeap(tempHeap)
		setHeapHtml(tempHeap.html)
	}

	return (
		<div>
			<header>
				<h1 className="heading">
					Max Heap{' '}
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
			<MaxHeapMenu
				insert={insert}
				extract={extract}
				remove={remove}
				random={random}
				delError={delError ? 'error' : ''}
			/>
			<div className="traversal">
				{maxHeap && maxHeap.heap.length ? (
					<ul>
						Heap:
						{maxHeap.heap.map((element, index) => (
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
			{popup ? <MaxHeapPopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default MaxH
