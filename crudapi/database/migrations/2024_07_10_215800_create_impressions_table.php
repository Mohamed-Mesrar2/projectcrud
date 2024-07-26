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
        Schema::create('impressions', function (Blueprint $table) {
            $table->date('Date');
            $table->string('Shift');
            $table->string('Client');
            $table->string('N_OF');
            $table->string('Designation');
            $table->string('Famille');
            $table->string('MATRUCULE');
            $table->integer('Nombre_piste'); 
            $table->string('MACHINE'); 
            $table->integer('QTE');
            $table->integer('METRAGE');
            

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('impressions');
 
    }
};
