import React from "react";
import { DashLineChart } from "./DashLineChart";
import { BarChartComponent } from "./BarChartComponent";
import { RadialChartComponent } from "./RadialChartComponent";
import MailBoxComponent from "./MailBoxComponent";

const tableData = [
  { srNo: 1, name: "John Doe", mail: "john@example.com", status: "checked" },
  { srNo: 2, name: "Jane Smith", mail: "jane@example.com", status: "unchecked" },
  { srNo: 3, name: "Alice Johnson", mail: "alice@example.com", status: "checked" },
  { srNo: 4, name: "Bob Brown", mail: "bob@example.com", status: "unchecked" },
  { srNo: 5, name: "Charlie White", mail: "charlie@example.com", status: "checked" },
];


function DashOverview() {
  return (
    <div className="relative top-15 pb-6">
      <h1 className="text-3xl font-bold mb-5">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-4"><DashLineChart /></div>
        <div className="md:col-span-2"><BarChartComponent /></div>
      </div>

      <div className="grid md:grid-rows-1 md:grid-cols-6 gap-4 mt-4">
        <div className="md:row-span-1 col-span-4 min-h-[100px] flex flex-col justify-center items-center border shadow-lg rounded-lg">
          <h1 className="flex justify-center mb-5 items-center text-2xl font-bold">Mail Box</h1>
          <MailBoxComponent data={tableData}/>
        </div>
        <div className="md:row-span-1 col-span-2 min-h-[100px]">
          <RadialChartComponent/>
        </div>
        {/* <div className="md:row-span-1 col-span-2 min-h-[100px] flex justify-center items-center border rounded-lg shadow-lg">
        <CalendarComponent/>
        </div> */}
      </div>
    </div>
  );
}

export default DashOverview;
