/*
 * ts-app-builder
 */
 
'use strict';

exports.description = 'Create a Rally app with TS test structure';

// before the questions
exports.notes = '\nAfter this is finished, be sure to run "npm install" \n';

// after the questions
exports.after = 'Thanks!  Be sure to run "npm install" now'

// any existing file/directory matching the wildcard will cause a warning
exports.warnOn = '*';

// initialization
exports.template = function(grunt,init,done) {
    init.process({},[
        init.prompt('title','My App'),
        { name: 'shortname', message:'Short Name (no spaces)', 'default':'my-app'},
        { name: 'sdk', message: 'SDK version', 'default': '2.0rc2' },
        { name: 'user', message: 'Username for integration tests' },
        { name: 'password', message: 'Password for integration tests' },
        { 
            name: 'server', 
            message: 'URL for integration tests and debug file', 
            'default': 'https://demo-west.rallydev.com'
        }
    ], function(err,props){
        var files = init.filesToCopy(props);
        init.copyAndProcess(files,props);
    });
};
