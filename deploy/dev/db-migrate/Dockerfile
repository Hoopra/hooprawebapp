FROM postgres

WORKDIR /db-migrate

ADD ./scripts/* ./scripts/
ADD ./migrate.sh .

CMD sh ./migrate.sh