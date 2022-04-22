<?php

use App\Models\User;
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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            // Crea una columna de llave foránea para el modelo especificado (User)
            $table->foreignIdFor(User::class, 'user_id');
            $table->string('title', 1000);
            // Un slug es una parte de una URL que identifica una página en particular
            // en una página de manera legible para los usuarios.
            $table->string('slug', 1000);
            $table->tinyInteger('status');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->timestamp('expire_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('surveys');
    }
};
