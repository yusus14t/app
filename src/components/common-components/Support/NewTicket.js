import Modal from "../Modal";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select"
import { axiosInstance, getAuthHeader } from "../../../constants/utils";
import useToasty from '../../../hooks/toasty';

const NewTcket = ({isOpen, setIsOpen, refresh = () => {} }) => {
    const toasty = useToasty();
    const { register, handleSubmit, watch ,formState:{ errors }, control } = useForm({ onChange: true });

    const submit = async (formData) => {
        try{
            let {data} = await axiosInstance.post('/common/create-ticket', formData, getAuthHeader()) 
            toasty.success(data?.message)
            setIsOpen(false)
            refresh()
        } catch(error){ console.log(error) }
    }
    return(
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeButton={false}
            submitButton={false}
            title='New Ticket'
        >
            <form className="ms-form-wizard style1-wizard wizard form-content" onSubmit={handleSubmit(submit)} role="application">
                <div className="col-md-12 mb-3">
                    <label >Query related to : </label>
                    <div className="">
                        <Controller
                            control={control}
                            name="related"
                            rules={{ required: 'Query must be select' }}
                             render={({ field }) => (
                                 <Select
                                    {...field}
                                     isMulti={false}
                                     options={[{label: 'Other', value:'other'}]}
                                     className={`form-control p-0 ${errors.related ? 'border-danger' : ''}`}
                                     classNamePrefix="select"
                                 />
                            )}
                        />
                    </div>
                </div>
                {watch('related')?.value === 'other' && <div className="col-12 mb-3">
                    <label className=''>Query Title</label>
                    <div className="input-group">
                        <input type="text"
                            className={`form-control ${errors.otherRelated ? 'border-danger' : ''}`}
                            placeholder="Something"
                            {...register('otherRelated', {
                                required: 'Query title must be required'
                            })}
                        />
                    </div>

                </div>}
                <div className="col-md-12 mb-3">
                    <label >Description: </label>
                    <div className="input-group">
                      <textarea type="text"
                        className={`form-control ${errors.description ? 'border-danger' : ''}`}
                        placeholder="description"
                        rows={7}
                        {...register(`description`, {
                          required: 'Description must be required'
                        })}
                      />
                    </div>
                </div>
                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary shadow-none mx-2" >Save</button>
            </form>
        </Modal>
    )
}
export default NewTcket;