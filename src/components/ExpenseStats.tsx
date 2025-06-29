
import { Card } from '@/components/ui/card';
import { Expense } from '@/types/expense';

interface ExpenseStatsProps {
  expenses: Expense[];
  totalExpenses: number;
}

const ExpenseStats = ({ expenses, totalExpenses }: ExpenseStatsProps) => {
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear;
  });
  
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl border-0">
        <div className="text-blue-100 text-sm font-medium">Total Expenses</div>
        <div className="text-3xl font-bold mt-2">${totalExpenses.toFixed(2)}</div>
        <div className="text-blue-200 text-sm mt-1">{expenses.length} transactions</div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl border-0">
        <div className="text-green-100 text-sm font-medium">This Month</div>
        <div className="text-3xl font-bold mt-2">${monthlyTotal.toFixed(2)}</div>
        <div className="text-green-200 text-sm mt-1">{monthlyExpenses.length} transactions</div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl border-0">
        <div className="text-purple-100 text-sm font-medium">Top Category</div>
        <div className="text-2xl font-bold mt-2">
          {topCategory ? topCategory[0] : 'None'}
        </div>
        <div className="text-purple-200 text-sm mt-1">
          {topCategory ? `$${topCategory[1].toFixed(2)}` : '$0.00'}
        </div>
      </Card>
    </div>
  );
};

export default ExpenseStats;
