import jwt from 'jsonwebtoken'

const auth =async (request,response,next)=>{

    try{
     const token = request.cookies.accessToken || 
              (request.headers.authorization && 
               request.headers.authorization.split(" ")[1]);
     
      if(!token){
     return response.status(401).json({
        messege:"provide token",
        error:true,
        success:false
     }) 
    }
    const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

     if(!decode){
        return response.status(401).json({
            messege:"Unauthorised access",
            error:true,
            success:false
        })
     }
     request.userId= decode.id
     next()
    }
    catch(error){
        return response.status(500).json({
        messege:error.messege||error,
        error:true,
        success:false
        })
    }
}
export default auth