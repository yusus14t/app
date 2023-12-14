import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import filterImage from '../../../assets/img/icons/filter.png';
import Select from "react-select";
import { axiosInstance,  getFullPath } from '../../constants/utils' 
import { ORGANIZATION_TYPE } from "../../constants/constant";
import NO_PHOTO from '../../../assets/images/no-photo.png';
import { Link } from "react-router-dom";
import './SearchBar.css';
import OutsideWrapper from "../common-components/OutsideWrapper";

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
      
      <OutsideWrapper  callback={() => {setIsOpenSearch(false); setIsFilterOpen(false)}}>
        {/* <section className="bg-white w-100 position-fixed shadow" style={{  zIndex: '3', top: 0}}>
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
        </section> */}
      </OutsideWrapper>
    </>
  );
};

export default Search;
