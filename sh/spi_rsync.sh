#!/bin/bash

USERNAME='minecraft'
SPI_PATH='/var/minecraft/spigot'
DISK_PATH='/var/minecraft/rsync'
HOUR=`date +%H`

ME=`whoami`

if [ $ME == $USERNAME ] ; then

  echo "rsync ram to disk"

  if [ $HOUR -eq 12 ] ; then
    FOLDER_NUM=12
  else
    FOLDER_NUM=99
  fi 
  
  rsync -ahv --delete ${SPI_PATH}/ ${DISK_PATH}/daily${FOLDER_NUM}/
else
  echo "Please run the minecraft user."
  exit 1
fi

