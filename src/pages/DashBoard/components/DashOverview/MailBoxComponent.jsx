import { Button } from "@/components/ui/button";

export default function MailBoxComponent({ data }) {
    return (
      <div className="w-full  overflow-auto rounded-lg h-[250px]">
        <table className="w-full border-collapse border border-gray-300">
          {/* <thead>
            <tr className="bg-primary text-white">
              <th className="border border-gray-300 px-4 py-2 text-left">Sr No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Mail ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">View</th>
            </tr>
          </thead> */}
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 ">{row.srNo}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className=" px-4 py-2 text-sm text-slate-500">{row.mail}</td>
                <td className="px-4 py-2">
                  <span className={row.status === "unchecked" ? "bg-green-200 rounded-lg text-green-500 px-1 text-sm" : "text-sm text-slate-500"}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="px-2 py-.5 text-sm cursor-pointer  rounded-lg bg-primary text-white">view</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  