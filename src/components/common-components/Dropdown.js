import { useEffect, useRef, useState } from "react"


export const Item = ({ children, ...rest }) => {
    return(
        <li class="dropdown-menu-header cursor-pointer dropdown-menu-active px-2 py-1" {...rest} >
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
            <div className="dropdown" onClick={() => setIsOpen(!isOpen)} ref={wrapperRef}>
                {toggle}
                <ul class={`dropdown-menu dropdown-menu-end user-dropdown pb-0 ${ isOpen && 'show' }`} aria-labelledby="userDropdown" data-bs-popper="none" style={{ top: '3rem'}}>
                    {children}
                </ul>
            </div>
        </>
    )
}
