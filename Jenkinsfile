pipeline {
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    stages {
        stage("Build") {
            steps {
                sh "docker compose build"
            }
        }
        stage("Deliver") {
            steps {
                sh "docker compose up -d"
            }
        }
    }
}