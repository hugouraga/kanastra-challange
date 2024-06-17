<?php
 
namespace App\Jobs;
 
use App\Models\Charge;
use App\Services\BankSlipService;
use App\Mail\SendBankSlip;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail; 
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

 
class CreateBankSlips implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct() {
    }
 
    public function handle(): void
    {

        $chargesToGenerateBankSlip = Charge::whereNull('invoice_generated_at')
            ->orWhereNull('invoice_dispatched_sent')
            ->limit(5000)
            ->get();

        if(count($chargesToGenerateBankSlip) > 0){
            foreach ($chargesToGenerateBankSlip as $charge) {
                $bankSlipPdf = BankSlipService::createPdf($charge); 
                if(isset($bankSlipPdf)){
                    $pdfPath = 'bank_slips/' . $charge->id . '.pdf';
                    Storage::put($pdfPath, $bankSlipPdf);

                    Mail::to($charge->email)->queue(new SendBankSlip($charge->user_name, $pdfPath));

                    $charge->invoice_generated_at = Carbon::now();
                    $charge->invoice_dispatched_sent = Carbon::now();
                    $charge->save();
                }
            }
        }
    }
}