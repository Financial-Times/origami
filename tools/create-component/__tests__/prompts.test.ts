import {prompt, filesystem} from 'gluegun';
import {stdin} from 'mock-stdin';
import {delay, keys} from '../helpers/test-utils';
import {componentName, questions} from '../helpers/questions';

import {
	sanitizeName,
	oComponentsPath,
	generateKeywords,
} from '../helpers/utils';
const confirmQuestion = {
	type: 'confirm',
	name: 'confirm',
	message: 'Are you sure?',
	initial: true,
};

describe('Prompts:', () => {
	const [description, keywords, form, status, brands, javascript, scss] =
		questions;
	let io;
	beforeAll(() => (io = stdin()));
	afterAll(() => io.restore());
	describe('Prompts: name', () => {
		it('should accept a correctly formatted name', async done => {
			const sendKeystrokes = async () => {
				io.send('o-test-name');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answers = await prompt.ask(componentName);
			expect(answers.name).toEqual('o-test-name');
			done();
		});

		describe('should sanitise and check a name that has been incorrectly formatted', () => {
			const testNameFormatting = async name => {
				const sendKeystrokes = async () => {
					io.send(name);
					io.send(keys.enter);
					await delay(10);
					io.send(keys.enter);
				};
				setTimeout(() => sendKeystrokes().then(), 5);
				const answers = await prompt.ask([componentName, confirmQuestion]);
				if (answers.confirm) {
					answers.name = sanitizeName(answers.name);
				}
				expect(answers).toEqual({name: 'o-test-name', confirm: true});
			};
			it('with spaces', async done => {
				await testNameFormatting('o test name');
				done();
			});

			it('with camel case', async done => {
				await testNameFormatting('oTestName');
				done();
			});

			it('with non-hyphen characters', async done => {
				await testNameFormatting('o-test-name');
				done();
			});

			it('with excess hyphens', async done => {
				await testNameFormatting('o-test-name');
				done();
			});

			it('if check is not approved, asks name again', async done => {
				const sendKeystrokes = async () => {
					io.send('o test-name');
					io.send(keys.enter);
					await delay(10);
					io.send('n');
					await delay(10);
					io.send('o-test-component');
					io.send(keys.enter);
					await delay(10);
					io.send(keys.enter);
				};
				setTimeout(() => sendKeystrokes().then(), 5);
				const answers = await prompt.ask([
					componentName,
					confirmQuestion,
					componentName,
					confirmQuestion,
				]);

				expect(answers).toEqual({name: 'o-test-component', confirm: true});
				done();
			});
			it('if name exists, asks name again', async done => {
				const sendKeystrokes = async () => {
					io.send('o buttons');
					io.send(keys.enter);
					await delay(10);
					io.send('y');
				};
				setTimeout(() => sendKeystrokes().then(), 5);
				let answers = await prompt.ask([componentName, confirmQuestion]);
				if (answers.confirm) {
					answers.name = sanitizeName(answers.name);
					if (filesystem.list(oComponentsPath).includes(answers.name)) {
						const sendKeystrokes = async () => {
							io.send('o-test-component');
							io.send(keys.enter);
							await delay(10);
							io.send(keys.enter);
						};
						setTimeout(() => sendKeystrokes().then(), 5);
						answers = await prompt.ask([componentName, confirmQuestion]);
					}
				}
				expect(answers).toEqual({name: 'o-test-component', confirm: true});
				done();
			});
		});
	});

	describe('Prompts: description', () => {
		it('should return description', async done => {
			const sendKeystrokes = async () => {
				io.send('bla bla test description');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([description]);
			expect(answer.description).toEqual('bla bla test description');
			done();
		});
		it('if no description provided promt the question again', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
				await delay(10);
				io.send('new description after re-prompt');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([description]);
			expect(answer.description).toEqual('new description after re-prompt');
			done();
		});
	});

	describe('Prompts: keywords', () => {
		it('should return array of keywords if input is separated by space', async done => {
			const sendKeystrokes = async () => {
				io.send('git new component');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([
				'git',
				'new',
				'component',
			]);
			done();
		});

		it('should return array of keywords if input is separated by commas', async done => {
			const sendKeystrokes = async () => {
				io.send('git, new, component');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([
				'git',
				'new',
				'component',
			]);
			done();
		});

		it('should return array of keywords if input is separated by mix of commas and spaces', async done => {
			const sendKeystrokes = async () => {
				io.send('git new,     component');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([
				'git',
				'new',
				'component',
			]);
			done();
		});

		it('should return empty array if no input provided', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([]);
			done();
		});
	});

	describe('Prompts: form', () => {
		it('Returns Defaults', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([form]);
			expect(answer.team).toEqual({
				githubTeam: 'origami-core',
				email: 'origami.support@ft.com',
				slack: '#origami-support',
			});
			done();
		});
		it('Returns correct details if default changed', async done => {
			const sendKeystrokes = async () => {
				io.send('test.email@ft.com');
				io.send(keys.down);
				await delay(10);
				io.send('#test-slack');
				io.send(keys.down);
				await delay(10);
				io.send('test-github-team');
				await delay(10);
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([form]);
			expect(answer.team).toEqual({
				githubTeam: 'test-github-team',
				email: 'test.email@ft.com',
				slack: '#test-slack',
			});
			done();
		});

		it('Returns default slack when skipped to specify', async done => {
			const sendKeystrokes = async () => {
				io.send('test.email@ft.com');
				io.send(keys.down);
				await delay(10);
				io.send(keys.down);
				await delay(10);
				io.send('test-github-team');
				await delay(10);
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([form]);
			expect(answer.team).toEqual({
				githubTeam: 'test-github-team',
				email: 'test.email@ft.com',
				slack: '#origami-support',
			});
			done();
		});
	});

	describe('Prompts: status', () => {
		it('Returns initial value', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([status]);
			expect(answer.status).toEqual('experimental');
			done();
		});
		it('Returns `active` if user hits keyup', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.up);
				await delay(10);
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([status]);
			expect(answer.status).toEqual('active');
			done();
		});
		it('Returns `maintained` if user hits keydown', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.down);
				await delay(10);
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([status]);
			expect(answer.status).toEqual('maintained');
			done();
		});
	});

	describe('Prompts: brands', () => {
		it('Returns core by default', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([brands]);
			expect(answer.brands).toEqual(['core']);
			done();
		});
		it('Selecting all brands', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.down);
				io.send(keys.space);
				io.send(keys.down);
				io.send(keys.space);
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([brands]);
			expect(answer.brands).toEqual(['core', 'internal', 'whitelabel']);
			done();
		});
	});

	describe('Prompt: javascript', () => {
		it('Returns true if selected', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([javascript]);
			expect(answer.javascript).toEqual(true);
			done();
		});
		it('Returns false if not selected', async done => {
			const sendKeystrokes = async () => {
				io.send('n');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([javascript]);
			expect(answer.javascript).toEqual(false);
			done();
		});
	});
	describe('Prompt: scss', () => {
		it('Returns true if selected', async done => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([scss]);
			expect(answer.scss).toEqual(true);
			done();
		});
		it('Returns false if not selected', async done => {
			const sendKeystrokes = async () => {
				io.send('n');
				io.send(keys.enter);
			};
			setTimeout(() => sendKeystrokes().then(), 5);
			const answer = await prompt.ask([scss]);
			expect(answer.scss).toEqual(false);
			done();
		});
	});
});
