import { UploadCloud } from "lucide-react"

interface FileSelectProps {
  fileError: string
}

const FileSelect: React.FC<FileSelectProps> = ({fileError}) => {
  return (
    <>
      <span>Selecionar arquivo</span>
      <div className="flex justify-center">
        <div className="rounded-full border-6 border-zinc-50 bg-zinc-100 p-2 duration-300 group-hover:border-slate-400 group-hover:bg-slate-300">
          <UploadCloud className="h-5 w-5 text-zinc-600" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-semibold text-slate-900">Clique para fazer upload</span> ou arraste e solte
        </span>
        <span className="text-xs">Arquivo .CSV</span>
        {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
      </div>
    </>
  )
}

export { FileSelect }