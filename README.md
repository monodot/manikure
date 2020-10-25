# k8s-yaml-builder

A simple webapp for building Kubernetes resource definitions using a form. All static HTML and vanilla JavaScript.

You can find this running at: https://tomd.xyz/tools/kubernetes-yaml-builder/

Or, to serve the static content locally with Python's simple HTTP server:

    python -m SimpleHTTPServer 8000 

You can now visit the app at `http://localhost:8000`.

## Serve using a container

Or, to serve using an Apache HTTP Server container:

    docker run --rm --name k8s-yaml-builder -p 8055:80 -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4

Or if you use _selinux_ you'll need to mount with `:z`:

    docker run --rm --name k8s-yaml-builder -p 8055:80 -v "$PWD":/usr/local/apache2/htdocs/:z httpd:2.4
     
Then you can visit the app in your browser at `http://localhost:8055`
