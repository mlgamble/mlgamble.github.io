// From: https://dev.to/flexdinesh/deploy-gatsby-sites-to-github-pages-eed
const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'git@github.com:mlgamble/mlgamble.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)