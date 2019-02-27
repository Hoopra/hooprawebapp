echo 'installing Homebrew'
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

echo 'installing git, nvm, make'
brew install git nvm
echo 'installing node'
nvm install node && nvm use node
