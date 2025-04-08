import React from 'react'
import { Link } from 'react-router-dom'

function CourseBox2({ id,std, imgs, title, info }) {
    return (
        <Link to={`/learning/course/${std}/${id}`} className="w-full">
            <div className="pb-2 h-[300px] text-center flex flex-col justify-start items-center border shadow-xl rounded-lg hover:scale-[1.02] transition cursor-pointer">
                <img src={imgs} alt="coursepic" className="w-full h-[200px] object-cover rounded-md" />
                <h1 className="text-xl capitalize my-2 px-2">{title}</h1>
                <p className="text-sm text-slate-500 capitalize px-1 line-clamp-2">
                    {info}
                </p>
            </div>
        </Link>
    )
}

export default CourseBox2
