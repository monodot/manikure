#!/bin/sh

jsonnet api/pod.jsonnet > src/api/Pod.json

npm install

npm run dev
