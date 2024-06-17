import { UseErrorContext } from "@/contexts/error";
import { UseFileContext } from "@/contexts/file";
import { FileCheck } from "lucide-react";

const FileInfo: React.FC = () => {
  const { state } = UseFileContext();
  const { stateError } = UseErrorContext();
  const bytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  return (
    <>
      <span className="mb-1">Detalhes do arquivo</span>
      {stateError.isError ? (
        <div className="flex justify-center">
          <div className="rounded-full border-4 border-red-200 bg-red-100 p-2 duration-300 group-hover:border-red-300">
            <FileCheck className=" text-zinc-600" color="rgb(202 107 128)" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="rounded-full border-4 border-green-300 bg-green-100 p-2 duration-300 group-hover:border-green-400">
            <FileCheck className=" text-zinc-600" color="rgb(74 222 128)" />
          </div>
        </div>
      )}
      
      <ul className="text-sm">
        <li>
          <span className="font-semibold text-slate-900">Nome: </span> {state.fileUpload?.name}
        </li>
        <li>
          <span className="font-semibold text-slate-900">Tipo: </span> {state.fileUpload?.type}
        </li>
        <li>
          <span className="font-semibold text-slate-900">Tamanho: </span>{" "}
          {bytesToMB(state.fileUpload?.size ?? 0 )} MB
        </li>
      </ul>
    </>
  );
}

export { FileInfo };