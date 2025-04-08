import { UserButton, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import CourseBox2 from './CourseBox2'



function Learning() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const standardSuffix = [
        "1st", "2nd", "3rd", "4th", "5th",
        "6th", "7th", "8th", "9th", "10th"
    ];

    const { user } = useUser()
    const [selectedStandard, setSelectedStandard] = useState(null);


    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!selectedStandard) return

        const fetchCourses = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${BASE_URL}/getCourses/${selectedStandard}`)
                setCourses(Array.isArray(res.data) ? res.data : res.data.courses || []); // Safe fallback
            } catch (err) {
                console.error("Failed to fetch courses:", err)
                setCourses([])
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [selectedStandard])

    return (
        <div className='pt-20'>
            {/* Welcome Block */}
            <div className='border shadow-2xl h-[150px] w-[85%] mx-auto mt-5 rounded-lg bg-primary text-white flex justify-between items-center min-[500px]:px-16 px-4 gap-y-3 text-center'>
                <div className='flex flex-col justify-center items-start'>
                    <h1 className='text-3xl font-semibold'>
                        Welcome Back! <span className='uppercase'>{user?.fullName || ""}</span>
                    </h1>
                    <p>It's time to get back to learning!</p>
                </div>
                <img
                    src={user?.imageUrl}
                    alt="user"
                    width={'100px'}
                    height={'100px'}
                    className='rounded-full'
                />
            </div>

            {/* Heading */}
            <div className='flex justify-start items-center mt-[50px] w-[85%] mx-auto mb-4'>
                <h1 className='text-3xl font-semibold uppercase'>My Courses</h1>
            </div>

            {/* Standard Selector */}
            <div className='flex justify-end items-center my-8 pr-10'>
                <Select onValueChange={setSelectedStandard}>
                    <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select Class Standard" />
                    </SelectTrigger>
                    <SelectContent>
                        {standardSuffix.map((suffix, index) => (
                            <SelectItem
                                key={index}
                                value={`courses_${suffix}`}
                            >
                                {`${index + 1}th Standard`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Course Display */}
            <div className='mb-10 grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 w-[85%] mx-auto gap-5'>
                {loading ? (
                    <div className="col-span-full text-center text-gray-500">Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No courses available for this standard.
                    </div>
                ) : (
                    courses.map((course) => (
                        <CourseBox2
                            key={course._id}
                            std={selectedStandard}
                            id={course.courseTitle}
                            title={course.courseTitle}
                            info={course.courseInfo}
                            imgs={course.courseImage || ""} 
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Learning
