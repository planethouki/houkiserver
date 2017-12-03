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
    screen -p 0 -S $SCNAME -X eval 'stuff "wb worldtest set 1000 30"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "wb worldtest fill"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "mv fill confirm"\015'
    sleep 180
    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap fullrender worldtest"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "wb worldtest clear"\015'
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
