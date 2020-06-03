import React, { useState, useEffect } from 'react'
import Trie from './DataStructureN'
import TrieMenu from './TrieMenu'
import TriePopup from './TriePopup'
import useDelError from '../../hooks/useDelError'
import { Icon } from '@iconify/react'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'
import usePopup from '../../hooks/usePopup'

function TrieMain(props) {
	//hooks
	const [trie, setTrie] = useState(null)
	const [trieHtml, setTrieHtml] = useState(null)
	const [words, setWords] = useState([])
	const [wordNotFound, setWordNotFound] = useDelError(trieHtml)
	const [popup, togglePopup] = usePopup()

	//OnMount Behaviour
	useEffect(() => {
		let tempTrie = new Trie()
		setTrie(tempTrie)
		setTrieHtml(tempTrie.root.html)
		return () => {
			setTrie(null)
			setTrieHtml(null)
		}
	}, [])

	//Insert
	const insert = word => {
		let tempTrie = trie
		tempTrie.insert(word)
		setTrie(tempTrie)
		setTrieHtml(tempTrie.root.html)
		listAll()
	}

	//Remove
	const remove = word => {
		let tempTrie = trie

		if (!tempTrie.searchWord(word)) setWordNotFound(true)
		else setWordNotFound(false)

		tempTrie.deleteWord(word)
		setTrie(tempTrie)
		setTrieHtml(tempTrie.root.html)
		listAll()
	}

	//Search
	const search = word => {
		let tempTrie = trie

		tempTrie.realTimeSearch(word)
		setTrie(tempTrie)
		setTrieHtml(tempTrie.root.html)
	}

	//Generates random Trie with num words
	const random = num => {
		num = parseInt(num)
		let tempTrie = new Trie(num)
		setTrie(tempTrie)
		setTrieHtml(tempTrie.root.html)
		listAll(tempTrie)
		// setWordNotFound(false)
	}

	//Listing all words in the trie
	const listAll = (tempTrie = trie) => {
		let tempWords = tempTrie.findAllWords()
		setWords(tempWords)
	}

	return (
		<div>
			<header>
				<h1 className="heading">
					Trie
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
			<TrieMenu
				insert={insert}
				search={search}
				remove={remove}
				random={random}
				delError={wordNotFound ? 'error' : ''}
			/>
			<div className="bstlist">
				{words.length ? (
					<ul>
						{words.map((word, i) => (
							<li key={i}>{word}</li>
						))}
					</ul>
				) : (
					<p>Trie is Empty</p>
				)}
			</div>
			<div className="tree">
				<ul>{trieHtml}</ul>
			</div>
			{popup ? <TriePopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default TrieMain
