import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {loadCsf} from '@storybook/csf-tools';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSbMetadata() {
	const componentsDir = path.join(__dirname, '..', '..', '..', 'components');

	const dirContent = fs
		.readdirSync(componentsDir)
		.filter(dir => dir.startsWith('o3-'));
	const storyFiles = [];
	// check if the dir has a stories file
	dirContent.forEach(dir => {
		const storiesFiles = getStoriesFiles(path.join(componentsDir, dir));
		if (storiesFiles.length) {
			storyFiles.push(...storiesFiles);
		}
	});
	const linksJson = JSON.parse(fs.readFileSync(__dirname + '/links.json'));
	storyFiles.forEach(file => {
		const {_stories} = extractStoryFileMetaData(file);
		const ids = getStoryIds(_stories);

		const linkIds = Object.keys(linksJson);
		const missingLinks = ids.filter(id => !linkIds.includes(id));
		if (missingLinks.length) {
			missingLinks.forEach(id => {
				linksJson[id] = {
					figma: '',
					sb: `?path=/story/${id}`,
				};
			});
		}
	});
	fs.writeFileSync(
		__dirname + '/links.json',
		JSON.stringify(linksJson, null, 2)
	);
}

function getStoriesFiles(dir, fileList = []) {
	// recursively get all files in the directory that contain .stories. in its name
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			getStoriesFiles(filePath, fileList);
		} else if (file.includes('.stories.')) {
			fileList.push(filePath);
		}
	});
	return fileList;
}

function extractStoryFileMetaData(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	const makeTitle = userTitle => userTitle || 'default';
	const csfObj = loadCsf(content, {makeTitle}).parse();
	const {_meta, _stories} = csfObj;
	return {_meta, _stories};
}

function getStoryIds(stories) {
	const keys = Object.keys(stories);
	const ids = [];
	keys.forEach(key => {
		ids.push(stories[key].id);
	});
	return ids;
}

generateSbMetadata();


export const links = JSON.parse(fs.readFileSync(__dirname + '/links.json'));
