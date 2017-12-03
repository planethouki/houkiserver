#!/bin/bash

exit 0

USERNAME='minecraft'
SERVICE='spigot-1.12.2.jar'
SCNAME='spigot'
SPI_PATH='/var/minecraft/spigot'
SQL1="select user from (select user, count(*) as freq from (select distinct co_user.user, strftime('%Y%m%d',co_session.time,'unixepoch','localtime') as yyyymmdd from co_session left join co_user on co_session.user = co_user.id) group by user order by freq desc) where freq > 3;"
SQL2="select user from (select user, count(*) as freq from (select distinct co_user.user, strftime('%Y%m%d',co_session.time,'unixepoch','localtime') as yyyymmdd from co_session left join co_user on co_session.user = co_user.id) group by user order by freq desc) where freq > 30;"
DB_PATH='/var/minecraft/spigot/plugins/CoreProtect/database.db'
INSH_PATH='/var/minecraft/spigot/sh/spi_groupaddtemplate.sh'
OUTSH_PATH='/var/minecraft/spigot/sh/spi_groupaddexec.sh'

SQ="'"

cd $SPI_PATH
 
ME=`whoami`
 
if [ $ME == $USERNAME ] ; then
  if pgrep -u $USERNAME -f $SERVICE > /dev/null
    then
      echo "Permission Group Search"
      rm $OUTSH_PATH
      cp $INSH_PATH $OUTSH_PATH
      USERS=`sqlite3 $DB_PATH "$SQL1"`
      for VAR in $USERS
      do
        echo 'screen -p 0 -S $SCNAME -X eval '$SQ'stuff "pex user '$VAR' group add people"\015'$SQ >> $OUTSH_PATH
        echo 'usleep 500000' >> $OUTSH_PATH
      done 
      USERS=`sqlite3 $DB_PATH "$SQL2"`
      for VAR in $USERS
      do
        echo 'screen -p 0 -S $SCNAME -X eval '$SQ'stuff "pex user '$VAR' group add citizen"\015'$SQ >> $OUTSH_PATH
        echo 'usleep 500000' >> $OUTSH_PATH
      done
      echo 'else' >> $OUTSH_PATH
      echo 'echo "$SERVICE was not running."' >> $OUTSH_PATH
      echo 'fi' >> $OUTSH_PATH
      echo 'else' >> $OUTSH_PATH
      echo 'echo "Plese run the mincraft user."' >> $OUTSH_PATH
      echo 'fi' >> $OUTSH_PATH
      /bin/bash $OUTSH_PATH
      echo "Permission Group Add Finish"
    else
      echo "$SERVICE was not runnning."
      exit 1
  fi
else
  echo "Please run the minecraft user."
  exit 1
fi
