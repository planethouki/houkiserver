#!/bin/bash

echo `date`

DATE=`date +%Y%m%d`
HOUR=`date +%H`

USERNAME='minecraft'
SERVICE='spigot-1.13.2.jar'
SCNAME='spigot'

SPI_PATH='/home/minecraft/spigot' 
SPI_RSYNC='/var/minecraft/backup/rsync'
SPI_BACKUP='/home/minecraft/spigot'
BACKUP_PATH="/home/minecraft/backup/$DATE"

XMX="3G"
XMS="3G"
 


MEGA_SERVICE='mega-cmd'
MEGA_SCNAME='mega'
MEGA_PATH='/backup'
MEGA_BACKUP_PATH='/home/minecraft/backup'

