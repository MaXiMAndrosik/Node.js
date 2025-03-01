# Node.js

### Версия NPM
npm -v 

### Инициализировать проект NPM
npm init -y

### Установить пакет
npm install <package-name> - зависимость типа dependencies

npm install -D <package-name>  зависимость типа devDependencies


### Удалить пакет
npm uninstall <package-name>

### Скрипты NPM
npm run {script_name_from_package_json}

### Установка зависимостей
npm install - установит зависимости и обновит все пакеты указанные в package.json

npm ci - установит зависимости указанные в package.json

### Список всех установленных пакетов и их версии
npm list или npm ls

### Информация о пакете из npm registry
npm view <package-name> или npm v <package-name>

### Поиск пакета в npm registry по ключевому слову
npm search <keyword> или npm s <keyword>