<?php

declare(strict_types=1);

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
        Schema::create('events', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('schedule_id')
                ->constrained('schedules')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->json('name');
            $table->json('description')->nullable();
            $table->string('slug', 255);
            $table->char('color', 7)->nullable();
            $table->integer('duration')->nullable();
            $table->tinyInteger('is_active')->default(1);
            $table->tinyInteger('show_in_profile')->default(1);
            $table->json('settings')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique('slug', 'user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
};
