import { useEffect, useState } from 'react';
import filterImage from '../../../assets/img/icons/filter.png';
import Modal from '../../common-components/Modal';
import Select from "react-select";
import { axiosInstance } from '../../../constants/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


export default ({ title, source = null, callback = () => { } }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters, setFilters] = useState({ fee: null, city: null, specialization: null, isApply: false })
    const [specializations, setSpecializations] = useState([])
    const [cities, setCities] = useState([])


    useEffect(() => {
        if( isFilterOpen && !specializations?.length ){
            getAllSpecializations()
            getAllCities()
        }

    }, [isFilterOpen])

    const getAllSpecializations = async () => {
        try {
            let { data } = await axiosInstance.get('get-specializations')
            setSpecializations(data?.specializations)
        } catch (error) { console.error(error) }
    }

    const getAllCities = async () => {
        try {
            let { data } = await axiosInstance.get("/cities");
            setCities(data?.cities);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className=" p-3 mb-4 light-shadow sticky" style={{ backgroundColor: 'rgb(201 219 238)' }} >
                <div className='d-flex justify-content-between align-items-center'>
                    <h5>{title || 'Title'}</h5>
                    <div className="p-1 border border-1 bg-white light-shadow " style={{ width: '2rem', height: '2rem', borderRadius: '8px' }} onClick={() => setIsFilterOpen(true)} >
                        <img src={filterImage} width={'100%'} height={'100%'} />
                    </div>
                </div>

                { filters.isApply && <div className='d-flex overflow-auto mt-2'>
                    { filters.fee && <div className='bg-white curved px-3 py-2 mx-2 d-flex align-items-center'>
                        <p style={{ width: 'max-content' }}>Price : Rs { filters.fee }</p><FontAwesomeIcon className='ms-2' icon={faCircleXmark} onClick={() => {setFilters({ ...filters, fee: null }); callback({ ...filters, fee: null }) } } />
                    </div>}

                    {filters.city && <div className='bg-white curved px-3 py-2 mx-2 d-flex align-items-center'>
                        <p style={{ width: 'max-content' }}>Location : { filters.city } </p> <FontAwesomeIcon className='ms-2' icon={faCircleXmark} onClick={() => {setFilters({ ...filters, city: null }); callback({ ...filters, city: null }) } } />
                    </div>}

                    { filters.specialization && <div className='bg-white curved px-3 py-2 mx-2 d-flex align-items-center'>
                        <p style={{ width: 'max-content' }}>Specialization : { filters.specialization } </p> <FontAwesomeIcon className='ms-2' icon={faCircleXmark} onClick={() => {setFilters({ ...filters, specialization: null }); callback({ ...filters, specialization: null }) } } />
                    </div>}
                </div>}

            </section>


            {isFilterOpen && <Modal
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                title='Filters'
                closeButton={false}
                submitButton={false}
            >
                <section>
                    <div className="col-12 my-3">
                        <label className='my-1'>Select Location</label>
                        <div className="">
                            <Select
                                options={cities}
                                getOptionLabel={({ city }) => city}
                                getOptionValue={({ city }) => city}
                                onChange={(e) => setFilters({ ...filters, city: e.city })}
                                className={`form-control p-0`}
                                classNamePrefix="select"
                                placeholder="Select Location"
                            />
                        </div>
                    </div>
                    <div className="col-12 my-3">
                        <label className='my-1'>Select Specialization</label>
                        <div className="">
                            <Select
                                options={specializations}
                                getOptionLabel={({ name }) => name}
                                getOptionValue={({ id }) => id}
                                onChange={(e) =>
                                    setFilters({ ...filters, specialization: e.name })
                                }
                                className={`form-control p-0`}
                                classNamePrefix="select"
                                placeholder="Select Specialization"
                            />
                        </div>
                    </div>
                    { source !== 'Doctor' && <div className='col-12 my-4'>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <div>
                                <label for="customRange1" class="form-label">Consultation Fee</label>

                            </div>
                            <h6 className='bg-primary px-4 py-2 rounded text-light'>Rs. {filters.fee || 0}</h6>
                        </div>
                        <input type="range" class="form-range" min={'0'} max={'2000'} step={'50'} onChange={(e) =>
                            setFilters({ ...filters, fee: e.target.value })
                        } />
                    </div>}

                    <div className='bg-primary rounded mt-5' onClick={() => { callback(filters); setIsFilterOpen(false); setFilters({ ...filters, isApply: true }) }}>
                        <h5 className='text-center p-2 text-light'>Apply</h5>
                    </div>
                </section>
            </Modal>}
        </>
    )
}