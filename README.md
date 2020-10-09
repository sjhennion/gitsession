# Git Session

A lightweight tool that utilizes git to create a working "session" between multiple machines that are all working out of the same repo, such that you can perform the work on one machine, push changes on the session branch and they'll be picked up by any client sessions that are currently joined.

# Usage

## Create session
`gs c`: this will create a new session, generating a branch id, checking out the branch, creating the initial commit, and creating `commit_id` and `start_hash` files.  These are used to track the starting and current progress of the session from the host perspective.
## Save session
`gs s`: this is used by the host to save the current changes on the session branch and push them for the clients to receive.

## Join session
`gs j SESSION_ID`: this attempts to join a running session by checking out the branch corresponding to the `SESSION_ID`, and then will constantly check for updates, calling `on_update.sh` when a new commit is pulled. Any custom behavior should be definited inside of `on_update.sh`
