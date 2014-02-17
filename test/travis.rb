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
FileUtils.mkdir_p "test/output"

# Compile o-colors normally
stdout, stderr, status = Open3.capture3 "sass --scss main.scss test/output/main.css"
raise stderr unless status.success?
raise stderr unless !stderr
raise "When compiled the module should not output any CSS" unless File.exists? 'test/output/main.css'
puts "Default compile was correctly silent."
File.delete('test/output/main.css')

# Compile o-colors with silent mode turned off
stdout, stderr, status = Open3.capture3 "sass --scss test/not-silent.scss test/output/not-silent.css --style compressed"
raise stderr unless status.success?
raise stderr unless !stderr
raise "When $o-colors-is-silent is set to true the module should not output any CSS" unless File.size('test/output/not-silent.css') == 0
puts "Compile with silent mode off correctly produced some CSS."
File.delete('test/output/not-silent.css')

# Attempting to use an undefined color generates a warning
stdout, stderr, status = Open3.capture3 "sass --scss test/undefined-colors-warn.scss test/output/undefined-colors-warn.css --style compressed"
raise "Using an undefined color shouldn't fail build" unless status.success?
raise "Using an undefined color should throw a warning" unless stderr.squish.match /^WARNING\: Undefined use-case 'undefined-use-case-name' used on line [0-9]+ of [0-9A-Za-z_\/\\\.]+$/
raise "Using an undefined color should not affect output" unless File.open("test/output/undefined-colors-warn.css").read.squish == ".test{color:#000}"
puts "Checked non-fatal warnings thrown when undefined color used"
File.delete('test/output/undefined-colors-warn.css')

FileUtils.rmdir "test/output"
