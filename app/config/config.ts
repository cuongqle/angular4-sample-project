interface HttpEnvironment {
  host: string;
  port: string;
  protocol: string;
}

interface ConfigHttp {
  development: HttpEnvironment;
  fake: HttpEnvironment;
  production: HttpEnvironment;
}

const config: ConfigHttp = {
  development: {
    host: 'localhost',
    port: ':9001',
    protocol: 'http://'
  },
  fake: {
    host: 'localhost',
    port: ':9001',
    protocol: 'http://'
  },
  production: {
    host: '',
    port: '',
    protocol: ''
  }
};

export default config[process.env.NODE_ENV || 'development'];

