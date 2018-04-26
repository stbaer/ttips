docute.init({
  repo: 'stbaer/ttips',
  landing: true,
  debug: true,
  plugins: [
    docuteIframe({
      prepend: '' +
      '<style> >div{margin-bottom: 3rem} </style>' +
      '<link rel="stylesheet" href="https://cdn.rawgit.com/stbaer/ttips/master/dist/ttips.min.css">' +
      '<script src="https://rawgit.com/stbaer/ttips/master/dist/ttips.min.js"></script>'
    })
  ],
  nav: [
    {title: 'Home', path: '/'},
    {title: 'Docs', path: '/docs', source: 'https://raw.githubusercontent.com/stbaer/ttips/master/README.md'},
    {title: 'Examples', path: '/examples'},
    {title: 'API', path: '/api'},
    {title: 'History', path: '/history', source: 'https://raw.githubusercontent.com/stbaer/ttips/master/History.md'}
  ]
})
