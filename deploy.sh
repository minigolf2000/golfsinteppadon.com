#!/bin/bash
start_time=$(date +%s)
# Check for the required environment parameter
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 [prod|staging]"
  exit 1
fi

# Set variables based on the environment
if [ "$1" == "prod" ]; then
  deploy_folder="/var/www"
  service_name="www-api-prod"
  admin_service_name="www-admin-prod"
elif [ "$1" == "staging" ]; then
  deploy_folder="/var/www-staging"
  service_name="www-api-staging"
  admin_service_name="www-admin-staging"
else
  echo "Invalid environment: $1"
  echo "Usage: $0 [prod|staging]"
  exit 1
fi

rm -rf client/build
npm --prefix ./client run build
npm --prefix ./admin run build

ssh web@winpub1 "rm -rf $deploy_folder/build $deploy_folder/admin/dist"
# We can't delete sinatra folder here - since that would delete dependencies
# We could maybe delete all non-vendor things but lets just get rsync to work instead

# rsync -avz --exclude 'vendor/deploy' /sinatra golfs@winpub1:/var/www/sinatra
# Installing rsync on windows involves installing both rsync and zstd so lets try just this file copy for now
# This means it doesn't clear out old files from the server, we're deleting build and sinatra dirs anyway

scp -r * web@winpub1:$deploy_folder
scp -r admin/dist admin/package.json admin/tsconfig.json web@winpub1:$deploy_folder/admin

# This doesn't work yet, not sure if it can work w/ bundle install
# tar czf - -C client build | ssh web@winpub1 "tar xzf - -C $deploy_folder"

ssh -t web@winpub1 "sudo systemctl restart $service_name && sudo systemctl restart $admin_service_name"

echo "Deploy to $1 finished at $(date +%T) in $(( $(date +%s) - start_time ))s"
