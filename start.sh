#!/bin/bash
echo Starting http-backend-node container
docker run -d -p 8080:8080 http-backend-node