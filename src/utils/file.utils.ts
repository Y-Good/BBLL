import * as fs from 'fs';

export const checkDirAndCreate = filePath => {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
};
