# DeviceResourceApp

Aplicativo React Native (Expo) que solicita permissão ao usuário e acessa dois recursos nativos do dispositivo:

- **Galeria de fotos** — seleção e exibição de imagem (`expo-image-picker`)
- **Lista de contatos** — leitura e exibição em lista otimizada (`expo-contacts`)

Desenvolvido seguindo o guia "Manipulando galeria de imagens e contatos em React Native".

## Requisitos

- Node.js instalado
- Expo CLI (`npm install -g expo-cli`, ou use `npx`)
- App **Expo Go** instalado no celular (Android/iOS) ou um emulador configurado

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/Lc-Davila/Device-Resources-App)
cd DeviceResourceApp/meu-app-mobile

# 2. Instale as dependências
npm install

# 3. Inicie o aplicativo
npx expo start
```

Escaneie o QR Code exibido no terminal/navegador com o app **Expo Go**, ou pressione `a` / `i` no terminal para abrir em um emulador Android/iOS.

## Funcionalidades

1. **Permissões configuradas** em `app.json`:
   - iOS (`infoPlist`): `NSPhotoLibraryUsageDescription`, `NSContactsUsageDescription`
   - Android (`permissions`): `READ_CONTACTS`, `WRITE_CONTACTS`, `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`

2. **Seleção de imagem** (`src/components/ImagePickerComponent.js`)
   - Solicita permissão de acesso à galeria antes de abrir o seletor
   - Exibe a imagem escolhida na tela
   - Trata cancelamento da seleção

3. **Lista de contatos** (`src/components/ContactsComponent.js`)
   - Solicita permissão de acesso aos contatos
   - Carrega nome, telefones e e-mails com `expo-contacts`
   - Exibe os dados em uma `FlatList` (renderização otimizada/preguiçosa)
   - Ícones de telefone/e-mail via `@expo/vector-icons` (FontAwesome)

4. **Tratamento de permissão negada**
   - Se o usuário recusar a permissão (galeria ou contatos), um `Alert` informativo é exibido e uma mensagem permanece na tela avisando que o recurso está indisponível, sem quebrar o app.

5. **Tratamento de erros**
   - `try/catch` ao buscar contatos, com `Alert` amigável em caso de falha.

## Estrutura do projeto

```
meu-app-mobile/
├── App.js
├── app.json
├── babel.config.js
├── package.json
├── src/
│   └── components/
│       ├── ImagePickerComponent.js
│       └── ContactsComponent.js
└── assets/
```
