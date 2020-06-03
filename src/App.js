import React, { useReducer, useEffect } from 'react'
import './styles/App.scss'
import './styles/BSTStyle.scss'
import './styles/popup.scss'
import './styles/mainMenuStyle.scss'
import Menu from './components/Menu'
import BSTree from './components/bst/BSTree'
import MinH from './components/minHeap/MinH'
import MaxH from './components/maxHeap/MaxH'
import TrieMain from './components/trie/TrieMain'
import AVLTree from './components/avl/AVLTree'
import RedBTree from './components/redBlack/RedBTree'
import usePopup from './hooks/usePopup'
import MainPopup from './components/MainPopup'

const initialState = {
	menu: true,
	bst: false,
	trie: false,
	minheap: false,
	maxheap: false,
	avl: false,
	redb: false,
}

const reducer = (state, action) => {
	switch (action) {
		case 'menu':
			return { ...initialState, menu: true }
		case 'bst':
			return { ...initialState, bst: true, menu: false }
		case 'trie':
			return { ...initialState, trie: true, menu: false }
		case 'minheap':
			return { ...initialState, minheap: true, menu: false }
		case 'maxheap':
			return { ...initialState, maxheap: true, menu: false }
		case 'avl':
			return { ...initialState, avl: true, menu: false }
		case 'redb':
			return { ...initialState, redb: true, menu: false }
		default:
			return state
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [popup, togglePopup] = usePopup()

	useEffect(() => {
			togglePopup()
	}, [])

	return (
		<div className="App">
			
			{state.menu && <Menu selector={dispatch} togglePopup={togglePopup}/>}
			{state.bst && <BSTree selector={dispatch} />}
			{state.trie && <TrieMain selector={dispatch} />}
			{state.minheap && <MinH selector={dispatch} />}
			{state.maxheap && <MaxH selector={dispatch} />}
			{state.avl && <AVLTree selector={dispatch} />}
			{state.redb && <RedBTree selector={dispatch} />}
			{popup ? <MainPopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default App
