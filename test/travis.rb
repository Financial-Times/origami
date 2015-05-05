#!/usr/bin/env ruby
# Encoding: utf-8
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
puts "Test: using undefined colors don't throw fatal errors…"
raise "Using an undefined color shouldn't fail build" unless status.success?
raise "Using an undefined color should throw warnings" unless (stderr.squish.include? "Undefined use-case" and stderr.squish.include? "Color name 'null' is not defined in the palette")
puts "\e[32mPassed\e[0m"
puts "Test: custom colors and use cases are registered correctly…"
raise "Using an undefined color should not affect output" if File.open("test/output/undefined-colors-warn.css").read.squish.include? "test-undefined-use-case-name"
raise "Using a custom use case compiles correctly" unless File.open("test/output/undefined-colors-warn.css").read.squish.include? "test-custom-use-case{color:#ccc"
puts "\e[32mPassed\e[0m"
# File.delete('test/output/undefined-colors-warn.css')

FileUtils.rmdir "test/output"
