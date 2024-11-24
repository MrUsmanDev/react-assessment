
const Button = (props: ButtonProps) => {
    const {text, className, disabled, onClick, leftIcon, rightIcon, role, currentQuestionIndex, isSubmitting} = props
  return (

    <button className={className} disabled={disabled} onClick={onClick} role={role}>
      {currentQuestionIndex === 5 && isSubmitting ?  <div className="loader"></div> : (
        <>
        {leftIcon && <img src={leftIcon} alt='left-icon'  />}
        {!isSubmitting &&  text}
        { rightIcon && <img src={rightIcon} alt='right-icon'  />}
        </>
      )}     
    </button>
  )
}

export default Button