import { ReactNode, createContext, useContext, useReducer } from "react";

enum ErrorActionType {
  SET_ERROR = "SET_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR",
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type ErrorContextState = {
  isError: boolean;
  errorMessage: {
    title: string,
    message: string
  };
};

type ErrorAction = ReducerAction<ErrorActionType, Partial<ErrorContextState>>;

type ErrorDispatch = (action: ErrorAction) => void;

type ErrorContextType = {
  stateError: ErrorContextState;
  dispatchError: ErrorDispatch;
};

type ErrorProviderProps = { children: ReactNode };

export const ErrorContextInitialValues: ErrorContextState = {
  isError: false,
  errorMessage: {
    title: '',
    message: ''
  },
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

const ErrorReducer = (
  stateError: ErrorContextState,
  action: ErrorAction
): ErrorContextState => {
  switch (action.type) {
    case ErrorActionType.SET_ERROR: {
      return {
        ...stateError,
        isError: true,
        errorMessage: 
          action.payload?.errorMessage || {
          title: '',
          message: ''
        },
      };
    }
    case ErrorActionType.CLEAR_ERROR: {
      return {
        ...stateError,
        isError: false,
        errorMessage: {
          title: '',
          message: ''
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [stateError, dispatchError] = useReducer(
    ErrorReducer,
    ErrorContextInitialValues
  );

  return (
    <ErrorContext.Provider value={{ stateError, dispatchError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const UseErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};

export { ErrorProvider, UseErrorContext, ErrorActionType };
