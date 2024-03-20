export default ({ children, className }) => {
    return(
        <div className={className} style={{ marginBottom: '5rem' }}>
            { children }
        </div>
    )
}