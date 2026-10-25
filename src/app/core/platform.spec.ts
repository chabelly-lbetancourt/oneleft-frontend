import { TestBed } from '@angular/core/testing';
import { isNativeApp, NATIVE_AUTH_CALLBACK, NativePlatform, toBase64 } from './platform';

describe('NativePlatform', () => {
  it('should report the browser as not native', () => {
    expect(isNativeApp()).toBe(false);
    expect(TestBed.inject(NativePlatform).isNative()).toBe(false);
    expect(NATIVE_AUTH_CALLBACK).toBe('oneleft://callback');
  });

  it('should leave the system bars alone in the browser', async () => {
    await expect(TestBed.inject(NativePlatform).setSystemBarsDark(true)).resolves.toBeUndefined();
  });

  it('should turn an image into the base64 that the file of the share sheet takes (HU-056)', async () => {
    await expect(toBase64(new Blob(['png'], { type: 'image/png' }))).resolves.toBe(btoa('png'));
  });
});
