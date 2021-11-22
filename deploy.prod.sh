#! /bin/bash
npm run build
gcloud config set project romingo-production
gcloud app deploy --appyaml app.prod.yaml
