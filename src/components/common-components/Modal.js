

const Modal = ({
    title = 'Important Notice!',
    isOpen,
    children,
    closeButton = true,
    submitButton = true,
    submitButtonText = 'Submit',
    data = '',
    setIsOpen = () => { },
    callback = () => { }
}) => {
    return (
        <div className={`modal fade ${isOpen && 'show'}`} tabindex="-1" role="dialog" aria-labelledby="modal-1">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title has-icon ms-icon-round "> {title}</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsOpen(false)}><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    {(closeButton || submitButton) && <div className="modal-footer">
                        {closeButton && <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>}
                        {submitButton && <button type="button" className="btn btn-primary shadow-none" onClick={(event) => callback(data)} >{submitButtonText}</button>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Modal;

