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
#    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap pause all"\015'
#    sleep 5
#    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap purgeworld worldtest"\015'
#    sleep 5
#    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap pause none"\015'
#    sleep 30

    screen -p 0 -S $SCNAME -X eval 'stuff "tc reload worldtest"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "mv delete worldtest"\015'
    sleep 1
    screen -p 0 -S $SCNAME -X eval 'stuff "mvconfirm"\015'
    sleep 2
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldtest NORMAL -g TerrainControl"\015'
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
