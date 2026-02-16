pipeline {
    agent any 

    tools {
        nodejs 'nodejs-2561'
    }

    stages {
        stage('check node version') {
            steps {
                sh 'node -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('NPM Dependency Audit') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }
    }
}