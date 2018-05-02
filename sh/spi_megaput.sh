#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
source ${SCRIPT_DIR}/spi_var.sh

cd $MEGA_BACKUP_PATH

ME=`whoami`

if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $MEGA_SERVICE > /dev/null ; then
    echo "$MEGA_SERVICE is already running. Check dupulication"
    exit 1
  else
    screen -AmdS $MEGA_SCNAME $MEGA_SERVICE
    echo "sleep 1 miniute for mega startup"
    sleep 1m
    echo "upload now..."
    mega-put $MEGA_BACKUP_PATH/$DATE $MEGA_PATH
    mega-quit
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
