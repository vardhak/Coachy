// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import profile from "@/assets/img/github.png";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Label } from "@radix-ui/react-label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// function DashTeacher() {
//   const BASE_URL = import.meta.env.VITE_BASE_URL;
//   const { id } = useParams();
//   const [teacher, setTeacher] = useState([]);
//   const [file, setFile] = useState(null);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     mobileNo: "",
//     qualification: "",
//   });

//   useEffect(() => {
//     getTeacherData();
//   }, [id]);

//   const getTeacherData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getTeacherData/teachers_${id}`);
//       setTeacher(response.data);
//     } catch (e) {
//       console.error("Error fetching teacher data:", e);
//     }
//   };

//   const setTeacherData = async () => {
//     try {
//       const data = new FormData();
//       data.append("teacherImage", file);
//       data.append("fullname", formData.fullname);
//       data.append("email", formData.email);
//       data.append("mobileNo", formData.mobileNo);
//       data.append("qualification", formData.qualification);

//       const response = await axios.post(`${BASE_URL}/setTeacherData/teachers_${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Teacher Added Successfully!");
//       getTeacherData();
//     } catch (e) {
//       toast.error("Failed to Submit Data!");
//       console.error("Error submitting teacher data:", e);
//     }
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTeacherData();
//     setFormData({ fullname: "", email: "", mobileNo: "", qualification: "" });
//     setFile(null);
//   };

//   return (
//     <div className="p-2 flex flex-col justify-start items-start">
//       <h1 className="text-xl capitalize bg-primary text-white w-full flex justify-center items-center p-1">
//         Welcome To {id} Standard Teachers Panel
//       </h1>

//       <Tabs defaultValue="teachers" className="w-full mt-3">
//         <TabsList className="w-full overflow-x-auto mx-auto">
//           <TabsTrigger value="teachers" className="w-full">Teachers Profile</TabsTrigger>
//           <TabsTrigger value="addteacher" className="w-full">Add Teachers</TabsTrigger>
//           <TabsTrigger value="removeteacher" className="w-full">Remove Teachers</TabsTrigger>
//         </TabsList>

//         <TabsContent value="teachers">
//           {Array.isArray(teacher) && teacher.length > 0 ? (
//             teacher.map((item, index) => (
//               <div key={index} className="bg-white p-2 w-full mt-2 rounded-md border shadow">
//                 <div className="flex gap-3 justify-start items-center p-5">
//                   <img
//                     src={item.teacherImage || profile}
//                     alt="Teacher"
//                     className="w-25 h-25 rounded-full"
//                   />
//                   <div>
//                     <h1 className="text-xl">{item.fullname || "N/A"}</h1>
//                     <p>{item.colification || "N/A"}</p>
//                     <h2>{item.email || "N/A"}</h2>
//                     <h2>{item.mobileNo || "N/A"}</h2>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No teachers found.</p>
//           )}
//         </TabsContent>

//         {/* Add Teacher Form */}
//         <TabsContent value="addteacher">
//           <h1 className="text-xl capitalize mt-5">Teacher Details Form</h1>
//           <p className="text-slate-400 capitalize">Fill the form to add a new teacher</p>

//           <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-y-4">
//             <div>
//               <Label htmlFor="teacherImage">Teacher Image</Label>
//               <Input id="teacherImage" type="file" onChange={handleFileChange} required />
//             </div>

//             <div>
//               <Label htmlFor="fullname">Fullname</Label>
//               <Input id="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter teacher fullname" required />
//             </div>

//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter teacher email" required />
//             </div>

//             <div>
//               <Label htmlFor="mobileNo">Mobile No</Label>
//               <Input id="mobileNo" type="number" value={formData.mobileNo} onChange={handleChange} placeholder="Enter teacher mobile no" required />
//             </div>

//             <div>
//               <Label htmlFor="qualification">Qualification</Label>
//               <Input id="qualification" value={formData.qualification} onChange={handleChange} placeholder="Enter teacher qualification" required />
//             </div>

//             <div className="flex justify-between items-center mt-5 mb-10">
//               <Button type="button" className="cursor-pointer bg-black hover:bg-red-500" onClick={() => setFormData({ fullname: "", email: "", mobileNo: "", qualification: "" })}>Clear</Button>
//               <Button type="submit" className="cursor-pointer">Submit</Button>
//             </div>
//           </form>
//         </TabsContent>

//         <TabsContent value="removeteacher">
//           Remove teacher section.
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default DashTeacher;
















