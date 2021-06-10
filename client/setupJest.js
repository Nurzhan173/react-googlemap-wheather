
import assert from 'assert';
global.fetch = (url) => { 
  return new Promise((resolve, reject) => {     
      if (url) {
          resolve({json: () => {
              return {hello: 'test'}
          }})
      } else {
          reject({error: 'error test'});
      }       
  })
};

