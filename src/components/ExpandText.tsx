import React, {useState} from 'react'

type Props = {
  maxChars?:number,
  children:ReactNode
}

export default function ExpandText({ maxChars = 10, children }: Props) {
  const [expanded, setExpanded] = useState(false) ;
  const summary = children.slice(0, maxChars) + '...';

  return (
    <div>
      {expanded ? children : summary}
      <button onClick={() => setExpanded(!expanded)}>
      {expanded ? 'Less' : 'More'}
      </button>
    </div>
  )
} 