import {WebClient as SlackWebApiClient} from '@slack/web-api';

class SlackAnnouncer {
	constructor({authToken, channelId, log}) {
		this.client = new SlackWebApiClient(authToken);
		this.channelId = channelId;
		this.log = log;
	}

	async announce({url, name, versionNumber}) {
		const label = `${name} @ ${versionNumber}`;
		let text = `New release: *<${url}|${label}>*`;
		try {
			await this.client.chat.postMessage({
				channel: this.channelId,
				text,
				as_user: true,
			});
			this.log.info(
				`Slack Announcer: type="success" repo="${name}" version="${versionNumber}"`
			);
		} catch (error) {
			this.log.error(
				`Slack Announcer: type="error" repo="${name}" version="${versionNumber}" message="${error.message}"`
			);
		}
	}
}

export default SlackAnnouncer;
