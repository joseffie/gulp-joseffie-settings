module.exports = {
   root: true,
   modules: {
      'bem-tools': {
         plugins: {
            create: {
               techs: ['pug', 'scss', 'mjs'],
               levels: {
                  'src/components/': {
                     default: true
                  }
               }
            }
         }
      }
   }
}
