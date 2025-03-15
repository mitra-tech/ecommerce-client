namespace = "production"
serviceName = "ecommerce-client"
service = "Ecommerce Client"

def groovyMethods

m1 = System.currentTimeMillis()

pipeline {
  agent {
    label 'Jenkins-Agent'
  }

  tools {
    nodejs "NodeJs"
    dockerTool "Docker"
  }

  environment {
    DOCKER_CREDENTIALS = credentials("dockerhub")
    IMAGE_NAME = "mitratech" + "/" + "ecommerce-client"
    IMAGE_TAG = "stable-${BUILD_NUMBER}"
  }

  stages {
    stage("Cleanup Workspace") {
      steps {
        cleanWs()
      }
    }

    stage("Prepare Environment") {
      steps {
        sh "[ -d pipeline ] || mkdir pipeline"
        dir("pipeline") {
          git branch: 'main', credentialsId: 'github', url: 'https://github.com/mitra-tech/jenkins-automation'
          script {
            groovyMethods = load("functions.groovy")
          }
        }
        git branch: 'main', credentialsId: 'github', url: 'https://github.com/mitra-tech/ecommerce-client'
        sh 'npm install'
      }
    }

    stage("Lint Check") {
      steps {
        sh 'npm run lint:check'
      }
    }

    stage("Code Format Check") {
      steps {
        sh 'npm run prettier:check'
      }
    }

    // stage("Build and Push") {
    //   steps {
    //     sh 'docker login -u $DOCKERHUB_CREDENTIAL_USR --password $DOCKERHUB_CREDENTIALS_PSW'
    //     sh "docker build -t $IMAGE_NAME ."
    //     sh "docker tag $IMAGE_NAME $IMAGE_NAME:$IMAGE_TAG"
    //     sh "docker tag $IMAGE_NAME $IMAGE_NAME:stable"
    //     sh "docker push $IMAGE_NAME:$IMAGE_TAG"
    //     sh "docker push $IMAGE_NAME:stable"
    //   }
    // }

    // stage("Clean Artifacts") {
    //   steps {
    //     sh "docker rmi $IMAGE_NAME:$IMAGE_TAG"
    //     sh "docker rmi $IMAGE_NAME:stable"
    //   }
    // }

    // stage("Create New Pods") {
    //   steps {
    //     withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: 'jenkins-k8s-token', namespace: '', serverUrl: 'https://192.168.59.102:8443']]) {
    //       script {
    //         def pods = groovyMethods.findPodsFromName("${namespace}", "${serviceName}")
    //         for (podName in pods) {
    //           sh """
    //             kubectl delete -n ${namespace} pod ${podName}
    //             sleep 10s
    //           """
    //         }
    //       }
    //     }
    //   }
    // }
  }

  post {
    success {
      script {
        m2 = System.currentTimeMillis()
        def durTime = groovyMethods.durationTime(m1, m2)
        def author = groovyMethods.readCommitAuthor()
        groovyMethods.notifySlack("", "ecommerce-jenkins", [
                [
                  title: "BUILD SUCCEEDED: ${service} Service with build number ${env.BUILD_NUMBER}",
                  title_link: "${env.BUILD_URL}",
                  color: "good",
                  text: "Created by: ${author}",
                  "mrkdwn_in": ["fields"],
                  fields: [
                    [
                      title: "Duration Time",
                      value: "${durTime}",
                      short: true
                    ],
                    [
                      title: "Stage Name",
                      value: "Production",
                      short: true
                    ],
                  ]
                ]
            ]
        )
      }
    }

    failure {
      script {
        m2 = System.currentTimeMillis()
        def durTime = groovyMethods.durationTime(m1, m2)
        def author = groovyMethods.readCommitAuthor()
        groovyMethods.notifySlack("", "ecommerce-jenkins", [
                [
                  title: "BUILD FAILED: ${service} Service with build number ${env.BUILD_NUMBER}",
                  title_link: "${env.BUILD_URL}",
                  color: "error",
                  text: "Created by: ${author}",
                  "mrkdwn_in": ["fields"],
                  fields: [
                    [
                      title: "Duration Time",
                      value: "${durTime}",
                      short: true
                    ],
                    [
                      title: "Stage Name",
                      value: "Production",
                      short: true
                    ],
                  ]
                ]
            ]
        )
      }
    }
  }
}
