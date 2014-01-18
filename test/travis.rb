#!/usr/bin/env ruby

# Compile o-colors normally
result = `compass compile main.scss --sass-dir=. --css-dir=build`
raise result unless $?.to_i == 0
raise "When compiled the module should output some CSS" unless File.exists?('build/main.css');
puts "Regular compile worked successfully"

# Compile o-colors with silent classes
result = `compass compile test/silent.scss --sass-dir=. --css-dir=build -s compressed`
raise result unless $?.to_i == 0
raise "When $o-colors-is-silent is set to true the module should not output any CSS" unless File.size('build/test/silent.css') == 0
puts "Silent compile worked successfully"
