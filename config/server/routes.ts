import fs from 'fs';

import { Routes } from 'huncwot';
import { OK } from 'huncwot/response';

import {promises as fss} from 'fs';
import {join} from 'path';

const routes: Routes = {
  GET: {
    // implicit `return` with a `text/plain` response
    '/hello': _ => 'Hello Huncwot',

    // explicit `return` with a 200 response of `application/json` type
    '/json': _ => {
      return OK({ a: 1, b: 2 });
    },
    // stream the response
    '/stream': _ => {
      return fs.createReadStream('static/index.html');
    },
    // set your own headers
    '/headers': _ => {
      return { body: 'Hello B', statusCode: 201, headers: { 'Authorization': 'PASS' } };
    }
  },
  POST: {
    // request body is parsed in `params` by default
    '/bim': request => {
      return `Hello POST! ${request.params.name}`;
    },
    '/upload': async {files} => {
      console.log(files)
      const {name, data} = files.foo;
      const cwd = process.cwd();
      await fss.writeFile(join(cwd,'static','uploads',name),data);
      return 'Uploaded'
    }
  }
};

export default routes;
