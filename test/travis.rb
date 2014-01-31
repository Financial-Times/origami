#!/usr/bin/env ruby

Dir.mkdir("build");

# Compile o-ft-typography normally
result = `sass --load-path ./bower_components/ --scss main.scss build/main.css`

# Check the exit code was 0 (i.e. no errors), raise an exception with the output from sass if not
raise result unless $?.to_i == 0
raise "When compiled the module should output some CSS" unless File.exists?('build/main.css');
puts "Regular compile worked successfully"

# Compile o-ft-typography with silent classes
result = `sass --load-path ./bower_components/ --scss test/silent.scss build/silent.css --style compressed`
raise result unless $?.to_i == 0
raise "When $o-ft-typography-is-silent is set to true the module should not output any CSS" unless File.size('build/silent.css') == 0
puts "Silent compile worked successfully"