export default ({ children, className }) => {
    return(
        <div className={className} style={{ marginBottom: '7rem' }}>
            { children }
        </div>
    )
}