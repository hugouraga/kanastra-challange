<?php

namespace Tests\Unit;

use Mockery;
use Tests\TestCase;
use App\Services\FileService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use App\Models\Archive;
use App\Models\Charge;

class FileServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        Cache::shouldReceive('remember')
            ->andReturnUsing(function ($key, $minutes, $callback) {
                return $callback();
            });
        DB::shouldReceive('beginTransaction')->andReturn(true);
        DB::shouldReceive('commit')->andReturn(true);
        DB::shouldReceive('rollback')->andReturn(true);
    }

    public function testUploadCSVWithValidFile()
    {
        $uploadedFile = UploadedFile::fake()->create('test.csv');
        Storage::disk('local')->makeDirectory('uploads');
        $fileService = new FileService();
        $filePath = $fileService->uploadCSV($uploadedFile, true);
        $this->assertNotNull($filePath);
        Storage::disk('local')->delete($filePath);
    }

    public function testUploadCSVWithInvalidFile()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Nenhum arquivo enviado ou arquivo inválido.');
        $fileService = new FileService();
        $fileService->uploadCSV(null, false);
    }

    public function testGetFileList()
    {
        $archive = Archive::factory()->create([
            'file_name' => 'Huho Uraga kanastra',
            'size' => 226500,
            'charges_count' => 105,
            'amount_total' => 350501,
        ]);

        Charge::factory()->create([
            'id_file' => $archive->id,
            'user_name' => 'Huho Uraga',
            'government_id' => '1182275601890',
            'email' => 'hugouraga@kanastra.com',
            'amount' => 50501,
            'due_date' => '2024-06-12',
            'debt_id' => '561541541',
            'created_at' => Carbon::parse('2024-06-10')->subDays(2),
            'updated_at' => Carbon::parse('2024-06-10')->subDays(2)
        ]);

        Charge::factory()->create([
            'id_file' => $archive->id,
            'user_name' => 'Huho Uraga 2',
            'government_id' => '1182275601890',
            'email' => 'hugouraga@kanastra.com',
            'amount' => 90501,
            'due_date' => '2024-06-16',
            'debt_id' => '561541541',
            'created_at' => Carbon::parse('2024-06-10')->subDays(3),
            'updated_at' => Carbon::parse('2024-06-10')->subDays(3)
        ]);

        $fileService = new FileService();
        $chargeList = $fileService->getFileDetails(2, $archive->id);

        $this->assertCount(2, $chargeList);
    }

}
