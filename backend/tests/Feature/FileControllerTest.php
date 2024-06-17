<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\Archive;
use App\Models\Charge;
use Carbon\Carbon;

class FileControllerTest extends TestCase
{
    use RefreshDatabase;
    
    public function testUploadCSV()
    {
        Storage::fake('local');
        $csvContent = "name,governmentId,email,debtAmount,debtDueDate,debtId\n";
        $csvContent .= "John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id\n";
        $csvContent .= "Hugo Uraga Kanastra,11822425117,hugouraga@kanastra.com,2000,2024-06-01,kanastra-id-2";
        $file = UploadedFile::fake()->createWithContent('test.csv', $csvContent);
        $response = $this->postJson('/api/file/upload', [
            'file' => $file,
        ]);
        $response->assertStatus(201);
    }

    public function testUploadCSVWithInvalidFile()
    {
        Storage::fake('local');
        $file = '';

        $response = $this->postJson('/api/file/upload', [
            'file' => $file,
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'details' => 'Nenhum arquivo enviado ou arquivo inválido.',
                'file' => '/Users/hugouraga/Documents/Kanastra/kanastra-challenge-boilerplate/backend/app/Services/FileService.php',
                'line' => 42,
            ]);
    }

    public function testGetFileList()
    {
        Archive::factory()->count(10)->create();

        $perPage = 10;
        $response = $this->getJson('/api/file/list?per_page=' . $perPage);
        $response->assertStatus(200);
        $responseData = $response->json();
        $this->assertEquals('success', $responseData['status']);
        $this->assertCount($perPage, $responseData['response']['data']);
        $this->assertEquals(10, $responseData['response']['total']);
    }

    public function testGetFileDetails()
    {
        $archive = Archive::factory()->create();
        Charge::factory()->count(10)->create(['id_file' => $archive->id]);
        $perPage = 10;
        $response = $this->getJson('/api/file/details/' . $archive->id . '?per_page=' . $perPage);
        $response->assertStatus(200);
        $responseData = $response->json();
        $this->assertEquals('success', $responseData['status']);
        $this->assertCount($perPage, $responseData['response']['data']);
        $this->assertEquals(10, $responseData['response']['total']);
    }
}
