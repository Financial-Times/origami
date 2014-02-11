#!/usr/bin/env ruby

# Compile o-ft-typography normally (silent)
result = `sass --style compressed --load-path ./bower_components/ --scss main.scss test/main.css`

# Check the exit code was 0 (i.e. no errors), raise an exception with the output from sass if not
raise result unless $?.to_i == 0
raise "By default the module should not output any CSS" unless File.size('test/main.css') == 0
puts "Regular compile was correctly silent."
File.delete('test/main.css')

# Compile o-ft-typography with silent mode off
result = `sass --load-path ./bower_components/ --scss test/not-silent.scss test/not-silent.css --style compressed`
raise result unless $?.to_i == 0
raise "When $o-ft-typography-is-silent: false the module should output some CSS." unless File.exists?('test/not-silent.css');
puts "Non-silent compile was successful."
File.delete('test/not-silent.css')