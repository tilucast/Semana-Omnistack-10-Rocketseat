<img src="images/omnistack.png" align="center"></img>

<h1 align="center">Semana Omnistack 10</h1>
<p align="center">Projeto <strong>DevRadar</strong> da <strong>Rocketseat</strong></p>

<p align="center">
  <a  href="https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V12.md#12.14.1">
    <img src="https://img.shields.io/badge/node.js@lts-12.14.1-informational?logo=Node.JS"></img>
  </a>
  <a  href="https://github.com/facebook/react/blob/master/CHANGELOG.md#16120-november-14-2019">
    <img src="https://img.shields.io/badge/react-16.12.0-informational?logo=react"></img>
  </a>
  <a  href="https://www.npmjs.com/package/expo-cli/v/3.11.5">
    <img src="https://img.shields.io/badge/expo--CLI-3.11.5-informational?logo=expo"></img>
  </a>
</p>

# Instalação

Confira a documentação do <a href="https://docs.mongodb.com/guides/">MongoDB</a> para maiores informações de como configurar o servidor.

Após a instalação e configuração do Mongo, execute os seguintes comandos em sua cmd :

```
yarn install
yarn dev
```

Após isso, o servidor estará rodando com o <strong>Nodemon</strong>.

=======================================================================================

# Frontend

Na pasta web, digite os seguintes comando para iniciar e rodar o projeto **Frontend** :

```
yarn install
yarn start
```

Uma página vai abrir no seu navegador, e a partir desta , poderá cadastrar usuários do **Github** válidos !

<img src="images/web" align="center"></img>

=======================================================================================

# Mobile

Para rodar a versão **Mobile**, confira a documentação do <a href="https://docs.expo.io/versions/latest/workflow/expo-cli/">Expo</a>. Também é aconselhável olhar a documentação do <a href="https://facebook.github.io/react-native/docs/getting-started">React Native</a>.

Após instalação do expo, vá na pasta **src/services/api.js** e troque o endereço pelo seu próprio.
Vale dizer que você pode rodar o expo tanto em algum emulador, como no seu próprio celular.
Caso opte por rodar no seu celular, instale o app **Expo**, disponível na Play Store e na App Store.

Após isso, digite em sua cmd :

```
yarn install
yarn start
```

A interface do **Expo** irá abrir em seu navegador, e nela você encontrará informações como seu endereço, e as opções para rodar em seu emulador, fora o QR Code, para rodar no seu celular:

<img src="images/expo_interface" align="center"></img>

Clique na opção correspondente ao seu emulador, e caso esteja usando o celular, abra o app e escaneie o QR Code, e o app irá abrir no seu dispositivo.

_O app está configurado para achar devs cadastrados a no máximo 10km de distância. Você pode alterar essa configuração na função **findConnections(), na pasta src/websocket.js** e na função **async index, na pasta src/controllers/SearchController.js**_

<img src="images/mobile" align="center"></img>

=======================================================================================

# Insomnia

Para testar a funcionalidade do **backend**, usamos no projeto o <a href="https://insomnia.rest/">Insomnia</a>.

Disponibilizei as configurações usadas no arquivo em **insomnia_exports.json**.

Baixe o Insomnia no link acima, e importe as configurações.

O resultado será esse após esse processo:

<img src="images/insomnia" align="center"></img>

=======================================================================================

# Desafios

Dentre os desafios propostos, o único que consegui fazer foi o de ajustar a altura do input em relação a altura do teclado, usando a propriedade **keyBoardAvoidingView**, importada do React Native.
