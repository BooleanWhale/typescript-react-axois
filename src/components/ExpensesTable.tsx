import React, {useState, useEffect} from 'react'

type Expense = {
  description: string;
  amount: number;
  category: string;
};

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export default function ExpensesTable({expenses, setExpenses}: Props) {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tableRows, setTableRows] = useState<JSX.Element[]>([]);
  const [total, setTotal] = useState(0);

  const deleteExpense = (description:string):void => {
    const updateExpenses = expenses.filter(expense => {
      return expense.description != description;
    });
    setExpenses(updateExpenses);
  }

  useEffect(() => {
    const filteredExpenses = selectedCategory === 'All' ? expenses 
      : expenses.filter(expense => expense.category === selectedCategory);

    const tableRows: JSX.Element[] = filteredExpenses
    .map(({ description, amount, category }: Expense) => {
      return (
        <tr key={ description }>
          <td>{ description }</td>
          <td>${ amount }</td>
          <td>{ category }</td>
          <td>
            <button 
              className="btn btn-secondary"
              onClick={() => deleteExpense(description)}
              >Delete</button>
          </td>
        </tr>
      );
    });

    setTableRows(tableRows);
    setTotal(filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0))
  }, [selectedCategory, expenses]);

  return (
    <div className="expenses mt-5">
      <form>
        <select
            id="tableCategory" 
            className="form-select"
            value={selectedCategory}
            onChange={event => setSelectedCategory(event.target.value)}
          >
          <option value="All">All categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </form>

      <table className="table mt-1">
        <thead>
          <tr>
            <td>Description</td>
            <td>Amount</td>
            <td>Category</td>
          </tr>
        </thead>
        <tbody>
        {tableRows}
        <tr>
          <td>Total</td>
          <td>${total}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}