import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { swaggerSpec } from './swaggerConfig';  

fs.writeFile(path.join(__dirname, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2), (err: any) => {
  if (err) {
    console.error('Error generating swagger.json file:', err);
  } else {
    console.log('Successfully generated swagger.json file!');
  }
});

fs.writeFile(path.join(__dirname, 'swagger.yaml'), yaml.dump(swaggerSpec), (err: any) => {
  if (err) {
    console.error('Error generating swagger.yaml file:', err);
  } else {
    console.log('Successfully generated swagger.yaml file!');
  }
});