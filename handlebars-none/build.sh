#!/bin/sh

set -e

BASE="$(cd "$(dirname "$_")"; pwd)"
PLATFORM=$(uname | tr '[A-Z]' '[a-z]')
ARCH=$(getconf LONG_BIT)
NODE_DIR="$BASE/tools/node/$PLATFORM-x$ARCH"
NODE_VERSION="v5.1.0"

if [ -e "$NODE_DIR" ]; then
    # If a standalone node installation exists, use that

    NODE="$NODE_DIR/bin/node"
    chmod 770 "$NODE"

    printf ':: Standalone node installation found! (%s)\n' "$($NODE -v)"
    printf ':: Location: %s\n' "$NODE"
    printf ':: Installing dependencies...\n'
    "$NODE_DIR/bin/npm" install
    "$NODE" "$NODE_DIR/bin/bower" install

    printf ':: Performing Grunt build...\n'
    "$NODE" "$NODE_DIR/bin/grunt" $@
else
    # Otherwise, assume local install is available
    NODE="node"

    printf ':: Node installation found! (%s)\n' "$(node -v)"
    printf ':: Installing dependencies...\n'
    npm install
    bower install

    printf ':: Performing Grunt build...\n'
    grunt $@
fi

# Check the installed version of node with the latest version
# If installed node is not up-to-date, echo a message
check_node_version()
{
    if [ "$1" != $NODE_VERSION ]; then
        printf ':: NOTE: This version of the boilerplate was most recently tested with node %s. You are using %s.\n' "$NODE_VERSION" "$1"
        printf ':: If the build is failing, please use node %s.\n' "$NODE_VERSION"
    fi
}

check_node_version "$($NODE -v)"

printf 'DONE'
