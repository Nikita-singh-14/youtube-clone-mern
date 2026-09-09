

const Button = ({
  children,
  type='button',
  bgColor='bg-blue-500',
  textColor = 'text-white',
  className='',
  ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg cursor-pointer ${className} ${bgColor} ${textColor}`} {...props}>
          {children}
    </button>
  )
}

export default Button