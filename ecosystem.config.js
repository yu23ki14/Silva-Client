module.exports = {
  apps: [{
    name: 'vanilla',
    script: 'server/index.js',

    env: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production01: {
      user: 'ec2-user',
      host: 'ip-172-31-29-92.ap-northeast-1.compute.internal',
      key: '~/.ssh/tabishindan_viewer_stg02.pem',
      ref: 'origin/master',
      repo: 'git@github.com:huberinc/th_portal_fe.git',
      path: '/home/ec2-user/vanilla',
      'post-deploy': 'npm run production'
    }
  }
}
