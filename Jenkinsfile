pipeline {
    agent any

    tools {
        nodejs 'node'
    }
    
    stages {

        stage('dependencies'){
            steps {
                sh'npm install'
            }
        }
        stage('Build') {
            steps {
                sh'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo "testing"
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (currentBuild.result == 'SUCCESS') { 
                        withCredentials([string(credentialsId: '61f4492b-127f-45c8-92cd-aab3234adff6', variable: 'VERCEL_TOKEN')]) {
                            sh 'vercel --token=$VERCEL_TOKEN --prod --pre-built'
                            echo 'desploying succefully to vercel'
                        }
                    }
                }

            }
        }
    }
    
    post {
        failure {
            echo "Vercel deployment failed."
            // Add additional steps to handle failed deployment
        }
    }
}
