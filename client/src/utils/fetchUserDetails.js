import Axios from "../utils/axios"
import SummaryApi from "../common/SummaryApi"
const fetchUserDetails=async()=>{
 try{
const response = await Axios({
    ...SummaryApi.userDetails
})
return response.data
 }
 catch(error){
    console.log("error")
    return null
 }
}
export default fetchUserDetails