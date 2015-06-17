Mediainfo
=========

Wrapper around the `mediainfo` command for obtaining metadata information about media files with the Q promise library

Overview
--------

This module provides an interface to the `mediainfo` command. It returns the
(parsed) output of the command with all the keys lower-cased. For windows user you don't have to install extra packages.

Usage
-----

The module exposes just a single interface:

`mediainfo("/path/to/file", "/path/to/file2", [...]).then(...)`

It's really easier to just see the output, so here:

```
[{ tracks: 
   [ { type: 'Image',
       format: 'PNG',
       format_info: 'Portable Network Graphic',
       width: '599 pixels',
       height: '599 pixels',
       bit_depth: '32 bits',
       compression_mode: 'Lossless',
       stream_size: '88.1 KiB (100%)' } ],
  complete_name: 'TEST.png',
  format: 'PNG',
  format_info: 'Portable Network Graphic',
  file_size: '88.1 KiB' }]
```

Example
-------

```javascript
var mediainfo = require("mediainfoq");

mediainfo("/path/to/file", "/path/to/other/file")
    .then(function (res) {
      console.log(res)
    }).catch(function (err) {
      console.error(err)
    });
```

Requirements
------------

The `mediainfo` command has to be available somewhere in the PATH of the user
node is running as.

* `sudo apt-get install mediainfo` - should install the latest on Linux.

License
-------

MIT License

Contact
-------

* GitHub ([sagarghuge](http://github.com/sagarghuge))
* Email ([ghugesss@gmail.com](mailto:ghugesss@gmail.com))
