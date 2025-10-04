import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const CreateExpense = () => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/expense/add", expense);

      if (res.data.success) {
        toast.success(res.data.message);
        // Reset form
        setExpense({ description: "", amount: "", category: "" });
        // Redirect to expense list after 1 second
        setTimeout(() => {
          navigate("/expenses");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Expense</h2>
            <button
              onClick={() => navigate("/expenses")}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={expense.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Grocery shopping"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Category
              </label>
              <select
                name="category"
                value={expense.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="food">🍔 Food</option>
                <option value="rent">🏠 Rent</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="utilities">💡 Utilities</option>
                <option value="transport">🚗 Transport</option>
                <option value="entertainment">🎬 Entertainment</option>
                <option value="others">📦 Others</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 text-white font-semibold py-3 px-4 rounded hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add Expense"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/expenses")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Add expenses regularly to keep track of your spending habits!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpense;