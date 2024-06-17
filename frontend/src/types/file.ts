import {
  PaginatedResponseCharges,
  PaginatedResponseFiles,
} from "@/interface/api";
import { CSVRow } from "@/utils/csvToArray";
import { ReactNode } from "react";

enum FileActionType {
  SET_START_UPLOADING,
  SET_STOP_UPLOADING,
  SET_SUCCESS_UPLOADING,
  CLEAR_RESPONSE_UPLOADING,
  SET_FILES_LIST,
  SET_CHARGES_LIST,
  SET_FILE_UPLOAD,
  SET_FILE_PREVIEW,
  CLEAR_FILE,
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  isSuccessUploadNewFile: boolean;
  isErrorUploadNewFile: boolean;
  errorLoadingFile: string;
  fileUpload: File | null;
  filePreview: CSVRow[] | null;
  file: PaginatedResponseFiles | null;
  fileList: PaginatedResponseFiles[];
  chargeList: PaginatedResponseCharges[];
  charge: PaginatedResponseCharges | null;
};

type FileAction = ReducerAction<FileActionType, Partial<FileContextState>>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export type {
  FileActionType,
  FileContextState,
  FileAction,
  FileDispatch,
  FileContextType,
  FileProviderProps,
};
