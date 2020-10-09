#!/bin/bash

main() {
	if [ "$1" == "c" ]; then
		create_session
	elif [ "$1" == "s" ]; then
		save_session
	elif [ "$1" == "j" ]; then
		join_session $2
	else
		echo "gs requires a command"
	fi
}

create_session() {
	if [ -f "commit_id" ]; then
		echo "Please remove existing commit_id file before creating new session"
		exit 0
	fi

	b_id=$(uuidgen | cut -c1-8)

	echo "$b_id"

	git checkout -b gs-"$b_id"

	echo 1 > commit_id

	# Somehow detect changes

	# On change:

	#git add . 

	#git commit -m "$(echo commit_id)"

	#git push
}

save_session() {
	if [ ! -f "commit_id" ]; then
		echo "No session when saving, please create session first"
	fi

	commit_id=$(cat commit_id)
	echo $commit_id
	msg="Commit $commit_id"

	git add .
	git commit -m "$msg"

	commit_id=$(($commit_id+1))
	echo $commit_id > commit_id
}

join_session() {
	if [ -z $1 ]; then
		echo "Join requires session id"
		exit 0
	fi
	msg="Joining $1"
	echo "$msg"
}

main $1 $2
