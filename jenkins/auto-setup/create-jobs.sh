#!/bin/bash

# Wait for the application to start
sleep 30

# Configure Jenkins
JENKINS_URL="http://localhost:9999"
JENKINS_USER="admin"
JENKINS_PASSWORD="admin"
JENKINS_CRUMB=$(curl -s -u "$JENKINS_USER:$JENKINS_PASSWORD" "$JENKINS_URL/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")

# Create Jenkins job for building the application
curl -X POST -u "$JENKINS_USER:$JENKINS_PASSWORD" -H "$JENKINS_CRUMB" "$JENKINS_URL/job/build-versiontwo/createItem?name=build-versiontwo" --data-binary "@./jenkins/job.xml"

# Create Jenkins pipeline for deploying the application
curl -X POST -u "$JENKINS_USER:$JENKINS_PASSWORD" -H "$JENKINS_CRUMB" "$JENKINS_URL/job/deploy-versiontwo/createItem?name=deploy-versiontwo" --data-binary "@./jenkins/pipeline.xml"
