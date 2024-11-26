
# GridCLoud Front 
Variables de entorno:

GRID_API = variable para api de deploys en akash y flux
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=variable de stripe
STRIPE_SECRET_KEY=secreto de stripe

## Docker Build

`docker build -t ghcr.io/runongrid/front:v1.0.1 -f .docker/Dockerfile .`

## Docker run

`docker run -p 4000:4000 --rm --env-file=.env ghcr.io/runongrid/front:v1.0.1`

## Docker push

`docker push ghcr.io/runongrid/front:v1.0.1`