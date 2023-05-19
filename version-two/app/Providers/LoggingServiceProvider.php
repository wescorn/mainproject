<?php

namespace App\Providers;
use Illuminate\Support\ServiceProvider;



class LoggingServiceProvider extends ServiceProvider
{

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->make('config')->set('logging.channels.seq', [
            'driver' => 'monolog',
            'handler' => \Monolog\Handler\GelfHandler::class,
            'formatter' => \App\Logging\CustomGelfMessageFormatter::class,
            'level' => 'debug',
            'handler_with' => [
                'publisher' => new \Gelf\Publisher(new \Gelf\Transport\UdpTransport(env('SEQ_GELF_HOST', 'seq-input-gelf'), env('SEQ_GELF_PORT', '12201'))),
                'formatter' => new \App\Logging\CustomGelfMessageFormatter(config('app.name')),
            ]
        ]);
    }


}
