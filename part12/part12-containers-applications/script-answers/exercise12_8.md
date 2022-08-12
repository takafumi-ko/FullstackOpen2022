## login mongo
```
$ docker-compose -f docker-compose.dev.yml up -d 
$ docker exec -it todo-backend_mongo_1 bash

# mongo -u root -p
```

## inert one
`> db.todos.insertOne({"text":"Increase the number of tools in my toolbelt","done":false})`
