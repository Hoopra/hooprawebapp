FROM postgres

ENV POSTGRES_USER hoopra
ENV POSTGRES_PASSWORD hoophoop123!

# Init schema and data
ADD postgresql.conf /etc/postgresql/

# Needed to fix permission issues on windows
# RUN chmod 755 /etc/mysql/conf.d/my.cnf
# RUN ls -l /etc/postgresql/conf.d/

ADD ./init/* /docker-entrypoint-initdb.d/
RUN ls /docker-entrypoint-initdb.d/

EXPOSE 5432
