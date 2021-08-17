# source-map-cli

## How to Install ?

```bash
npm install -g @yanal-yves/source-map-cli
```

## How to usse ?

```bash
source-map -s <URL_to_source_maps|_Local_path_to_source_maps> originalPositionFor <javascript_file_name>:<line_number>:<column_number>
```

## How to hack ?

### Test the cli locally

```bash
npm run start -- --s <URL_to_source_maps|_Local_path_to_source_maps> originalPositionFor <javascript_file_name>:<line_number>:<column_number>
```

### Test to pack and install the cli locally

```bash
npm pack
npm install yanal-yves-source-map-cli-X.X.X.tgz -g
```

### Build and publish to npm public registry

Bump the version number in `package.json`

```bash
npm login
rm -rf ./dist
npm run build
npm publish --access public
```

### Unpublish from npm public registry

:warning: After unpublishing `@yanal-yves/source-map-cli` cannot be republished until 24 hours have passed.

```bash
npm unpublish --force @yanal-yves/source-map-cli
```
