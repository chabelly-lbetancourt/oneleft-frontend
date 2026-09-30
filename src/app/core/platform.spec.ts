import { TestBed } from '@angular/core/testing';
import { isNativeApp, NATIVE_AUTH_CALLBACK, NativePlatform } from './platform';

describe('NativePlatform', () => {
  it('should report the browser as not native', () => {
    expect(isNativeApp()).toBe(false);
    expect(TestBed.inject(NativePlatform).isNative()).toBe(false);
    expect(NATIVE_AUTH_CALLBACK).toBe('oneleft://callback');
  });
});
