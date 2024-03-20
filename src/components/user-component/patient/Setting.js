import { useEffect, useState } from "react"
import ImgUpload from "../../common-components/Imgupload"
import { useForm } from "react-hook-form"
import { NumberFormat, axiosInstance, getAuthHeader, updateUser, userInfo } from "../../../constants/utils"
import useToasty from '../../../hooks/toasty';
import Container from "../../../layout/Container";


export default () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const { register, reset,  handleSubmit, formState: { errors } } = useForm({ onChangr: true })
    const toasty = useToasty()

    useEffect(() => {
        reset({ ...userInfo })
    }, [])


    const submit = async (values) => {
        try {
            let formData = new FormData()
            formData.append('data', JSON.stringify(values))
            formData.append('image', selectedFile)

            let header = getAuthHeader()
            header.headers['Content-Type'] = 'multipart/form-data'

            let response = await axiosInstance.post('/hospital/edit-profile', formData, header)

            await updateUser()
            toasty.success(response?.data?.message)
        } catch (error) { console.error(error) }
    }


    return (
        <Container>
            <div className={`ms-panel-body p-3 `}>
                <div className="content ">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 ">< ImgUpload source={'doctor'} file={(image) => { setSelectedFile(image) }} /></div>
                    </div>
                    <form onSubmit={handleSubmit(submit)} >
                        <div className="row my-3 ">
                            <div className="col-md-6 mb-3">
                                <label className=''>Name</label>
                                <div className="input-group">
                                    <input type="text"
                                        className={`form-control ${errors?.name ? 'border-danger' : ''}`}
                                        placeholder={`Enter Name`}
                                        {...register('name', {
                                            required: 'Name is required'
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className=''>Phone Number</label>
                                <div className="input-group">
                                    <input type="text"
                                        className={`form-control ${errors?.phone ? 'border-danger' : ''}`}
                                        placeholder="Enter Phone Number"
                                        onInput={(e) => NumberFormat(e)}
                                        maxLength={10}
                                        {...register('phone', {
                                            required: 'Phone number is required'
                                        })}
                                    />
                                </div>
                            </div>
                            {/* <div className="col-md-6 mb-3">
                                <label className=''>Email</label>
                                <div className="input-group">
                                    <input type="email"
                                        className={`form-control ${errors?.email ? 'border-danger' : ''}`}
                                        placeholder="Enter Email"
                                        {...register('email', {
                                            required: 'Email is required'
                                        })}
                                    />
                                </div>
                            </div> */}
                            {/* <div className="col-md-6 mb-3">
                                <label className=''>Gardian Name (optional) </label>
                                <div className="input-group">
                                    <input type="text"
                                        className={`form-control`}
                                        placeholder={`Enter Name`}
                                        {...register('gardianName')}
                                    />
                                </div>
                            </div> */}
                            <div className="col-md-6 mb-3">
                                <label >Age</label>
                                <div className="input-group">
                                    <input
                                        {...register('age', {
                                            required: 'Age is required'
                                        })}
                                        type="number"
                                        className={`form-control ${errors.age ? 'border-danger' : ''}`}
                                        placeholder="Enter Age"
                                    />
                                </div>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label >Gender</label>
                                <select style={{ padding: '.475rem .75rem' }} className={`form-control mb-2 col-2 w-100  ${errors?.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required' })}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='other'>Other</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className=''>Address</label>
                                <div className="input-group">
                                    <input type="text"
                                        className={`form-control ${errors.address ? 'border-danger' : ''}`}
                                        placeholder="Enter Full Address"
                                        {...register('address', {
                                            required: 'Address is required'
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-primary btn-md shadow-none' type='submit'>Save</button>
                    </form>
                </div>
            </div>
        </Container>
    )
}