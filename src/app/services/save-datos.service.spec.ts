import { TestBed } from '@angular/core/testing';

import { SaveDatosService } from './save-datos.service';

describe('SaveDatosService', () => {
  let service: SaveDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
