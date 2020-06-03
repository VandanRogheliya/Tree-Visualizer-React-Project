import { useState } from 'react'

function usePopup() {
	const [popup, setPopup] = useState(false)
	//Toggles Popup
	const togglePopup = () => {
		setPopup(!popup)
  }
  
  return [popup, togglePopup]
}

export default usePopup
