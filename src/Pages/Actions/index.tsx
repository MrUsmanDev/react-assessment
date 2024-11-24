import { useSurvey } from '../../hooks/useSurvey'

import Button from '../../components/Button'

import { surveyData } from '../../constants'

import NEXT_CDN from '../../assets/images/next.png'
import BACK_CDN from '../../assets/images/back.png'


const Actions = (props : ActionProps) => {
  const { handleNext, isValidate} = props;
  const {isSubmitting, currentQuestionIndex, prevQuestion} = useSurvey();
  return (
    <div className="w-full flex justify-around text-center mt-auto p-8">
          <Button 
             text="Back" 
             className={`${currentQuestionIndex <=0 ? 'bg-gray-200' : 'bg-blue-500'} text-white px-4 py-2 
             rounded-lg text-lg flex justify-center items-center gap-2  ${currentQuestionIndex <=0 ? 'cursor-not-allowed' : 'cursor-pointer'}
             transform transition-transform duration-300 hover:scale-110
             `}
             leftIcon={BACK_CDN}
             disabled = {currentQuestionIndex <= 0}
             onClick={prevQuestion}
             
             />
          <Button 
             currentQuestionIndex ={currentQuestionIndex}
             isSubmitting={isSubmitting}
             text={currentQuestionIndex === surveyData.length - 1 ? "Submit" : "Next"} 
             className={`${!isValidate ? 'bg-gray-200' : 'bg-blue-500'} text-white px-4 py-2 
             rounded-lg text-lg flex justify-center items-center gap-2  ${!isValidate ? 'cursor-not-allowed' : 'cursor-pointer'}
             transform transition-transform duration-300 hover:scale-110
             `}
             rightIcon={currentQuestionIndex === surveyData.length - 1 ? '' :NEXT_CDN}
             onClick={handleNext}
             disabled = {!isValidate}
             role='button'
             />
    </div>
  )
}

export default Actions