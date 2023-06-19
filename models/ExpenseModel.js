const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
   
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    }
  
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)
