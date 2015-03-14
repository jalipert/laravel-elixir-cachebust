// Requirements:
var elixir = require('laravel-elixir');
var utilities = require('laravel-elixir/ingredients/commands/Utilities');
var gulp = require('gulp');
var crypto = require('crypto');
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var del = require('del');

// Variable to remember file mtime and hash:
var file_mtime = {};

/**
 * Generate unique string (uuid) of the specified length, or 8 by default.
 * @param   length  int
 * @returns {string}
 */
function uuid(length)
{
    length = (length === parseInt(length)) ? length : 8;
    return Array(length + 1).join("x").replace(/x/g, function(c) {
        var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);
    });
}

/**
 * Generate a hash based on the string passed to the function.
 * @param   str     {string}
 * @param   length  {int}
 * @returns {string}
 */
function generateHash(str, length)
{
    length = (length === parseInt(length)) ? length : 8;
    var preferredCiphers = ['md4','md5'];

    for(var i = 0; i < preferredCiphers.length; i++) {
        if(crypto.getHashes().indexOf(preferredCiphers[i]) !== -1) {
            var hash = crypto.createHash(preferredCiphers[i])
                .update(str)
                .digest('hex')
                .slice(0,length);
        }
    }
    return hash || uuid(length);
}

var