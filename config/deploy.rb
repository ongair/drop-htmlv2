# config valid only for current version of Capistrano

set :application, 'drop-htmlv2'
set :servername, 'ec2-52-19-95-109.eu-west-1.compute.amazonaws.com'

set :scm, :none
set :repository,  "app" # the directory to deploy

set :deploy_via, :copy
set :copy_exclude, [".git", ".gitignore", "Capfile", ".config"]

set :user, 'ubuntu'
set :use_sudo, false


default_run_options[:pty] = true
ssh_options[:forward_agent] = true
ssh_options[:auth_methods] = ["publickey"]
ssh_options[:keys] = ["drop.pem"]

set :deploy_to, "/home/ubuntu/apps/ui"
role :app, 'ec2-52-19-95-109.eu-west-1.compute.amazonaws.com'
role :web, 'ec2-52-19-95-109.eu-west-1.compute.amazonaws.com'
role :db,  'ec2-52-19-95-109.eu-west-1.compute.amazonaws.com'


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



