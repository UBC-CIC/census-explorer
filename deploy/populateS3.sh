#!/bin/sh

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

# TODO: change this to dynamic bucket name
BUCKET=amplify-censusexplorer-dev-162813-geotop-s3bucket-26qyek0oft6x
cd "./data"

FULL_PATH="full/*"
OUTLINE_PATH="outlines/*"

# for f in $FULL_PATH
# do
#   echo "Processing $f file..."
#   # aws s3api get-object --bucket $BUCKET --key $f /dev/null | q
#   aws s3api put-object --bucket $BUCKET --key $f --body $f
# done

# for f in $OUTLINE_PATH
# do
#   aws s3api put-object --bucket $BUCKET --key $f --body $f
#   echo "Processing $f file..."
# done

aws s3 sync ./full "s3://$BUCKET/full"
aws s3 sync ./outlines "s3://$BUCKET/outlines"
