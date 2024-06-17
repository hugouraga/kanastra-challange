<?php

namespace App\Services;
use Barryvdh\DomPDF\Facade\Pdf;

/**
 * Class BankSlipService.
 */
class BankSlipService
{
  static public function createPdf($charge){
    $pdf = PDF::loadView('pdf', [
      'debt_id'=> $charge->debt_id, 
      'amount'=> $charge->amount,
      'dueDate' => $charge->due_date,
    ])->setPaper('a4', 'portrait');
    $pdf = $pdf->output();
    
    return $pdf; 
  }
}
