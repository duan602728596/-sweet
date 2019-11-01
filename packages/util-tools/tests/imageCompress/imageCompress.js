import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import imageCompression from '../../imageCompress';

describe('imageCompression', function() {
  it('should has a jpg picture file, a png picture file and a gif picture file', async function() {
    try {
      await imageCompression(path.join(__dirname, 'image'), path.join(__dirname, 'output'));
    } catch { /* no */ }

    const isJpgExists = fs.existsSync(path.join(__dirname, 'output/image.jpg'));
    const isPngExists = fs.existsSync(path.join(__dirname, 'output/image.png'));
    const isGifExists = fs.existsSync(path.join(__dirname, 'output/image.gif'));

    expect(isJpgExists).to.be.true;
    expect(isPngExists).to.be.true;
    expect(isGifExists).to.be.true;
  });
});