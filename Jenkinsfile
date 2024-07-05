pipeline {
    agent any

    tools {
        nodejs '18.17.0'
    }
    
    stages {
        stage('Build') {
            steps {
                sh'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "testing"
            }
        }

        stage('Deploy') {
            steps {
                sh'npm run dev'
            }
        }
    }
}
