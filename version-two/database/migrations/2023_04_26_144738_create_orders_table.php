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
        if (!Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->id();
            });
        }
        if (!Schema::hasTable('order_lines')) {
            Schema::create('order_lines', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('order_id');
                $table->bigInteger('product_id');
                $table->integer('quantity');
                $table->foreign('order_id')->references('id')->on('orders');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('order_lines')) {
            Schema::dropIfExists('order_lines');
        }
        if (Schema::hasTable('orders')) {
            Schema::dropIfExists('orders');
        }
    }
};
