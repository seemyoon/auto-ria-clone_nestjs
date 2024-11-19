import { OpenAPIObject } from '@nestjs/swagger';

const pathMethods = ['get', 'post', 'put', 'delete', 'patch'];

const generateResponse = {
  400: { description: 'Bad Request' },
  500: { description: 'Internal Server Error' },
};

const authResponse = {
  401: { description: 'Unauthorized' },
  403: { description: 'Forbidden' },
};

const deleteResponse = {
  204: { description: 'No Content' },
};

export class SwaggerHelper {
  static setDefaultResponses(document: OpenAPIObject): void {
    for (const key of Object.keys(document.paths)) {
      for (const method of pathMethods) {
        const route = document.paths[key]?.[method];
        if (route) {
          Object.assign(route.responses, generateResponse);
          if (route.security) {
            Object.assign(route.responses, authResponse);
          }
          if (method === 'delete') {
            delete route.responses[200];
            Object.assign(route.responses, deleteResponse);
          }
        }
      }
    }
  }
}
