import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ category: "all", done: "all" });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        description: "",
        amount: "",
        category: "",
    });

    useEffect(() => {
        fetchExpenses();
    }, [filter]);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filter.category !== "all") params.append("category", filter.category);
            if (filter.done !== "all") params.append("done", filter.done);

            const res = await api.get(`/expense/getall?${params.toString()}`);

            if (res.data.success) {
                setExpenses(res.data.expenses);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setExpenses([]);
            } else {
                toast.error(error.response?.data?.message || "Failed to fetch expenses");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
            const res = await api.delete(`/expense/remove/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                fetchExpenses();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    };

    const handleToggleDone = async (id, currentDone) => {
        try {
            const res = await api.put(`/expense/${id}/done`, { done: !currentDone });
            if (res.data.success) {
                toast.success(res.data.message);
                fetchExpenses();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update expense");
        }
    };

    const startEdit = (expense) => {
        setEditingId(expense._id);
        setEditForm({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ description: "", amount: "", category: "" });
    };

    const handleUpdate = async (id) => {
        try {
            const res = await api.put(`/expense/update/${id}`, editForm);
            if (res.data.success) {
                toast.success(res.data.message);
                setEditingId(null);
                fetchExpenses();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update expense");
        }
    };

    const getTotalAmount = () => {
        return expenses.reduce((sum, exp) => sum + Number(exp.amount), 0).toFixed(2);
    };

    const getCategoryColor = (category) => {
        const colors = {
            food: "bg-green-100 text-green-800",
            rent: "bg-blue-100 text-blue-800",
            shopping: "bg-purple-100 text-purple-800",
            utilities: "bg-yellow-100 text-yellow-800",
            transport: "bg-red-100 text-red-800",
            entertainment: "bg-pink-100 text-pink-800",
            others: "bg-gray-100 text-gray-800",
        };
        return colors[category.toLowerCase()] || colors.others;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Loading expenses...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Expenses</h1>
                <p className="text-gray-600">Track and manage all your expenses</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Filter by Category
                        </label>
                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            <option value="food">Food</option>
                            <option value="rent">Rent</option>
                            <option value="shopping">Shopping</option>
                            <option value="utilities">Utilities</option>
                            <option value="transport">Transport</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Filter by Status
                        </label>
                        <select
                            value={filter.done}
                            onChange={(e) => setFilter({ ...filter, done: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="done">Done</option>
                            <option value="undone">Undone</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Total Amount
                        </label>
                        <div className="text-2xl font-bold text-blue-600">
                            ₹{getTotalAmount()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expense List */}
            {expenses.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No expenses found
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Start adding your expenses to track your spending
                    </p>
                    <a
                        href="/expenses/add"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Your First Expense
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {expenses.map((expense) => (
                        <div
                            key={expense._id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                        >
                            {editingId === expense._id ? (
                                /* Edit Mode */
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            value={editForm.description}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, description: e.target.value })
                                            }
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Description"
                                        />
                                        <input
                                            type="number"
                                            value={editForm.amount}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, amount: e.target.value })
                                            }
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Amount"
                                        />
                                        <select
                                            value={editForm.category}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, category: e.target.value })
                                            }
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="food">Food</option>
                                            <option value="rent">Rent</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="utilities">Utilities</option>
                                            <option value="transport">Transport</option>
                                            <option value="entertainment">Entertainment</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(expense._id)}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* View Mode */
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {expense.description}
                                            </h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                                                    expense.category
                                                )}`}
                                            >
                                                {expense.category}
                                            </span>
                                            {expense.done && (
                                                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                                                    ✓ Done
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-2xl font-bold text-blue-600">
                                            ₹{Number(expense.amount).toFixed(2)}
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {new Date(expense.createdAt).toLocaleDateString("en-IN", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleToggleDone(expense._id, expense.done)
                                            }
                                            className={`px-4 py-2 rounded transition ${expense.done
                                                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                : "bg-green-500 text-white hover:bg-green-600"
                                                }`}
                                        >
                                            {expense.done ? "Mark Undone" : "Mark Done"}
                                        </button>
                                        <button
                                            onClick={() => startEdit(expense)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(expense._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;