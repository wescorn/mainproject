pipeline {
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    stages {
        stage("build") {
            steps {
                echo 'Building application'
                sh 'cp .env.example .env'
                sh 'composer install'
                sh 'php artisan key:generate'
            }
        }
        stage("test") {
            steps {
                sh './vendor/bin/phpunit'
            }
        }
        stage("deliver") {
            steps {
                echo 'delivering application'
            }
        }
    }
}