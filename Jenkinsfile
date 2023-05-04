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
                withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login -u $USERNAME -p $PASSWORD'
                    sh "docker compose push orders versiontwo"
                }
            }
        }
        stage("deploy") {
            steps {
                build job: 'MainProject-Deploy', parameters: [[$class: 'StringParameterValue', name: 'DEPLOY_NUMBER', value: "${BUILD_NUMBER}"]]
            }
        }
    }
}