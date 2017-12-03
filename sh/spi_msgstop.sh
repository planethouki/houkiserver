#!/bin/bash

USERNAME='minecraft'
SERVICE='spigot-1.12.2.jar'
SCNAME='spigot'
SPI_PATH='/var/minecraft/spigot'
 
cd $SPI_PATH
 
ME=`whoami`
 
if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $SERVICE > /dev/null
    then
      screen -p 0 -S $SCNAME -X eval 'stuff "say ５分後にサーバーを再起動します"\015'
      sleep 300
      echo "msgstop end"
    else
      echo "$SERVICE was not runnning."
      exit 1
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
