FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
# FROM is the base image, workdir is the directory that this project will be located in the docker container, copy files from my pc (this project)
# expose port 8080, and when docker container starts, run "java -jar app.jar"