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
                bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
                bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
            }
        }

        stage('Test') {
            when {
                expression { return params.RUN_TESTS }
            }
            steps {
                bat '"C:\\Program Files\\nodejs\\npm.cmd" test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"C:\\Program Files\\Docker\\Docker Desktop\\docker.exe" build -t moja-aplikacja:${params.web-app} .'
            }
        }

        stage('Deploy') {
            steps {
                echo "Wdrażanie aplikacji do środowiska ${params.ENVIRONMENT}"
                bat '"C:\\Program Files\\Docker\\Docker Desktop\\docker.exe" stop moja-aplikacja-${params.ENVIRONMENT} || exit 0'
                bat '"C:\\Program Files\\Docker\\Docker Desktop\\docker.exe" rm moja-aplikacja-${params.ENVIRONMENT} || exit 0'
                bat '"C:\\Program Files\\Docker\\Docker Desktop\\docker.exe" run -d -p 808${params.ENVIRONMENT == 'dev' ? '1' : params.ENVIRONMENT == 'staging' ? '2' : '3'}:80 --name moja-aplikacja-${params.ENVIRONMENT} moja-aplikacja:${params.web-app}'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline zakończony sukcesem! Aplikacja dostępna pod odpowiednim portem."
        }
        failure {
            echo "❌ Pipeline zakończony niepowodzeniem. Sprawdź logi, aby uzyskać więcej informacji."
        }
    }
}
