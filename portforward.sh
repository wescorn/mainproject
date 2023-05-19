#!/bin/bash

echo "Port Forwarding grafana: http://localhost:3100/"
kubectl port-forward service/grafana 3100:3100 &
PF1_PID=$!

echo "Port Forwarding mysqldb: http://localhost:3306/"
kubectl port-forward service/mysqldb 3306:3306 &
PF2_PID=$!

echo "Port Forwarding orders: http://localhost:8080/"
kubectl port-forward service/orders 8080:80 &
PF3_PID=$!

echo "Port Forwarding prometheus: http://localhost:9090/"
kubectl port-forward service/prometheus 9090:9090 &
PF4_PID=$!

echo "Port Forwarding rabbitmq(web ui): http://localhost:15672/"
kubectl port-forward service/rabbitmq 15672:15672 &
PF5_PID=$!

echo "Port Forwarding seq: http://localhost:5341/"
kubectl port-forward service/seq 5341:5341 &
PF6_PID=$!

echo "Port Forwarding versiontwo (nginx actually): http://localhost:8000/"
kubectl port-forward service/versiontwo-nginx-service 8000:80 &
PF7_PID=$!

echo "Port Forwarding zipkin: http://localhost:9411/"
kubectl port-forward service/zipkin 9411:9411 &
PF8_PID=$!

# Wait for user input to stop the port forwarding
read -p "Press any key to stop port forwarding..."

# Terminate the port forwarding processes
kill $PF1_PID
kill $PF2_PID
kill $PF3_PID
kill $PF4_PID
kill $PF5_PID
kill $PF6_PID
kill $PF7_PID
kill $PF8_PID
