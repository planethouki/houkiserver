#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
source ${SCRIPT_DIR}/spi_var.sh

ME=`whoami`

cd ${SPI_PATH}
 
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
