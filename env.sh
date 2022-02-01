# line endings must be \n, not \r\n !
echo "window.env = {" > ./src/assets/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> ./src/assets/env-config.js
echo "}" >> ./src/assets/env-config.js
