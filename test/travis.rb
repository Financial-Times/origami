#!/usr/bin/env ruby
require 'fileutils'
require 'open3'

# squish method borrowed from Rails that removes newlines and extra spaces
class String
	def squish
		strip.gsub /\s+/, ' '
	end
end

# Prepare build test folder
FileUtils.mkdir_p "build"

# Compile o-colors normally
result, status = Open3.capture2e "sass --scss main.scss build/main.css"
raise result unless status.success?
raise "When compiled the module should output some CSS" unless File.exists? 'build/main.css'
puts "Checked regular compile"

# Compile o-colors with silent classes
result, status = Open3.capture2e "sass --scss test/silent.scss build/silent.css --style compressed"
raise result unless status.success?
raise "When $o-colors-is-silent is set to true the module should not output any CSS" unless File.size('build/silent.css') == 0
puts "Checked silent compile"

# Attempting to use an undefined color generates a warning
stdout, stderr, status = Open3.capture3 "sass --scss test/undefined-colors-warn.scss build/undefined-colors-warn.css --style compressed"
raise "Using an undefined color shouldn't fail build" unless status.success?
raise "Using an undefined color should throw a warning" unless stderr.squish.match /^WARNING\: Undefined use-case used on line [0-9]+ of [0-9A-Za-z_\/\\\.]+$/
raise "Using an undefined color should not affect output" unless File.open("build/undefined-colors-warn.css").read.squish == ".test{color:#000}"
puts "Checked non-fatal warnings thrown when undefined color used"
