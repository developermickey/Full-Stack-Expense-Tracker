import { Expense } from "../models/expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id;

    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });

    return res.status(201).json({
      message: "New Expense Added",
      success: true,
      expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add expense",
      success: false,
    });
  }
};

export const getExpense = async (req, res) => {
  try {
    const userId = req.id;
    const category = req.query.category || "";
    const done = req.query.done || "";

    const query = { userId };

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    if (done.toLowerCase() === "done") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false;
    }

    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        message: "No expenses found!",
        success: false,
      });
    }

    return res.status(200).json({
      expenses,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const markAsDoneUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { done } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { done },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Expense marked ${expense.done ? "done" : "undone"}.`,
      success: true,
      expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update expense",
      success: false,
    });
  }
};

export const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expense Deleted",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete expense",
      success: false,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expenseId = req.params.id;

    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const updateData = {
      description,
      amount,
      category,
    };

    const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {
      new: true,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Expense Updated",
      success: true,
      expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update expense",
      success: false,
    });
  }
};