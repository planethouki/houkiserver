#!/bin/bash

USERNAME='minecraft'
SPI_PATH='/var/minecraft/spigot'
DISK_PATH='/var/minecraft/rsync'
HOUR=`date +%H`

ME=`whoami`

if [ $ME == $USERNAME ] ; then

  echo "rsync ram to disk"
  
  if [ $HOUR -eq 0 ] ; then
    FOLDER_NUM=00
  elif [ $HOUR -eq 6 ] ; then
    FOLDER_NUM=06
  elif [ $HOUR -eq 12 ] ; then
    FOLDER_NUM=12
  elif [ $HOUR -eq 18 ] ; then
    FOLDER_NUM=18
  else
    FOLDER_NUM=99
  fi
  rsync -ahv --delete ${SPI_PATH}/ ${DISK_PATH}/daily${FOLDER_NUM}/
else
  echo "Please run the minecraft user."
  exit 1
fi

