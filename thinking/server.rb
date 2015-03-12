#!/usr/bin/env ruby

require 'webrick'
require 'json'

puts 'Server started: http://localhost:3000/'

root = File.expand_path './public'
server = WEBrick::HTTPServer.new :Port => 3000, :DocumentRoot => root

    server.mount_proc '/products.json' do |req, res|
    products = JSON.parse(File.read('./products.json'))

    res['Content-Type'] = 'application/json'
    res['Cache-Control'] = 'no-cache'
    res.body = JSON.generate(products)
end

trap 'INT' do server.shutdown end

server.start
