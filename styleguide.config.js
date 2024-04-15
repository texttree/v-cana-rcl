const path = require('path');
const webpack = require('webpack');
const { name, version, url } = require('./package.json');

let sections = [
  {
    name: 'README',
    content: 'README.md',
  },
  {
    name: 'Bible',
    components: ['src/components/Resources/Bible/Bible.js'],
  },
  {
    name: 'TN',
    components: [
      'src/components/Resources/TN/TNotes.js',
      'src/components/Resources/TN/TNContent.js',
      'src/components/Resources/TN/TNList.js',
    ],
  },
  {
    name: 'TQ',
    components: [
      'src/components/Resources/TQ/TQuestion.js',
      'src/components/Resources/TQ/TQuestions.js',
    ],
  },
  {
    name: 'NotesEditor',
    components: [
      'src/components/Notes/NotesEditor.js',
      'src/components/Notes/MenuButtons.js',
    ],
  },
  {
    name: 'Dictionary Block',
    components: [
      'src/components/Notes/Dictionary.js',
      'src/components/Notes/Alphabet.js',
    ],
  },
  // {
  //   name: 'Workspace Block',
  //   components: ['src/components/Workspace/Workspace.js'],
  // },
];

module.exports = {
  components: 'src/components/**/[A-Z]*.js',
  ribbon: {
    url,
    text: 'Open on GitHub',
  },
  title: `${name} v${version}`,
  template: {
    head: {
      meta: [
        {
          name: 'description',
          content: 'React component library template',
        },
      ],
      scripts: [
        {
          src: 'https://cdn.tailwindcss.com',
        },
      ],
    },
  },
  moduleAliases: { [name]: path.resolve(__dirname, 'src') },
  skipComponentsWithoutExample: true,
  sections,
  styles: function styles(theme) {
    return {
      ComponentsList: {
        isSelected: {
          fontWeight: 'normal',
          '&>a': {
            fontWeight: 'bold !important',
          },
        },
      },
      Code: {
        code: {
          // make inline code example appear the same color as links
          backgroundColor: '#eff1f3',
          fontSize: 14,
          borderRadius: '6px',
          padding: '.2em .4em',
        },
      },
    };
  },
  theme: {
    color: {
      link: '#4B4E6A',
      linkHover: '#2B3847',
      baseBackground: '#fff',
      border: '#D0DAE4',
      sidebarBackground: '#fff',
    },
    fontFamily: {},
  },
  exampleMode: 'expand',
  usageMode: 'expand',
  pagePerSection: true,
  getComponentPathLine(componentPath) {
    const componentName = path.basename(componentPath, '.js').split('.')[0];
    return `import { ${componentName} } from '${name}';`;
  },
  updateExample(props, exampleFilePath) {
    const { settings, lang } = props;
    if (typeof settings?.file === 'string') {
      const filepath = path.resolve(path.dirname(exampleFilePath), settings.file);
      settings.static = true;
      delete settings.file;
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang,
      };
    }
    return props;
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        process: { env: {} },
      }),
    ],
  },
};
