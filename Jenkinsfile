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

        stage('Dependency Scanning') {
            parallel {
                stage('NPM Dependency Audit') {
                    steps {
                        sh 'npm audit --audit-level=high'
                    }
                }

                stage('OWASP Dependency Check') {
                    steps {
                        script {
                            def dcTool = tool 'OWASP-Dependency-Check-12'
                            withCredentials([string(credentialsId: 'owasp-token', variable: 'OWASP_TOKEN')]) {
                                sh """
                                    ${dcTool}/bin/dependency-check.sh \
                                    --scan . \
                                    --format HTML \
                                    --format XML \
                                    --project "frontend" \
                                    --nvdApiKey "\$OWASP_TOKEN" \
                                    --disableYarnAudit \
                                    --failOnCVSS 7 \
                                    --out ./dependency-check-report
                                """
                            }
                        }
                    }
                    post {
                        always {
                            // This creates the nice visual graph in Jenkins
                            dependencyCheckPublisher(
                                pattern: 'dependency-check-report/dependency-check-report.xml'
                            )
                            // This allows you to download the raw HTML report
                            archiveArtifacts artifacts: 'dependency-check-report/*.html', fingerprint: true
                        
                            junit allowEmptyResults: true, keepProperties: true, testResults: 'dependency-check-report/dependency-check-junit.xml'
                            publishHTML([
                                allowMissing: true, 
                                alwaysLinkToLastBuild: true, 
                                icon: '', 
                                keepAll: true, 
                                reportDir: 'dependency-check-report', 
                                reportFiles: 'dependency-check-report.html', 
                                reportName: 'Dependency Check HTML Report'
                            ])
                        
                        }
                    }
                }
            }
        }
    }
}