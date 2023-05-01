pipeline {
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    stages {
        stage("build") {
            steps {
                echo 'Building application'
                sh 'composer install'
                sh 'cp .env.example .env'
                sh 'php artisan key:generate'
            }
        }
        stage("test") {
            steps {
                echo 'testing application'
            }
        }
        stage("deliver") {
            steps {
                echo 'delivering application'
            }
        }
    }
}