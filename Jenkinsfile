pipeline {
    agent any

    tools {
        nodejs 'node'
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
