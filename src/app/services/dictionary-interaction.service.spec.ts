import { TestBed } from '@angular/core/testing';

import { DictionaryInteractionService } from './dictionary-interaction.service';

describe('DictionaryInteractionService', () => {
  let service: DictionaryInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
