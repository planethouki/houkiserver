#!/bin/bash

echo `date`

DATE=`date +%Y%m%d`
HOUR=`date +%H`

USERNAME='ec2-user'
BASEDIR='/opt/houkiserver'
SERVICE='spigot-1.14.4.jar'
SCNAME='spigot'

SPI_PATH="$BASEDIR/spigot" 
SPI_BACKUP="$BASEDIR/spigot"
BACKUP_PATH="$BASEDIR/backup/$DATE"

XMX="2G"
XMS="2G"
 

