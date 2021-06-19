import React from 'react'

interface RTitleProps {
  value?: string,
  className?: string
}

const RTitle = (props: RTitleProps) => {
  return (
    <h1
      className={` ${props.className}
        w-50% px-2 py-2 border-b-2 border-gray-400 cursor-pointer
    flex items-center justify-center tracking-wider 
    outline-none text-xl font-bold italic`}
    >
      {props.value || ''}
    </h1>
  )
}

export default RTitle
