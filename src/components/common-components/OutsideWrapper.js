import { useEffect, useRef } from "react"

export default ({ callback = () => {}, children }) => {
    const wrapperRef = useRef(null)

    const handleOutside = (event) => {
        if(!wrapperRef.current.contains(event.target)) callback()
    }

    useEffect(() => {
        window.addEventListener('mousedown', handleOutside)
        return() => window.removeEventListener('mousedown', handleOutside)
    })

    return (
        <div ref={wrapperRef}>
            { children }
        </div>
    )
}