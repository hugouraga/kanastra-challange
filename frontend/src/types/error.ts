import { CSVRow } from "@/utils/csvToArray";
import { ReactNode } from "react";

enum ErrorActionType {}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type ErrorContextState = {
  uploadPercentage: number;
  errorLoadingError: string;
  filePreview: CSVRow[];
  file: Error | null;
  fileList: Error[]; // & {} You can add more information about the
};

type ErrorAction = ReducerAction<ErrorActionType, Partial<ErrorContextState>>;

type ErrorDispatch = ({ type, payload }: ErrorAction) => void;

type ErrorContextType = {
  state: ErrorContextState;
  dispatch: ErrorDispatch;
};

type ErrorProviderProps = { children: ReactNode };

export type {
  ErrorActionType,
  ErrorContextState,
  ErrorAction,
  ErrorDispatch,
  ErrorContextType,
  ErrorProviderProps,
};
