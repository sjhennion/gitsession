merge_training=false
reset_database=false

while getopts ":tr" opt; do
	case ${opt} in
		t ) # process option t
			echo "one"
			merge_training=true     #  <<<<<<<<<<<<<<<
			;;
		r ) # process option r
			echo "two"
			reset_database=true     #  <<<<<<<<<<<<<<<
		;;
   esac
done

shift $(( OPTIND-1 ))
extra="$1"

echo $reset_database
echo $merge_training
echo $extra 