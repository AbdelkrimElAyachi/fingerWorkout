pipeline {
    agent any

    tools {
        nodejs 'node'
    }
    
    stages {

        stage('dependencies'){
            steps {
                dir('../selenese'){
                    sh'apt update'
                    sh'apt install maven'
                    sh'apt-get install chromium-chromedriver'
                    sh'git clone https://github.com/vmi/selenese-runner-java.git ../selenium'
                    sh'mvn -P package'
                    sh'mv ./target/selenese-runner.jar ../fingerworkout'
                }
                sh'npm install -g vercel' 
                sh'npm install'
                sh'npm install -g live-server'
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
                sh'live-server  ./dist/index.html --port:50999 &'
                sh'LIVE_SERVER_PID=$!'
                sh'java -jar selenese-runner.jar --driver chrome --baseurl http://127.0.0.1:50999 --screenshot-on-fail /errors-screenshots ./scripts/first.side'
                sh'KILL $LIVE_SERVER_PID'
            }
        }

    }
    
    post {
        success {
                withCredentials([usernamePassword(credentialsId: '61f4492b-127f-45c8-92cd-aab3234adff6', usernameVariable: 'TOKEN_NAME', passwordVariable: 'VERCEL_TOKEN')]) {
                    sh 'vercel --token $VERCEL_TOKEN --yes'
                    echo 'Deploying successfully to Vercel'
                }
        }
        failure {
            echo "Vercel deployment failed."
            // Add additional steps to handle failed deployment
        }
    }
}
