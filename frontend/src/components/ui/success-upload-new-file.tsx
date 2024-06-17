import success_left from '@/imagens/success_left.svg';
import success_right from '@/imagens/success_right.svg';
import { Link } from 'react-router-dom';
import { XCircleIcon } from "lucide-react";
import { FileActionType, UseFileContext } from '@/contexts/file';
import { MotionAnimation } from './motion-animation';

const SuccessUploadNewFile = () => {

  const { dispatch } = UseFileContext();

  return (
    <MotionAnimation motionKey='success-new-file'>   
      <>
        <div className='absolute right-3 top-3'>
          <button className='' onClick={() => dispatch({type:FileActionType.CLEAR_RESPONSE_UPLOADING})}>
            <XCircleIcon className="text-sky-700" width={32} height={32} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between content-center items-center text-center bg-green-200 my-12 rounded-lg py-4 px-10">
          <img
            className="icon"
            src={success_left}
            alt="Sucesso lançamento"
            width={200}
            height={100}
          />

          <div className="md:mx-4 my-4 md:my-0 pb-4">
            <label
              htmlFor={'Suceeso upload'}
              className="text-base font-semibold text-zinc-500 mb-12 md:mb-0"
              >
              Lançamento realizado com sucesso! 
              <span className="block text-base font-normal text-zinc-500">
              Acesse no botão abaixo para visualizar seus lançamentos
              </span>
            </label>
            <Link to={'/historico'} className='rounded-lg px-4 py-2 text-md font-semibold outline-none shadow-sm bg-green-900 text-white block md:inline-block mt-6'>
              Ver lançamentos
            </Link>
          </div>
          
          <img
            className="icon lg:block hidden"
            src={success_right}
            alt="Sucesso lançamento"
            width={200}
            height={100}
          />
        </div>
      </>
    </MotionAnimation>
  )
}

export { SuccessUploadNewFile }; 