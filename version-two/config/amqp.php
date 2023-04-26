<?php
return [

'use' => 'production',

'properties' => [

    'production' => [
        'host'                => 'rabbitmq',
        'port'                => 5672,
        'username'            => 'guest',
        'password'            => 'guest',
        'vhost'               => '/',
        'exchange'            => 'amq.topic',
        'exchange_type'       => 'topic',
        'consumer_tag'        => 'consumer',
        'ssl_options'         => [], // See https://secure.php.net/manual/en/context.ssl.php
        'connect_options'     => [], // See https://github.com/php-amqplib/php-amqplib/blob/master/PhpAmqpLib/Connection/AMQPSSLConnection.php
        'queue_properties'    => ['x-ha-policy' => ['S', 'all']],
        'exchange_properties' => [],
        'timeout'             => 0
    ],

],

];