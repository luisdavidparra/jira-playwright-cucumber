pipeline {
    agent any

    environment {
        jira_email = credentials('jira_email')
        jira_password = credentials('jira_password')
        jira_username = credentials('jira_username')
        jira_api_token = credentials('jira_api_token')
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    def envExample = readFile '.env.example'

                    envExample = envExample.replace('JIRA_EMAIL=', "JIRA_EMAIL=${jira_email}")
                                          .replace('JIRA_PASSWORD=', "JIRA_PASSWORD=${jira_password}")
                                          .replace('JIRA_USERNAME=', "JIRA_USERNAME=${jira_username}")
                                          .replace('JIRA_API_TOKEN=', "JIRA_API_TOKEN=${jira_api_token}")

                    writeFile file: '.env', text: envExample
                }
            }
        }
        stage('Install dependencies & playwright Browsers') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }
        stage('Run tests') {
            steps {
                bat 'npm test'
            }
        }
        stage('Archive Screenshots') {
            steps {
                archiveArtifacts artifacts: 'screenshots/*.png', allowEmptyArchive: true
            }
        }
        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportName: 'Cucumber Test Report',
                    reportDir: 'reports',  
                    reportFiles: 'cucumber-report.html', 
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }
    }
}
