"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

export default function ImportMembersCSVPanel({ onCancel, onImport }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const fileRef = useRef();

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          const rows = results.data.filter((row) => row.Name || row.Email); // Filter empty rows
          setPreview(rows);
        },
      });
    }
  };

  const handleImport = () => {
    onImport?.(preview);
  };

  return (
    <div className="pt-8 pb-16">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Import Members from CSV</h1>

      {/* Instruction */}
      <p className="text-sm text-gray-600 mb-6">
        To import members, your CSV file must be formatted correctly. The first
        row should contain the following headers:
        <span className="font-medium">
          {" "}
          'Name', 'Email', 'Phone', 'Membership Type', 'Join Date'
        </span>
        . Ensure all fields are populated for each member.
      </p>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer h-48 flex flex-col items-center justify-center text-center mb-6"
        onClick={() => {
          if (fileRef.current) fileRef.current.click();
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile) {
            setFile(droppedFile);
            Papa.parse(droppedFile, {
              header: true,
              complete: (results) => {
                const rows = results.data.filter(
                  (row) => row.Name || row.Email
                );
                setPreview(rows);
              },
            });
          }
        }}
      >
        <input
          type="file"
          accept=".csv"
          ref={fileRef}
          onChange={handleFile}
          className="hidden"
        />
        <span className="text-gray-700 font-medium">
          Drag and drop your CSV file here, or
        </span>

        <Button
          variant="mainblue"
          size="lg"
          className="mt-3"
          onClick={(e) => {
            e.stopPropagation(); // ✅ Fix here
            if (fileRef.current) fileRef.current.click();
          }}
        >
          Select CSV File
        </Button>

        {file && (
          <span className="mt-2 text-sm text-gray-500">{file.name}</span>
        )}
      </div>

      {/* Preview Table */}
      {preview.length > 0 && (
        <div className="mb-10">
          <h3 className="font-semibold mb-2">Preview</h3>
          <div className="overflow-x-auto border rounded-xl bg-white">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Membership Type</th>
                  <th className="py-2 px-4 text-left">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, idx) => {
                  console.log("Row data:", row); // For debugging
                  return (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4 text-blue-600">{row.Name}</td>
                      <td className="py-2 px-4">{row.Email}</td>
                      <td className="py-2 px-4">{row.Phone || row["Phone"]}</td>
                      <td className="py-2 px-4">
                        {row["Membership Type"] || row.MembershipType}
                      </td>
                      <td className="py-2 px-4">
                        {row["Join Date"] || row.JoinDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="hollow" size="lg" onClick={onCancel} className="">
          Cancel
        </Button>
        <Button
          variant="mainblue"
          size="lg"
          disabled={!preview.length}
          onClick={handleImport}
        >
          Import Data
        </Button>
      </div>
    </div>
  );
}
