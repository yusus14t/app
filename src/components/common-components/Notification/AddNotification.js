import Modal from "../Modal";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { PRIORITY } from "../../../constants/constant";
import useToasty from '../../../hooks/toasty';
import useNotification from '../../../hooks/Notification';
import { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader } from "../../../constants/utils";


const Add = ({isOpen, setIsOpen, refresh = () => {}}) => {
    const toasty = useToasty();
    const notification = useNotification();
    const [doctors, setDoctors] = useState([]);
    const { register, handleSubmit, formState:{ errors }, control } = useForm({ onChange: true });

    useEffect(() => {
        fetchDoctors();
    },[])

    const fetchDoctors = async () => {
        try {
            let { data } = await axiosInstance.get('/super-admin/appointment-users', getAuthHeader());
            setDoctors(data?.users || [])
        } catch(error) { 
            toasty.error(error?.messgae)
            console.log(error) 
        }
    }

    const saveNotification = async (formData) => {
        try {
            let response = await notification.create(formData)
            refresh()
            toasty.success(response?.message)
            setIsOpen(false)
        } catch(error){ 
            toasty.success('Something went wrong')
            console.log(error)
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeButton={false}
            submitButton={false}
            title='Add New Notification'
        >
            <form className="ms-form-wizard style1-wizard wizard form-content" onSubmit={handleSubmit(saveNotification)} role="application">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label >Send to:  </label>
                        <div className="">
                            <Controller
                                control={control}
                                name="assignedTo"
                                rules={{ required: 'Asignee must be required' }}
                                render={({ field, formState:{invalid} }) => (
                                    <Select
                                        {...field}
                                        isMulti
                                        options={doctors}
                                        className={`form-control p-0 ${errors.assignedTo ? 'border-danger' : ''}`}
                                        classNamePrefix="select"
                                        getOptionLabel={({ label, label_two }) => label || label_two  }
                                        getOptionValue={({ value }) => value}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-8 mb-3">
                        <label className=''>Title</label>
                        <div className="input-group">
                            <input type="text"
                                className={`form-control ${errors?.title ? 'border-danger' : ''}`}
                                placeholder="Something"
                                {...register('title', {
                                    required: 'Query title must be required'
                                })}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >Priority  </label>
                        <div className="">
                            <Controller
                                control={control}
                                name="priority"
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isMulti={false}
                                        defaultValue={[{label:'Low', value: 'low'}]}
                                        options={PRIORITY}
                                        getOptionValue={(value) => value.value}
                                        className="p-0"
                                        classNamePrefix="select"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label >Description: </label>
                        <div className="input-group">
                        <textarea type="text"
                            className={`form-control ${errors?.message  ? 'border-danger' : '' } `}
                            placeholder="description"
                            rows={7}
                            {...register(`message`, {
                            required: 'Desctiiption is required'
                            })}
                        />
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary shadow-none mx-2" onClick={() => {  }}>Save</button>
            </form>
        </Modal>
    )
}
export default Add;