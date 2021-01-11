deploy:
	# Pull latest changes from github master into prod server
	git add . && git commit && git push --force && ssh golfsinteppadon.com "rm -rf /var/www/golfsinteppadon.com && git clone https://github.com/minigolf2000/golfsinteppadon.com.git /var/www/golfsinteppadon.com"
