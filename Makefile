.PHONY: test

install:
	npm ci --legacy-peer-deps
test:
	npm test
test-coverage:
	npm run test-coverage
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintfix:
	npx eslint . --fix
gendiff:
	gendiff __fixtures__/file1.json __fixtures__/file2.json