<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Archive;
use App\Models\Charge;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;



class FileService
{
    public function uploadCSV($uploadedFile, $hasFile)
    {
        if ($uploadedFile && $uploadedFile->isValid()) {
            $filename = $uploadedFile->getClientOriginalName();
            $filePath = storage_path('app/uploads/' . $filename);
    
            $inputStream = fopen($uploadedFile->getRealPath(), 'r');
            if (!$inputStream)
                throw new \Exception('Não foi possível abrir o arquivo para leitura.');
            
            $outputStream = fopen($filePath, 'w');
            if (!$outputStream) {
                fclose($inputStream);
                throw new \Exception('Não foi possível abrir o arquivo para escrita.');
            }

            stream_copy_to_stream($inputStream, $outputStream);
    
            fclose($inputStream);
            fclose($outputStream);
            $this->storeDataInDatabase($filePath, $filename);
    
            return $filePath;
        } else {
            throw new \Exception('Nenhum arquivo enviado ou arquivo inválido.');
        }
    }

    public function getFileList($perPage, $id = null) {
        $archive = Archive::orderBy('created_at', 'DESC');
        if(isset($id)) {
            $archive = $archive->where('id', $id);
        }
        return $archive
            ->paginate($perPage);
    }

    public function getFileDetails($perPage, $idFile) {
        $charge = Charge::where('id_file', $idFile)->orderBy('created_at', 'DESC')
            ->paginate($perPage);

        return $charge;
    }

    private function storeDataInDatabase($filePath, $filename)
    {
        $batchSize = 2000;
        $headerSkipped = false;
        $chargesCount = 0;
        $amountTotal = 0.0;
        $batch = [];
    
        if (($handle = fopen($filePath, 'r')) !== false) {
            try {
                DB::beginTransaction();
                $fileModel = Archive::create([
                    'file_name' => $filename,
                    'size' => filesize($filePath),
                    'charges_count' => 0,
                    'amount_total' => 0.0,
                ]);
        
                $chargesCount = 0;
                $amountTotal = 0.0;
                $batch = [];
                $batchSize = 1000; 
                $headerSkipped = false;
        
                while (($data = fgetcsv($handle, 1000, ",")) !== false) {
                    if (!$headerSkipped && $data[0] === 'name' && $data[1] === 'governmentId' && $data[2] === 'email') {
                        $headerSkipped = true;
                        continue;
                    }

                    $batch[] = [
                        'id_file' => $fileModel->id,
                        'user_name' => $data[0],
                        'government_id' => $data[1],
                        'email' => $data[2],
                        'amount' => $data[3],
                        'due_date' => $data[4],
                        'debt_id' => $data[5],
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ];
                    $amountTotal += $data[3];
                    $chargesCount++;
                    if (count($batch) >= $batchSize) {
                        Charge::insert($batch);
                        $batch = [];
                    }
                }
                    
                if (!empty($batch)) Charge::insert($batch);
        
                $fileModel->charges_count = $chargesCount;
                $fileModel->amount_total = $amountTotal;
                $fileModel->save();
                fclose($handle);

                DB::commit();
        
            } catch (\Throwable $th) {
                if (isset($handle)) {
                    fclose($handle);
                }
                DB::rollback();
                throw new \Exception('Não foi possível salvar os dados: ' . $th->getMessage());
            }
        } else {
            throw new \Exception('Não foi possível abrir o arquivo CSV para leitura.');
        }
    }
}
