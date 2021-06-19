import React from 'react'

interface RLinkProps {
  value?: string,
  className?: string
}

const RLink = (props: RLinkProps) => {
  return (
    <a
      className={`${props.className}
      cursor-pointer
      flex items-center justify-center tracking-wide
      outline-none`}
    >
      {props.value || ''}
    </a>
  )
}

export default RLink
