import error_right from '@/imagens/error_right.svg';
import error_left from '@/imagens/error_left.svg';
import { XCircleIcon } from "lucide-react";
import { ErrorActionType, UseErrorContext } from '@/contexts/error';
import { FileActionType, UseFileContext } from '@/contexts/file';
import { MotionAnimation } from './motion-animation';

const ErrorUploadNewFile = () => {

  const { dispatchError, stateError } = UseErrorContext();
  const { dispatch } = UseFileContext();

  const handleRemoveError = () => {
    dispatchError({type: ErrorActionType.CLEAR_ERROR })
    dispatch({ type: FileActionType.CLEAR_FILE })
  }

  return (
    <MotionAnimation motionKey={'erro-upload'} duration={1.2} delay={0.5} ease={[0, 0.71, 0.2, 1.01]}>
      <>
        <div className='absolute right-3 top-3'>
          <button className='' onClick={() => handleRemoveError()}>
            <XCircleIcon className="text-red-600" width={32} height={32} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between content-center items-center text-center mt-6 rounded-lg border-2 bg-red-100 px-10">
          <img
            className="icon"
            src={error_left}
            alt="Erro lançamento"
            width={200}
            height={100}
          /> 

          <label
            htmlFor={'Erro'}
            className="text-base font-semibold text-zinc-500 mb-12 md:mb-0"
            >
            {stateError.errorMessage.title}
            <span className="block text-base font-normal text-zinc-500">
              {stateError.errorMessage.message}
            </span>
          </label>
          
          <img
            className="icon lg:block hidden"
            src={error_right}
            alt="Erro lançamento"
            width={200}
            height={100}
          />
        </div>
      </>
    </MotionAnimation>
    )
}

export { ErrorUploadNewFile }; 