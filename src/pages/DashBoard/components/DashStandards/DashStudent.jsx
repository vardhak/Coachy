import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import profile from "@/assets/img/github.png";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function DashStudent() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({ fullname: "", email: "", mobileNo: "", qualification: "" });

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getStudentData/students_${id}`);
      setStudents(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectStudent = (student) => {
    if (selectedStudent?._id === student._id) {
      setSelectedStudent(null);
      setEditData(null);
    } else {
      setSelectedStudent(student);
      setEditData({ ...student });
    }
  };

  const setStudentData = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("studentImage", file);
      data.append("fullname", formData.fullname);
      data.append("email", formData.email);
      data.append("mobileNo", formData.mobileNo);
      data.append("qualification", formData.qualification);

      await axios.post(`${BASE_URL}/setStudentData/students_${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Student Added Successfully!");
      getStudentData();
      // Clear form fields
      setFormData({ fullname: "", email: "", mobileNo: "", qualification: "" });
      setFile(null);
    } catch (e) {
      toast.error("Failed to Submit Data!");
      console.error(e);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const data = new FormData();
      if (file) data.append("studentImage", file);
      Object.entries(editData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.put(`${BASE_URL}/updateStudent/students_${id}/${editData._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Student Updated Successfully!");
      getStudentData();
      setSelectedStudent(null);
      setEditData(null);
    } catch (e) {
      toast.error("Failed to Update Student!");
      console.error(e);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.put(`${BASE_URL}/deleteStudent/students_${id}/${studentId}`);
      toast.success("Student marked as inactive.");
      getStudentData();
    } catch (e) {
      toast.error("Failed to delete student.");
      console.error(e);
    }
  };

  const handleEnableStudent = async (studentId) => {
    try {
      await axios.put(`${BASE_URL}/enableStudent/students_${id}/${studentId}`);
      toast.success("Student reactivated successfully.");
      getStudentData();
    } catch (e) {
      toast.error("Failed to enable student.");
      console.error(e);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-xl bg-primary text-white p-2 text-center capitalize">Manage Students for {id}</h1>
      <Tabs defaultValue="students" className="w-full mt-3">
        <TabsList className="w-full">
          <TabsTrigger value="students" className="w-full">Students List</TabsTrigger>
          <TabsTrigger value="addstudent" className="w-full">Add Student</TabsTrigger>
          <TabsTrigger value="managestudent" className="w-full">Manage Student</TabsTrigger>
        </TabsList>

        {/* STUDENTS LIST */}
        <TabsContent value="students">
          {students.length === 0 ? (
            // <p>Loading students...</p>
            <p>No active students found.</p>
          ) : students.some(student => student.active === true) ? (
            students
              .filter(student => Boolean(student.active)) // Ensure `active` is a boolean
              .map((student) => (
                <div key={student._id} className="border p-3 rounded shadow-md flex gap-4 items-center mt-2">
                  <img src={student.studentImage || profile} alt="Profile" className="w-16 h-16 rounded-full" />
                  <div>
                    <h2 className="text-lg font-bold">{student.fullname}</h2>
                    <p>{student.email}</p>
                    <p>{student.mobileNo}</p>
                    <p>{student.qualification}</p>
                  </div>
                </div>
              ))
          ) : (
            <p>No active students found.</p>
          )}
        </TabsContent>



        {/* ADD STUDENT */}
        <TabsContent value="addstudent">
          <h2 className="text-xl mt-5">Add Student</h2>
          <form onSubmit={setStudentData} className="space-y-4">
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            <Input placeholder="Full Name" value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} required />
            <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input type="number" placeholder="Mobile No" value={formData.mobileNo} onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })} required />
            <Input placeholder="Qualification" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        {/* MANAGE STUDENT */}
        <TabsContent value="managestudent">
          <h2 className="text-xl mt-5">Manage Student</h2>
          {students.map((student) => (
            <div key={student._id} className="border p-3 rounded shadow-md mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{student.fullname}</h2>
                <Button onClick={() => handleSelectStudent(student)}>
                  {selectedStudent?._id === student._id ? "Close" : "Select"}
                </Button>
              </div>

              {selectedStudent?._id === student._id && editData && (
                <div className="mt-3 space-y-2">
                  <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  <Input value={editData.fullname} onChange={(e) => setEditData({ ...editData, fullname: e.target.value })} placeholder="Full Name" />
                  <Input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} placeholder="Email" />
                  <Input value={editData.mobileNo} onChange={(e) => setEditData({ ...editData, mobileNo: e.target.value })} placeholder="Mobile No" />
                  <Input value={editData.qualification} onChange={(e) => setEditData({ ...editData, qualification: e.target.value })} placeholder="Qualification" />

                  <div className="flex gap-2">
                    <Button onClick={handleUpdateStudent}>Update</Button>

                    {student.active ? (
                      <Button onClick={() => handleDeleteStudent(student._id)} className="bg-red-500">Disable</Button>
                    ) : (
                      <Button onClick={() => handleEnableStudent(student._id)} className="bg-green-500">Enable</Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default DashStudent;
