import noDataImage from '../assets/nothing here yet.webp'
const NoData = () => {
    return (
        <span className="flex flex-col items-center justify-center py-40 gap-2 w-full h-full">
            <img
                src={noDataImage}
                alt="no data"
                className="w-36"
            />
            <span className="text-neutral-500">
                No Data...
            </span>
        </span>
    );
}
export default NoData