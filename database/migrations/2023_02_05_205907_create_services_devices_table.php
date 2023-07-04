<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services_devices', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('device_id');
           $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
           $table->foreign('device_id')->references('id')->on('devices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('services_devices');
    }
};
