import React from "react";
const AddToCartButton = ({ handleADDTocart , data,isAvailable }) => {
  return (
  <div>
    {
        isAvailable ? (<div><button>
            -
        </button>
         <p></p>
        <button>+</button>
    </div>):(<button className="bg-green-600  text-white text-[10px] sm:text-xs px-2 py-1 rounded hover:bg-green-700 ml-2"
        onClick={handleADDTocart}
        >
          Add
        </button> )
    }
    
  </div>
)
};

export default AddToCartButton;
