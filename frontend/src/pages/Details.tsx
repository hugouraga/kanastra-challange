/* eslint-disable react-hooks/exhaustive-deps */
import * as Components from '../components'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '@/service/api';
import { PaginatedResponseCharges } from '@/interface/api';
import { FileActionType, UseFileContext } from '@/contexts/file';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [listChargesApi, setListChargeApi] = useState<PaginatedResponseCharges>({
    data: [],
  } as unknown as PaginatedResponseCharges);
  const { state, dispatch } = UseFileContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const handleFetchMoreCharges = async (page: number) => {
    try {
      setLoading(true);
      if(!id) return;      
      const charge = getCharge(id, page);
      if(charge) {
        setListChargeApi(charge);
        return
      }
      const responseFileListApi = await api.get(`/file/details/${id}?page=${page}&per_page=200`);
      const newResponseData = responseFileListApi.data.response;
      newResponseData.fileId = id;
      setListChargeApi(newResponseData);
      dispatch({type:FileActionType.SET_CHARGES_LIST, payload: { charge: newResponseData}});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCharge = (fileId: string, page: number)  => {
    const charge = state.chargeList.find(item => item.fileId == fileId);
    if(!charge) return null;
    if(charge.current_page >= page) return charge
    return null;
  }

  useEffect(() => {
    handleFetchMoreCharges(1);
  }, []);

  return (
    <div>      
      <div className="flex justify-between items-center">
        <Components.Label 
          title='Visualização do dados das cobranças' 
          subtitle='detalhamento do arquivo' 
          htmlFor='Visualizacão arquivo .csv'
        />
      </div>

      <Components.TableData 
        charges={listChargesApi} 
        handlePaginated={handleFetchMoreCharges} 
        loading={loading}
      />
    </div>
  );
};

export { Details };
