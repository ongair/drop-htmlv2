# config valid only for current version of Capistrano

set :application, 'drop-htmlv2'
set :servername, '128.199.234.45'

set :scm, :none
set :repository,  "app" # the directory to deploy

set :deploy_via, :copy
set :copy_exclude, [".git", ".gitignore", "Capfile", ".config"]

set :user, 'deploy'
set :use_sudo, false


set :deploy_to, "/home/deploy/apps/ui"
role :web, '128.199.234.45'
role :app, '128.199.234.45'        
role :db,  '128.199.234.45', :primary => true

namespace :deploy do
  task :migrate do
    puts "Skipping migrate."
  end
  task :finalize_update do
    puts "Skipping finalize_update."
  end
  task :start do
    puts "Skipping start."
  end
  task :stop do 
    puts "Skipping stop."
  end
  task :restart do
    puts "Skipping restart."
  end
end



