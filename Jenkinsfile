pipeline {
    agent any

    parameters {
        string(name: 'web-app', defaultValue: 'latest', description: 'Tag dla obrazu Docker')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Środowisko do deployu')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Uruchom testy')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            when {
                expression { return params.RUN_TESTS }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t moja-aplikacja:${params.web-app} ."
            }
        }

        stage('Deploy') {
            steps {
                echo "Wdrażanie aplikacji do środowiska ${params.ENVIRONMENT}"
                sh "docker stop moja-aplikacja-${params.ENVIRONMENT} || true"
                sh "docker rm moja-aplikacja-${params.ENVIRONMENT} || true"
                sh "docker run -d -p 808${params.ENVIRONMENT == 'dev' ? '1' : params.ENVIRONMENT == 'staging' ? '2' : '3'}:80 --name moja-aplikacja-${params.ENVIRONMENT} moja-aplikacja:${params.DOCKER_TAG}"
            }
        }
    }

    post {
        success {
            echo "Pipeline zakończony sukcesem! Aplikacja dostępna pod odpowiednim portem."
        }
        failure {
            echo "Pipeline zakończony niepowodzeniem. Sprawdź logi, aby uzyskać więcej informacji."
        }
    }
}
