<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Services\FileService;
use Illuminate\Support\Facades\Cache;


class FileController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function upload(Request $request)
    {
        try { 
            $uploadFileResponse = $this->fileService->uploadCSV($request->file('file'), $request->hasFile('file'));
            return response()->json(['status' => 'success', 'response' => $uploadFileResponse], 201);
        } catch (\Throwable $th){
            return response(['msg' => 'Não foi possível realizar o upload do arquivo.', 'details' => $th->getMessage(), 'file' => $th->getFile(), 'line' => $th->getLine()], 403);
        }
    }

    public function getFiles(Request $request){
        try { 
            $files = $this->fileService->getFileList($request->per_page);
            return response()->json([
                'status' => 'success', 
                'response' => $files
            ], 200);

        } catch (\Throwable $th){
            return response([
                'msg' => 'Não foi possível carregar os arquivos.',
                'details' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine()
            ], 403);
        }
    }


    function getFileDetails(Request $request)
    {
        try { 
            $charges = $this->fileService->getFileDetails(
                $request->per_page,
                $request->idFile
            );
            return response()->json([
                'status' => 'success', 
                'response' => $charges
            ], 200);

        } catch (\Throwable $th){
            return response([
                'msg' => 'Não foi possível carregar os arquivos.',
                'details' => $th->getMessage(),
                'file' => $th->getFile(),
                'line' => $th->getLine()
            ], 403);
        }
    }
  
}


