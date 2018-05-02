#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
source ${SCRIPT_DIR}/spi_var.sh

ME=`whoami`

if [ $ME == $USERNAME ] ; then

  echo "rsync ram to disk"

  if [ $HOUR -eq 12 ] ; then
    FOLDER_NUM=12
  else
    FOLDER_NUM=99
  fi 
  
  rsync -ahv --delete ${SPI_PATH}/ ${SPI_RSYNC}/daily${FOLDER_NUM}/
else
  echo "Please run the minecraft user."
  exit 1
fi