import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import profile from "@/assets/img/github.png";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function DashTeacher() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [teachers, setTeachers] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({ fullname: "", email: "", mobileNo: "", qualification: "" });

  useEffect(() => {
    getTeacherData();
  }, []);

  const getTeacherData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getTeacherData/teachers_${id}`);
      setTeachers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectTeacher = (teacher) => {
    if (selectedTeacher?._id === teacher._id) {
      setSelectedTeacher(null);
      setEditData(null);
    } else {
      setSelectedTeacher(teacher);
      setEditData({ ...teacher });
    }
  };

  const setTeacherData = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("teacherImage", file);
      data.append("fullname", formData.fullname);
      data.append("email", formData.email);
      data.append("mobileNo", formData.mobileNo);
      data.append("qualification", formData.qualification);

      await axios.post(`${BASE_URL}/setTeacherData/teachers_${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Teacher Added Successfully!");
      getTeacherData();
      setFormData({ fullname: "", email: "", mobileNo: "", qualification: "" });
      setFile(null);
    } catch (e) {
      toast.error("Failed to Submit Data!");
      console.error(e);
    }
  };

  const handleUpdateTeacher = async () => {
    try {
      const data = new FormData();
      if (file) data.append("teacherImage", file);
      Object.entries(editData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.put(`${BASE_URL}/updateTeacher/teachers_${id}/${editData._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Teacher Updated Successfully!");
      getTeacherData();
      setSelectedTeacher(null);
      setEditData(null);
    } catch (e) {
      toast.error("Failed to Update Teacher!");
      console.error(e);
    }
  };


  const handleEnableTeacher = async (teacherId) => {
    try {
      await axios.put(`${BASE_URL}/enableTeacher/teachers_${id}/${teacherId}`);
      toast.success("Teacher enabled successfully!");
      getTeacherData(); // Refresh the teacher list
    } catch (e) {
      toast.error("Failed to enable teacher!");
      console.error(e);
    }
  };

  const handleDisableTeacher = async (teacherId) => {
    try {
      await axios.put(`${BASE_URL}/disableTeacher/teachers_${id}/${teacherId}`);
      toast.success("Teacher disabled successfully!");
      getTeacherData(); // Refresh the teacher list
    } catch (e) {
      toast.error("Failed to disable teacher!");
      console.error(e);
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-xl bg-primary text-white p-2 text-center capitalize">Manage Teachers for {id}</h1>
      <Tabs defaultValue="teachers" className="w-full mt-3">
        <TabsList className="w-full">
          <TabsTrigger value="teachers" className="w-full">Teachers List</TabsTrigger>
          <TabsTrigger value="addteacher" className="w-full">Add Teacher</TabsTrigger>
          <TabsTrigger value="manageteacher" className="w-full">Manage Teacher</TabsTrigger>
        </TabsList>

        {/* TEACHERS LIST */}
        <TabsContent value="teachers">
          {teachers.filter(teacher => teacher.active).length > 0 ? (
            teachers.filter(teacher => teacher.active).map((teacher) => (
              <div key={teacher._id} className="border p-3 rounded shadow-md flex gap-4 items-center mt-2">
                <img src={teacher.teacherImage || profile} alt="Profile" className="w-16 h-16 rounded-full" />
                <div>
                  <h2 className="text-lg font-bold">{teacher.fullname}</h2>
                  <p>{teacher.email}</p>
                  <p>{teacher.mobileNo}</p>
                  <p>{teacher.qualification}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No active teachers found.</p>
          )}
        </TabsContent>

        {/* ADD TEACHER */}
        <TabsContent value="addteacher">
          <h2 className="text-xl mt-5">Add Teacher</h2>
          <form onSubmit={setTeacherData} className="space-y-4">
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            <Input placeholder="Full Name" value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} required />
            <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input type="number" placeholder="Mobile No" value={formData.mobileNo} onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })} required />
            <Input placeholder="Qualification" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        {/* MANAGE TEACHER */}
        <TabsContent value="manageteacher">
          <h2 className="text-xl mt-5">Manage Teacher</h2>
          {teachers.map((teacher) => (
            <div key={teacher._id} className="border p-3 rounded shadow-md mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{teacher.fullname}</h2>
                <Button onClick={() => handleSelectTeacher(teacher)}>
                  {selectedTeacher?._id === teacher._id ? "Close" : "Select"}
                </Button>
              </div>
              {selectedTeacher?._id === teacher._id && editData && (
                <div className="mt-3 space-y-2">
                  <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  <Input value={editData.fullname} onChange={(e) => setEditData({ ...editData, fullname: e.target.value })} placeholder="Full Name" />
                  <Input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} placeholder="Email" />
                  <Input value={editData.mobileNo} onChange={(e) => setEditData({ ...editData, mobileNo: e.target.value })} placeholder="Mobile No" />
                  <Input value={editData.qualification} onChange={(e) => setEditData({ ...editData, qualification: e.target.value })} placeholder="Qualification" />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateTeacher}>Update</Button>

                    {teacher.active ? (
                      <Button onClick={() => handleDisableTeacher(teacher._id)} className="bg-red-500">Disable</Button>
                    ) : (
                      <Button onClick={() => handleEnableTeacher(teacher._id)} className="bg-green-500">Enable</Button>
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

export default DashTeacher;
