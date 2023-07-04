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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->enum('Contract_Type',['New ','Waranty']);
            $table->string('jobsnumber');
            $table->string('device');
            $table->string('serialnumber');
            $table->text('accesories');
            $table->text('faultdescription');
           
            $table->enum('status',['In ShoppingCart','Sended To Repair','Recieved in Repair ','Repaired','Sended to Costumer ','Costumer collected']);
            $table->enum('warantysiegel',['Die Sind vorhanden und festbekleppt','Die sind entfernt oder beschädigt'])->default('Die sind entfernt oder beschädigt');
            $table->enum('casestatus',['Case oder Gehäuse hat ein Bruch oder schaden','Case ist in einem  guten Zustand'])->default('Case oder Gehäuse hat ein Bruch oder schaden');
            $table->enum('waterdamage',['Die Konsole hat  Wasserschaden oder andere Flüssigkeitschaden','Nein, kein Wasserschaden oder Flüssigkeitschaden'])->default('Nein, kein Wasserschaden oder Flüssigkeitschaden');
            $table->enum('earlierrepair',['Nein, nicht geöffnet oder bearbeitet','Die Konsole oder Gerät wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert','Die Konsole oder Gerät wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg'])
            ->default('Nein, nicht geöffnet oder bearbeitet');
            $table->unsignedBigInteger('user_id');
          
            $table->unsignedBigInteger('payment_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        
            $table->foreign('payment_id')
                ->references('id')
                ->on('payments')
                ->onDelete('cascade');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contracts');
    }
};
