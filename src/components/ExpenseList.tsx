
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Expense } from '@/types/expense';
import { useToast } from '@/hooks/use-toast';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  'Food & Dining': 'bg-orange-100 text-orange-800 border-orange-200',
  'Transportation': 'bg-blue-100 text-blue-800 border-blue-200',
  'Shopping': 'bg-purple-100 text-purple-800 border-purple-200',
  'Entertainment': 'bg-pink-100 text-pink-800 border-pink-200',
  'Bills & Utilities': 'bg-red-100 text-red-800 border-red-200',
  'Healthcare': 'bg-green-100 text-green-800 border-green-200',
  'Travel': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Education': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Other': 'bg-gray-100 text-gray-800 border-gray-200',
};

const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  const { toast } = useToast();

  const handleDelete = (expense: Expense) => {
    onDeleteExpense(expense.id);
    toast({
      title: "Expense Deleted",
      description: `${expense.description} has been removed.`,
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">No expenses yet</div>
        <div className="text-slate-500 text-sm">
          Add your first expense to get started!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge 
                variant="secondary" 
                className={categoryColors[expense.category] || categoryColors['Other']}
              >
                {expense.category}
              </Badge>
              <span className="text-sm text-slate-500">
                {format(new Date(expense.date), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="font-medium text-slate-800 mb-1">
              {expense.description}
            </div>
            <div className="text-2xl font-bold text-slate-900">
              ${expense.amount.toFixed(2)}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(expense)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
