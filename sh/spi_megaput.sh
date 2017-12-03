#!/bin/bash

USERNAME='minecraft'
SERVICE='mega-cmd'
SCNAME='mega'
MEGA_PATH='/backup'
BACKUP_PATH='/var/minecraft/backup'
DATE=`date +%Y%m%d`

cd $BACKUP_PATH

ME=`whoami`

if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $SERVICE > /dev/null ; then
    echo "$SERVICE is already running. Check dupulication"
    exit 1
  else
    screen -AmdS $SCNAME $SERVICE
    echo "sleep 1 miniute for mega startup"
    sleep 1m
    echo "upload now..."
    mega-put $BACKUP_PATH/$DATE $MEGA_PATH
    mega-quit
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
