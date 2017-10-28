/*
 * ts-app-builder
 */

'use strict';

exports.description = 'Create a Rally app with TS structure';

// before the questions
exports.notes = '\nAfter this is finished, be sure to run "npm install" \n';

// after the questions
exports.after = 'Thanks!  Be sure to run "npm install" now'

// any existing file/directory matching the wildcard will cause a warning
exports.warnOn = '*';

// initialization
exports.template = function(grunt,init,done) {
    init.process({},[
        init.prompt('title','Technical Services App'),
        { name: 'shortname', message:'Class Name (no spaces)', 'default':'CArABU.app.TSApp'},
        { name: 'formattedid', message:'Initial Artifact FormattedID', 'default':''},
        { name: 'sdk', message: 'SDK version', 'default': '2.1' },
        { name: 'version', message: 'Initial app version', 'default': '0.1' },
        { name: 'user', message: 'Username for integration tests & deployment' },
        { name: 'password', message: 'Password for integration tests & deployment' },
        {
            name: 'server',
            message: 'URL for integration tests and debug file',
            'default': 'https://us1.rallydev.com'
        }
    ], function(err,props){
        var files = init.filesToCopy(props);
        init.copyAndProcess(files, props, {noProcess: '*.png'});
        console.log('');
        console.log(exports.after);
    });
};
