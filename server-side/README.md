# indholdsfortegnelse

- [Case](#case)
- [Teknologi beslutninger](#teknologi-beslutninger)
- [CLI COMMANDS](#cli-commands)


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
- Database: Sqlite3 / Postgressql

# CLI COMMANDS

## Devlopment envirment CLI

build/up dev env ```docker-compose up -d --build```

shutdown dev env ```docker-compose down```

build dev env ```docker-compose build```

up dev env ```docker-compose up```

## Production CLI

build/up dev env ```docker-compose -f docker-compose.prod.yml up -d --build```

shutdown dev env ```docker-compose -f docker-compose.prod.yml down```

build dev env ```docker-compose -f docker-compose.prod.yml build```

up dev env ```docker-compose -f docker-compose.prod.yml up```


## Docker CLI LOGS DEV

Frontend ```docker logs backend-fastapi --follow```

Backend ```docker logs frontend --follow```

## Yarn (FRONTEND) CLI DEV


yarn cli ```docker-compose exec frontend <yarn command>```
