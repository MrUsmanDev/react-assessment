
const Question = (props: QuestionProps) => {
  const { question, description } = props;
  return (
    <div className='flex flex-col gap-4'>
      <div className="text-white text-5xl font-bold max-w-[300px]  text-left animate-fade-in-up">
        {question}
      </div>
      {description && <span className='text-white font-medium text-lg'>{description}</span>}
    </div>

  )
}

export default Question