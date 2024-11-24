import { useSurvey } from '../../hooks/useSurvey';
const Choice = (props: ChoiceProps) => {
  const { label, choice, onClick, item, questionId } = props;

  const { surveyResults } = useSurvey();
  const isSelected = surveyResults.some(
    (result: any) => result.optionId === item.id && result.id === questionId
  );
  return (
    <div
      className={`flex items-center justify-center gap-5 px-2 py-4 rounded-lg 
              cursor-pointer transition-all duration-300 ${isSelected ? 'bg-blue-500' : ''
        }`}
      onClick={onClick}
      data-testid="choice"
    >
      <div className="flex flex-col items-center group relative">
        <span
          className={`font-medium text-[14px] absolute transition-all duration-300
                  ${isSelected
              ? 'top-[-50px] opacity-100 translate-y-0'
              : 'top-[-40px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
            }`}
        >
          {label}
        </span>
        <div
          className={`text-7xl cursor-pointer w-1/3 sm:w-1/4 md:w-auto transform 
                  transition-transform duration-300 hover:scale-125`}
        >
          {choice}
        </div>
      </div>
    </div>

  )
}

export default Choice