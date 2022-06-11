wt -p "ProjetoEstoqueMaven" cmd /k "mvn spring-boot:run"; ^
split-pane -H -p "ProjetoEstoqueMaven" cmd /k "wsl docker-compose up"; ^
split-pane -V -p "ProjetoEstoqueFrontend" cmd /k "npm start";