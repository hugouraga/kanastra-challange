import { PaginatedResponseCharges, PaginatedResponseFiles } from "@/interface/api";
import { CSVRow } from "@/utils/csvToArray";
import { ReactNode, createContext, useContext, useReducer } from "react";

enum FileActionType {
  SET_START_UPLOADING = "SET_START_UPLOADING",
  SET_STOP_UPLOADING = "SET_STOP_UPLOADING",
  SET_SUCCESS_UPLOADING = "SET_SUCCESS_UPLOADING",
  CLEAR_RESPONSE_UPLOADING = "CLEAR_RESPONSE_UPLOADING",
  SET_FILES_LIST = "SET_FILES_LIST",
  SET_CHARGES_LIST = "SET_CHARGES_LIST",
  SET_FILE_UPLOAD = "SET_FILE_UPLOAD",
  SET_FILE_PREVIEW = "SET_FILE_PREVIEW",
  CLEAR_FILE = "CLEAR_FILE",
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  isSuccessUploadNewFile: boolean
  isErrorUploadNewFile: boolean
  errorLoadingFile: string;
  fileUpload: File | null;
  filePreview: CSVRow[] | null;
  file: PaginatedResponseFiles | null;
  fileList: PaginatedResponseFiles[];
  chargeList: PaginatedResponseCharges[]; 
  charge: PaginatedResponseCharges | null;
}

type FileAction = ReducerAction<FileActionType, Partial<FileContextState>>;

type FileDispatch = (action: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export const FileContextInitialValues: FileContextState = {
  isLoading: false,
  isSuccessUploadNewFile: false,
  isErrorUploadNewFile: false,
  fileUpload: null,
  errorLoadingFile: '',
  filePreview: null ,
  charge: {} as PaginatedResponseCharges,
  file: {} as PaginatedResponseFiles,
  fileList: [],
  chargeList: [],
};

const FileContext = createContext<FileContextType | undefined>(undefined);

const FileReducer = (
  state: FileContextState,
  action: FileAction
): FileContextState => {
  switch (action.type) {
    case FileActionType.SET_FILE_UPLOAD: {
      return {
        ...state,
        fileUpload: action.payload?.fileUpload || null,
      };
    }
    case FileActionType.SET_FILE_PREVIEW: {
      return {
        ...state,
        filePreview: action.payload?.filePreview || null,
      };
    }
    case FileActionType.SET_START_UPLOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FileActionType.SET_STOP_UPLOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case FileActionType.SET_SUCCESS_UPLOADING: {
      return {
        ...state,
        fileUpload: null,
        filePreview: [],
        isLoading: false,
        isSuccessUploadNewFile: true,
      };
    }
    case FileActionType.CLEAR_FILE: {
      return {
        ...state,
        fileUpload: null,
        filePreview: [],
        isLoading: false,
      };
    }
    case FileActionType.CLEAR_RESPONSE_UPLOADING: {
      return {
        ...state,
        isErrorUploadNewFile: false,
        isSuccessUploadNewFile: false,
      };
    }
    case FileActionType.SET_FILES_LIST: {
      const file = action.payload?.file;
      if (!file) return state;
    
      const existingFileIndex = state.fileList.findIndex(
        (item) => item.current_page === file.current_page
      );
    
      if (existingFileIndex === -1) {
        return {
          ...state,
          fileList: [...state.fileList, file],
        };
      } else {
        const existingFile = state.fileList[existingFileIndex];
        if (file.current_page > existingFile.current_page) {
          const updatedFile = {
            ...existingFile,
            data: [...existingFile.data, ...file.data],
            current_page: file.current_page,
            next_page_url: file.next_page_url,
            prev_page_url: file.prev_page_url,
            last_page: file.last_page,
            total: file.total,
            to: file.to
          };
    
          const updatedFileList = [
            ...state.fileList.slice(0, existingFileIndex),
            updatedFile,
            ...state.fileList.slice(existingFileIndex + 1),
          ];
    
          return {
            ...state,
            fileList: updatedFileList,
          };
        }
      }

      return state;
    }
    case FileActionType.SET_CHARGES_LIST: {
      const charge = action.payload?.charge;
      if (!charge) return state;
    
      const existingChargeIndex = state.chargeList.findIndex(
        (item) => item.fileId === charge.fileId
      );
    
      if (existingChargeIndex === -1) {
        return {
          ...state,
          chargeList: [...state.chargeList, charge],
        };
      } else {
        const existingCharge = state.chargeList[existingChargeIndex];
        if (charge.current_page > existingCharge.current_page) {
          const updatedCharge = {
            ...existingCharge,
            data: [...existingCharge.data, ...charge.data],
            current_page: charge.current_page,
            next_page_url: charge.next_page_url,
            prev_page_url: charge.prev_page_url,
            last_page: charge.last_page,
            total: charge.total,
            to: charge.to
          };
    
          const updatedChargeList = [
            ...state.chargeList.slice(0, existingChargeIndex),
            updatedCharge,
            ...state.chargeList.slice(existingChargeIndex + 1),
          ];
    
          return {
            ...state,
            chargeList: updatedChargeList,
          };
        }
      }

      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const UseFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

export { FileProvider, UseFileContext, FileActionType };
