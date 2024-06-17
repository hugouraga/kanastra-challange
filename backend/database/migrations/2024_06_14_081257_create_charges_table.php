<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->increments('id');

            $table->uuid('id_file')->nullable();
            $table->foreign('id_file')->references('id')->on('archives')->onDelete('cascade')->onUpdate('cascade');
            
            $table->string('user_name');
            $table->string('government_id');
            $table->string('email');
            $table->decimal('amount', 10, 2);
            $table->date('due_date');
            $table->string('debt_id');

            $table->dateTime('invoice_generated_at')->nullable();
            $table->dateTime('invoice_dispatched_sent')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charges');
    }
};
