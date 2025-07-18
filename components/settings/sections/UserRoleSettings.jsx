"use client";

import { Button } from "@/components/ui/button";

const roles = [
  {
    role: "Administrator",
    description: "Full access to all features and settings",
    permissions: "All",
    staffCount: 2,
  },
  {
    role: "Manager",
    description: "Manage members, classes, and staff",
    permissions: "Members, Classes, Staff",
    staffCount: 5,
  },
  {
    role: "Trainer",
    description: "Manage classes and member workouts",
    permissions: "Classes, Workouts",
    staffCount: 10,
  },
];

export default function UserRoleSettings() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-xl font-semibold">Staff roles and permissions</h2>
        <p className="text-sm text-muted-foreground">
          Manage staff roles, permissions, and account policies
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Permissions</th>
              <th className="px-4 py-3 font-medium">Staff members</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3">{r.role}</td>
                <td className="px-4 py-3">{r.description}</td>
                <td className="px-4 py-3">{r.permissions}</td>
                <td className="px-4 py-3">{r.staffCount}</td>
                <td className="px-4 py-3">
                  <button className="text-primary hover:underline text-sm font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button className="text-sm rounded-md" variant="outline">
        + Create Role
      </Button>
    </div>
  );
}
