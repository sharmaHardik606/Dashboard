
const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    onCancel(); // Close modal after submit
  };

export default function LogPaymentForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold">Log Payment</h2>
      <button
        onClick={onCancel}
        className=" text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      <div>
        <label className="block mb-1 font-medium">Member</label>
        <input type="text" placeholder="John Doe" className="input" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount Paid</label>
        <input type="text" placeholder="₹ 2500" className="input" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Date of Payment</label>
        <input type="date" className="input" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Payment Method</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="method" className="mr-2" />
            Online
          </label>
          <label>
            <input type="radio" name="method" className="mr-2" />
            Cash
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Transaction ID</label>
        <input type="text" className="input" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <textarea
          className="input"
          placeholder="Placeholder"
          rows={3}
        ></textarea>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
