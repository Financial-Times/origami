import tap from "tap"
import execa from "execa"
import dedentTabs from "dedent-tabs"
const dedent = dedentTabs.default
import {dirname, join} from "node:path"
import {fileURLToPath} from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const oNoBinaryPath = join(__dirname, "../../index.js")

tap.test(
	"project which uses latest origami versions which are only on npm and not on bower",
	async t => {
		const {stdout, stderr, exitCode} = await execa(oNoBinaryPath, {
			reject: false,
			cwd: __dirname,
		})
		t.equal(exitCode, 1)
		t.equal(stdout, "")
		t.equal(
			stderr,
			dedent`This project ("test") is installing versions of Origami dependencies which are not available on Bower.
	This may cause build failures for this project or any projects which depend on "test" and have not yet upgraded to use the latest version of Origami.

	This project is installing "@financial-times/o-autoinit" at version "*".
	The last version of "@financial-times/o-autoinit" which is on both npm and bower is "2.0.7".
	Downgrade "@financial-times/o-autoinit" to "2.0.7" in order to avoid build failures for your users.

	Run these commands to downgrade:
	If this project is a library, use \`npm install --save-exact --save-peer "@financial-times/o-autoinit@2.0.7"\` otherwise, use \`npm install --save-exact --save "@financial-times/o-autoinit@2.0.7"\``
		)
	}
)
