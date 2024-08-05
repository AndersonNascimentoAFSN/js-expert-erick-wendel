FOLDER_AMOUNT=4

for index in $(seq 1 $FOLDER_AMOUNT); do
  # folder=$([ $index -ge 3 ] && echo "bash-0$index" || echo "shell-0$index")
  if [ $index -ge 3 ]; then
    folder="bash-0$index"
  else
    folder="shell-0$index"
  fi

  mkdir -p $folder
  cd $(pwd)/$folder
  npm init -y --scope @andersonnascimentoafsn --silent > /dev/null
  cat package.json | jq '{n: .name, v: .version}'
  cd .. 
  echo $folder

done

rm -rf bash* shell*