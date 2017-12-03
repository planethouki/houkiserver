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
    echo "worldruin recovery start"
    screen -p 0 -S $SCNAME -X eval 'stuff "mv remove worldruin"\015'
    sleep 5
    rm -r $SPI_PATH/worldruin
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldruin NORMAL -g TerrainControl"\015'
    sleep 100
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty hard worldruin"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias iseki worldruin"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv gamerule keepInventory true worldruin"\015'
    sleep 5
    echo "worldruin recovery end"
    echo "worldruin_nether recovery start"
    screen -p 0 -S $SCNAME -X eval 'stuff "mv remove worldruin_nether"\015'
    sleep 5
    rm -r $SPI_PATH/worldruin_nether
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldruin_nether NETHER"\015'
    sleep 100
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty hard worldruin_nether"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias iseki_nether worldruin_nether"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv gamerule keepInventory true worldruin_nether"\015'
    sleep 5
    echo "worldruin_nether recovery end"
    echo "worldruin_the_end recovery start"
    screen -p 0 -S $SCNAME -X eval 'stuff "mv remove worldruin_the_end"\015'
    sleep 5
    rm -r $SPI_PATH/worldruin_the_end
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldruin_the_end END"\015'
    sleep 100
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty hard worldruin_the_end"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias iseki_the_end worldruin_the_end"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv gamerule keepInventory true worldruin_the_end"\015'
    sleep 5
    echo "worldruin_the_end recovery end"
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
