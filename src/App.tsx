import { useState } from 'react'
import ListGroup from './components/ListGroup'
import LikeButton from './components/LikeButton'
import ExpandText from './components/ExpandText'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const items:string[] = [
    'awefawef',
    'awefawefawef'
  ]

  return (
    <div className="App">
      <ListGroup heading="wefwefwe" items={items}/>
      <LikeButton onClick={() => console.log('liked')} />
      <ExpandText maxChars={5}>
        awefawefawefawefawefawefwa
      </ExpandText>
    </div>
  )
}

export default App
