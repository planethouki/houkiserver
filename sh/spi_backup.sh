#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
source ${SCRIPT_DIR}/spi_var.sh

ME=`whoami`

if [ $ME == $USERNAME ] ; then
  echo "backup now..."
  mkdir -p $BACKUP_PATH
  cp -r $SPI_BACKUP $BACKUP_PATH
else
  echo "Please run the minecraft user."
  exit 1
fi
