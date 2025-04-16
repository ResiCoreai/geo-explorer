#!/usr/bin/env bash

# This script fixes duplicated NPM packages when developing locally, e.g.:
# https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react

app_dir=$1

lib_name="@ncsa/geo-explorer"
lib_dir=$(pwd)

lib_link="${app_dir}/node_modules/${lib_name}"

echo "Linking ${lib_name}"
rm -rf "$lib_link"
ln -s "$lib_dir" "$lib_link"
ls -l "$lib_link"
echo

peer_deps=(react )

for dep in "${peer_deps[@]}"; do
  echo "Linking peer dependency: ${dep}"
  dep_link="${lib_dir}/node_modules/${dep}"
  dep_impl="${app_dir}/node_modules/${dep}"
  if [ -d "$dep_impl" ]; then
    rm -rf "$dep_link"
    ln -s "$dep_impl" "$dep_link"
    ls -l "$dep_link"
  fi
  echo
done
