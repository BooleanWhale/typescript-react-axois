import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const mySchema = z.object({
  name: z.string().min(3),
  number: z.number({ invalid_type_error: 'Number required' }).min(99, { message: 'Must be >= 99' })
  
});

type FormData = z.infer<typeof mySchema>; // removes the need for an interface

type Props = {}

export default function Form({}: Props) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }
  } = useForm<FormData>({ resolver: zodResolver(mySchema) });
  // Sets form shape to FormData interface for type safety and TS support

  const onSubmit = (data:FieldValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      { errors.name && <p>{errors.name.message}</p> }

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input 
        {...register('name')}
          // {...register('name', { required: true })}
          // replaces onchange and value
          // can render HTML validation attributes
          id="name" type="text" className="form-control" />
      </div>
      { errors.number && <p>{errors.number.message}</p> }

      <div className="mb-3">
        <label htmlFor="number" className="form-label">Number</label>
        <input 
         {...register('number', { valueAsNumber: true })}
          type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={!isValid}>Submit</button>
    </form>
  )
}