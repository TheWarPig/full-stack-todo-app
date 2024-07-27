import { FaTrashAlt, FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";


export default function Todo({children, isLast, isFirst, handleDelete, handleToggle, isComplete}){
    const completed = "bg-green-200 line-through"
    const firstItemClass = `flex item-center w-full px-4 py-2 rounded-t-lg ${isComplete && completed}`
    const lastItemClass = `flex item-center w-full px-4 py-2 rounded-b-lg border-t ${isComplete && completed}`
    const normalItemClass = `flex item-center w-full px-4 py-2 border-t border-gray-200 ${isComplete && completed}`
    
    if(isLast){
        return(
        <li
            className={firstItemClass}>
            <p className="mr-auto">{children}</p>
            {
                isComplete ?
                <FaCheckCircle onClick={handleToggle} className="mr-2 hover:cursor-pointer" />
                : <FaRegCheckCircle onClick={handleToggle} className="mr-2 hover:cursor-pointer" />
            }
            <FaTrashAlt onClick={handleDelete} className="hover:cursor-pointer"/>
        </li>
        )
    }
    if(isFirst){
        return (
            <li
                className={lastItemClass}>
                <p className="mr-auto">{children}</p>
                {
                    isComplete ?
                    <FaCheckCircle onClick={handleToggle} className="mr-2 hover:cursor-pointer" />
                    : <FaRegCheckCircle onClick={handleToggle} className="mr-2 hover:cursor-pointer" />
                }
                <FaTrashAlt onClick={handleDelete} className="hover:cursor-pointer"/>
            </li>
        )
    }
    return (
        <li
            className={normalItemClass}>
            <p className="mr-auto">{children}</p>
            {
                isComplete ?
                <FaCheckCircle onClick={handleToggle} className="mr-2 hover:cursor-pointer" />
                : <FaRegCheckCircle onClick={handleToggle} className="mr-2 hover:cursor-pointer" />
            }
            <FaTrashAlt onClick={handleDelete} className="hover:cursor-pointer"/>
        </li>
    )
}