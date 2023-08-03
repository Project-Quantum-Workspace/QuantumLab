FROM debian:stretch-slim
WORKDIR /app
COPY /build/backend /app
COPY /build/website /app/dist
EXPOSE 8080
ENTRYPOINT ["/app/main"]
