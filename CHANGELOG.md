# Changelog

Todas alterações neste projeto serão documentadas neste arquivo.

Este projeto utiliza o [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Próxima sprint]

### Funcionalidades

- Consertado o reload dos arquivos no Cypress.
- Removidas as libs do package.json que não estavam sendo utilizadas.
- Melhora os testes dos monkis.
- Conserta traduções.
- Altera a função de deletar os bancos locais para limpar os bancos, pois não existe suporte no safari e mozilla para a função IndexedDB.databases().
- Adicionados novos scripts para fazer paralelismo do Cypress no CI.
-

## [0.3.0] - 2020-08-03

### Funcionalidades

- Nova tela para os monkis. [#12446](https://sh.autoseg.com/issues/12446)
- Novo modal de expiração de sessão. [#12443](https://sh.autoseg.com/issues/12443)
- Politica de privacidade alterada para arquivos .MD.

## [0.2.0] - 2020-07-27

### Funcionalidades

- Adicionadas todas telas dos monkis e a funcionalidade de vincular os monkis a uma credencial.
- Atualizadas todas as libs do projeto.

## [0.1.0] - 2020-05-22

### Funcionalidades

- Adicionada a funcionalidade de upload de arquivo em uma credencial. [#11940](https://sh.autoseg.com/issues/11940)

## [0.0.0] - 2020-05-15

### Funcionalidades

- Adicionada a funcionalidade de exportar credencial em um arquivo CSV. [#11935](https://sh.autoseg.com/issues/11935)

[próxima sprint]: https://github.com/autoseg/passmonki-client-v2/compare/v0.3.0...qa
[0.3.0]: https://github.com/autoseg/passmonki-client-v2/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/autoseg/passmonki-client-v2/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/autoseg/passmonki-client-v2/compare/v0.0.0...v0.1.0
[0.0.0]: https://github.com/autoseg/passmonki-client-v2/releases/tag/v0.0.0
