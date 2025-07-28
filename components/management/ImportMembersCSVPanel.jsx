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
          setPreview(results.data.filter(row => row.Name)); // Skip empty rows
        },
      });
    }
  };

  const handleImport = () => {
    // Implement saving/import logic, or call callback
    onImport?.(preview);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Import Members from CSV</h2>
      <p className="mb-6 text-gray-600">
        The CSV file should have columns: <span className="font-mono">Name</span>, <span className="font-mono">Email</span>, <span className="font-mono">Phone</span>, <span className="font-mono">Membership Type</span>, <span className="font-mono">Join Date</span>.
      </p>

      <div
        className="border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center mb-8 bg-white cursor-pointer"
        onClick={() => fileRef.current.click()}
      >
        <input
          type="file"
          accept=".csv"
          className="hidden"
          ref={fileRef}
          onChange={handleFile}
        />
        <Button variant="mainblue" size="lg">
          Select CSV File
        </Button>
        <span className="mt-2 text-gray-500">
          {file ? file.name : "Drag and drop your CSV file here, or browse files."}
        </span>
      </div>

      {preview.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Preview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-xl bg-white mb-4">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Membership Type</th>
                  <th className="py-2 px-4 text-left">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((m, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-4 text-blue-600">{m.Name}</td>
                    <td className="py-2 px-4">{m.Email}</td>
                    <td className="py-2 px-4">{m.Phone}</td>
                    <td className="py-2 px-4">{m["Membership Type"]}</td>
                    <td className="py-2 px-4">{m["Join Date"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="hollow" size="xl" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="mainblue"
          size="xl"
          disabled={!preview.length}
          onClick={handleImport}
        >
          Import Data
        </Button>
      </div>
    </div>
  );
}
