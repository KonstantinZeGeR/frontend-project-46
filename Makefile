.PHONY: test

install:
	npm ci --legacy-peer-deps
test:
	npm test
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintfix:
	npx eslint . --fix
test-coverage:
	npm test -- --coverage
gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json