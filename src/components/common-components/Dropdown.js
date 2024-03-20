import { useEffect, useRef, useState } from "react"


export const Item = ({ children, ...rest }) => {
    return(
        <li class="dropdown-menu-header cursor-pointer dropdown-menu-active p-2" {...rest} >
            {children}
        </li>
    )
}

export const Dropdown = ({ toggle, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null)

    const handleOutside = (event) => {
        if(!wrapperRef.current.contains(event.target)){
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if(isOpen)  window.addEventListener('mousedown', handleOutside)
        return() => window.removeEventListener('mousedown', handleOutside)
    })
    return(
        <>  
            <div className="dropdown light-shadow" onClick={() => setIsOpen(!isOpen)} ref={wrapperRef}>
                {toggle}
                <ul class={`dropdown-menu dropdown-menu-end user-dropdown py-2 mt-3 ${ isOpen && 'show' }`} aria-labelledby="userDropdown" data-bs-popper="none" style={{ top: '3rem'}}>
                    {children}
                </ul>
            </div>
        </>
    )
}
