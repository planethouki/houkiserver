#!/bin/bash

USERNAME='minecraft'
SERVICE='spigot-1.12.2.jar'
SCNAME='spigot'
SPI_PATH='/var/minecraft/spigot'

BACKUP_PATH='/var/minecraft/backup'
DATE=`date +%Y%m%d`

cd $SPI_PATH

ME=`whoami`


if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $SERVICE > /dev/null
  then
    echo "$SERVICE is runnning. Can NOT backup"
    exit 1
  fi
  echo "backup now..."
  mkdir $BACKUP_PATH/$DATE
  cp -r $SPI_PATH $BACKUP_PATH/$DATE
else
  echo "Please run the minecraft user."
  exit 1
fi
