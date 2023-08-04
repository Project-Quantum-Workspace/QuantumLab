FROM ubuntu:jammy
WORKDIR /app
COPY /build/backend /app
COPY /build/website /app/dist
RUN chmod +x /app/quantumlab
EXPOSE 8080
ENTRYPOINT ["timeout", "48h", "/app/quantumlab"]