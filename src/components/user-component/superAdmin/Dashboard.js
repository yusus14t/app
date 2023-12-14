import React, { useEffect, useState } from 'react';
import NO_PHOTO from "../../../assets/images/no-photo.png";
import toasty from '../../../hooks/toasty'
import { axiosInstance, formatPhone, getAuthHeader, getFullPath, userInfo } from '../../../constants/utils';
import { DoughnutChart, LineChart } from '../../common-components/Chart';
import Container from '../../../layout/Container';

const Dashbaord = () => {
    const [ analyticsData, setAnalyticsData ] = useState({});
    const [ hospitals, setHospitals ] = useState([])
    const [ clinics, setClinics ] = useState([])
    const [ patients, setPatients ] = useState([])

    const [ data, setData ] = useState({
        week: ['6', '3', '6', '4', '8', '3', '6'],
        month: ['5', '2', '4', '7', '8', '9', '6', '5', '4', '2', '4', '4']
    })

    useEffect(() => {
        analytics()
        getHospitals()
        getClinics()
        getPatients()
    },[])



    const analytics = async () => {
        try{
            let { data } = await axiosInstance.get('/super-admin/analytics', getAuthHeader())
            setAnalyticsData(data?.analyticsData)
        } catch(error){ 
            console.error(error) 
            toasty.error(error?.message)
        }
    }

    const getHospitals = async () => {
        try{
            let { data } = await axiosInstance.get('/super-admin/hospitals', {params: { istoday: true } , ...getAuthHeader()})
            setHospitals(data.hospitals)
        } catch(error){ console.error(error) }
    }

    const getClinics = async () => {
        try{
            let { data } = await axiosInstance.get('/super-admin/clinics', {params: { istoday: true } , ...getAuthHeader()})
            setClinics(data.clinics)
        } catch(error){ console.error(error) }
    }

    const getPatients = async () => {
        try{
            let { data } = await axiosInstance.get('/super-admin/patients', {params: { istoday: true } , ...getAuthHeader()})
            setPatients(data.patients)
        } catch(error){ console.error(error) }
    }

    return (
        <Container>
            <div className='ms-content-wrapper'>
            <div class="ms-panel-header ms-panel-custome d-flex justify-space-between mb-2">
                <div>
                    <h6>Dashboard</h6>
                </div>
            </div>
            <div className='row'>
                <div className="col-xl-3 col-md-6 col-sm-6">
                    <a href="#">
                        <div class="ms-card card-gradient-custom ms-widget ms-infographics-widget ms-p-relative">
                            <div class="ms-card-body media">
                                <div class="media-body">
                                    <h6>Patients</h6>
                                    <div className='d-flex justify-content-start'>
                                        <div className='ms-card-change text-dark me-3'><span className='fs-07 text-white'>Today </span>{analyticsData.today_patients?.count || 0 }</div>
                                        <div className='ms-card-change text-dark '><span className='fs-07 text-white'>Total </span>{analyticsData.total_patients?.count || 0 }</div>
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
                                    <h6>Clinics</h6>
                                    <div className='d-flex justify-content-start'>
                                        <div className='ms-card-change text-dark me-3'><span className='fs-07 text-white'>Today </span>{analyticsData.today_clinics?.count || 0 }</div>
                                        <div className='ms-card-change text-dark '><span className='fs-07 text-white'>Total </span>{analyticsData.total_clinics?.count || 0 }</div>
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
                                        <div className='ms-card-change text-dark me-3'><span className='fs-07 text-white'>Today </span>{analyticsData.today_hospitals?.count || 0 }</div>
                                        <div className='ms-card-change text-dark '><span className='fs-07 text-white'>Total </span>{analyticsData.total_hospitals?.count || 0 }</div>
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
                                        <div className='ms-card-change text-dark me-3'><span className='fs-07 text-white'>Today </span>{analyticsData.today_doctors?.count || 0 }</div>
                                        <div className='ms-card-change text-dark '><span className='fs-07 text-white'>Total </span>{analyticsData.total_doctors?.count || 0 }</div>
                                    </div>
                                </div>
                            </div>
                            <i class="fas fa-stethoscope ms-icon-mr"></i>
                        </div>
                    </a>
                </div>
                <div class="col-xl-3 col-md-6 col-sm-12 mb-4">
                    <div class="ms-panel">
                        <div class="ms-panel-header">
                            <div>
                                <h6>Genders</h6>
                            </div>
                        </div>
                        <div class="ms-panel-body ">
                            <div className='h4'>
                                Users
                            </div>
                            <div className='text-center' style={{ height: '14rem', width: '14rem' }}>
                                {  <DoughnutChart labelName={'Patient'} chartData={analyticsData.total_users} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 col-sm-12 mb-4">
                    <div class="ms-panel h-100">
                        <div class="ms-panel-header">
                            <div>
                                <h6>Status</h6>
                            </div>
                        </div>
                        <div class="ms-panel-body ">
                            <div className='h5'>
                                Appointment Status
                            </div>
                            <div className='text-center' style={{ height: '14rem', width: '14rem' }}>
                                { <DoughnutChart labelName={'Patient'} chartData={[]} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-md-6 h-100 mb-4">
                    <div class="ms-panel ms-panel-fh ms-widget">
                        <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                            <div>
                                <h6>Today Patients</h6>
                            </div>
                        </div>
                        <div style={{overflowY:"scroll"}} class="ms-panel-body h20 p-0">
                            <ul class="ms-followers ms-list ms-scrollable ps">
                                {patients?.length > 0 && patients.map((patient, key) =>
                                    <li class="ms-list-item media" key={key} >
                                        <img src={patient?.photo ? getFullPath(patient.photo) : NO_PHOTO} class="ms-img-small ms-img-round" alt="people" />
                                        <div class="media-body mt-1">
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <h4>{patient?.name}</h4>
                                                    <span class="fs-12">{patient.address}</span>
                                                </div> 
                                                <div className='d-contents'>
                                                    <h4 class="fs-12">{formatPhone(patient.phone)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-md-6 h-100 mb-4">
                    <div class="ms-panel ms-panel-fh ms-widget">
                        <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                            <div>
                                <h6>Today Clinics</h6>
                            </div>
                        </div>
                        <div style={{overflowY:"scroll"}} class="ms-panel-body h20 p-0">
                            <ul class="ms-followers ms-list ms-scrollable ps">
                                {clinics?.length > 0 && clinics.map((clinic, key) =>
                                    <li class="ms-list-item media" key={key} >
                                        <img src={clinic?.photo ? getFullPath(clinic.photo) : NO_PHOTO} class="ms-img-small ms-img-round" alt="people" />
                                        <div class="media-body mt-1">
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <h4>{clinic?.name}</h4>
                                                    <span class="fs-12">{clinic?.email}</span>
                                                </div> 
                                                <div className='d-contents'>
                                                    <h4 class="fs-12">{formatPhone(clinic?.phone)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-md-6 h-100 mb-4">
                    <div class="ms-panel ms-panel-fh ms-widget">
                        <div class="ms-panel-header ms-panel-custome d-flex justify-space-between">
                            <div>
                                <h6>Today Hospitals</h6>
                            </div>
                        </div>
                        <div style={{overflowY:"scroll"}} class="ms-panel-body h20 p-0">
                            <ul class="ms-followers ms-list ms-scrollable ps">
                                {hospitals?.length > 0 && hospitals.map((hospital, key) =>
                                    <li class="ms-list-item media" key={key} >
                                        <img src={hospital.photo ? getFullPath(hospital.photo) : NO_PHOTO } class="ms-img-small ms-img-round" alt="people" />
                                        <div class="media-body mt-1">
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <h4>{hospital?.name}</h4>
                                                    <span class="fs-12">{hospital.email}</span>
                                                </div> 
                                                <div className='d-contents'>
                                                    <h4 class="fs-12">{formatPhone(hospital.phone)}</h4>
                                                    <h4 class="fs-12">{hospital.fee == 0 ? '-' : `₹ ${hospital.fee}`}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Container>

    )
}
export default Dashbaord;