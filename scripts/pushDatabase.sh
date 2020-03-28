#push local database called suibian to heroku
heroku pg:push suibian DATABASE_URL --app="suibian-database"