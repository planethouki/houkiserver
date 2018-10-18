#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
source ${SCRIPT_DIR}/spi_var.sh

cd $MEGA_BACKUP_PATH

ME=`whoami`

if [ $ME == $USERNAME ] ; then
    screen -AmdS $MEGA_SCNAME $MEGA_SERVICE
    echo "sleep 1 miniute for mega startup"
    sleep 1m
    echo "upload now..."
    mega-put $MEGA_BACKUP_PATH/$DATE $MEGA_PATH
    mega-quit
    echo "upload finished"
else
  echo "Please run the minecraft user."
  exit 1
fi
