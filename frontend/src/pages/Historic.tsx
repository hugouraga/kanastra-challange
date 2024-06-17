/* eslint-disable react-hooks/exhaustive-deps */
import { Search, ArrowDown } from 'lucide-react';
import * as Components from '../components'
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { api } from '@/service/api';
import { Link } from 'react-router-dom';
import people from '@/imagens/peoples.svg';
import { PaginatedResponseFilesOrNull } from '@/interface/api';
import { useDebounce } from '@/hooks/debounce';

const Historic = () => {

  const [search, setSearch] = useState("");
  const [responseListHistoric, setResponseListHistoric] = useState<PaginatedResponseFilesOrNull>(null)
  const [pageIndex, setPageIndex] = useState(0);
  
  const debouncedSearch = useDebounce(search, 500); // avoid unnecessary rendering
  
  const [parent] = useAutoAnimate({
    duration: 500,
    easing: 'ease-in-out'
  })

  const handleFetchMoreFiles = async () => {
    try {
      const responseFileListApi = await api.get(`/file/list?&page=${pageIndex}&per_page=3`)
      const newResponseData = responseFileListApi.data.response;

      setResponseListHistoric(prevResponse => {
        if (prevResponse) {
          const filteredNewData = newResponseData.data.filter((newItem: { id: string; }) => (
            !prevResponse.data.some(prevItem => prevItem.id === newItem.id)
          ));
      
          return {
            ...prevResponse,
            current_page: newResponseData.current_page,
            data: [...prevResponse.data, ...filteredNewData],
            first_page_url: newResponseData.first_page_url,
            from: newResponseData.from,
            last_page: newResponseData.last_page,
            last_page_url: newResponseData.last_page_url,
            links: newResponseData.links,
            next_page_url: newResponseData.next_page_url,
            path: newResponseData.path,
            per_page: newResponseData.per_page,
            prev_page_url: newResponseData.prev_page_url,
            to: newResponseData.to,
            total: newResponseData.total,
          };
        } else {
          return newResponseData;
        }
      });
      setPageIndex(prevValue => prevValue + 1);
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetchMoreFiles();
  }, []);

  return (
    <>
      <Components.Label
        title="Histórico dos Lançamentos Financeiros Importados"
        subtitle="Acesse o histórico completo dos lançamentos financeiros importados."
        htmlFor='Histórico lançamentos' 
      />

      {((responseListHistoric && responseListHistoric?.data.length === 0) || (!responseListHistoric?.data)) ? (
        <div className="flex flex-col items-center text-center">
          <Components.MotionAnimation motionKey={"new-register"}>
            <>
              <img
                className="icon"
                src={people}
                alt="Pessoas Imagem"
                width={600}
                height={300}
              />

              <Components.Label
                title="Realize seus Lançamentos Financeiros Aqui"
                subtitle="Clique no botão abaixo para iniciar um novo lançamento financeiro."
                htmlFor='Novo lançamento' 
              />

              <Link to={'/'} className='rounded-lg px-6 py-3 text-md font-semibold outline-none shadow-sm bg-green-900 text-white'>
                Realizar lançamento +
              </Link>
            </>
          </Components.MotionAnimation>         
       </div>
      ) : (
        <>
          <Components.MotionAnimation motionKey={"search"}>
            <>
              <div className="w-96 mt-8 mb-5">
                <Components.Input 
                  type="text"
                  id="search-input"
                  label="Último lançamentos"
                  icon={Search}
                  placeholder="Buscar por lançamentos"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>   
              <div ref={parent}>
                {responseListHistoric?.data && responseListHistoric.data.length > 0 ? (
                  responseListHistoric.data
                    .filter(item => debouncedSearch === '' || (item.file_name && item.file_name.toLowerCase().includes(debouncedSearch.toLowerCase())))
                    .map(item => (
                      <Components.ItemCard 
                        key={item.id + 'kanastra'}
                        data={{
                          id: item.id,
                          amount_final: Number(item.amount_total), 
                          created_at: new Date(item.created_at), 
                          description: item.file_name, 
                          size: item.size
                        }} 
                      />
                    ))
                ) : (
                  <p>Nenhum item encontrado.</p>
                )}
              </div>
            </>
          </Components.MotionAnimation>      

          <Components.MotionAnimation ease={[]} motionKey={'historic'}>
            {(responseListHistoric && (responseListHistoric?.total === responseListHistoric?.to)) ? (
              <div className="mt-16">
                <p className="text-center font-medium text-gray-600">Todos os lançamentos foram carregados.</p>
              </div>
            ): (
              <button
                className="w-full mt-12 flex gap-2 items-center justify-center text-blue-700 font-bold bg-transparent transition-all duration-300 ease-in-out rounded-lg p-4"
                onClick={() => handleFetchMoreFiles()}
              >
                Carregar mais lançamentos
                <ArrowDown size={20} className="text-primaryPure" />
              </button>
            )}
          </Components.MotionAnimation>     
        </>
      )}
    </>
  );
}
export { Historic };