import { useEffect, useState } from "react";
import { axiosInstance, getFullPath } from "../../../constants/utils";
import defaultImage from "../../../assets/images/no-photo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../common-components/Modal";
import Profile from "../../common-components/Settings/Profile";
import useToasty from '../../../hooks/toasty'
import Container from "../../../layout/Container";


const MR = () => {
    const [MRs, setMRs] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [mr, setMR] = useState({})
    const toasty = useToasty()

    useEffect(() => {
        getMRs()
    }, [])

    const getMRs = async () => {
        try{
            let { data } = await axiosInstance.get('/super-admin/mrs')
            setMRs(data?.MRs)
        } catch(error){
            console.error(error)
        }
    }

    const deleteMRs = async ( _id ) => {
        try {
            await axiosInstance.delete(`/super-admin/mr/${ _id }`)
            setMRs( old => old.filter( mr => mr?._id !== _id ))
            setDeleteModal(false)
            toasty.success('Successfully deleted.')
        } catch(error) { console.error(error) }
    }

    return (
        <Container>
            <div className="ms-content-wrapper mx-2">
            <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                <div><h6>MRs</h6></div>
                <div class="ms-form-group my-0 mb-0 has-icon fs-14 d-flex justify-content-center">
                    <button className="btn btn-light btn-md mx-2" onClick={() => setAddModal(true) }>+ MR</button>
                </div>


            </div>
            <div className="row">
                { MRs?.length > 0 && MRs.map((mr, index) => (
                    <div key={index} className="col-lg-4   col-sm-6">
                        <div className="ms-card">
                            <div className="ms-card-body" style={{ borderLeft: '5px solid #112c2f'}}>
                                <div className="media mb-0 fs-14">
                                    <div className="me-2 align-self-center">
                                        <img src={mr?.photo ? getFullPath(mr?.photo) :  defaultImage} className="ms-img-round" alt="people" />
                                    </div>
                                    <div className="media-body" >
                                        <h6 style={{ maxWidth: '70%'}}>{mr?.name}</h6>
                                        <div className="float-end d-flex-colum justify-content-between">
                                            <div className="div">
                                                <span style={{ marginBottom: "50%" }} class="badge badge-outline-danger">{mr?.isActive ? 'Active' : 'Inactive'}</span>
                                            </div>
                                            <div style={{ marginLeft: "15px" }} className="float-last">
                                                <FontAwesomeIcon style={{ marginLeft: "8px" }} className="cursor-pointer"  icon={faTrash} onClick={() => {setMR(mr); setDeleteModal(true)}}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                        <p className="fs-12 my-1 text-disabled">{ mr.address }</p>
                                        <h6 className="fs-12 my-1">{mr?.phone ? `( ${mr?.phone.slice(0,3)} ) - ${mr?.phone.slice(3,6)} - ${mr?.phone.slice(-4)}` : '-'}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}
            </div>

            { deleteModal && <Modal
                isOpen={deleteModal}
                setIsOpen={setDeleteModal}
                title={` Edit ${ mr?.name }`}
                callback={() => deleteMRs(mr?._id) }
            >
                Do you want to delete this mr?
            </Modal>}

            { addModal && <Modal
                isOpen={addModal}
                setIsOpen={setAddModal}
                title={`Add MR`}
                submitButton={false}
                closeButton={false}
            >
                <Profile source={'addMR'} setIsOpen={setAddModal} refresh={() => getMRs()} />
            </Modal>}

        </div>
        </Container>
    )
}
export default MR;