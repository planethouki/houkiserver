#!/bin/bash

USERNAME='minecraft'
DBPATH='/var/minecraft/spigot/plugins/CoreProtect/database.db'

ME=`whoami`

if [ $ME == $USERNAME ] ; then
  echo "dataput start"
  echo "dataput end" 
else
  echo "Please run the minecraft user."
  exit 1
fi

