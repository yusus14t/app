import { useEffect, useState } from "react";
import { axiosInstance, formatPhone, getAuthHeader, getFullPath } from "../../../constants/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../common-components/Modal";
import useToasty from '../../../hooks/toasty'
import NO_PHOTO from "../../../assets.app/images/no-photo.png";


const Clinics = ({ source }) => {
    const [clinics, setClinics] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [ clinic, setClinic ] = useState({});
    const toasty = useToasty();

    useEffect(() => {
        getClinics()
    }, [source, ])

    const getClinics = async () => {
        try {
            let { data } = await axiosInstance.get('/mr/organiztions', { params: { organizationType: source === 'clinics' ? 'Clinic' : 'Hospital' } , ...getAuthHeader()})
            console.log(data)
            setClinics(data?.organizations)
        } catch(error){ console.error(error) }
    }

    const deleteClinic = async ( _id ) => {
        try{
            await axiosInstance.delete(`/mr/orgnization/${ _id }`)
            setClinics( old => old.filter( clinic => clinic.organizationId?._id !== _id ))
            setDeleteModal(false)
            toasty.success('Successfully deleted.') 
        } catch(error){ console.error(error) }
    } 

    return (
            
        <div className="ms-content-wrapper mx-2 ">
            <div className="ms-panel mb-0 inner-content-height">
                <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                    <div><h6>{ source === 'clinics' ? 'Clinics' : 'Hospitals'}</h6></div>
                    <div class="ms-form-group my-0 mb-0 has-icon fs-14">
                        <i class="flaticon-search text-disabled"></i>
                    </div>

                </div>
                <div className="overflow">
                    <div className="row mx-2">
                        {clinics?.length > 0 && clinics.map((clinic, index) => (
                            <div key={index} className="col-lg-4 col-md-3  col-sm-6">
                                <div className="ms-card">
                                    <div className="ms-card-body">
                                        <div className="media mb-0 fs-14">
                                            <div className="me-2 align-self-center">
                                                <img src={clinic?.organizationId?.photo ? getFullPath(clinic.organizationId?.photo) : NO_PHOTO} className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <h6>{clinic?.organizationId?.name}</h6>
                                                <div className="float-end d-flex-colum justify-content-between">
                                                    <div className="div">
                                                        <span style={{ marginBottom: "50%" }} class="badge badge-outline-danger">{clinic?.organizationType}</span>
                                                    </div>
                                                    <div style={{ marginLeft: "15px" }} className="float-last">
                                                        <FontAwesomeIcon style={{ marginLeft: "8px" }} className="cursor-pointer" icon={faTrash} onClick={() => {setClinic(clinic); setDeleteModal(true)} }></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                                <p className="fs-12 my-1 text-disabled">{clinic?.organizationId?.address || '-'}</p>
                                                <h6 className="mt-0">
                                                    <span className="fs-14">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                    </span>
                                                    {formatPhone(clinic?.phone)}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            { deleteModal && <Modal
                isOpen={deleteModal}
                setIsOpen={setDeleteModal}
                title={` Delete ${ clinic?.organizationId?.name }`}
                data={clinic}
                callback={() => deleteClinic(clinic?.organizationId?._id) }
            >
                Do you want to delete this department?
            </Modal>}
        </div>
    )
}
export default Clinics;