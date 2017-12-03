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
screen -p 0 -S $SCNAME -X eval 'stuff "pex user pinokapi group add people"\015'
usleep 500000
screen -p 0 -S $SCNAME -X eval 'stuff "pex user planet_houki group add people"\015'
usleep 500000
screen -p 0 -S $SCNAME -X eval 'stuff "pex user BENITASO group add people"\015'
usleep 500000
screen -p 0 -S $SCNAME -X eval 'stuff "pex user Fruit_0808 group add people"\015'
usleep 500000
screen -p 0 -S $SCNAME -X eval 'stuff "pex user i_am_zerotu group add people"\015'
usleep 500000
else
echo "$SERVICE was not running."
fi
else
echo "Plese run the mincraft user."
fi
