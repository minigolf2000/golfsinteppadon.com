# winsomewood stack summary

Sinatra serves API endpoints at /api. Sinatra listens on port 4567
Client code is built on developer machines with `npm run build`. Then copied to cedar:/var/www/build during ./deploy deployment. From the server's perspective these are simply static HTML/CSS/JS files

We use NGINX as a reverse proxy to listen on port 80. It handles separating routes for API vs. non-API, handles SSL, and allows Sinatra to run as a non-root user. Routes to /api are routed to Sinatra and all other requests are served from the /var/www/build folder

We try to use systemctl to manage all processes

# One-time Ruby/Sinatra installation

These were the steps to install dependencies on Cedar

```
# Install Ruby 2.7. As of June 2023 we are running RHEL v8.8 which only has
# up to Ruby 2.5.9 so these are the steps for Ruby 2.7
sudo dnf module reset ruby
sudo dnf module enable ruby:2.7
sudo dnf install ruby

# Run this to let `bundle install` install pg gem correctly
sudo dnf install postgresql-devel

# Tell bundle to use local vendor/bundle directory. As opposed to
# the global gems directory which is likely owned by root
bundle config set --local deployment 'true'

# *NOT AS ROOT* Now we can install the rest of Ruby dependencies
bundle install

# Test running Sinatra server
bundle exec ruby app.rb -o 0.0.0.0 # bind to 0.0.0.0 instead of 127.0.0.1
```

# Node.js installation

```
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
node -v # prints out v20.x.x
```

# NGINX

Mostly followed [DigitalOcean's CentOS NGINX installation](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-8) and was very easy. See [our NGINX config](/www-nginx.conf)

```
sudo dnf install nginx
```

# Postgres DB installation

From https://developer.fedoraproject.org/tech/database/postgresql/about.html

```
sudo dnf install postgresql postgresql-server    # install client/server
sudo postgresql-setup --initdb --unit postgresql # initialize PG cluster
sudo systemctl start postgresql                  # start cluster
sudo su - postgres                               # login as DB admin
createdb quick-start                             # create testing database
psql -d quick-start

# Then copy db schema insert commands from FigJam file
# Then copy data

As root I've edited /var/lib/pgsql/data/pg_hba.conf to use "md5" auth method instead of peer
# TODO: figure out how to allow external network requests into postgres

# Some commands
sudo systemctl is-enabled postgresql # check if it's starting at system boot
sudo systemctl enable postgresql # make it start at system boot
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl restart postgresql

```

To allow remote connection for tools like dbeaver
https://blog.devart.com/configure-postgresql-to-allow-remote-connection.html

# Systemd

Create a file owned by root /etc/systemd/system/www-api-prod.service

```
[Unit]
Description=www
After=network.target

[Service]
Type=simple
User=web
Group=web
WorkingDirectory=/var/www/sinatra
Environment="RACK_ENV=production"
ExecStart=bundle exec ruby app.rb -o 0.0.0.0
Restart=always

[Install]
WantedBy=multi-user.target
```

Commands

```
sudo systemctl enable www-api-prod
sudo systemctl start www-api-prod
sudo systemctl stop www-api-prod
sudo systemctl restart www-api-prod
sudo journalctl -u www-api-prod     # view production logs
sudo journalctl -u www-api-staging  # view staging logs
```

In /etc/systemd/journald.conf

```
SystemMaxUse=500M # limits log size to 500MB
```

Then restart `systemd-journald` with `sudo systemctl restart systemd-journald`

# AdminJS install notes

We use AdminJs to administer our database. It's is great but there were some gotchas when installing:

- Needed Node v20, or it ran into mysterious errors
- It ran into mysterious errors when trying to install using TypeORM adapter, so I used raw SQL adapter instead
- Reading from .env doesn't seem to work with raw SQL adapter, hardcode db connection string instead
- Every table needs a primary key. Composite keys are not supported (bc of routing reasons)
- Editing the AdminJS dashboard is surprisingly hard
