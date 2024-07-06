pipeline {
    agent any

    tools {
        nodejs 'node'
    }
    
    stages {

        stage('dependencies'){
            steps {
                sh'npm install -g vercel' 
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

    }
    
    post {
        success {
                withCredentials([usernamePassword(credentialsId: '61f4492b-127f-45c8-92cd-aab3234adff6', usernameVariable: 'TOKEN_NAME', passwordVariable: 'VERCEL_TOKEN')]) {
                    sh 'curl"https://api.vercel.com/v6/deployments" -H "Authorization: Bearer $TOKEN_NAME"'
                    sh 'vercel build --yes'
                    sh 'vercel deploy --prebuilt'
                    echo 'Deploying successfully to Vercel'
                }
        }
        failure {
            echo "Vercel deployment failed."
            // Add additional steps to handle failed deployment
        }
    }
}
