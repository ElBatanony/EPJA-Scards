pipeline {
  agent {
    docker {
      image 'node:12'
    }
  }

  stages {
    stage('stats') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'df -h'
      }
    }

    stage('install') {
      steps {
        sh 'npm i'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('tests:unit') {
      steps {
        sh 'npm run test'
      }
    }

  }
}