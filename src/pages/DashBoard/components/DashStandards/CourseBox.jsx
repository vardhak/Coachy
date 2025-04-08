import React from 'react'

function CourseBox({ imgs, title, info }) {
    return (
        <div className="pb-2 min-h-[250px] text-center flex flex-col justify-start items-center border shadow-xl rounded-lg">
            <img src={imgs} alt="coursepic" className="w-full h-[200px] object-cover rounded-md" />
            <h1 className="text-xl capitalize my-2 px-2">{title}</h1>
            <p className="text-sm text-slate-500 capitalize px-1 line-clamp-2">
                {info}
            </p>
        </div>
    )
}

export default CourseBox