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
