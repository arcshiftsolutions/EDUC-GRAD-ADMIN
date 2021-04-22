module.exports = {
    configureWebpack: {
      performance: {
        hints: false
      },
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 250000
        }
      }
    },
    devServer: {
      proxy: {
        '/grad': {
            target: 'https://gradstudent-api-77c02f-dev.apps.silver.devops.gov.bc.ca',
            changeOrigin: true,
            pathRewrite: {
                '^/grad': ''
            }
        },
        '/assessments': {
          target: 'https://student-assessment-api-77c02f-dev.apps.silver.devops.gov.bc.ca',
          changeOrigin: true,
            pathRewrite: {
                '^/assessments': ''
            }
        },
        '/api/studentexam': {
            target: process.env.VUE_APP_STUDENT_EXAMS_API_HOST,
            changeOrigin: true,
            pathRewrite: {
                '^/api/studentexam': ''
              }
          },
  
      }
    },
    publicPath: '/'
  };
  