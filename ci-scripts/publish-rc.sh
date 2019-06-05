#! /bin/bash
echo "starting"
set -e

git config --global user.email "hannahvanseeters@gmail.com"
git config --global user.name "hertweckhr1"

npm run std-version -- --prerelease rc --no-verify

git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" "$TRAVIS_BRANCH" > /dev/null 2>&1;

cd lib 

npm publish --tag prerelease
