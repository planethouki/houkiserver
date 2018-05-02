#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
source ${SCRIPT_DIR}/spi_var.sh
 
ME=`whoami`
 
if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $SERVICE > /dev/null
    then
      echo "Stopping $SERVICE"
      screen -p 0 -S $SCNAME -X eval 'stuff "say SERVER SHUTTING DOWN IN 10 SECONDS. Saving map..."\015'
      screen -p 0 -S $SCNAME -X eval 'stuff "save-all"\015'
      sleep 10
      screen -p 0 -S $SCNAME -X eval 'stuff "stop"\015'
      sleep 60
      echo "Stopped minecraftserver"
    else
      echo "$SERVICE was not runnning."
      exit 1
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
