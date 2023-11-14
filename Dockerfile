# Build stage for React frontend
FROM node:lts-hydrogen AS node-builder
WORKDIR /frontend-builder
COPY website/ .
RUN npm install
RUN npm run build

# Build stage for Golang backend
FROM golang:1.20 AS go-builder
WORKDIR /backend-builder
COPY . .
RUN go mod download
RUN go build -o quantumlab cmd/main.go

# Final stage
FROM ubuntu:jammy
WORKDIR /app
COPY --from=go-builder /backend-builder/quantumlab /app
COPY --from=node-builder /frontend-builder/dist /app/dist
COPY .env /app
RUN chmod +x /app/quantumlab && apt-get update && apt-get install -y ca-certificates && update-ca-certificates
EXPOSE 8080
ENTRYPOINT ["/app/quantumlab"]