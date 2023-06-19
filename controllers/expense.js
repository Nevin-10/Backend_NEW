const ExpenseModel = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { amount } = req.body;

  const expense = new ExpenseModel({
    amount,
  });

  try {
    // Validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    await expense.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

  console.log(expense);
}

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseModel.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Expense Deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error' });
    });
}
