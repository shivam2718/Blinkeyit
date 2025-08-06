import { IoIosClose } from "react-icons/io";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 bg-zinc-700/60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Add Field</h1>
          <button onClick={close} className="text-red-600 hover:text-red-800">
            <IoIosClose size={28} />
          </button>
        </div>
        <input
          className="bg-green-50 p-2 outline-none border border-gray-300 focus:border-amber-400 rounded w-full mb-4"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />
        <button
          onClick={submit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Add
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
