pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                npm install
            }
        }

        stage('Test') {
            steps {
                echo "testing"
            }
        }

        stage('Deploy') {
            steps {
                npm run dev
            }
        }
    }
}
