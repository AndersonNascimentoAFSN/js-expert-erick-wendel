#!/bin/bash

CONTENT="use strict"
DEPENDENCIES=("ipt")

# Verifica se as dependências estão instaladas
# npm list -g ipt

for dep in $DEPENDENCIES; do
  if ! which $dep > /dev/null; then
    echo "É necessário instalar o $dep para continuar!"
    exit 1
  fi
done

DIRS=$(find . -type f -name "*.js" -not -path "*node_modules**" -exec grep -L "use strict" {} +)

# Muda apenas os selecionados, por meio do ipt:
# if [ -z "$DIRS" ]; then
#   echo "Todos os arquivos encontrados possuem a string: '$CONTENT'!"
# else
#   echo "Arquivos encontrados: $DIRS"
#   echo $DIRS \
#   | ipt -o \
#   | xargs -I '{file}' sed -i -e "1i '$CONTENT';\n" {file}
# fi

# Mudar tudo!
if [ -z "$DIRS" ]; then
  echo "Todos os arquivos encontrados possuem a string: '$CONTENT'!"
else
  echo "Arquivos encontrados: $DIRS"
  echo $DIRS | xargs -I '{file}' sed -i -e "1i '$CONTENT';\n" {file}
fi


#### SEM OS IF's ####:

# Mudar tudo! 
# find . -type f -name "*.js" -not -path "*node_modules**" -exec grep -L "use strict" {} + \
# | xargs -I '{file}' sed -i -e "1i '$CONTENT';\n" {file}

# Muda apenas o selecionados, por meio do ipt
# find . -type f -name "*.js" -not -path "*node_modules**" -exec grep -L "use strict" {} + \
# | ipt -o \
# | xargs -I '{file}' sed -i -e "1i '$CONTENT';\n" {file} 


