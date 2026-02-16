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

        stage('OWASP Dependency Check') {
            steps {
                withCredentials([string(credentialsId: 'owasp-token', variable: 'OWASP_Token')]) {
                    sh """
                        ${tool 'OWASP-Dependency-Check-12'}/bin/dependency-check.sh \
                            --scan . \
                            --format HTML \
                            --project "frontend" \
                            --nvdApiKey \$OWASP_Token \
                            --disableYarnAudit \
                            --failOnCVSS 7 \
                            --suppression dependency-check-suppressions.xml \
                            --out ./dependency-check-report
                    """
                }
            }
        }
    }
}