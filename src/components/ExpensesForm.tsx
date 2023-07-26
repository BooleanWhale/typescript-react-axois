import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Expense = {
  description: string;
  amount: number;
  category: string;
};

type Props = {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

const mySchema = z.object({
  description: z.string().min(3),
  amount: z.number({ invalid_type_error: 'Number required' }).min(1, { message: 'Must be at least 1' }),
  category: z.enum(['Groceries', 'Utilities', 'Entertainment'])
});

type FormData = z.infer<typeof mySchema>; // removes the need for an interface

export default function Form({ expenses, setExpenses }: Props) {
  const { 
    register,
    control,
    handleSubmit, 
    reset,
    formState: { errors, isValid }
  } = useForm<FormData>({ resolver: zodResolver(mySchema) });

  const onSubmit = (data:FieldValues) => {
    console.log(expenses);
    console.log(data);
    setExpenses([...expenses, data]);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          {...register('description')}
          id="name" type="text" className="form-control" />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          {...register('amount', { valueAsNumber: true })}
          type="number" className="form-control" />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>
      <div className="mb-3">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field} id="category" className="form-select">
              <option value="">Select a category</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          )}
        />
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  )
}