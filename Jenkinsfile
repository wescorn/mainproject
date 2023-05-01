pipeline {
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    stages {
        stage("build") {
            steps {
                echo 'Building application'
                sh 'docker compose build'
                //sh 'composer install'
                //sh 'php artisan key:generate'
            }
        }
        stage("test") {
            steps {
                //sh './vendor/bin/phpunit'
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