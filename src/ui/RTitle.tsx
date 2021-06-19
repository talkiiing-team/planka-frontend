import React from 'react'

interface RTitleProps {
  value?: string,
  className?: string
}

const RTitle = (props: RTitleProps) => {
  return (
    <button
      className={` ${props.className}
    cursor-pointer text-blue-500 focus:outline-none
    flex items-center justify-center tracking-wide
    outline-none`}
    >
      {props.value || ''}
    </button>
  )
}

export default RTitle
