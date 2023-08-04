FROM debian:stretch-slim
WORKDIR /app
COPY /build/backend /app
COPY /build/website /app/dist
EXPOSE 8080
ENTRYPOINT ["timeout", "48h", "/app/quantumlab"]