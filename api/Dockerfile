FROM gradle:jdk21-alpine
COPY . /app
WORKDIR /app
RUN ./gradlew build
EXPOSE 8080
CMD ["java", "-jar", "build/libs/forum-0.0.1.jar"]
