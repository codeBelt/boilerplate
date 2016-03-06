#!/usr/bin/env sh

BASE="$(cd "$(dirname "$_")"; pwd)"
PLATFORM=$(uname | tr '[A-Z]' '[a-z]')
ARCH=$(getconf LONG_BIT)
STANDALONE_DIR="$BASE/node/$PLATFORM-x$ARCH"
NODE_DIR="$HOME/.node"
NODE_VERSION="5.1.0"
STANDALONE=false

print_help()
{
    IFS='%'
    echo "Usage: ./node-install.sh [options...]
 -i, --install     Install node
 -u, --uninstall   Uninstall node
 -s, --standalone  Bundle a standalone version of node inside of this project, instead of installing globally
 -h, --help        Show this help message"
    unset IFS
}

if [ $# -eq 0 ]; then
    print_help
    exit 1
fi

for var in "$@"
do
    case $var in
        "--help" | "-h")
            print_help
            exit 1
            ;;
        "--install" | "-i")
            UNINSTALL=false
            ;;
        "--uninstall" | "-u")
            UNINSTALL=true
            ;;
        "--standalone" | "-s")
            STANDALONE=true
            ;;
        *)
    esac
done

if [ -z "$UNINSTALL" ]; then
    echo "node-install: install or uninstall flag must be set."
    echo
    print_help
    exit 1
fi

unset IFS

log ()
{
    printf ":: $1\n"
}

install ()
{
    export N_PREFIX=$HOME/.node
    export PATH=$N_PREFIX/bin:$PATH

    log "INSTALLING NODE..."
    mkdir -p $N_PREFIX/bin
    curl -o $N_PREFIX/bin/n https://raw.githubusercontent.com/visionmedia/n/master/bin/n
    chmod +x $N_PREFIX/bin/n
    n "v$NODE_VERSION"

    log "INSTALLING GLOBAL DEPENDENCIES..."
    npm install --global bower
    npm install --global grunt-cli
    log 'OK'

    printf '=============================================================\n'
    printf 'YOU ARE NOT DONE YET!\n'
    printf '\n'
    printf '1. Look for a hidden file in your home directory called .profile or\n'
    printf '   .bash_profile.\n'
    printf '2. Open the .profile or .bash_profile file in an editor. Append the\n'
    printf '   following lines to the bottom:\n'
    printf '   export N_PREFIX=$HOME/.node\n'
    printf '   export PATH=$N_PREFIX/bin:$PATH\n'
    printf '3. Open a new terminal window (if you are already logged into a terminal\n'
    printf '   window, log out/close the session)\n'
    printf '4. Ensure node is working correctly by entering the following:\n'
    printf '   node --version\n'
    printf '=============================================================\n\n'
}

uninstall ()
{
    log "UNINSTALLING LOCAL NODE..."
    rm -rf "$NODE_DIR"
	log 'OK'
}

install_standalone ()
{
    printf ":: INSTALLING NODE v%s TO %s...\n" $NODE_VERSION $STANDALONE_DIR
    SLUG="node-v$NODE_VERSION-$PLATFORM-x$ARCH"
    URL="http://nodejs.org/dist/v$NODE_VERSION/$SLUG.tar.gz"
    mkdir -p "$STANDALONE_DIR"
    curl -L "$URL" | tar fxz - --strip-components=1 -C "$STANDALONE_DIR"
    chmod 770 "$STANDALONE_DIR/bin/node"
    log "INSTALLING GLOBAL DEPENDENCIES..."
    "$STANDALONE_DIR/bin/npm" install --global bower
    "$STANDALONE_DIR/bin/npm" install --global grunt-cli
    printf ":: OK, STANDALONE NODE INSTALLED AT %s" $STANDALONE_DIR
}

uninstall_standalone ()
{
    log "UNINSTALLING STANDALONE NODE..."
    rm -rf "$STANDALONE_DIR"
    log 'OK'
}

# argument logic
if [ "$UNINSTALL" = false ] && [ "$STANDALONE" = false ]; then
    install
elif [ "$UNINSTALL" = true ] && [ "$STANDALONE" = false ]; then
    uninstall
elif [ "$UNINSTALL" = false ] && [ "$STANDALONE" = true ]; then
    install_standalone
elif [ "$UNINSTALL" = true ] && [ "$STANDALONE" = true ]; then
    uninstall_standalone
fi

log 'DONE'
