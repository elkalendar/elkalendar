<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_intervals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('schedule_id');
            $table->string('day');
            $table->char('from', 5);
            $table->char('to', 5);
            $table->timestamps();

            $table->foreign('schedule_id')
                ->references('id')
                ->on('schedules')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->index('day');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_intervals');
    }
};
