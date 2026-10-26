pipeline {
    agent any

    parameters {
        booleanParam(name: 'BUILD_DOCKER', defaultValue: false,
                     description: 'Also build the Docker image (needs Docker Desktop)')
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Tool versions') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }
        stage('Validate project files') {
            steps { bat 'powershell -NoProfile -ExecutionPolicy Bypass -File tools\\validate.ps1' }
        }
        stage('Unit tests') {
            steps { bat 'npm test' }
        }
        stage('Build') {
            steps { bat 'npm run build' }
        }
        stage('Archive site') {
            steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true }
        }
        stage('Docker image') {
            when { expression { return params.BUILD_DOCKER } }
            steps { bat 'docker build -t placetrack:%BUILD_NUMBER% .' }
        }
    }

    post {
        success { echo 'PlaceTrack pipeline passed: files valid, tests green, site built.' }
        failure { echo 'PlaceTrack pipeline failed - read the first red stage in the console output.' }
    }
}
