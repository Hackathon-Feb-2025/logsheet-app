import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ModuleProgressReport = () => {
  const [courseStatus, setCourseStatus] = useState("Active");
  const [course, setCourse] = useState("");
  const [module, setModule] = useState("");
  const [faculty, setFaculty] = useState("");
  const [types, setTypes] = useState([]);
  const [reportData, setReportData] = useState([]);

  const typeOptions = [
    "Theory",
    "Lab",
    "Theory (with Lab)",
    "Lab (assisted while Lecture)",
    "Technical Upgradation",
    "Course Material",
    "Course Management",
    "IT support",
    "Student convenience",
    "Event Support",
    "Activity",
  ];

  const handleTypeChange = (type) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = async () => {
    if (!course || !module || !faculty) {
      toast.error("Please select all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/generateReport", {
        course,
        module,
        faculty,
        types,
      });
      setReportData(response.data);
      toast.success("Report generated successfully!");
    } catch (error) {
      toast.error("Failed to generate report!");
      console.error(error);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold">Module Progress</h2>
      <p className="text-gray-500 mb-4">Module Progress Report</p>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded shadow">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label>Course Status</label>
            <select
              className="w-full p-2 border rounded"
              value={courseStatus}
              onChange={(e) => setCourseStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label>Course</label>
            <select
              className="w-full p-2 border rounded"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          <div>
            <label>Module</label>
            <select
              className="w-full p-2 border rounded"
              value={module}
              onChange={(e) => setModule(e.target.value)}
            >
              <option value="">Select Module</option>
              <option value="Module 1">Module 1</option>
              <option value="Module 2">Module 2</option>
            </select>
          </div>

          <div>
            <label>Faculty</label>
            <select
              className="w-full p-2 border rounded"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="">Select Faculty</option>
              <option value="Faculty 1">Pratik</option>
              <option value="Faculty 2">Raj</option>
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mt-4">
          <label>Select Type(s)</label>
          <div className="grid grid-cols-3 gap-2">
            {typeOptions.map((type, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handleTypeChange(type)}
                  checked={types.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-right mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white mt-6 p-4 rounded shadow">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Faculty</th>
              <th className="border p-2">Start</th>
              <th className="border p-2">End</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Topics</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length > 0 ? (
              reportData.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.date}</td>
                  <td className="border p-2">{item.faculty}</td>
                  <td className="border p-2">{item.start}</td>
                  <td className="border p-2">{item.end}</td>
                  <td className="border p-2">{item.duration}</td>
                  <td className="border p-2">{item.topics}</td>
                  <td className="border p-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border p-2 text-center">
                  No Data Found
                </td>
              </tr>
            )}
            {/* Total Duration */}
            <tr className="bg-gray-100">
              <td colSpan="5" className="border p-2 font-bold">
                Total
              </td>
              <td className="border p-2 font-bold">
                {reportData.reduce((acc, item) => acc + parseFloat(item.duration), 0).toFixed(2)}
              </td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleProgressReport;


