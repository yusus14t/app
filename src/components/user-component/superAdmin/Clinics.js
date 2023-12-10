import { useEffect, useState } from "react";
import { axiosInstance, getFullPath } from "../../../constants/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../common-components/Modal";
import NO_PHOTO from '../../../assets.app/images/no-photo.png';

const Clinics = () => {
    const [departments, setDepartments] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [department, setDepartment] = useState({})

    useEffect(() => {
        getDepartments()
    }, [])

    const getDepartments = async () => {
        try{
            let { data } = await axiosInstance.get('/doctor/clinics')
            setDepartments(data?.departments)
        } catch(error){
            console.error(error)
        }
    }

    const deleteDepartment = async ( _id ) => {
        try {
            await axiosInstance.post('/doctor/delete-department', { _id })
            setDeleteModal(false)
            setDepartments( old => old.filter( department => department?.organizationId?._id !== _id ))
        } catch(error) { console.error(error) }
    }

    return (
        <div className="ms-content-wrapper mx-2">
            <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                <div><h6>Clinics</h6></div>
                <div class="ms-form-group my-0 mb-0 has-icon fs-14 d-flex justify-content-center">
                </div>


            </div>
            <div className="row">
                { departments?.length > 0 && departments.map((department, index) => (
                    <div key={index} className="col-lg-4 col-md-3  col-sm-6">
                        <div className="ms-card">
                            <div className="ms-card-body" style={{ borderLeft: '5px solid #112c2f'}}>
                                <div className="media mb-0 fs-14">
                                    <div className="me-2 align-self-center">
                                        <img src={department?.organizationId?.photo ? getFullPath(department?.organizationId?.photo) :  NO_PHOTO} className="ms-img-round" alt="people" />
                                    </div>
                                    <div className="media-body" >
                                        <h6 style={{ maxWidth: '70%'}}>{department?.organizationId?.name}</h6>
                                        <div className="float-end d-flex-colum justify-content-between">
                                            <div className="div">
                                                <span style={{ marginBottom: "50%" }} class="badge badge-outline-danger">{department?.isActive ? 'Active' : 'Inactive'}</span>
                                            </div>
                                            <div style={{ marginLeft: "15px" }} className="float-last">
                                                {/* <FontAwesomeIcon className="cursor-pointer"  icon={faEdit}></FontAwesomeIcon> */}
                                                <FontAwesomeIcon style={{ marginLeft: "8px" }} className="cursor-pointer"  icon={faTrash} onClick={() => {setDepartment(department); setDeleteModal(true)}}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                        <p className="fs-12 my-1 text-disabled">{department?.organizationId?.specialization?.length ? department?.organizationId?.specialization[0]?.name : '-'}</p>
                                        <h6 className="fs-12 my-1">{department?.phone ? `( ${department?.phone.slice(0,3)} ) - ${department?.phone.slice(3,6)} - ${department?.phone.slice(-4)}` : '-'}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}
            </div>

            { deleteModal && <Modal
                isOpen={deleteModal}
                setIsOpen={setDeleteModal}
                title={` Edit ${ department?.organizationId?.name }`}
                callback={() => deleteDepartment(department?.organizationId?._id) }
            >
                Do you want to delete this department?
            </Modal>}

        </div>
    )
}
export default Clinics;