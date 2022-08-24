import tap from "tap"
import execa from "execa"
import dedentTabs from "dedent-tabs"
const dedent = dedentTabs.default
import {dirname, join} from "node:path"
import {fileURLToPath} from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const oNoBinaryPath = join(__dirname, "../../index.js")

tap.test(
	"project which uses origami versions which are on both npm and bower",
	async t => {
		const {stdout, stderr, exitCode} = await execa(oNoBinaryPath, {
			reject: false,
			cwd: __dirname,
		})
		t.equal(exitCode, 0)
		t.equal(stdout, "")
		t.equal(stderr, "")
	}
)
