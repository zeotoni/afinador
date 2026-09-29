# Afination

Afinador de violão simples, leve e instalável — sem anúncios, sem cadastro, sem complicação. Abra, toque a corda e afine.

**Testar agora:** [afination.vercel.app](https://afination.vercel.app/)

## Sobre

A maioria dos afinadores online vem carregada de anúncios e distrações. O Afination faz uma coisa só: captura o som do microfone, detecta a nota e mostra se você precisa apertar ou afrouxar a corda — direto, sem enrolação.

## Funcionalidades

- 🎯 Detecção de pitch em tempo real via microfone
- 🎵 Exibição da nota detectada e sua frequência (Hz)
- 📊 Indicador visual de afinação (grave / afinado / agudo)
- 📱 PWA instalável — funciona offline, direto da tela inicial do celular
- ⚡ Leve: sem frameworks, sem dependências pesadas

## Tecnologias

- JavaScript puro (ES Modules), sem frameworks
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) para captura de áudio
- [Pitchy](https://github.com/ianprime0509/pitchy) para detecção de frequência
- Service Worker + Web App Manifest (PWA)
- Vercel (hospedagem)

## Estrutura

```
afination/
├── index.html
├── LICENSE
├── manifest.json
├── package.json
├── README.md
├── sw.js
├── vercel.json
└── app/
    ├── css/
    ├── js/
    │   └── vendor/      # pitchy.js empacotado localmente
    ├── images/
    └── icons/
```

## Rodando localmente

Como o app usa o microfone, ele precisa ser servido em um contexto seguro (HTTPS ou `localhost`).

```bash
git clone https://github.com/zeotoni/afination.git
cd afination
npx serve
```

Acesse o endereço mostrado no terminal (geralmente `http://localhost:3000`).

## Atualizando a biblioteca de detecção de pitch

O app usa a [Pitchy](https://github.com/ianprime0509/pitchy) para detectar a frequência, empacotada localmente em `app/js/vendor/pitchy.js` (não é carregada de CDN, para funcionar offline). Para gerar esse arquivo de novo (por exemplo, após atualizar a versão):

```bash
npm install
npx esbuild node_modules/pitchy/index.js --bundle --format=esm --outfile=app/js/vendor/pitchy.js
```

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](./LICENSE) para mais detalhes.

## Autor

Desenvolvido por [Ezequiel Otoni](https://github.com/zeotoni)