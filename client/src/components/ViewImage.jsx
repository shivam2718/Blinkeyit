import { MdCloseFullscreen } from "react-icons/md";
const ViewImage=({url,close})=>{
    return(
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/70 flex justify-center items-center p-4 z-50">
         <div className="w-full max-w-md p-4 maxh-[80] bg-white">
            <button className="w-fit block ml-auto">
 <MdCloseFullscreen  size={25} onClick={close}/>
            </button>
            <img
             src={url}
             alt="full screen"
             className="w-full h-full object-scale-down cursor-pointer"
            />

         </div>
        </div>
    )
}
export default ViewImage