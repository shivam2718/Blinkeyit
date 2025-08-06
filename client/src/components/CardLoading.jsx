const CardLoading = () => {
  return (
    <div className="border border-zinc-200 p-2 grid gap-2 min-w-32 lg:max-w-56 rounded animate-pulse">
        <div className="min-h-24 lg:min-h-20 rounded bg-blue-50"></div>
        <div className="p-2 lg:p-3 w-20  rounded bg-blue-50">

        </div>
        <div className="p-2 lg:p-3    rounded bg-blue-50">

        </div>
        <div className="p-2 lg:p-3  w-14  rounded bg-blue-50">

        </div>
        <div className="flex items-center justify-between gap-3">
         <div className="p-2 lg:p-3 w-20  rounded bg-blue-50">

        </div>
            <div className="p-2 lg:p-3 w-20  rounded bg-blue-50">

        </div>

        </div>
    </div>
  );
}   
export default CardLoading;