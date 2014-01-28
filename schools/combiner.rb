require 'json'

json = Dir['./*.json'].map { |f| JSON.parse File.read(f) }.flatten

f = File.open("oswego.json", "w")
f.write(JSON.pretty_generate(json))
f.close