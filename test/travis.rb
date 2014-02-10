#!/usr/bin/env ruby

# Compile o-ft-buttons normally (silent)
result = `sass --load-path ./bower_components/ --scss main.scss test/silent.css --style compressed`
raise result unless $?.to_i == 0
raise "When $o-ft-buttons-is-silent is set to true the module should not output any CSS" unless File.size('test/silent.css') == 0
puts "Silent compile worked successfully"
File.delete('test/silent.css');

# Compile o-ft-buttons with silent mode off
result = `sass --load-path ./bower_components/ --scss test/not-silent.scss test/not-silent.css`

# Check the exit code was 0 (i.e. no errors), raise an exception with the output from sass if not
raise result unless $?.to_i == 0
raise "When $o-ft-buttons-is-silent is set to false the module should output some CSS" unless File.exists?('test/not-silent.css');
puts "Regular compile worked successfully"
File.delete('test/not-silent.css');