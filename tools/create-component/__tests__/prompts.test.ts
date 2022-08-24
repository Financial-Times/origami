import {prompt} from 'gluegun';
import * as jetPack from 'fs-jetpack';
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
		it('should accept a correctly formatted name', async () => {
			const sendKeystrokes = async () => {
				io.send('o-test-name');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answers = await prompt.ask(componentName);
			expect(answers.name).toEqual('o-test-name');
		});

		describe('should sanitise and check a name that has been incorrectly formatted', () => {
			const testNameFormatting = async name => {
				const sendKeystrokes = async () => {
					io.send(name);
					io.send(keys.enter);
					await delay(10);
					io.send(keys.enter);
				};
				setTimeout(async () => await sendKeystrokes(), 5);
				const answers = await prompt.ask([componentName, confirmQuestion]);
				if (answers.confirm) {
					answers.name = sanitizeName(answers.name);
				}
				expect(answers).toEqual({name: 'o-test-name', confirm: true});
			};
			it('with spaces', async () => {
				await testNameFormatting('o test name');
			});

			it('with camel case', async () => {
				await testNameFormatting('oTestName');
			});

			it('with non-hyphen characters', async () => {
				await testNameFormatting('o-test-name');
			});

			it('with excess hyphens', async () => {
				await testNameFormatting('o-test-name');
			});

			it('if check is not approved, asks name again', async () => {
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
				setTimeout(async () => await sendKeystrokes(), 5);
				const answers = await prompt.ask([
					componentName,
					confirmQuestion,
					componentName,
					confirmQuestion,
				]);

				expect(answers).toEqual({name: 'o-test-component', confirm: true});
			});
			it('if name exists, asks name again', async () => {
				const sendKeystrokes = async () => {
					io.send('o buttons');
					io.send(keys.enter);
					await delay(10);
					io.send('y');
				};
				setTimeout(async () => await sendKeystrokes(), 5);
				let answers = await prompt.ask([componentName, confirmQuestion]);
				if (answers.confirm) {
					answers.name = sanitizeName(answers.name);
					if (jetPack.list(oComponentsPath).includes(answers.name)) {
						const sendKeystrokes = async () => {
							io.send('o-test-component');
							io.send(keys.enter);
							await delay(10);
							io.send(keys.enter);
						};
						setTimeout(async () => await sendKeystrokes(), 5);
						answers = await prompt.ask([componentName, confirmQuestion]);
					}
				}
				expect(answers).toEqual({name: 'o-test-component', confirm: true});
			});
		});
	});

	describe('Prompts: description', () => {
		it('should return description', async () => {
			const sendKeystrokes = async () => {
				io.send('bla bla test description');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([description]);
			expect(answer.description).toEqual('bla bla test description');
		});
		it('if no description provided promt the question again', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
				await delay(10);
				io.send('new description after re-prompt');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([description]);
			expect(answer.description).toEqual('new description after re-prompt');
		});
	});

	describe('Prompts: keywords', () => {
		it('should return array of keywords if input is separated by space', async () => {
			const sendKeystrokes = async () => {
				io.send('git new component');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([
				'git',
				'new',
				'component',
			]);
		});

		it('should return array of keywords if input is separated by commas', async () => {
			const sendKeystrokes = async () => {
				io.send('git, new, component');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([
				'git',
				'new',
				'component',
			]);
		});

		it('should return array of keywords if input is separated by mix of commas and spaces', async () => {
			const sendKeystrokes = async () => {
				io.send('git new,     component');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([
				'git',
				'new',
				'component',
			]);
		});

		it('should return empty array if no input provided', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([keywords]);
			expect(generateKeywords(answer.keywords)).toEqual([]);
		});
	});

	describe('Prompts: form', () => {
		it('Returns Defaults', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([form]);
			expect(answer.team).toEqual({
				githubTeam: 'origami-core',
				email: 'origami.support@ft.com',
				slack: '#origami-support',
			});
		});
		it('Returns correct details if default changed', async () => {
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
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([form]);
			expect(answer.team).toEqual({
				githubTeam: 'test-github-team',
				email: 'test.email@ft.com',
				slack: '#test-slack',
			});
		});

		it('Returns default slack when skipped to specify', async () => {
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
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([form]);
			expect(answer.team).toEqual({
				githubTeam: 'test-github-team',
				email: 'test.email@ft.com',
				slack: '#origami-support',
			});
		});
	});

	describe('Prompts: status', () => {
		it('Returns initial value', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([status]);
			expect(answer.status).toEqual('experimental');
		});
		it('Returns `active` if user hits keyup', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.up);
				await delay(10);
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([status]);
			expect(answer.status).toEqual('active');
		});
		it('Returns `maintained` if user hits keydown', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.down);
				await delay(10);
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([status]);
			expect(answer.status).toEqual('maintained');
		});
	});

	describe('Prompts: brands', () => {
		it('Returns core by default', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([brands]);
			expect(answer.brands).toEqual(['core']);
		});
		it('Selecting all brands', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.down);
				io.send(keys.space);
				io.send(keys.down);
				io.send(keys.space);
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([brands]);
			expect(answer.brands).toEqual(['core', 'internal', 'whitelabel']);
		});
	});

	describe('Prompt: javascript', () => {
		it('Returns true if selected', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([javascript]);
			expect(answer.javascript).toEqual(true);
		});
		it('Returns false if not selected', async () => {
			const sendKeystrokes = async () => {
				io.send('n');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([javascript]);
			expect(answer.javascript).toEqual(false);
		});
	});
	describe('Prompt: scss', () => {
		it('Returns true if selected', async () => {
			const sendKeystrokes = async () => {
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([scss]);
			expect(answer.scss).toEqual(true);
		});
		it('Returns false if not selected', async () => {
			const sendKeystrokes = async () => {
				io.send('n');
				io.send(keys.enter);
			};
			setTimeout(async () => await sendKeystrokes(), 5);
			const answer = await prompt.ask([scss]);
			expect(answer.scss).toEqual(false);
		});
	});
});
