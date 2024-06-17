interface FileData {
  description: any;
  id: string;
  file_name: string;
  size: string;
  charges_count: string;
  amount_total: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ChargeData {
  id: number;
  id_file: string;
  user_name: string;
  government_id: string;
  email: string;
  amount: string;
  due_date: string;
  debt_id: string;
  invoice_generated_at: string | null;
  invoice_dispatched_sent: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponseCharges {
  fileId?: string;
  current_page: number;
  data: ChargeData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PageLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PaginatedResponseFiles {
  id?: string;
  current_page: number;
  data: FileData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PageLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type PaginatedResponseFilesOrNull = PaginatedResponseFiles | null;
