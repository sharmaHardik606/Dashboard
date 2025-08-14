"use client";
import { ContainerCard } from "@/components/sharedcomponents/ContainerCard";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Hash, Star, Soup, Dumbbell } from "lucide-react";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup";
import { useState } from "react";
import { useRouter } from "next/navigation";

const samplePaymentHistory = [
  { date: "2024-07-15", amount: 50.0, status: "Paid", method: "Credit Card" },
  { date: "2024-06-15", amount: 50.0, status: "Paid", method: "Credit Card" },
  { date: "2024-05-15", amount: 50.0, status: "Paid", method: "Credit Card" },
];

export default function ViewEditMember({ member, onClose }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  if (!member) {
    return <div className="p-8 text-center">Member not found.</div>;
  }

  const memberSince = "Jan 2023";
  const phone = member.phone || "+1-555-123-4567";
  const planName = member.plan || "Premium Plan";
  const memberID = member.id || "1234567890";
  const dietPlan = member.dietPlan || "Custom Diet Plan";
  const workoutPlan = member.workoutPlan || "Strength Training";
  const email = member.contact || "alex.johnson@email.com";
  const payments = member.payments || samplePaymentHistory;
  const profileImage = member.image || null;

  const handleDeleteConfirm = () => {
    console.log("Deleting member...", member.id);
    setShowDeleteConfirm(false);
    onClose && onClose();
  };

  return (
    <div className="p-3 space-y-6 transition-all duration-300">
      {showDeleteConfirm && (
        <ConfirmationPopup
          message={`Are you sure you want to delete ${member.name}? This action cannot be undone.`}
          buttonText="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {/* Page Title */}
      <div className="flex flex-col justify-between sm:not-even:items-center gap-4 sm:flex-row">
        <h1 className="text-3xl font-semibold">Members</h1>
        <div className="flex  gap-3 ">
          <Button
            variant="destructive"
            size="xl"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Member
          </Button>

          {/* 🆕 Edit button triggers AddMemberForm modal */}
          <Button
            variant="mainblue"
            size="xl"
            onClick={() =>
              router.push(`/management/members?showForm=1`)
            }
          >
            Edit Member
          </Button>
        </div>
      </div>

      {/* Top Section with image + name */}
      <div className="flex flex-col items-center  mb-12">
        {profileImage ? (
          <img
            src={profileImage}
            alt={member.name}
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-12 h-12" />
          </div>
        )}
        <h2 className="mt-4 text-xl font-semibold">{member.name}</h2>
        <p className="text-gray-500">Member since {memberSince}</p>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Contact */}
        <div className="space-y-3">
          <div className="font-medium mb-1">Contact</div>
          <div className="rounded-lg bg-white p-3 flex items-center gap-3">
            <div className="p-3 bg-[#F7F7F7] rounded-md">
              <Phone className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Phone</div>
              <div className="text-xs text-gray-600">{phone}</div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-3 flex items-center gap-3">
            <div className="p-3 bg-[#F7F7F7] rounded-md">
              <Mail className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Email</div>
              <div className="text-xs text-gray-600">{email}</div>
            </div>
          </div>
        </div>

        {/* Membership */}
        <div className="space-y-3">
          <div className="font-medium mb-1">Membership</div>
          <div className="rounded-lg bg-white p-3 flex items-center gap-3">
            <div className="p-3 bg-[#F7F7F7] rounded-md">
              <Star className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Plan</div>
              <div className="text-xs text-gray-600">{planName}</div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-3 flex items-center gap-3">
            <div className="p-3 bg-[#F7F7F7] rounded-md">
              <Hash className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Member ID</div>
              <div className="text-xs text-gray-600">{memberID}</div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-3">
          <div className="font-medium mb-1">Plans</div>
          <div className="rounded-lg bg-white p-3 flex items-center gap-3">
            <div className="p-3 bg-[#F7F7F7] rounded-md">
              <Soup className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Diet Plan</div>
              <div className="text-xs text-gray-600">{dietPlan}</div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-3 flex items-center gap-3">
            <div className="p-3 bg-[#F7F7F7] rounded-md">
              <Dumbbell className="text-blue-600 h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Workout Plan</div>
              <div className="text-xs text-gray-600">{workoutPlan}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div>
        <div className="text-xl font-semibold mb-5 ">Payment History</div>
        <div className="bg-white border rounded-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3 text-left font-medium text-gray-700">
                  Date
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-700">
                  Amount
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="py-2 px-3 text-left font-medium text-gray-700">
                  Method
                </th>
              </tr>
            </thead>
            <tbody>
              {payments && payments.length > 0 ? (
                payments.map((pmt, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-4 px-3 whitespace-nowrap text-gray-600">
                      {pmt.date}
                    </td>
                    <td className="py-4 px-3 text-gray-600">
                      ${pmt.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-3 text-gray-600">
                      <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs font-semibold">
                        {pmt.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap text-gray-600">
                      {pmt.method}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
