.PHONY: install

install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintfix:
	npx eslint . --fix
jest:
	npm test -- --coverage
gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json