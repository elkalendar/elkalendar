<?php

namespace Deployer;

require 'recipe/laravel.php';
require 'contrib/npm.php';

set('repository', 'https://github.com/YottaHQ/elkalendar.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

host('75.119.147.3')
    ->setIdentityFile('~/.ssh/id_rsa')
    ->set('remote_user', 'root')
    ->set('deploy_path', '/www/elkalendar');

after('deploy:failed', 'deploy:unlock');

task('update_repo', function () {
    cd('{{release_path}}');
    run('git pull origin master');
});

task('build', function () {
    cd('{{release_path}}');
    run('npm run build:landing');
    run('npm run build:app');
});

task('build_mails', function () {
    cd('{{release_path}}/maizzle');
    run('npm run build');
});

after('deploy:update_code', 'npm:install');
after('deploy:update_code', 'build');
