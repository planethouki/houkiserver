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
    echo "worldruin map delete start"
    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap pause all"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap purgeworld worldruin"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap purgeworld worldruin_nether"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap purgeworld worldruin_the_end"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "dynmap pause none"\015'
    sleep 30
    echo "worldruin map delete end"
    echo "worldruin recreate start"
    screen -p 0 -S $SCNAME -X eval 'stuff "mv delete worldruin"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mvconfirm"\015'
    sleep 20
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldruin NORMAL -g TerrainControl"\015'
    sleep 100
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty hard worldruin"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias iseki worldruin"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv gamerule keepInventory true worldruin"\015'
    sleep 5
    echo "worldruin recreate end"
    echo "worldruin_nether recreate start"
    screen -p 0 -S $SCNAME -X eval 'stuff "mv delete worldruin_nether"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mvconfirm"\015'
    sleep 20
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldruin_nether NETHER"\015'
    sleep 100
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty hard worldruin_nether"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias iseki_nether worldruin_nether"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv gamerule keepInventory true worldruin_nether"\015'
    sleep 5
    echo "worldruin_nether recreate end"
    echo "worldruin_the_end recreate start"
    screen -p 0 -S $SCNAME -X eval 'stuff "mv delete worldruin_the_end"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mvconfirm"\015'
    sleep 20
    screen -p 0 -S $SCNAME -X eval 'stuff "mv create worldruin_the_end END"\015'
    sleep 100
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set difficulty hard worldruin_the_end"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv modify set alias iseki_the_end worldruin_the_end"\015'
    sleep 5
    screen -p 0 -S $SCNAME -X eval 'stuff "mv gamerule keepInventory true worldruin_the_end"\015'
    sleep 5
    echo "worldruin_the_end recreate end"
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
