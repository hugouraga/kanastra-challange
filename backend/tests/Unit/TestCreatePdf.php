<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\BankSlipService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;

class BankSlipServiceTest extends TestCase
{
    public function testCreatePdf()
    {
        $charge = (object)[
            'debt_id' => 123,
            'amount' => 500.75,
            'due_date' => '2024-12-31'
        ];

        $pdf = Pdf::shouldReceive('loadView')
            ->once()
            ->with('pdf', [
                'debt_id' => 123, 
                'amount' => 500.75,
                'dueDate' => '2024-12-31'
            ])
            ->andReturnSelf()
            ->shouldReceive('setPaper')
            ->once()
            ->with('a4', 'portrait')
            ->andReturnSelf();

        $this->assertInstanceOf(Pdf::class, $pdf);
    }
}
