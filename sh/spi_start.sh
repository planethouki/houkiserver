#!/bin/bash

USERNAME='minecraft'
SERVICE='spigot-1.12.2.jar'
SCNAME='spigot'
SPI_PATH='/var/minecraft/spigot'
 
XMX="3G"
XMS="3G"
 
cd $SPI_PATH
 
ME=`whoami`
 
if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $SERVICE > /dev/null
  then
    echo "$SERVICE is already running!"
    exit 1
  else
    echo "Starting $SERVICE..."
    screen -AmdS $SCNAME java -server -Xmx$XMX -Xms$XMS -jar $SERVICE nogui
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
