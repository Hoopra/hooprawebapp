FROM postgres

# Init schema and data
ADD postgresql.conf /etc/postgresql/

# Needed to fix permission issues on windows
# RUN chmod 755 /etc/mysql/conf.d/my.cnf

ADD ./init/* /docker-entrypoint-initdb.d/

EXPOSE 5432
