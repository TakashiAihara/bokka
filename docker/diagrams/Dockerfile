FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    graphviz \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
  diagrams \
  requests
