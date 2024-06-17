<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Mail\Attachments\Attachment;

class SendBankSlip extends Mailable
{
    use Queueable, SerializesModels;
    private $name;
    private $pdfPath;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $pdfPath)
    {
        $this->name = $name;
        $this->pdfPath = $pdfPath;
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Envio do boleto',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {   
        return new Content(
            view: 'email.bankSlip',
            with: ['name' => $this->name ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            // Attachment::fromData(storage_path('app/' . $this->pdfPath))
            //     ->as('Boleto.pdf')
            //     ->withMime('application/pdf')
        ];
    }
}