fx_version   'bodacious'
lua54        'yes'
game         'gta5'

name         'Z3R0\'s AI Taxi'
author       'z3r0c00lz'
version      '1.0.0'
description  'Need a Taxi? No Taxi Job or Taxi Drivers online? Here ya go!'





client_scripts {
    'build/client/*.js',
}

server_scripts {
    'build/server/*.js',
    '@mysql-async/lib/MySQL.lua',
}

shared_scripts {
    'build/shared/*.js',
}

