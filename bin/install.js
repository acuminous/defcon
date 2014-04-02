var spawn = require('child_process').spawn;
var platform = require('os').platform();
var path = require('path');
var installDir = path.join(__dirname, '..');
var cmd = path.join(installDir, 'bin', /^win/.test(platform) ? 'install.bat' : 'install.sh');
spawn(cmd, [], { stdio: 'inherit', cwd: installDir }).on('exit', function(code) {
    process.exit(code);
});