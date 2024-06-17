<?php

use App\Jobs\CreateBankSlips;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
 

//Schedules - Queues
Schedule::job(new CreateBankSlips)
    ->everyFiveMinutes();