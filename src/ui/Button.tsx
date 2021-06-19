import React from 'react'

interface IButtonProps {
  value?: string
  onClick?: () => any
  className?: string
}

const Button = (props: IButtonProps) => {
  return (
    <button
      className={`
        ${props.className} w-full px-4 py-3 shadow-md rounded-lg bg-gray-50 
    hover:shadow-sm hover:bg-gray-100 active:bg-gray-200 
    focus:bg-gray-100 focus:shadow-sm flex items-center justify-center select-none 
    outline-none focus:outline-none transition-all duration-100`}
      onClick={(e) => props.onClick && props.onClick()}
    >
      {props.value || ''}
    </button>
  )
}

export default Button
