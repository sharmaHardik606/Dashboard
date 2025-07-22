"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateRoleForm() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState({
    members: true,
    classes: true,
    workout: true,
    diet: true,
    staff: false,
  });

  const [selectedMembers, setSelectedMembers] = useState([0]);

  const memberList = [
    { name: "Liam Smith", id: "M1001", plan: "Gold Annual" },
    { name: "Liam Smith", id: "M1001", plan: "Silver Monthly" },
    { name: "Liam Smith", id: "M1001", plan: "Platinum Quarterly" },
  ];

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMemberSelection = (index) => {
    setSelectedMembers((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <form className="w-full max-w-2xl bg-white rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">Create Role</h2>

      <div>
        <label className="block mb-1 text-sm font-medium">Role Name</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter role name"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Permissions</label>
        <div className="flex flex-wrap gap-4">
          {Object.keys(permissions).map((perm) => (
            <label key={perm} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={permissions[perm]}
                onChange={() => togglePermission(perm)}
                className="form-checkbox accent-blue-600"
              />
              <span className="text-sm capitalize">{perm}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Placeholder"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <table className="w-full border rounded-lg overflow-hidden text-sm">
          <thead className="bg-blue-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 font-medium">
                <input
                  type="checkbox"
                  checked={selectedMembers.length === memberList.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMembers(memberList.map((_, i) => i));
                    } else {
                      setSelectedMembers([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-2 font-medium">Member Name</th>
              <th className="px-4 py-2 font-medium">Member ID</th>
              <th className="px-4 py-2 font-medium">Plan</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(index)}
                    onChange={() => toggleMemberSelection(index)}
                  />
                </td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.id}</td>
                <td className="px-4 py-2">{member.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-blue-600 text-white">Create Role</Button>
      </div>
    </form>
  );
}
