import { UseFileContext, FileActionType } from "@/contexts/file"; // Atualize o caminho conforme necessário
import { ErrorActionType, UseErrorContext } from "@/contexts/error";
import { checkColumnsFile } from "@/utils/csvCheckColumns";
import { csvToString } from "@/utils/csvToString";
import { csvToArray } from "@/utils/csvToArray";
import { useRef, useState } from "react";
import { FileInfo } from "@/components/ui/file/file-info";
import { FileSelect } from "@/components/ui/file/file-select";
import { MotionAnimation } from "../motion-animation";
import { LoadingFullScreen } from "../loading-full-screen";

const FileUploader: React.FC = () => {
  const { state, dispatch } = UseFileContext();
  const { dispatchError } = UseErrorContext();
  const [fileError, setFileError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true); 
    dispatchError({ type: ErrorActionType.CLEAR_ERROR })
    dispatch({ type: FileActionType.CLEAR_FILE })

    try {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.name.endsWith(".csv")) {
        setFileError("Formato de arquivo inválido. Por favor, selecione um arquivo CSV.");
        setLoading(false)
        return;
      } 
      setFileError("");
      const fileCsvToString = await csvToString(file);
      await checkColumnsFile(fileCsvToString);
      const fileCsvToArray = await csvToArray(fileCsvToString); 
      dispatch({ type: FileActionType.SET_FILE_UPLOAD, payload: { fileUpload: file } });
      dispatch({ type: FileActionType.SET_FILE_PREVIEW, payload: { filePreview: fileCsvToArray } });
    } catch (error: any) {
      dispatchError({
        type: ErrorActionType.SET_ERROR, payload: {
          errorMessage: {
            title: 'Não possível realizar o upload do arquivo enviado.',
            message: error.message
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const clearInput = async () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setFileError("");
  };

  const handleDragOver = async (event: React.DragEvent<HTMLDivElement>) => {
    await clearInput();
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await handleUploadFile({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <div
        className="flex flex-col gap-6 rounded-lg hover:bg-slate-200 duration-300"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file"
          className="group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center shadow-sm"
        >
          {!state.fileUpload ? (
            <MotionAnimation motionKey={"select-file"}>
              <FileSelect fileError={fileError} />
            </MotionAnimation>
          ) : (
            <MotionAnimation motionKey={"select-info"}>
              <FileInfo />
            </MotionAnimation>
          )}

          {loading && (
            <LoadingFullScreen />
          )}
        </label>

        <input
          ref={inputFileRef}
          className="sr-only"
          id="file"
          type="file"
          accept=".csv"
          onChange={handleUploadFile}
        />
      </div>
    </>
  );
};

export { FileUploader };
