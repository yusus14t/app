import React, {  useEffect, useState } from 'react';
import NO_PHOTO from "../../../assets/images/no-photo.png";

import { Link } from 'react-router-dom';
import { LineChart, DoughnutChart } from '../../common-components/Chart';
import { axiosInstance, formatPhone, getAuthHeader, getFullPath } from '../../../constants/utils'

const Dashbaord = () => {
    const [isWeekChart, setIsWeekChart] = useState(true) 
    const [chartData, setChartData] = useState({})
    const [hospitals, setHospitals] = useState({})
    const [clinics, setClinics] = useState({})
    const [ organizationChartData,setOrganizationChartData ] = useState([])
    const [ analytics, setAnalytics ] = useState({})

    const fullForm = {
        'HL': 'Hospital',
        'CL': 'Clinic',
        'DR': 'Doctor'
    }

    useEffect(() => {
        getOrganizationAnalyitcs()
        changeFilter('clinics')
        getHospitals()
        getClinics()
        getAnalytics()
    }, [])

    const getHospitals =  async () => {
        try{ 
            let { data } = await axiosInstance.get('/mr/organiztions', { params: { organizationType: 'Hospital', istoday: true }, ...getAuthHeader()})
            setHospitals(data.organizations)
        } catch(error){ console.error(error) }
    }
    
    const getClinics =  async () => {
        try{ 
            let { data } = await axiosInstance.get('/mr/organiztions', { params: { organizationType: 'Clinic', istoday: true }, ...getAuthHeader()})
            setClinics(data.organizations)
        } catch(error){ console.error(error) }
    }

    const getOrganizationAnalyitcs = async () => {
        try{
            let { data } = await axiosInstance.get('/mr/organization-chart')
            data?.organizationChartData.map( d => d._id = fullForm[d._id])
            setOrganizationChartData(data?.organizationChartData)
        }catch(error){ console.error(error) }
    }

    const getAnalytics = async () => {
        try{
            let { data } = await axiosInstance.get('/mr/analytics')
            setAnalytics(data?.analytics)
        }catch(error){ console.error(error) }
    }

    const changeFilter = (value) => {
        let data = {
            week: [],
            month: []
        }
        if(value === 'clinics') {
            data = {
                week:  ['2', '5', '1', '2', '3', '7', '9'],
                month: ['3', '1', '6', '9', '3', '6', '8','3','4','2','6', '2']
            }
        }
        else if( value === 'hospitals') {
            data = {
                week:  ['4', '3', '5', '3', '7', '8', '9'],
                month: ['6', '3', '7', '8', '4', '2', '6','3','9','5','8', '4']
            }
        }
        else if( value === 'visits') {
            data = {
                week:  ['1', '2', '3', '4', '3', '2', '3'],
                month: ['1', '2', '3', '4', '3', '2', '3','3','7','4','8', '4']
            }
        }
        else if( value === 'doctors') {
            data = {
                week:  ['6', '3', '6', '4', '8', '3', '6'],
                month: ['5', '2', '4', '7', '8', '9', '6','5','4','2','4', '4']
            }
        }
        setChartData(data)
    } 

    return (
        <div className='ms-content-wrapper '>
            <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                <div>
                    <h6>Dashboard</h6>
                </div>
            </div>
            <div className='row'>
                <div class="col-xl-3 col-md-6 col-sm-6">
                    <div class="ms-card card-gradient-custom ms-widget ms-infographics-widget ms-p-relative">
                        <div class="ms-card-body media">
                            <div class="media-body">
                                <h6>Visits</h6>
                                <div className='d-flex justify-content-start'>
                                    <div className='ms-card-change text-light me-3'><span className='fs-07 text-white'>Today </span>0</div>
                                    <div className='ms-card-change text-light'><span className='fs-07 text-white'>Total </span>0</div>
                                </div>
                            </div>
                        </div>
                        <i class="fas fa-stethoscope ms-icon-mr"></i>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 col-sm-6">
                    <a href="#">
                        <div class="ms-card card-gradient-custom ms-widget ms-infographics-widget ms-p-relative">
                            <div class="ms-card-body media">
                                <div class="media-body">
                                    <h6>Clinics</h6>
                                    <div className='d-flex justify-content-start'>
                                        <div className='ms-card-change text-light me-3'><span className='fs-07 text-white'>Today </span>{analytics?.todayClinics?.count || '0'}</div>
                                        <div className='ms-card-change text-light '><span className='fs-07 text-white'>Total </span>{analytics?.totalClinics?.count || '0'}</div>
                                    </div>
                                </div>
                            </div>
                            <i class="fas fa-stethoscope ms-icon-mr"></i>
                        </div>
                    </a>
                </div>
                <div class="col-xl-3 col-md-6 col-sm-6">
                    <a href="#">
                        <div class="ms-card card-gradient-custom ms-widget ms-infographics-widget ms-p-relative">
                            <div class="ms-card-body media">
                                <div class="media-body">
                                    <h6>Hospitals</h6>
                                    <div className='d-flex justify-content-start'>
                                        <div className='ms-card-change text-light me-3'><span className='fs-07 text-white'>Today </span>{ analytics?.todayHospitals?.count || '0' }</div>
                                        <div className='ms-card-change text-light '><span className='fs-07 text-white'>Total </span>{ analytics?.totalHospitals?.count || '0'}</div>
                                    </div>
                                </div>
                            </div>
                            <i class="fas fa-stethoscope ms-icon-mr"></i>
                        </div>
                    </a>
                </div>
                <div class="col-xl-3 col-md-6 col-sm-6">
                    <a href="#">
                        <div class="ms-card card-gradient-custom ms-widget ms-infographics-widget ms-p-relative">
                            <div class="ms-card-body media">
                                <div class="media-body">
                                    <h6>Doctors</h6>
                                    <div className='d-flex justify-content-start'>
                                        <div className='ms-card-change text-light me-3'><span className='fs-07 text-white'>Today </span>{ analytics?.todayDoctors?.count || '0' }</div>
                                        <div className='ms-card-change text-light '><span className='fs-07 text-white'>Total </span>{ analytics?.totalDoctors?.count || '0' }</div>
                                    </div>
                                </div>
                            </div>
                            <i class="fas fa-stethoscope ms-icon-mr"></i>
                        </div>
                    </a>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12 mb-3">
                    <div class="ms-panel h-100">
                        <div class="ms-panel-header">
                            <div>
                                <h6>ORGANIZATION CHART</h6>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around align-items-center ">
                            <div className='text-center' style={{ height:'20rem', width:'20rem' }}>
                                <DoughnutChart filterType={isWeekChart ? 'week' : 'month' } labelName={'Patient'} chartData={organizationChartData} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-md-6 h-100">
                    <div class="ms-panel ms-panel-fh ms-widget">
                        <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                            <div>
                            <h6>Hospitals <span className='text-disabled'>{ new Date().toDateString() }</span></h6>
                            </div>
                            <div className="">
                                <Link to={'/mr/hospital-registration'} className='btn btn btn-info btn-md'>+ Hospital</Link>
                            </div>
                        </div>
                        <div style={{overflowY:"scroll"}} class="ms-panel-body h20 p-0">
                            <ul class="ms-followers ms-list ms-scrollable ps">
                                {hospitals?.length > 0 && hospitals.map((hospital, key) => 
                                    <li class="ms-list-item media" key={key} >
                                    <img src={hospital?.photo ? getFullPath(hospital.organizationId?.photo) : NO_PHOTO} class="ms-img-small ms-img-round" alt="people" />
                                    <div class="media-body mt-1"> 
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h4>{hospital?.organizationId?.name}</h4>
                                                <span class="fs-12">{hospital.organizationId?.address}</span>
                                            </div> 
                                            <div className='d-contents'>
                                                <h4 class="fs-12">{formatPhone(hospital.phone)}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-md-6 h-100">
                    <div class="ms-panel ms-panel-fh ms-widget">
                        <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                            <div>
                                <h6>Clinics <span className='text-disabled'>{ new Date().toDateString() }</span></h6>
                            </div>
                            <div className="">
                                <Link to={'/mr/clinic-registration'} className='btn btn btn-info btn-md'>+ Clinic</Link>
                            </div>
                        </div>
                        <div style={{ overflowY: "scroll" }} class="ms-panel-body h20 p-0">
                            <ul class="ms-followers ms-list ms-scrollable ps">
                                {clinics?.length > 0 && clinics.map((clinics, key) =>
                                    <li class="ms-list-item media" key={key} >
                                        <img src={clinics?.organizationId?.photo ? getFullPath(clinics.organizationId?.photo) : NO_PHOTO} class="ms-img-small ms-img-round" alt="people" />
                                        <div class="media-body mt-1">
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <h4>{clinics?.organizationId?.name}</h4>
                                                    <span class="fs-12">{clinics.organizationId?.address}</span>
                                                </div>
                                                <div className='d-contents'>
                                                    <h4 class="fs-12">{formatPhone(clinics.phone)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Dashbaord;