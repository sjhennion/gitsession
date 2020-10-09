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

	#generate our branch id and checkout our branch
	b_id=$(uuidgen | cut -c1-8)
	git checkout -b gs-"$b_id"

	#setup our session state
	echo 0 > commit_id
	git log --format="%H" -n 1 > start_hash

	#push the initial commit 
	git add . 
	git commit -m "Initial commit for branch $b_id"
	#git push --set-upstream origin gs-"$b_id"
}

save_session() {
	if [ ! -f "commit_id" ]; then
		echo "No session when saving, please create session first"
	fi

	#increment commit_id
	commit_id=$(cat commit_id)
	commit_id=$(($commit_id+1))
	echo $commit_id > commit_id

	#build our commit message with the new commit id
	msg="Commit $commit_id"
	echo $msg

	#create the commit
	git add .
	git commit -m "$msg"

	#push changes
	#git push
}

join_session() {
	if [ -z $1 ]; then
		echo "Join requires session id"
		exit 0
	fi
	msg="Joining $1"
	echo "$msg"

	pull_msg=$(git pull)
	no_update_pull_msg="Already up to date."
	while true; do
		echo ".$pull_msg."
		echo ".$no_update_pull_msg."
		if [ pull_msg != no_update_pull_msg ]; then
			echo "Updates available!"
		fi
		sleep 1;
	done
}

main $1 $2
