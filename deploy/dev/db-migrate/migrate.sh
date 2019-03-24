#!/bin/bash
for filename in scripts/*.sql; do
  psql -h db -f $filename
done