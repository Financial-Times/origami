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

# Attempting to use an undefined color generates a warning
stdout, stderr, status = Open3.capture3 "sass --scss test/undefined-colors-warn.scss test/output/undefined-colors-warn.css --style compressed --sourcemap=none"
raise "Using an undefined color shouldn't fail build" unless status.success?
raise "Using an undefined color should throw a warning" unless stderr.squish.match /Undefined use\-case/
raise "Using an undefined color should not affect output" unless File.open("test/output/undefined-colors-warn.css").read.squish == ".test{color:transparent}"
puts "Checked non-fatal warnings thrown when undefined color used"
File.delete('test/output/undefined-colors-warn.css')

FileUtils.rmdir "test/output"
