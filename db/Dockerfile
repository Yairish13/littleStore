FROM postgres:14-alpine

COPY create_db.sql /docker-entrypoint-initdb.d/

EXPOSE 5433

ENTRYPOINT ["postgres", "-d"]
