# Makefile para automação de comandos Docker

# Variáveis
COMPOSE=sudo docker compose
SERVICE_DB=mongodb

# Reset completo do banco (remove dados e recria com seed)
reset-db:
	$(COMPOSE) down -v
	$(COMPOSE) up -d --build

# Sobe os serviços normalmente
start:
	$(COMPOSE) up -d

# Para todos os containers
stop:
	$(COMPOSE) down

# Logs do MongoDB
logs-db:
	$(COMPOSE) logs -f $(SERVICE_DB)

# Logs do mongo-express
logs-ui:
	$(COMPOSE) logs -f mongo-express

# Inspecionar containers ativos
status:
	$(COMPOSE) ps

# Shell interativo dentro do MongoDB
mongo-shell:
	$(COMPOSE) exec $(SERVICE_DB) mongosh -u admin -p 123456 --authenticationDatabase admin
