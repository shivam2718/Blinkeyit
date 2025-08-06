import React from "react";
import { MdCloseFullscreen } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
const ConfirmBox =({confirm,close})=>{
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0   bg-neutral-800/60 flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-4 rounded">
        <div className=" flex justify-between">
            <h1 className="font-semibold">
                Permanent Delete 
            </h1>
            <button onClick={close} >
            <MdCloseFullscreen size={20}/>
            </button>
        </div>
       <p className="mt-2 mb-4">
        Are you sure?
        </p> 
       <div className="flex w-fit ml-auto items-center gap-4 ">
  <button onClick={confirm} className="px-5 py-2 rounded border border-red-500 text-red-600 font-medium hover:bg-red-500 hover:text-white transition duration-200">
    Delete
  </button>
  <button onClick={close}  className="px-5 py-2 rounded border border-green-500 text-green-600 font-medium hover:bg-green-500 hover:text-white transition duration-200">
    Cancel
  </button>
</div>

      </div>
        </div>
    )
}
export default ConfirmBox