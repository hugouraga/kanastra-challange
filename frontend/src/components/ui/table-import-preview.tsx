import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react";
import { CSVRow } from '@/utils/csvToArray';
import { useEnterKey } from '@/utils/useEnterKey';
import { Button } from './button';
import ItemsMessage from './items-message';
import { format } from "date-fns";
import { Input } from './input';

interface Props {
  data: CSVRow[];
  itemsPerPage?: number;
}

const TableImportPreview: React.FC<Props> = ({ data, itemsPerPage = 10}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<CSVRow[]>(data);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    const term = searchInputRef.current?.value || '';
    const date = dateInputRef.current?.value || '';
    const filtered = data.filter(item => {
      const matchesSearchTerm = Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(term.toLowerCase())
      );

      const matchesSearchDate = Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(date.toLowerCase())
      );

      return matchesSearchTerm && matchesSearchDate;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEnterKey(handleSearch);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const TOTAL_ITEMS = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <div className="grid sm:grid-cols-1 md:grid-cols-12 gap-4 mb-10">
          <div className="col-span-4">
            <Input 
               type="text"
               id="search-input"
               label="Buscar"
               icon={Search}
               placeholder="Buscar"
               inputRef={searchInputRef}
            />
          </div>
          <div className="col-span-4">
            <Input 
                type="date"
                id="date-input"
                label="Data do pagamento"
                icon={Calendar}
                placeholder="Buscar"
                inputRef={dateInputRef}
             />
          </div>

          <div className="flex col-span-4 justify-end items-end">
              <Button variant='outline' disabled={data.length === 0} onClick={handleSearch}>
                Pesquisar
              </Button>
          </div>
        </div>

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
            {currentItems.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, idx) => {
                  if(idx === 3) value = Number(value).toLocaleString('pt-br', {
                    currency: 'BRL',
                    style: 'currency'
                  })

                  if(idx == 4) value = format(value, 'dd/MM/yyyy')

                  return (
                    <TableCell key={idx}>{value}</TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

            

        {data.length > 0 ? (
          <div className='flex justify-end mt-5'>
            <button className='flex justify-center items-center font-medium text-sm text-zinc-800 rounded-l-lg border border-zinc-300 px-4 py-1 bg-white' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="mr-1 w-5 text-zinc-600" />
              Anterior
            </button>
            <span className='font-medium text-sm border-zinc-300 border-t border-b px-4 py-2 bg-neutral-200'>{currentPage} de {TOTAL_ITEMS}</span>
            <button className='flex justify-center items-center font-medium text-sm text-zinc-800 rounded-r-lg border border-zinc-300 px-4 py-1 bg-white' onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage}>
              Avançar
              <ChevronRight className="ml-1 w-5 text-zinc-600" />
            </button>
          </div>
        ) : (
          <ItemsMessage 
            message='Não existem itens carregados' 
            subMessage='Realize o upload do arquivo CSV para realizar a operação' 
          />
        )}
      </div>
    </>
  );
};

export { TableImportPreview };
