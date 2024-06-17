import { render, fireEvent } from '@testing-library/react';
import { TableImportPreview } from '../../components/ui/table-import-preview';
import { CSVRow } from '@/utils/csvToArray';

describe('TableImportPreview component - Unit test', () => {
  const mockData: CSVRow[] = [
    {
      name: 'Hugo Uraga',
      documentNumber: '123456789',
      Email: 'hugouraga@kanastra.com',
      Valor: '100.5',
      date: String(new Date('2023-06-01')),
      id: String(1),
    }
  ];

  it('renders table with data correctly', () => {
    const { getByText } = render(<TableImportPreview data={mockData} />);
    const nomeCell = getByText('Hugo Uraga');
    expect(nomeCell).toBeTruthy();
    const documentoCell = getByText('123456789');
    expect(documentoCell).toBeTruthy();
    const emailCell = getByText('hugouraga@kanastra.com');
    expect(emailCell).toBeTruthy();
    const valorCell = getByText('R$ 100,50');
    expect(valorCell).toBeTruthy();
  });

  it('handles pagination correctly', () => {
    const { getByText, queryByText, getByRole } = render(<TableImportPreview data={mockData} itemsPerPage={1} />);
    expect(getByText('Hugo Uraga')).toBeTruthy();
    expect(queryByText('Jane Smith')).not.toBeTruthy();
    const nextButton = getByRole('button', { name: /Avançar/i });
    fireEvent.click(nextButton);
    expect(queryByText('Hugo Uraga')).not.toBeTruthy();
  });

  it('displays message when no items are loaded', () => {
    const {getByText} =  render(<TableImportPreview data={[]} />);
    const messageElement = getByText('Não existem itens carregados');
    expect(messageElement).toBeTruthy();
  });
});