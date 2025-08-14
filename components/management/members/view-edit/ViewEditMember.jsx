'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberById } from '@/redux/slices/memberSlice';
import Button from '@/components/ui/Button';
import { ContainerCard } from '@/components/sharedcomponents/ContainerCard';

export default function ViewEditMember({ memberId, onClose }) {
  const dispatch = useDispatch();
  const { selectedMember, loading } = useSelector((state) => state.members);

  useEffect(() => {
    if (memberId) dispatch(fetchMemberById(memberId));
  }, [memberId, dispatch]);

  if (loading || !selectedMember) return <div className="p-8 text-center">Loading...</div>;

  // Format date
  const memberSince = new Date(selectedMember.memberSince).toLocaleString('en-US', {
    month: 'short', year: 'numeric'
  });

  return (
    <ContainerCard className="max-w-3xl mx-auto p-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{selectedMember.name}</h1>
          <p className="text-gray-500">Member since {memberSince}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="danger" className="px-3">Delete Member</Button>
          <Button className="px-3">Edit Member</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Contact */}
        <div className="space-y-2">
          <div className="font-semibold text-gray-600">Contact</div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500">Phone</div>
            <div>{selectedMember.phone}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500">Email</div>
            <div>{selectedMember.email}</div>
          </div>
        </div>

        {/* Membership */}
        <div className="space-y-2">
          <div className="font-semibold text-gray-600">Membership</div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500">Plan</div>
            <div>{selectedMember.plan}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500">Member ID</div>
            <div>{selectedMember.memberId}</div>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-2">
          <div className="font-semibold text-gray-600">Plans</div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500">Diet Plan</div>
            <div>{selectedMember.dietPlan}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-500">Workout Plan</div>
            <div>{selectedMember.workoutPlan}</div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div>
        <div className="font-semibold mb-2">Payment History</div>
        <div className="bg-white border rounded">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Method</th>
              </tr>
            </thead>
            <tbody>
              {selectedMember.payments.map((pmt, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{pmt.date}</td>
                  <td className="py-2 px-3">${pmt.amount.toFixed(2)}</td>
                  <td className="py-2 px-3">
                    <span className="bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs">{pmt.status}</span>
                  </td>
                  <td className="py-2 px-3">{pmt.method}</td>
                </tr>
              ))}
              {selectedMember.payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ContainerCard>
  );
}
