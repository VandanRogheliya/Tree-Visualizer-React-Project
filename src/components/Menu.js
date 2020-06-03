import React from 'react'

function Menu(props) {
	return (
		<>
			<header className="main-header">
				<h1 className="heading main">Tree Visualizer</h1>
			</header>
			<div id="bst">
				<button onClick={() => props.selector('bst')}>
					Binary Search Tree
				</button>
			</div>

			<div id="trie">
				<button onClick={() => props.selector('trie')}>Trie</button>
			</div>

			<div id="avl">
				<button onClick={() => props.selector('avl')}>
					AVL Tree
				</button>
			</div>

			<div id="minheap">
				<button onClick={() => props.selector('minheap')}>
					Min Heap
				</button>
			</div>

			<div id="maxheap">
				<button onClick={() => props.selector('maxheap')}>
					Max Heap
				</button>
			</div>

			<div id="redb">
				<button onClick={() => props.selector('redb')}>
					Red Black Tree
				</button>
			</div>
		</>
	)
}

export default Menu
