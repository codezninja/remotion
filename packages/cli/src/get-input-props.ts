import fs from 'fs';
import path from 'path';
import {parsedCli} from './parse-command-line';

export const getInputProps = (): object => {
	if (!parsedCli.props) {
		return {};
	}
	const jsonFile = path.resolve(process.cwd(), parsedCli.props);
	try {
		if (fs.existsSync(jsonFile)) {
			const rawJsonData = fs.readFileSync(jsonFile, 'utf-8');
			return JSON.parse(rawJsonData);
		}
		return JSON.parse(parsedCli.props);
	} catch (err) {
		console.log(
			'You passed --props but it was neither valid JSON nor a file path to a valid JSON file.'
		);
		console.log(
			'Check that your input is parseable using `JSON-parse` and try again.'
		);
		process.exit(1);
	}
};
