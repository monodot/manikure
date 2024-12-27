#!/bin/sh

# curl -o api/1.28.2/pod.json -L https://raw.githubusercontent.com/yannh/kubernetes-json-schema/master/v1.28.2-standalone/pod.json
curl -o api/1.28.2/deployment.json -L https://raw.githubusercontent.com/yannh/kubernetes-json-schema/master/v1.28.2-standalone/deployment.json

# jsonnet api/pod.jsonnet > src/api/Pod.json
jsonnet api/deployment.jsonnet > src/api/Deployment.json
