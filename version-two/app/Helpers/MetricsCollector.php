<?php

namespace App\Helpers;

use Arquivei\LaravelPrometheusExporter\CollectorInterface;
use Arquivei\LaravelPrometheusExporter\PrometheusExporter;

class MetricsCollector implements CollectorInterface
{
    private $defaultRegistry;
    public function __construct()
    {
        
    }

    public function getName(): string
    {
        return 'metrics_collector';
    }

    public function registerMetrics(PrometheusExporter $exporter): void
    {
        $exporter->registerGauge('example', 'duration_seconds', ['controller', 'action']);
        $exporter->registerHistogram('example', 'request_duration_seconds', ['route'], [0.1, 0.5, 1, 2, 5]);
    }

    public function collect(): void
    {
        // Increment gauge with labels
        $labels = ['controller' => 'OrderController', 'action' => 'pdf'];
        $this->getGauge('duration_seconds')->incBy(1, $labels);

        // Observe histogram with labels
        $route = 'orders.pdf';
        $this->getHistogram('request_duration_seconds')->observe(1, ['route' => $route]);
    }

    protected function getGauge(string $name): \Prometheus\Gauge
    {
        return $this->defaultRegistry->getOrRegisterGauge($this->getName(), $name, 'The duration something took in seconds.', ['controller', 'action']);
    }

    protected function getHistogram(string $name): \Prometheus\Histogram
    {
        return $this->defaultRegistry->getOrRegisterHistogram($this->getName(), $name, 'The duration of HTTP requests in seconds.', ['route'], [0.1, 0.5, 1, 2, 5]);
    }
}
