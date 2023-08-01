
const path = require('path')
const { name, version } = require('./package.json')

module.exports = {
  name,
  version,
  metadata: {
    year: new Date().getFullYear()
  },
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: 'Project name'
    },

    {
      name: 'description',
      type: 'text',
      message: 'Project description',
      initial: 'Phecda-server App'
    },
    {
      name: 'eslint',
      type: 'confirm',
      message: 'Use EsLint',
      initial: false
    },

    {
      name: 'phecda_client',
      type: 'confirm',
      message: 'Use phecda-client',
      initial: true
    },

  ],
  init: true,
  filters:{
  '.eslint*':({eslint})=>!!eslint,

  },

  complete: async ctx => {
    console.clear()
 
    if (ctx.dest !== process.cwd()) {
      console.log(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`)
    }
    
    console.log('\nHappy hacking :)\n')
  }
}