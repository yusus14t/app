import { useForm } from "react-hook-form";
import useToasty from '../../../hooks/toasty'
import { axiosInstance } from "../../../constants/utils";


const DealRegistration = ({ tab }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ onChange: true })
    const toasty = useToasty();
    const RID = JSON.parse(localStorage.getItem('RID'))

    const submit = async (formData) => {
        try{
            formData['tab'] = tab
            formData['organizationId'] = RID

            let { data } = await  axiosInstance.post('/doctor/deal', formData )
            console.log(data)
            toasty.success(data?.message)

            localStorage.removeItem('RID')
            window.location.reload()
        } catch(error){ 
            console.error(error)
            toasty.error(error?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className=''>Deal Price</label>
                    <div className="input-group">
                        <input type="text"
                            className="form-control "
                            placeholder="Eg: 900/m"
                            {...register('price', {
                                required: 'Deal price is required'
                            })}
                        />
                    </div>
                    {errors?.dealprice && <div className="text-danger ">{errors?.dealprice.message}</div>}

                </div>
                <div className="col-md-3 mb-3"></div>
                <div className="col-md-3 mb-3"></div>

                <div className="col-md-6 mb-3">
                    <label className=''>Details</label>
                    <div className="input-group">
                        <textarea type="text"
                            className="form-control "
                            placeholder="Eg: 1500/m"
                            {...register('details', {
                                required: 'Details are required'
                            })}
                        />
                    </div>
                    {errors?.details && <div className="text-danger ">{errors?.details.message}</div>}

                </div>
                <div className="col-md-3 mb-3"></div>

            </div>
            <button type="submit" className="btn btn-primary btn-md">Save</button>
        </form>
    )
}
export default DealRegistration;