import React, { useRef } from 'react'

function RedBMenu(props) {
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

	const random = () => {
		props.random(randomRef.current.value)
	}

	const clear = () => {
		props.random(0)
	}

	return (
		<div className="menu">
			<ul id="mainRedB">
				<li>
					<input
						placeholder="Insert"
						ref={insertRef}
						type="number"
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
						type="number"
						ref={searchRef}
						onKeyUp={e => {
							if (e.keyCode === 13) search()
						}}
						className={props.seaError}
					/>
					<button onClick={search}>Search</button>
				</li>
				<li>
					<input
						placeholder="Delete"
						ref={removeRef}
						type="number"
						onKeyUp={e => {
							if (e.keyCode === 13) remove()
						}}
						className={props.delError}
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
				<li className="dropdown">
					<button>Traversal</button>
					<div className="dropdown-content">
						<ul>
							<li>
								<button onClick={() => props.traversal('inorder')}>
									Inorder
								</button>
							</li>
							<li>
								<button onClick={() => props.traversal('preorder')}>
									Preorder
								</button>
							</li>
							<li>
								<button onClick={() => props.traversal('postorder')}>
									Postorder
								</button>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<button onClick={props.check}>Check</button>
				</li>
			</ul>
		</div>
	)
}

export default RedBMenu
