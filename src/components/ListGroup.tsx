import React from 'react'

type Props = {
  items:string[],
  heading:string
}

export default function ListGroup({items, heading}: Props) {

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map(item => <li key={item} className="list-group-item">{item}</li>)}
      </ul>
    </>
  )
}