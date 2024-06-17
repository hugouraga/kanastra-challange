import { render, screen, fireEvent } from '@testing-library/react';
import { TableData } from '../../components/ui/table-data';
import { PaginatedResponseCharges } from '@/interface/api';
import { useEnterKey } from '@/utils/useEnterKey';

// Mock do useEnterKey para evitar efeitos colaterais nos testes
vi.mock('@/utils/useEnterKey', () => ({
  useEnterKey: vi.fn(),
}));

describe('TableData component - Unit test', () => {
  const date = String(new Date('2024-06-13'));
  const mockCharges: PaginatedResponseCharges = {
    current_page: 1,
    last_page: 3,
    data: [
      {
        id: 1,
        user_name: 'Hugo Uraga',
        government_id: '1182278408',
        email: 'hugouraga@kanastra.com',
        amount: "1150",
        due_date: date,
        id_file: '1',
        debt_id: '1',
        invoice_generated_at: null,
        invoice_dispatched_sent: null,
        created_at: null,
        updated_at: null,
        deleted_at: null
      }
    ],
    first_page_url: '',
    from: 0,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0
  };

  const handlePaginatedMock = vi.fn();
  const loadingMock = false;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with data correctly', () => {
    const { getByText } = render(
      <TableData charges={mockCharges} handlePaginated={handlePaginatedMock} loading={loadingMock} />
    );
    const userNameCell = getByText('Hugo Uraga');
    expect(userNameCell).toBeTruthy();
    const emailCell = getByText('hugouraga@kanastra.com');
    expect(emailCell).toBeTruthy();
  });

  it('handles search input correctly', () => {
    render(
      <TableData charges={mockCharges} handlePaginated={handlePaginatedMock} loading={loadingMock} />
    );

    const searchInput = screen.getByLabelText('Buscar') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Hugo Uraga' } });
    expect(searchInput.value).toBe('Hugo Uraga');
  });

  it('handles date input correctly', () => {
    render(
      <TableData charges={mockCharges} handlePaginated={handlePaginatedMock} loading={loadingMock} />
    );
    const dateInput = screen.getByLabelText('Data do pagamento') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2024-06-12' } });
    expect(dateInput.value).toBe('2024-06-12');
  });

  it('executes search on Enter key press', () => {
    render(
      <TableData charges={mockCharges} handlePaginated={handlePaginatedMock} loading={loadingMock} />
    );
    fireEvent.keyPress(screen.getByLabelText('Buscar'), { key: 'Enter', code: 'Enter' });
    expect(useEnterKey).toHaveBeenCalledWith(expect.any(Function));
  });
});
