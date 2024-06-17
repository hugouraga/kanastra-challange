/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileActionType, UseFileContext } from '@/contexts/file';
import { ErrorActionType, UseErrorContext } from '@/contexts/error';
import * as Components from '../components'
import { api } from '@/service/api';
import { useState } from 'react';
import { PaginatedResponseFiles, PaginatedResponseCharges } from '@/interface/api';
import { CSVRow } from '@/utils/csvToArray';

const Home = ()  => {
  const { state, dispatch } = UseFileContext();
  const { stateError, dispatchError } = UseErrorContext();
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleFileUpload = async (state: { isLoading?: boolean; isSuccessUploadNewFile?: boolean; isErrorUploadNewFile?: boolean; errorLoadingFile?: string; fileUpload: any; filePreview?: CSVRow[] | null; file?: PaginatedResponseFiles | null; fileList?: PaginatedResponseFiles[]; chargeList?: PaginatedResponseCharges[]; charge?: PaginatedResponseCharges | null; }) => {
    if (!state.fileUpload) {
        return;
    }
    const file = state.fileUpload;
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      dispatch({ type: FileActionType.SET_START_UPLOADING});
      await api.post('/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            const percentCompleted = Math.round((loaded * 90) / total);
            setUploadPercentage(  percentCompleted);
          }
        }
      });
      setUploadPercentage(uploadPercentage + 10);
      dispatch({ type: FileActionType.SET_SUCCESS_UPLOADING});

    } catch (error: any) {
      console.log(error);
      dispatch({ type: FileActionType.SET_STOP_UPLOADING });
      setUploadPercentage(0)

      const status = error.response?.status ?? null;
      let message = 'Nossa equipe técnica já foi notificada e está realizando os ajustes necessários. Por favor, tente novamente mais tarde. Agradecemos pela sua compreensão!';
    
      if (status >= 400 && status < 500) {
        message = 'Houve um problema com a sua requisição.';
      } else if (status >= 500) {
        message = 'Ocorreu um problema no servidor. Tente novamente mais tarde.';
      }
    
      dispatchError({ type: ErrorActionType.SET_ERROR, payload: {errorMessage: {
        title: 'Erro ao realizar upload do arquivo.',
        message
      }}});
      
    }
  };
  
  return (
    <div>      
      <Components.Label 
        title='Importar arquivo' 
        subtitle='Importe a planilha de cobranças .csv' 
        htmlFor='importar arquivo .csv'
      />
      <Components.FileUploader/>
      
      {state.isLoading && !stateError.isError && (
        <div className='mt-10 mb-10'>
          <Components.Label 
            title='Importando arquivo...' 
            subtitle='por favor, aguarde' 
            htmlFor='Importando arquivo'
          />
          <Components.ProgressBar progress={uploadPercentage} />
        </div>
      )}

      {state.isSuccessUploadNewFile && !stateError.isError && (
        <div className='relative'>
          <Components.SuccessUploadNewFile />
        </div>
      )}

      {stateError.isError && (
        <div className='relative'>
          <Components.ErrorUploadNewFile />
        </div>
      )}

      <div className="flex mt-6 mb-2 justify-between items-center">
        <Components.Label 
          title='Pré-visualização do dados importados' 
          subtitle='Revise os itens abaixo antes de realizar o lançamento' 
          htmlFor='Pré visualizacão arquivo .csv'
        />
        <Components.Button type='button' variant='primary' 
          disabled={!state.filePreview || state.isLoading || stateError.isError} 
          onClick={() => handleFileUpload(state)}
        >
          {state.isLoading ? 'Carregando arquivo...' : 'Realizar lançamento' } 
        </Components.Button>
      </div>

      <Components.TableImportPreview data={state.filePreview ?? []}  />
      
   </div>
  )
}

export { Home }; 