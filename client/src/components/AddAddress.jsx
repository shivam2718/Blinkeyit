
import { useForm } from "react-hook-form"
import { IoClose } from "react-icons/io5";
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import SummaryApi from '../common/SummaryApi'
import  AxiosToastError  from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider'
const AddAddress=({close})=>{

    const { register, handleSubmit, reset } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        console.log("data",data)
    
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data : {
                    address_line :data.addressline,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                      fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
 return(
    <section className='fixed w-full inset-0 z-50 bg-black/70 h-screen overflow-auto'>
       <div className='bg-white p-4 w-full lg:max-w-lg mt-8 max-w-sm  mx-auto rounded '>
        <div className='flex flex-center justify-between'>
        <h2 className='text-lg font-semibold'>
            Add Address
        </h2>
        <IoClose  size={24} className='cursor-pointer' onClick={() => close()} />
        </div>
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label htmlFor='addressline'>AddressLine:</label>
                <input type="text" 
                id='addressline'
                className='border p-2 w-full bg-purple-50 rounded '
                {...register("addressline", { required: true })}
                />
            </div>

            <div>
                <label htmlFor='city'>City:</label>
                <input type="text" 
                id='city'
                className='border p-2 w-full bg-purple-50 rounded '
                {...register("city", { required: true })}
                />
            </div>

            <div>
                <label htmlFor='state'>State:</label>
                <input type="text" 
                id='state'
                className='border p-2 w-full bg-purple-50 rounded '
                {...register("state", { required: true })}
                />
            </div>

            <div>
                <label htmlFor='pincode'>Pincode:</label>
                <input type="text" 
                id='pincode'
                className='border p-2 w-full bg-purple-50 rounded '
                {...register("pincode", { required: true })}
                />
            </div>
            <div>
                <label htmlFor='country'>Country:</label>
                <input type="text" 
                id='country'
                className='border p-2 w-full bg-purple-50 rounded '
                {...register("country", { required: true })}
                />
            </div>

            <div>
                <label htmlFor='mobile '>Mobile No:</label>
                <input type="text" 
                id='mobile'
                className='border p-2 w-full bg-purple-50 rounded '
                {...register("mobile", { required: true })}
                />
            </div>

            <button type="submit"
            className='bg-amber-300 px-4 py-2 rounded mt-4 w-full font-semibold hover:bg-amber-500'>
                Submit
            </button>
        </form>
       </div>
    </section>
 )
}
export default AddAddress