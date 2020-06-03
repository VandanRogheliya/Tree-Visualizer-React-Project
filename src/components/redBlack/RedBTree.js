import React, { useState, useEffect } from 'react'
import RedBMenu from './RedBMenu'
import RBT from './DataStructure'
import RedBPopup from './RedBPopup'
import useDelError from '../../hooks/useDelError'
import { Icon } from '@iconify/react'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'
import usePopup from '../../hooks/usePopup'
import useTraversal from '../../hooks/useTraversal'

function RedBTree(props) {
	//hooks
	const [tree, setTree] = useState()
	const [treeHtml, setTreeHtml] = useState()
	const [bstList, setBstList] = useState([])
	const [delError, setDelError] = useDelError(treeHtml)
	const [searchError, setSearchError] = useDelError(treeHtml)
	const [traversalList, traversalDispatch] = useTraversal(tree)
	const [popup, togglePopup] = usePopup()

	//Initializing Tree
	useEffect(() => {
		let tempTree = new RBT()
		setTree(tempTree)
		setTreeHtml(tempTree.root.html)
		return () => {
			setTree(null)
			setTreeHtml(null)
		}
	}, [])

	useEffect(() => {
		setBstList([])
	}, [treeHtml])

	//Insert Function
	const insert = val => {
		val = parseInt(val)
		if (!val) return
		let tempTree = tree
		tempTree.insert(val)
		setTree(tempTree)
		setTreeHtml(tree.root.html)
		traversalDispatch('clear')

	}

	//Remove
	const remove = val => {
		val = parseInt(val)
		let tempTree = tree
		setDelError(false)
		if (!tempTree.search(val)) {
			setDelError(true)
			return
		}
		tempTree.remove(val)
		setTree(tempTree)
		if (tree.root) setTreeHtml(tree.root.html)
		else setTreeHtml(null)
		traversalDispatch('clear')

	}

	//Search
	const search = val => {
		val = parseInt(val)
		let tempTree = tree

		setSearchError(false)
		if (!tempTree.search(val)) {
			setSearchError(true)
			return
		}

		tempTree.search(val)
		setTree(tempTree)
		if (tree.root) setTreeHtml(tree.root.html)
		else setTreeHtml(null)
	}

	//Generate Random BST with num nodes
	const random = num => {
		num = parseInt(num)
		if (num < 0) return
		let tempTree = new RBT(num)
		setTree(tempTree)
		setTreeHtml(tempTree.root.html)
		traversalDispatch('clear')

	}

	//Checks whether BST is balanced, complete, perfect or full
	const check = () => {
		let tempList = tree.checkBST()
		if (!tempList.length) tempList.push('No Type Match')
		setBstList(tempList)
	}

	return (
		<div>
			<header>
				<h1 className="heading">
					Red Black Tree
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
			<RedBMenu
				insert={insert}
				remove={remove}
				search={search}
				random={random}
				traversal={traversalDispatch}
				check={check}
				delError={delError ? 'error' : ''}
				seaError={searchError ? 'error' : ''}
			/>
			<div className="traversal">
				{traversalList.list.length ? (
					<ul>
						{' '}
						{traversalList.op}:
						{traversalList.list.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				) : (
					<p>No Traversal Performed</p>
				)}
			</div>
			<div className="bstlist">
				{bstList.length ? (
					<ul>
						{' '}
						{bstList.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				) : (
					<p>Not yet checked</p>
				)}
			</div>
			<div className="tree">
				<ul>{treeHtml}</ul>
			</div>
			{popup ? <RedBPopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default RedBTree
