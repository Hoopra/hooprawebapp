-- Create user
CREATE USER hoopra WITH PASSWORD 'hoophoop123!';

-- Create database
CREATE DATABASE hoopra_dev WITH OWNER 'hoopra' ENCODING 'UTF8';

-- Grant permissions
GRANT CONNECT ON DATABASE hoopra_dev TO hoopra;
GRANT USAGE ON SCHEMA public TO hoopra;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hoopra;
