import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import filterImage from '../../../assets/img/icons/filter.png';
import Select from "react-select";
import { axiosInstance,  getFullPath } from '../../../constants/utils' 
import { ORGANIZATION_TYPE } from "../../../constants/constant";
import NO_PHOTO from '../../../assets/images/no-photo.png';
import { Link } from "react-router-dom";
import './SearchBar.css';
import OutsideWrapper from "../../common-components/OutsideWrapper";

const Search = () => {
  const [ isFilterOpen, setIsFilterOpen ] = useState(false)
  const [ sepcializations, setSpecializations ] = useState([])
  const [ searchData, setSearchData ] = useState([]);
  const [ isOpenSearch, setIsOpenSearch ] = useState(false)
  const [ filter, setFilter ] = useState({ search: null, fee: null, city: null, specialization: null, type: null })
  const [cities, setCities] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    getAllSpecializations()
    getAllCities()
  },[])

  useEffect(() => {
    setFilter({ })
    setIsOpenSearch(false)
    setSearchData([])
    setIsFilterOpen(false)
    
  }, [ window.location.pathname ])

  useEffect( () => {
    if( filter.search || filter.fee || filter.city || filter.specialization || filter.type ){
      setIsOpenSearch(true)
      getSearch()
    }
  }, [ filter ] )

  const getAllSpecializations = async () => {
    try{
      let { data } = await axiosInstance.get('get-specializations')
      setSpecializations(data?.specializations)
    } catch(error){ console.error(error) }
  }
  
  const getAllCities = async () => {
    try {
      let { data } = await axiosInstance.get("/cities");
      setCities(data?.cities);
    } catch (error) {
      console.error(error);
    }
  };

  const getSearch = async () => {
    try{
      let { data } = await axiosInstance.get('/search', { params: filter })
      setSearchData(data?.searchData)
    } catch(error){ console.error(error) }
  }

  return (
    <>
      {/* <div
        style={{ position: "fixed", zIndex: "800" }}
        className="seacrh-bar-container w-100 "
      >
        <ul className="d-flex flex-row justify-content-center seacrh-ul pt-2">
          <li>
            <img
              className="cursor-pointer"
              style={{ width: "30px", height: "35px", marginRight: "10px" }}
              src={filterImage}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              alt="filter"
            />
          </li>
          <li>
            <div className="search-bar">
              <input
                placeholder="Doctors, Clinics and Hospitals etc"
                ref={inputRef}
                type="text"
                onClick={() => setIsOpenSearch(true)}
                onChange={(e) => {
                  if (!e.target.value) setSearchData([]);
                  setFilter({ ...filter, search: e.target.value });
                }}
              />
              <FontAwesomeIcon className="search-ico" icon={faSearch} />
              {isOpenSearch && (
                <FontAwesomeIcon
                  className="search-ico mx-2"
                  icon={faXmark}
                  onClick={() => {
                    setIsOpenSearch(false);
                    setIsFilterOpen(false);
                    inputRef.current.value = null;
                  }}
                />
              )}
            </div>
          </li>
        </ul>
        {isFilterOpen && (
          <div className="w-100 " style={{ background: "#fff", }}>
            <div className="d-flex justify-content-around align-item-center search-mobile">
              <div>
                <div
                  className="d-flex justify-content-between search-items"
                  style={{ width: "15rem" }}
                >
                  <div className="">Consultation Fee</div>
                  <div className="">Rs.{filter.fee}</div>
                </div>
                <input
                  className="mobile-width form-range"
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  id="feeRange"
                  onChange={(e) =>
                    setFilter({ ...filter, fee: e.target.value })
                  }
                />
              </div>
              <div className="m-1">
                <Select
                  isMulti={false}
                  options={cities}
                  getOptionLabel={({ city }) => city}
                  getOptionValue={({ city }) => city}
                  className={`form-control p-0  search-items`}
                  classNamePrefix="select"
                  placeholder="Select City"
                  onChange={(e) => setFilter({ ...filter, city: e.city })}
                />
              </div>
              <div className="search-items m-1">
                <Select
                  isMulti={false}
                  options={sepcializations?.length ? sepcializations : []}
                  getOptionLabel={({ name }) => name}
                  getOptionValue={({ id }) => id}
                  className={`form-control p-0  `}
                  classNamePrefix="select"
                  placeholder="Select Specialization"
                  onChange={(e) =>
                    setFilter({ ...filter, specialization: e.name })
                  }
                />
              </div>
              <div className="search-items m-1">
                <Select
                  isMulti={false}
                  options={ORGANIZATION_TYPE}
                  getOptionLabel={({ name }) => name}
                  getOptionValue={({ id }) => id}
                  className={`form-control p-0  search-items`}
                  classNamePrefix="select"
                  placeholder="Select Type"
                  onChange={(e) => setFilter({ ...filter, type: e.name })}
                />
              </div>
            </div>
          </div>
        )}
        {isOpenSearch && (
          <div
            className="py-2 px-0 container main-ch"
            style={{ background: "black" }}
          >
            <div className="search-page container rounded">
              <div className="search-result-container p-0">
                {searchData?.length > 0 ? (
                  searchData.map((clinic) => (
                    <Link
                      className="w-50 mr-1 p-2 main-ch"
                      to={
                        clinic?.organizationType === "Hospital"
                          ? `/hospital-detail/${
                              clinic?.userType
                                ? clinic?.organizationId
                                : clinic._id
                            }`
                          : `/clinic-detail/${
                              clinic?.userType
                                ? clinic?.organizationId
                                : clinic._id
                            }`
                      }
                    >
                      <div class="ms-card mb-0">
                        <div class="ms-card-body">
                          <div class="media mb-0 fs-14">
                            <div class="me-2 align-self-center">
                              <img
                                src={
                                  clinic?.photo
                                    ? getFullPath(clinic?.photo)
                                    : NO_PHOTO
                                }
                                class="ms-img-round"
                                alt="people"
                              />
                            </div>
                            <div class="media-body">
                              <h6>{clinic?.name}</h6>
                              <div class="float-end d-flex-colum justify-content-between">
                                <div class="div">
                                  <span
                                    class="badge badge-outline-danger"
                                    style={{ marginBottom: "50%" }}
                                  >
                                    {clinic?.userType
                                      ? "Doctor"
                                      : clinic?.organizationType}
                                  </span>
                                </div>
                              </div>
                              <p class="fs-12 my-1 text-disabled">
                                {clinic?.email}
                              </p>
                              <h6 class="mt-0">
                                <span class="fs-14">
                                  <i class="fas fa-map-marker-alt"></i>
                                </span>
                                {clinic?.address || "-"}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="align-item-center">
                    <span>No Search results</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div> */}
      <OutsideWrapper callback={() => {setIsOpenSearch(false); setIsFilterOpen(false)}}>
        <section className="bg-white w-100 position-fixed shadow" style={{  zIndex: '3', top: 0}}>
            <div className="d-flex align-items-center p-3 m-0">
                <div className="w-100 me-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#efefef', borderRadius:'8px' }}>
                    <div className="w-100" onClick={() => setIsOpenSearch(true)}>
                        <input className=" border-0 search-input p-2 w-100" type="text" placeholder="Search" style={{ backgroundColor: '#efefef', borderRadius: '8px'}} />
                    </div>
                    <FontAwesomeIcon className="mx-3" icon={faSearch} />
                </div>
                <div className="p-1 border border-1 " style={{ width: '2rem', height: '2rem', borderRadius: '8px'}} onClick={() => setIsFilterOpen(!isFilterOpen) }>
                    <img src={filterImage} width={'100%'} height={'100%'} />
                </div>
            </div>
            {isOpenSearch && <div className="m-2">
                <h6>Search Results</h6>
                <div className="d-flex flex-column">
                    <span className="my-1"><FontAwesomeIcon className="mx-2" icon={faSearch} /> Aka Hospitals &nbsp;&#x2022;&nbsp; Hospital</span>
                    <span className="my-1"><FontAwesomeIcon icon={faSearch} className="mx-2" /> JNMC Aligarh&nbsp;&#x2022;&nbsp; Clinic</span>
                    <span className="my-1"><FontAwesomeIcon icon={faSearch} className="mx-2" /> Malkhan Singh&nbsp;&#x2022;&nbsp; Doctor</span>
                </div>

            </div>}
            {
                isFilterOpen && <div className="mx-3 d-flex justify-content-around mb-3">
                    <div className="w-100 me-2">
                        <select className="login-input w-100 rounded border-0 ms-1 p-2 " style={{backgroundColor: '#efefef', borderRadius: '8px'}}>
                            <option value={'test'}>Test</option>
                        </select>
                    </div>
                    <div className="w-100 ms-2">
                    <select className="login-input w-100 rounded border-0 ms-1 p-2 " style={{backgroundColor: '#efefef', borderRadius: '8px'}}>
                        <option value={'test'}>Test</option>
                    </select>
                    </div>
                </div>
            }
        </section>
      </OutsideWrapper>
    </>
  );
};

export default Search;
