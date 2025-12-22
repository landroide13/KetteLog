import { TestBed } from '@angular/core/testing';

import { SessionStorageStore } from './session-storage.store';

describe('SessionStorageStore', () => {
  let service: SessionStorageStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
