#push local database called suibian to heroku
heroku pg:reset --app="suibian-database" --confirm "suibian-database"
heroku pg:push suibian DATABASE_URL --app="suibian-database"