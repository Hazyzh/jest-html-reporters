import fs from 'fs-extra';
import path from 'path';

import {
  addAttach,
  attachDirPath,
  dataDirPath,
  tempDirPath,
} from '../helper';

describe('helper attachment paths', () => {
  beforeEach(async () => {
    await fs.remove(dataDirPath);
    await fs.remove(attachDirPath);
    await fs.ensureDir(dataDirPath);
    await fs.ensureDir(attachDirPath);
  });

  afterAll(async () => {
    await fs.remove(dataDirPath);
    await fs.remove(attachDirPath);
  });

  test('uses a path-safe hash for the temp directory name', () => {
    const hash = path.basename(path.dirname(tempDirPath)).split('-').pop();

    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  test('sanitizes custom attachment names and avoids overwriting duplicates', async () => {
    await addAttach({
      attach: Buffer.from('first'),
      description: 'first',
      bufferFormat: 'png',
      fileCustomName: '../unsafe name.png',
    });
    await addAttach({
      attach: Buffer.from('second'),
      description: 'second',
      bufferFormat: 'png',
      fileCustomName: '../unsafe name.png',
    });

    expect(await fs.pathExists(path.join(attachDirPath, 'unsafe_name.png'))).toBe(true);
    expect(await fs.pathExists(path.join(attachDirPath, 'unsafe_name-1.png'))).toBe(true);
    expect(await fs.pathExists(path.join(dataDirPath, 'unsafe_name.json'))).toBe(true);
    expect(await fs.pathExists(path.join(dataDirPath, 'unsafe_name-1.json'))).toBe(true);
  });
});
