import React from 'react'

interface RTitleProps {
  value?: string,
  className?: string
}

const RLink = (props: RTitleProps) => {
  return (
    <a
      className={`${props.className}
      cursor-pointer focus:outline-none
      flex items-center justify-center tracking-wide
      outline-none`}
    >
      {props.value || ''}
    </a>
  )
}

export default RLink
