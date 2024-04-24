GridCLoud Front
Variables de entorno keycloak
KEYCLOAK_CLIENT_ID="nextjs"
KEYCLOAK_CLIENT_SECRET="<client_secret>"
KEYCLOAK_ISSUER="http://localhost:8080/realms/myrealm"
Pasos para poder correr keycloak
1- correr en docker keycloak con el siguiente comando:
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.4 start-dev
2- correr el repo con el siguiente comando:
$env:NODE_OPTIONS='--dns-result-order=ipv4first'; npm run dev
