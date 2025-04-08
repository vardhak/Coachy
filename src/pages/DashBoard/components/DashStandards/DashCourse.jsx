import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CourseBox from "./CourseBox";

function DashCourse() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [courseData, setCourseData] = useState({
    courseImage: "",
    courseTitle: "",
    courseInfo: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCourses();
      fetchTeachers();
    }
  }, [id]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getCourses/courses_${id}`);
      setCourses(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getTeacherData/teachers_${id}`);
      setTeachers(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.id]: e.target.value });
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value);
  };

  const handleCourseSelection = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    const course = courses.find((c) => c._id === courseId);
    if (course) {
      setCourseData({
        courseTitle: course.courseTitle,
        courseInfo: course.courseInfo,
      });
    }
  };

  const addCourse = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("courseTitle", courseData.courseTitle);
    formData.append("courseInfo", courseData.courseInfo);
    formData.append("assignedTeacher", selectedTeacherId);

    try {
      await axios.post(`${BASE_URL}/addCourse/courses_${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Course Added Successfully!");
      fetchCourses();
    } catch (e) {
      toast.error("Failed to Add Course!");
      console.error(e);
    }
  };

  const updateCourse = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course to update!");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("courseTitle", courseData.courseTitle);
    formData.append("courseInfo", courseData.courseInfo);
    formData.append("assignedTeacher", selectedTeacherId);

    try {
      await axios.put(`${BASE_URL}/updateCourse/courses_${id}/${selectedCourse}`, formData, {
        headers: { "Content-Type": file ? "multipart/form-data" : "application/json" },
      });
      toast.success("Course Updated Successfully!");
      fetchCourses();
    } catch (e) {
      toast.error("Failed to Update Course!");
      console.error(e);
    }
  };

  const deleteCourse = async () => {
    if (!selectedCourse) {
      toast.error("Please select a course to delete!");
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/deleteCourse/courses_${id}/${selectedCourse}`);
      toast.success("Course Deleted Successfully!");
      fetchCourses();
    } catch (e) {
      toast.error("Failed to Delete Course!");
      console.error(e);
    }
  };

  return (
    <div className="p-2 flex flex-col justify-start items-start">
      <h1 className="text-xl capitalize bg-primary text-white w-full flex justify-center items-center p-1">
        Welcome to {id} Course Management
      </h1>

      <Tabs defaultValue="courses" className="w-full mt-3">
        <TabsList className="w-full">
          <TabsTrigger value="courses" className="w-full">Courses List</TabsTrigger>
          <TabsTrigger value="addcourse" className="w-full">Add Course</TabsTrigger>
          <TabsTrigger value="managecourse" className="w-full">Manage Course</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {Array.isArray(courses) && courses.length > 0 ? (
              courses.map((item, index) => (
                <CourseBox key={index} imgs={item.courseImage} title={item.courseTitle} info={item.courseInfo} />
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="addcourse">
          <h1 className="text-xl capitalize mt-5">Add New Course</h1>
          <p className="text-slate-400 capitalize">Fill the form to add a new course</p>

          <form onSubmit={(e) => { e.preventDefault(); addCourse(); }} className="mt-10 flex flex-col gap-y-4">
            <div>
              <Label htmlFor="courseImage">Course Image</Label>
              <Input id="courseImage" type="file" onChange={handleFileChange} required />
            </div>

            <div>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input id="courseTitle" value={courseData.courseTitle} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="courseInfo">Course Info</Label>
              <Input id="courseInfo" value={courseData.courseInfo} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="assignedTeacher">Assign Teacher</Label>
              <select id="assignedTeacher" onChange={handleTeacherChange} value={selectedTeacherId} className="p-2 border w-full">
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.fullname} ({teacher.email})
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="cursor-pointer">Submit</Button>
          </form>
        </TabsContent>

        <TabsContent value="managecourse">
          <h1 className="text-xl capitalize mt-5">Manage Course</h1>
          <p className="text-slate-400 capitalize">Select a course to edit or delete</p>

          <select onChange={handleCourseSelection} className="p-2 border mt-3">
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseTitle}
              </option>
            ))}
          </select>

          {selectedCourse && (
            <div className="mt-5 flex flex-col gap-y-4">
              <Label htmlFor="courseImage">Update Course Image</Label>
              <Input id="courseImage" type="file" onChange={handleFileChange} />

              <Label htmlFor="courseTitle">Course Title</Label>
              <Input id="courseTitle" value={courseData.courseTitle} onChange={handleChange} />

              <Label htmlFor="courseInfo">Course Info</Label>
              <Input id="courseInfo" value={courseData.courseInfo} onChange={handleChange} />

              <div>
                <Label htmlFor="assignedTeacher">Assign Teacher</Label>
                <select id="assignedTeacher" onChange={handleTeacherChange} value={selectedTeacherId} className="p-2 border w-full">
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.fullname} ({teacher.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between mt-5">
                <Button onClick={updateCourse} className="bg-blue-500">Update</Button>
                <Button onClick={deleteCourse} className="bg-red-500">Delete</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DashCourse;
