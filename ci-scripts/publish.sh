#! /bin/bash

set -e

git config --global user.email "hannahvanseeters@gmail.com"
git config --global user.name "hertweckhr1"

# delete temp branch
git push "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" ":$TRAVIS_BRANCH" > /dev/null 2>&1;

std_ver=$(npm run std-version)
release_tag=$(echo "$std_ver" | grep "tagging release" | awk '{print $4}')

echo "$std_ver"

git push --follow-tags "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG" master > /dev/null 2>&1;

npm run build:copy-files

cd lib

npm publish

cd ..

# run this after publish to make sure GitHub finishes updating from the push
npm run release:create -- --repo $TRAVIS_REPO_SLUG --tag $release_tag --branch master

npm run build-doc
npm run deploy -- --repo "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG"
