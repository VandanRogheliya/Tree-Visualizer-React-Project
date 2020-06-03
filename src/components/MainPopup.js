import React from 'react'
import { Icon } from '@iconify/react'
import closeCircleF from '@iconify/icons-jam/close-circle-f'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'

function MainPopup(props) {
	return (
		<div className="popup main">
			<div className="inner">
				<h1>Welcome To Tree Visualizer!</h1>
				<Icon
					className="icon"
					onClick={props.toggle}
					width="35px"
					height="35px"
					icon={closeCircleF}
				/>
				<div>
					This React application's aim is to visualize various tree
					data structures. <br />
					Following data structures are visualized:
					<ul className="list-data">
						<li>Binary Search Tree</li>
						<li>Trie</li>
						<li>AVL Trees</li>
						<li>Red-Black Trees</li>
						<li>Min Heap</li>
						<li>Max Heap.</li>
					</ul>
					To learn various visualization features of each section,
					click on{' '}
					<Icon
						icon={questionMarkCircleOutline}
						width="25px"
						height="25px"
					/>{' '}
					at the top.
				</div>
			</div>
		</div>
	)
}

export default MainPopup
