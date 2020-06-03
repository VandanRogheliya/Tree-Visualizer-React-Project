import React from 'react'
import { Icon } from '@iconify/react'
import closeCircleF from '@iconify/icons-jam/close-circle-f'

function RedBPopup(props) {
	return (
		<div className="popup">
			<div className="inner">
				<h1>Help</h1>
				<Icon
					className="icon"
					onClick={props.toggle}
					width="35px"
					height="35px"
					icon={closeCircleF}
				/>
				<div>
					<ul className="help-list">
						<li>
							<button>Insert</button> Inserts a node
						</li>
						<li>
							<button>Search</button> Searches and highlights the
							value
						</li>
						<li>
							<button>Delete</button> Deletes the node
						</li>
						<li>
							<button>Random</button> Inserts n random nodes
						</li>
						<li>
							<button>Clear</button> Removes all nodes
						</li>
						<li>
							<button>Traversal</button> Performs chosen traversal
						</li>

						<li>
							<button>Check</button>Checks whether Red Black Tree is
							Balanced, Complete, Perfect or Full
						</li>
					</ul>
					<a
						href="https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="link-button">
							Learn About Red Black Trees
						</button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RedBPopup
