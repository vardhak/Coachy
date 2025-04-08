import React from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashTeacher from "./DashTeacher";
import DashStudent from "./DashStudent";
import DashCourse from "./DashCourse";
import DashLecture from "./DashLecture";

function Standard() {
  const { id } = useParams();
  return (
    <div className="w-full h-screen flex justify-start items-start  mt-16 p-3">
      <Tabs defaultValue="teachers" className="w-full h-full">
        <TabsList >
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="lecture">Lecture</TabsTrigger>
        </TabsList>
        <TabsContent
          value="teachers"
          className="w-full min-h-min border p-2 shadow-md"
        >
          {/* calling the dash teachers */}
          <DashTeacher />
        </TabsContent>
        <TabsContent
          value="students"
          className="w-full min-h-min border p-2 shadow-md"
        >
          {/* calling dash students  */}
          <DashStudent />
        </TabsContent>
        <TabsContent
          value="courses"
          className="w-full min-h-min border p-2 shadow-md "
        >
          {/* calling dash courses */}
          <DashCourse />
        </TabsContent>
        <TabsContent
          value="lecture"
          className="w-full min-h-min border p-2 shadow-md "
        >
          {/* calling dash courses */}
          <DashLecture />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Standard;
