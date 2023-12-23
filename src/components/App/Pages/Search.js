import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Container from "../../../layout/Container"
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import filterImage from '../../../assets/img/icons/filter.png';
import { Link } from "react-router-dom";
import { axiosInstance, debounce, truncate } from "../../../constants/utils";

export default () => {
    const [ doctors, setDoctors ] = useState([])
    const [ clinics, setClinics ] = useState([])
    const [ search, setSearch ] = useState(null);
    const [ hospitals, setHospitals ] = useState([])

    const getSearch = debounce(async ( search ) => {
            try {
                setSearch(search)
                if( !search ) {
                    setDoctors([])
                    setClinics([])
                    setHospitals([])
                    return
                }

                let { data } = await axiosInstance.get('/search', { params:  { search, limit: 3  } })

                setDoctors( data?.searchData?.filter( search => search.type === 'Doctor') )
                setClinics( data?.searchData?.filter( search => search.type === 'Clinic') )
                setHospitals( data?.searchData?.filter( search => search.type === 'Hospital') )

            } catch (error) { console.error(error) }
    }, 500 )



    return (
        <Container>
            <section className='p-2 bg-light  sticky'>
                <div className=" shadow d-flex justify-content-between align-items-center my-1 bg-white curved " >
                    <div className="w-100" >
                        <input className=" curved border-0 search-input p-3 w-100 bg-white" type="text" placeholder="Search Doctors, Clinics & Hospitals" autoFocus={true} onChange={(e) => getSearch(e.target.value) }  />
                    </div>
                    <FontAwesomeIcon className="mx-3" icon={faSearch} />
                </div>
            </section>

            <section>
                <div className="m-3">
                    <h4>Search Results</h4>

                    { doctors.length ?
                        <>
                            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                                <h6>Doctors</h6>
                                <Link to={{ pathname: '/doctors', search: `search=${ search }` }} >
                                    <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                                </Link >
                            </div>
                            <div className="d-flex flex-column">
                                {
                                    doctors.map( doctor => <Link className="my-2" to={doctor.organizationType === 'Clinic' ? `/clinic-detail/${ doctor.organizationId }` : `/department-detail/${ doctor.organizationId }` }  > <span><FontAwesomeIcon className="mx-2" icon={faSearch} /> { doctor.name } &nbsp;&#x2022;&nbsp; { truncate(doctor.address || '', 30) } </span></Link> )
                                }
                                
                            </div>
                        </>
                        : 
                        <></>
                    }

                    { clinics.length ?
                        <>
                            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                                <h6>Clinics</h6>
                                <Link to={{ pathname: '/clinics', search: `search=${ search }` }} >
                                    <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                                </Link >
                            </div>
                            <div className="d-flex flex-column">
                                {
                                    clinics.map( clinic => <Link className="my-2" to={`/clinic-detail/${ clinic._id }`}> <span ><FontAwesomeIcon className="mx-2" icon={faSearch} /> { clinic.name } &nbsp;&#x2022;&nbsp; { truncate(clinic.address || '', 30) }</span> </Link> )
                                }
                                
                            </div>
                        </>
                        : 
                        <></>
                    }

                    { hospitals.length ?
                        <>
                            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                                <h6>Hospitals</h6>
                                <Link to={{pathname: '/hospitals', search: `search=${ search }` }} >
                                    <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                                </Link >
                            </div>
                            <div className="d-flex flex-column">
                                {
                                    hospitals.map( hospital => <Link className="my-2" to={`/hospital-detail/${ hospital._id }`}> <span><FontAwesomeIcon className="mx-2" icon={faSearch} /> { hospital.name } &nbsp;&#x2022;&nbsp; { truncate(hospital.address || '', 30) }</span> </Link>)
                                }
                                
                            </div>
                        </>
                        : 
                        <></>
                    }
                </div>
            </section>

            {/* <div className="p-1 border border-1 " style={{ width: '2rem', height: '2rem', borderRadius: '8px' }} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <img src={filterImage} width={'100%'} height={'100%'} />
            </div> */}

        </Container>
    )
}