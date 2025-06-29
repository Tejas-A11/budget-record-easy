
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseStats from '@/components/ExpenseStats';
import { Expense } from '@/types/expense';

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Expense Tracker
          </h1>
          <p className="text-slate-600 text-lg">
            Take control of your finances with style
          </p>
        </div>

        {/* Stats Overview */}
        <ExpenseStats expenses={expenses} totalExpenses={totalExpenses} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Add New Expense
              </h2>
              <ExpenseForm onAddExpense={addExpense} />
            </Card>
          </div>

          {/* Expenses List */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Recent Expenses
              </h2>
              <ExpenseList 
                expenses={expenses} 
                onDeleteExpense={deleteExpense}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
