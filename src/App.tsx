import { useState } from 'react'
import ListGroup from './components/ListGroup'
import LikeButton from './components/LikeButton'
import ExpandText from './components/ExpandText'
import Form from './components/Form'
import ExpensesForm from './components/ExpensesForm'
import ExpensesTable from './components/ExpensesTable'
import axios from 'axios'
import AxiosFetch from './components/AxiosFetch'
import './App.css'
import './index.css'

type Expense = {
  description: string;
  amount: number;
  category: string;
};

function App() {
  // const [count, setCount] = useState(0)
  // const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <div className="App">
      {/* <Form/> */}
      {/* <ListGroup heading="wefwefwe" items={items}/> */}
      {/* <LikeButton onClick={() => console.log('liked')} /> */}
      {/* <ExpandText maxChars={5}>
        awefawefawefawefawefawefwa
      </ExpandText> */}
      {/* <ExpensesForm expenses={expenses} setExpenses={setExpenses} />
      <ExpensesTable expenses={expenses} setExpenses={setExpenses} /> */}
      <AxiosFetch/>
    </div>
  )
}

export default App
