import React, { useRef } from 'react'

function TrieMenu(props) {
	const insertRef = useRef(null)
	const removeRef = useRef(null)
	const searchRef = useRef(null)
	const randomRef = useRef(null)

	const insert = () => {
		props.insert(insertRef.current.value)
	}

	const remove = () => {
		props.remove(removeRef.current.value)
	}

	const search = () => {
		props.search(searchRef.current.value)
	}

	const searchFromDel = () => {
		props.search(removeRef.current.value)
	}

	const random = () => {
		props.random(randomRef.current.value)
	}

	const clear = () => {
		props.random(0)
	}

	return (
		<div className="menu trie">
			<ul id="mainTrie">
				<li>
					<input
						placeholder="Insert"
						ref={insertRef}
						type="text"
						onKeyUp={e => {
							if (e.keyCode === 13) insert()
						}}
					/>
					<button onClick={insert} className="insert">
						Insert
					</button>
				</li>
				<li>
					<input
						placeholder="Search"
						type="text"
						ref={searchRef}
						onChange={search}
					/>
				</li>
				<li>
					<input
						placeholder="Delete"
						ref={removeRef}
						type="text"
						onChange={searchFromDel}
						className={props.delError}
						onKeyUp={e => {
							if (e.keyCode === 13) remove()
						}}
					/>
					<button onClick={remove} className="delete">
						Delete
					</button>
				</li>
				<li>
					<input
						placeholder="Node count"
						type="number"
						ref={randomRef}
						onKeyUp={e => {
							if (e.keyCode === 13) random()
						}}
					/>
					<button onClick={random}>Random</button>
				</li>
				<li>
					<button onClick={clear}>Clear</button>
				</li>
			</ul>
		</div>
	)
}

export default TrieMenu
