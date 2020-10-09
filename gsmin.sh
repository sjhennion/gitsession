#!/bin/bash

echo '1'
while getopts 'cj' FLAG; do
	case "$FLAG" in
		c) 
			echo "create session"
			;;
		j) 
			echo 'join session'
			;;
		*)
		   	echo 'uh oh'
			;;
	esac
done
echo '2'
