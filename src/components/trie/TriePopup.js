import React from 'react'
import { Icon } from '@iconify/react'
import closeCircleF from '@iconify/icons-jam/close-circle-f'

function TriePopup(props) {
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
							<button>Insert</button> Inserts a word
						</li>
						<li>
							<button>Search</button>Highlights the typed prefix
						</li>
						<li>
							<button>Delete</button>Deletes a word
						</li>
						<li>
							<button>Random</button> Inserts n random words
						</li>
						<li>
							<button>Clear</button> Removes all words
						</li>
					</ul>
					<a
						href="https://www.geeksforgeeks.org/trie-insert-and-search/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="link-button">Learn About Tries</button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default TriePopup
