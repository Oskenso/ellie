module.exports = {
	entry: './app.js',
	output: {
		filename: './bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}
