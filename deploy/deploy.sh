#!/bin/bash
# 网站的根目录
WEB_PATH='/home/wangxiangbo/var/www/mywebsite/nest-server'
cd $WEB_PATH
pwd
ls
yarn 
yarn build

pm2 stop 0
pm2 start 0
pm2 save


echo "listened work flow events"

