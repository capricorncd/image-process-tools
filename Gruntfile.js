module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> | version: <%= pkg.version %> | author: <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			my_target: {
				files: {
					'./build/image-process-tools.min.js': ['./build/image-process-tools.js']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
}
