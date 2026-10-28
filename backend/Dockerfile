# ---------- Stage 1: build ----------
FROM golang:1.24-alpine AS builder

WORKDIR /src

COPY go.mod ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /out/server .

# ---------- Stage 2: final image ----------
FROM alpine:3.20

RUN adduser -D -u 10001 appuser

COPY --from=builder /out/server /usr/local/bin/server

USER appuser

ENV PORT=8080
EXPOSE 8080

CMD ["server"]
