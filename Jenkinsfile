pipeline {
    agent any

    stages {
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
    }
}
