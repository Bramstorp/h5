# indholdsfortegnelse

- [Case](#case)
- [Teknologi beslutninger](#teknologi-beslutninger)
- [Localhost url](#localhost-url)
- [Opsæting](#opsæting)
- [CLI COMMANDS](#cli-commands)
- [Funktioner / Feature](#funktioner / feature)


# Case

Your client needs you to create a system for controlling their car wash halls.

They wish to a more “smart” way of doing things, they wish for an app or something along the lines of an app, to make the process smarter, but they still want to keep a terminal, in case the app does not work, battery is dead or no reception ect…

The client wants you to implement several features.

1. Write an app to control a car wash.
2. Minimum of 4 carwashes.
3. The code must make use of asymmetric programming (you need to be able to stop 1 car, while the other car wash halls are running).
4. You decide the GUI (WEB, WEB-app, WPF).
5. There must be a user system. Where users can log in and start the process from a terminal or a phone.
6. The user data need to be salted.
7. The user must be able to see their profile info.
8. You must use a NOSQL database (Firebase, Mongo DB).
9. The user can either have a subscription, to get free washes, or pay for one at the time.

# Teknologi beslutninger:

- Clientside: React 
- API / Backend: FastAPI python  
- Database: Sqlite3
- ASGI server UVICORN 
- Webserver nginx (Kun for prod)

# Localhost url

### DEV
Backend url: http://0.0.0.0:8000/ | http://localhost:8000/

Backend url docs/admin: http://0.0.0.0:8000/docs | http://localhost:8000/docs

Frontend url: http://0.0.0.0:3000/ | http://localhost:3000/

### PROD

Backend url: http://0.0.0.0:8080/ | http://localhost:8080/

Backend url docs/admin: http://0.0.0.0:8080/docs | http://localhost:8080/docs

Frontend url: http://0.0.0.0 | http://localhost

# Opsæting

### Opsætningskrav

1.  [Git](https://git-scm.com/downloads).
1.  [Node](https://nodejs.org/en/download/) _(version 12 or greater)_.
1.  [Yarn](https://yarnpkg.com/lang/en/docs/install/) _(version 1.5 or greater)_.
1.  [Docker](https://www.docker.com/products/docker-desktop)
1.  [Python](https://www.python.org/downloads/)
1.  [Pip](https://pip.pypa.io/en/stable/getting-started/)
1.  [Fastapi](https://fastapi.tiangolo.com/)

### Opstæning
alt køre i docker så får at starte projekte skal du være på server-side og køre docker commanden ```docker-compose up -d --build```.

hvis du vil køre prod og er unix skal du gå under  ```server-side/nginx/Dockerfile.prod ``` og ændre ```RUN export NODE_OPTIONS=--openssl-legacy-provider && yarn build && yarn install --production --ignore-scripts --prefer-offline``` til ```yarn run build```

# CLI COMMANDS

### Devlopment envirment CLI

build/up dev env ```docker-compose up -d --build```

shutdown dev env ```docker-compose down```

build dev env ```docker-compose build```

up dev env ```docker-compose up```

### Production CLI

build/up dev env ```docker-compose -f docker-compose.prod.yml up -d --build```

shutdown dev env ```docker-compose -f docker-compose.prod.yml down```

build dev env ```docker-compose -f docker-compose.prod.yml build```

up dev env ```docker-compose -f docker-compose.prod.yml up```


### Docker CLI LOGS DEV

Frontend ```docker logs backend-fastapi --follow```

Backend ```docker logs frontend --follow```

### Yarn (FRONTEND) CLI DEV

yarn cli ```docker-compose exec frontend <yarn command>```

# Funktioner / Feature
- Auth route (JWT Token, Authenticated, Admin)
- Login / Signup
- Async backend + frontend
- Admin Dashboard with all washing halls
- User board with user washing hall
- Wash card with status + countdown + liveupdate
