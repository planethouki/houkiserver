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
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty easy worldtest"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set gamemode 3 worldtest"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias test worldtest"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "tc map worldtest"\015'
    sleep 30
    cp $SPI_PATH/*.png /var/www/html/minecraft/dynmap
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
