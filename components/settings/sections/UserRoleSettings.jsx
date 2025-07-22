"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { roles } from "@/constants/roles/roles";
import Modal from "@/components/sharedcomponents/Modal";
import CreateRoleForm from "../forms/CreateRoleForm";
import { useRouter, usePathname } from "next/navigation";

export default function UserRoleSettings() {
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  function openCreateRoleForm() {
    router.push(`${pathname}?showForm=1`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold mb-2">
          Staff roles and permissions
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage staff roles, permissions, and account policies
        </p>
      </div>

      {/* Roles Table */}
      <h2 className="text-xl font-semibold mb-2">Roles</h2>
      <div className="border rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
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
                  <td className="px-4 py-4">{r.role}</td>
                  <td className="px-4 py-4">{r.description}</td>
                  <td className="px-4 py-4">{r.permissions}</td>
                  <td className="px-4 py-4">{r.staffCount}</td>
                  <td className="px-4 py-4">
                    <button className="text-primary hover:cursor-pointer hover:underline text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Role Button */}
      <Button onClick={() => setShowForm(true)}>+ Create Role</Button>

      {showForm && (
        <Modal>
          <CreateRoleForm onCancel={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  );
}
