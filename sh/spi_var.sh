#!/bin/bash

DATE=`date +%Y%m%d`
HOUR=`date +%H`

USERNAME='minecraft'
SERVICE='spigot-1.12.2.jar'
SCNAME='spigot'

SPI_PATH='/home/minecraft/spigot' 
SPI_RSYNC='/var/minecraft/backup/rsync'
SPI_BACKUP='/var/minecraft/backup/rsync/daily99/'
BACKUP_PATH="/var/minecraft/backup/$DATE/spigot"

XMX="3G"
XMS="3G"
 


MEGA_SERVICE='mega-cmd'
MEGA_SCNAME='mega'
MEGA_PATH='/backup'
MEGA_BACKUP_PATH='/var/minecraft/backup'

