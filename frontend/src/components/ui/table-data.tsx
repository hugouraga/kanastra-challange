import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginatedResponseCharges } from '@/interface/api';
import { useEnterKey } from '@/utils/useEnterKey';
import { format } from "date-fns";
import { LoadingFullScreen } from './loading-full-screen';

interface Props {
  handlePaginated: (page: number) => void;
  charges: PaginatedResponseCharges;
  loading: boolean;
}

const TableData: React.FC<Props> = ({ charges, handlePaginated, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCharges, setAllCharges] = useState<any[]>([]);
  const [totalInternalPages, setTotalInternalPages] = useState<number>(1);

  const itemsPerPage = 10;

  useEffect(() => {
    if (charges.data && charges.data.length > 0) {
      setAllCharges(prevCharges => [...prevCharges, ...charges.data]);
      setTotalInternalPages(Math.ceil(charges.to / itemsPerPage));
    }
  }, [charges.data, charges.to, charges.total]);
  
  const handleSearch = () => {
    console.log('search');
  };
   
  useEnterKey(handleSearch);

  const handlePaginatedInternal = (index: number) => {
    setCurrentPage(index);
    if(index >= totalInternalPages - 5 && !loading) handlePaginated(charges.current_page + 1)
  }

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allCharges.slice(startIndex, endIndex).map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.user_name}</TableCell>
        <TableCell>{item.government_id}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{Number(item.amount).toLocaleString('pt-br', {
          currency: 'BRL',
          style: 'currency'
        })}</TableCell>
        <TableCell>{format(new Date(item.due_date), 'dd/MM/yyyy')}</TableCell>
        <TableCell>{item.id}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="relative">

      {((loading && totalInternalPages === currentPage) || (loading && currentPage == 1)) && (
        <LoadingFullScreen />
      )}

      <div className={`${loading && totalInternalPages === currentPage ? 'opacity-50' : ''}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Número do documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data do pgto.</TableHead>
              <TableHead>Identificador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderTableRows()}
          </TableBody>
        </Table>

        <div className='flex justify-end mt-5'>
          <button 
            className='flex justify-center items-center font-medium text-sm text-zinc-800 rounded-l-lg border border-zinc-300 px-4 py-1 bg-white' 
            onClick={() => handlePaginatedInternal(currentPage - 1)} 
            disabled={totalInternalPages === currentPage || currentPage === 1}
          >
            <ChevronLeft className="mr-1 w-5 text-zinc-600" />
            Anterior
          </button>
          <span className='font-medium text-sm border-zinc-300 border-t border-b px-4 py-2 bg-neutral-200'>
            {currentPage} de {charges.total}
          </span>
          <button 
            className='flex justify-center items-center font-medium text-sm text-zinc-800 rounded-r-lg border border-zinc-300 px-4 py-1 bg-white' 
            onClick={() => handlePaginatedInternal(currentPage + 1)} 
            disabled={totalInternalPages === currentPage || currentPage === totalInternalPages}
          >
            Avançar
            <ChevronRight className="ml-1 w-5 text-zinc-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { TableData };
